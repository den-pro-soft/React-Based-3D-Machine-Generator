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
        tree.generateBendSections();

        if(airInside) {
            tree.addAirInside(airInside);
        }
        console.log(tree);
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
        let meshes = [];

        let builder = new ShapeBuilder(document);
        let shapes = builder.buildShapes(true);

        let airInside = null;

        let holes = shapes.filter(shape=>shape.height<=0);
        for(let hole of holes){
            let heigth = Math.abs(hole.height);
            if(!airInside){
                airInside=ShapeGeometryBuilder.getGeometry(hole.getConsistentlyPoints(), heigth);
            }else{
                let anotherHole = ShapeGeometryBuilder.getGeometry(hole.getConsistentlyPoints(), heigth);
                airInside = new ThreeBSP(airInside).union(new ThreeBSP(anotherHole)).toGeometry();
            }
        }

        shapes = shapes.filter(shape=>shape.height>0);
        for(let shape of shapes){
            let geometry = this.geometryBuilder.createThreeGeometry(shape, airInside);
            if(!geometry){
                continue;
            }
            let mesh = new THREE.Mesh(geometry, this.material);
            meshes.push(mesh);
        }

        this.progressBar.show("Rendering 3D ...");

        let res = this._groupMeshes(meshes,[]);
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