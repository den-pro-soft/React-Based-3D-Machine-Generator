/**
 * Created by dev on 19.12.18.
 */

import * as THREE from 'three';
var ThreeBSP = require('three-js-csg')(THREE);

import ShapeBuilder from "../../analyzer/ShapeBuilder";

class PolygonGeometryBuilder{

    /**
     * @param {Array} vertices of Vertex3
     * @param {int} height
     * @return {THREE.Geometry}
     */
    createThreeGeometry(vertices, height){
        var shape = new THREE.Shape();
        shape.moveTo( vertices[0].x, vertices[0].y );
        for(let i=1; i<vertices.length; i++){
            shape.lineTo(vertices[i].x, vertices[i].y );
        }

        var extrudeSettings = {
            steps: 1,
            depth: height,
            bevelEnabled: false
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        geometry.computeVertexNormals();
        return geometry;
    }
}



class PolygonMeshBuilder{
    constructor(material){
        this.material = material;
        this.geometryBuilder = new PolygonGeometryBuilder();

        this.progressBar = container.resolve('progressBar');
    }

    /**
     * @param document
     * @return {Promise.<THREE.Mesh>}
     */
    getMeshes(document){
        let meshes = [];
        let internalMeshes = [];

        let shapes = new ShapeBuilder(document).buildShapes();

        for(let shape of shapes){
            let points = shape.getConsistentlyPoints();
            let geometry = this.geometryBuilder.createThreeGeometry(points, Math.abs(shape.height));
            let mesh = new THREE.Mesh(geometry, this.material);
            if (shape.height>0) {
                meshes.push(mesh);
            }else {
                internalMeshes.push(mesh);
            }
        }

        this.progressBar.show("Rendering 3D ...");

        let res = this._groupMeshes(meshes,internalMeshes);

        return res;
    }


    /**
     * @param {Array} addMeshList
     * @param {Array} intersectMeshList
     * @return {Promise.<Mesh|null>}
     * @private
     */
    _groupMeshes(addMeshList,intersectMeshList){
        return new Promise((resolve, reject)=>{
            let n = addMeshList.length+intersectMeshList.length-1;
            this.union(addMeshList, n).then(resultMesh=>{
                console.log(resultMesh);
                if(resultMesh!=null){
                    if(intersectMeshList.length>0){
                        let res = new ThreeBSP(resultMesh);

                        console.log(res);
                        let index =0;
                        let interval = setInterval(()=>{
                            this.progressBar.setValue(((addMeshList.length+index)*100)/n);
                            res = res.subtract(new ThreeBSP(intersectMeshList[index++]));
                            if(index==intersectMeshList.length){
                                clearInterval(interval);
                                this.progressBar.hide();
                                resolve(new THREE.Mesh(res.toGeometry(),this.material));
                            }
                        },20);
                    }else{
                        resolve(new THREE.Mesh(res.toGeometry(),this.material));
                    }
                }else{
                    resolve(null);
                }
            });
        });
    }

    /**
     * @param {Array} addMeshList
     * @param {number} n
     * @return {Promise.<Mesh>}
     */
    union(addMeshList, n){
        return new Promise((resolve, reject)=>{
            let resultMesh = null;
            if(addMeshList.length>1) {
                let res = new ThreeBSP(addMeshList[0]);
                let index =0;
                let interval = setInterval(()=>{
                    if(index==addMeshList.length){
                        console.log(index, addMeshList.length);
                        resolve(new THREE.Mesh(res.toGeometry(),this.material));
                        clearInterval(interval);
                        return;
                    }
                    this.progressBar.setValue((index*100)/n);
                    res =res.union(new ThreeBSP(addMeshList[index++]));
                },20);
            }else{
                if(addMeshList.length==1) {
                    resolve(addMeshList[0]);
                }else {
                    resolve(null); //todo: throw some Exception
                }
            }
        });
    }

}



export {PolygonMeshBuilder};