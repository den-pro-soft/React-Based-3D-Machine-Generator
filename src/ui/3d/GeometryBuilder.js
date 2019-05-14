/**
 * Created by dev on 19.12.18.
 */

import * as THREE from 'three';
var ThreeBSP = require('three-js-csg')(THREE);

import ShapeBuilder from "../../analyzer/ShapeBuilder";
import Trigonometric from "../../model/math/Trigonometric";
import Matrix from "../../model/math/Matrix";
import Point from "../../model/Point";
import BendProcessNode from "./bend/BendProcessNode";
import ShapeGeometryBuilder from "./ShapeGeometryBuilder";
import GraphicElement from "../../model/GraphicElement";

class PolygonGeometryBuilder{

    /**
     * @param {Shape} shapeModel
     * @return {THREE.Geometry}
     */
    createThreeGeometry(shapeModel, airInside){
        let vertices = shapeModel.getConsistentlyPoints();
        let height =  Math.abs(shapeModel.height);
        let sourceShape = ShapeGeometryBuilder.getGeometry(vertices, height);

        let tree = BendProcessNode.buildTree(sourceShape, shapeModel.height, shapeModel.bends);
        console.log("three generated");
        tree.generateBendSections();

        console.log("generated bend sections");

        if(airInside) {
            airInside.translate(0,0,GraphicElement.AirInside/2);
            tree.addAirInside(airInside);
        }

        console.log("After tree creator");
        return tree.getGeometry();
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
        this.progressBar.show("Rendering 3D ...");
        let meshes = [];

        let builder = new ShapeBuilder(document);
        let shapes = builder.buildShapes(true);

        let airInside = null;

        let holes = shapes.filter(shape=>shape.height<=0);
        for(let hole of holes){
            console.log("GeometryBuilder 64");
            let heigth = Math.abs(hole.height);
            if(!airInside){
                airInside=ShapeGeometryBuilder.getGeometry(hole.getConsistentlyPoints(), heigth);
            }else{
                let anotherHole = ShapeGeometryBuilder.getGeometry(hole.getConsistentlyPoints(), heigth);
                airInside = new ThreeBSP(airInside).union(new ThreeBSP(anotherHole)).toGeometry();
            }
        }

        this.progressBar.show(10);

        shapes = shapes.filter(shape=>shape.height>0);
        for(let shape of shapes){
            console.log("GeometruBuilder, 76");
            let geometry = this.geometryBuilder.createThreeGeometry(shape, airInside);
            if(!geometry){
                continue;
            }
            console.log("start create mesh");
            let mesh = new THREE.Mesh(geometry, this.material);
            console.log("after create mesh");
            meshes.push(mesh);
        }


        console.log("Start group mesh");
        let res = this._groupMeshes(meshes);
        return res;
    }


    /**
     * @param {Array} addMeshList
     * @param {Array} intersectMeshList
     * @return {Promise.<Mesh|null>}
     * @private
     */
    _groupMeshes(addMeshList){
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