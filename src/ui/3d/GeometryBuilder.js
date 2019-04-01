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
            amount: height,
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
    }

    /**
     * @param document
     * @return {THREE.Mesh}
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

        return this._groupMeshes(meshes,internalMeshes);
    }


    /**
     * @param {Array} addMeshList
     * @param {Array} intersectMeshList
     * @return {Mesh|null}
     * @private
     */
    _groupMeshes(addMeshList,intersectMeshList){
        let resultMesh = null;
        if(addMeshList.length>0) {
            let res = new ThreeBSP(addMeshList[0]);
            for (var i = 1; i < addMeshList.length; i++) {
                res =res.union(new ThreeBSP(addMeshList[i]));
            }
            resultMesh = new THREE.Mesh(res.toGeometry(),this.material);
        }else{
            if(addMeshList.length==1) {
                resultMesh = addMeshList[0];
            }
        }

        if(resultMesh && intersectMeshList.length>0){
            let res = new ThreeBSP(resultMesh);
            for (let internalMesh of intersectMeshList) {
                res = res.subtract(new ThreeBSP(internalMesh));
            }
            resultMesh = new THREE.Mesh(res.toGeometry(),this.material);
        }
        return resultMesh;
    }
}



export {PolygonMeshBuilder};