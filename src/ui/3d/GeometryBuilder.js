/**
 * Created by dev on 19.12.18.
 */

import * as THREE from 'three';
var ThreeBSP = require('three-js-csg')(THREE);

import ShapeBuilder from "../../analyzer/ShapeBuilder";
import Trigonometric from "../../model/math/Trigonometric";
import Matrix from "../../model/math/Matrix";
import Point from "../../model/Point";

class PolygonGeometryBuilder{

    /**
     * @param {Shape} shapeModel
     * @return {THREE.Geometry}
     */
    createThreeGeometry(shapeModel){

        let bends = shapeModel.bends;


        let vertices = shapeModel.getConsistentlyPoints();
        let height =  Math.abs(shapeModel.height);
        let sourceShape = this._createThreeGeometryByPoints(vertices, height);

        let shapes = [sourceShape];

        for(let bend of bends){
            let temp = [];
            for(let i=0; i<shapes.length; i++) {
                let shape = shapes[i];

                let cutGeometry1 = this._createCutCubeGeometry(bend.angle + 180, bend.getCenter());
                let cutGeometry2 = this._createCutCubeGeometry(bend.angle, bend.getCenter());

                let res1 = new ThreeBSP(shape).subtract(new ThreeBSP(cutGeometry1)).toGeometry();

                let res2 = new ThreeBSP(shape).subtract(new ThreeBSP(cutGeometry2)).toGeometry();

                if(res1.vertices.length!=0 && res2.vertices.length!=0){
                    temp.push(res1);
                    temp.push(res2);
                    //todo: rotate
                }else{
                    temp.push(shape);
                }
            }
            shapes = temp;
        }
        if(shapes.length>1) {

            let res = new ThreeBSP(shapes[0]);

            for(let i=1; i<shapes.length; i++){
                shapes[i].translate(0.3*i,0.3*i,0);
                res = res.union(new ThreeBSP(shapes[i]));
            }

            res = res.toGeometry();

            if(res.vertices.length==0){
                return null;
            }else {
                return res;
            }
        }else{
            return sourceShape;
        }
    }


    /**
     *
     * @param {LineElement} bend
     * @return {Mesh}
     * @private
     */
    _createCutCubeGeometry(angle, center){
        let cubesize = 1000;

        let geometry = new THREE.BoxGeometry( cubesize, cubesize, cubesize );
        geometry.rotateZ(Trigonometric.gradToRad(angle));

        geometry.translate(center.x+(cubesize/2)*Math.sin(Trigonometric.gradToRad(angle)), center.y-(cubesize/2)*Math.cos(Trigonometric.gradToRad(angle)), 0);

        return geometry;
    }

    _createThreeGeometryByPoints(vertices, height){
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

        let builder = new ShapeBuilder(document);
        let shapes = builder.buildShapes(true);

        for(let shape of shapes){
            let geometry = this.geometryBuilder.createThreeGeometry(shape);
            if(!geometry){
                continue;
            }
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
                if(resultMesh!=null){
                    let res = new ThreeBSP(resultMesh);
                    if(intersectMeshList.length>0){
                        let index =0;
                        let interval = setInterval(()=>{ //todo: the method can has error. Need use recursive function with promisses(for progress br)
                            this.progressBar.setValue(((addMeshList.length+index)*100)/n);
                            res = res.subtract(new ThreeBSP(intersectMeshList[index++]));
                            if(index==intersectMeshList.length){
                                clearInterval(interval);
                                this.progressBar.hide();
                                resolve(new THREE.Mesh(res.toGeometry(),this.material));
                            }
                        },200);
                    }else{
                        this.progressBar.hide();
                        resolve(new THREE.Mesh(res.toGeometry(),this.material));
                    }
                }else{
                    this.progressBar.hide();
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