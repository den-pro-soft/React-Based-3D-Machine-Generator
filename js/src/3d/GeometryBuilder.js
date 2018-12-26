/**
 * Created by dev on 19.12.18.
 */

var THREE = require("three-js")();
var ThreeBSP = require('three-js-csg')(THREE);

import {Vertex3} from './model/Vertex';
import TriangulationAlgorithm from './algorithms/implementation/UniversalTriangulationAlgorithm';
import Line from './model/Line';
import Exception from '../Exception';



class Polygon{
    constructor(){
        /** @param {Array}  Line*/
        this.edges = [];

        this.consistentlyVertex = undefined;
    }


    /**
     * @param {Line} edge
     * @public
     */
    addEdge(edge){
        this.edges.push(edge);
        this.consistentlyVertex = undefined;
        //todo: check that all edges on single plane for 3D coordinates, and throw Exception
    }


    /**
     * @return {boolean}
     * @public
     */
    isClosed(){
        if(this.edges.length<3){
            return false;
        }
        //todo: check if all lines are parallel than it's not closed polygon

        let currentEdge = this.edges[0];
        let startEdge = currentEdge;

        this.consistentlyVertex = [];
        this.consistentlyVertex.push(currentEdge.v1);
        do{
            this.consistentlyVertex.push(currentEdge.v2);
            let edges = this._getEdgesContainsPoint(currentEdge.v2);
            if(edges.length!=2){ //closed polygon cannot have hanging edges or loops
                this.consistentlyVertex=undefined;
                return false;
            }
            let edge = (edges[0].compare(currentEdge) || edges[0].opposite(currentEdge))?edges[1]:edges[0];
            if(edge.v1.compare(currentEdge.v2)){
                currentEdge=edge;
            }else{
                currentEdge = new Line(edge.v2, edge.v1);
            }
        }while(!currentEdge.v2.compare(startEdge.v1));
        return true;
    }


    /**
     * @return {Array}
     * @throws {Exception} if that polygon isn't closed (before use the function check it with using isClosed() method)
     */
    getConsistentlyVertex(){
        if(!this.isClosed()){
            throw new Exception("The polygon isn't closed");
        }
        return this.consistentlyVertex;
    }

    /**
     * @return {boolean}
     */
    hasLoop(){
        let crosses = this._getCrossPoints();
        return crosses.length > 0;
    }

    /**
     * @return {Array}
     */
    getSimplePolygons(){
        throw new Exception('The polygon shouldn\'t cross itself. ' +
                            'The function of splitting into several polygons will be ' +
                            'implemented in a next version.');
        return [];
    }


    /**
     * 
     * @param point
     * @return {Array}
     * @private
     */
    _getEdgesContainsPoint(point){
        let lines =[];
        for(let edge of this.edges){
            if(edge.v1.compare(point) || edge.v2.compare(point)){
                lines.push(edge);
            }
        }
        return lines;
    }


    /**
     * @return {Array}  {edge1, edge2, Vertex3}
     * @private
     */
    _getCrossPoints(){
        let crosses = [];

        for(let i=0; i<this.edges.length; i++){
            m: for(let j=0; j<this.edges.length; j++){
                let crossPoint = this.edges[i].isCross(this.edges[j]);
                if(crossPoint){
                    for(let cross of crosses){ //if the cross in crosses array
                        if((cross.edge1.compare(this.edges[i]) && cross.edge2.compare(this.edges[j])) ||
                            (cross.edge1.compare(this.edges[j]) && cross.edge2.compare(this.edges[i]))){
                            continue m;
                        }
                    }
                    crosses.push({edge1:this.edges[i], edge2:this.edges[j], vertex:crossPoint});
                }
            }
        }
        return crosses;
    }
}

class PolygonGeometryBuilder{
    constructor(triangulationAlgorithm){
        this.triangulationAlgorithm = triangulationAlgorithm;
    }

    /**
     * @param {Array} of Vertex3
     * @param {int} height
     * @return {THREE.Geometry}
     * @private
     */
    createThreeGeometry(vertices, height){
        let geometry = new THREE.Geometry();

        for(let vertex of vertices){
            geometry.vertices.push(vertex.getThreeVertex());
        }

        for(let vertex of vertices){
            let t3 = vertex.getThreeVertex();
            t3.z=height;
            geometry.vertices.push(t3);
        }

        let triangles = this.triangulationAlgorithm.getTriangles(vertices);
        for(let triangle of triangles){
            let face =new THREE.Face3(...triangle);
            // face.normal.set(0,0,1);
            geometry.faces.push(face);
        }

        for(let triangle of triangles){
            let face = new THREE.Face3(...triangle.map((x)=>x+vertices.length).reverse());
            // face.normal.set(0,0,-1);
            geometry.faces.push(face);
        }

        for(let i=0; i<vertices.length; i++){
            let temp = (i+1)%vertices.length; //need for last edge
            let face = new THREE.Face3(temp, i, i+vertices.length);
            // face.normal.set(0,0,1);
            geometry.faces.push(face);
            face = new THREE.Face3(temp+vertices.length,temp,i+vertices.length);
            // face.normal.set(0,0,1);
            geometry.faces.push(face);
        }

        geometry.computeVertexNormals();
        return geometry;
    }
}



class PolygonMeshBuilder{
    constructor(material){
        this.material = material;
        this.geometryBuilder = new PolygonGeometryBuilder(new TriangulationAlgorithm());
    }

    /**
     * @param elements
     * @param groups
     * @return {THREE.Mesh}
     */
    getMeshes(elements, groups){
        console.log(elements);
        let meshes = [];
        let internalMeshes = [];
        for(let group of groups){
            let polygons = this._createPolygonsByGroup(group, elements);
            let height = this._getHeightByGroup(group,elements);
            for(let polygon of polygons) {
                if (polygon.isClosed()) {
                    //todo: calculate height for polygon (now it's max height of line)
                    let vertices = polygon.getConsistentlyVertex();
                    if (height>0) {
                        let geometry = this.geometryBuilder.createThreeGeometry(vertices, height);
                        let mesh = new THREE.Mesh(geometry, this.material);
                        meshes.push(mesh);
                    }else {
                        let geometry = this.geometryBuilder.createThreeGeometry(vertices, +height);
                        let mesh = new THREE.Mesh(geometry, this.material);
                        internalMeshes.push(mesh);
                    }
                } else {
                    throw new Exception("The polygon isn't closed!",polygon);
                }
            }
        }

        if(meshes.length>1) {
            let res = new ThreeBSP(meshes[0]);
            for (var i = 1; i < meshes.length; i++) {
                res =res.union(new ThreeBSP(meshes[i]));
            }
            meshes = [new THREE.Mesh(res.toGeometry(),this.material)];
        }


        // let resultMesh = null;
        // if(meshes.length>1) {
        //     let res = new ThreeBSP(meshes[0]);
        //     for (var i = 1; i < meshes.length; i++) {
        //         res =res.union(new ThreeBSP(meshes[i]));
        //     }
        //     resultMesh = new THREE.Mesh(res.toGeometry(),this.material);
        // }else{
        //     if(meshes.length==1) {
        //         resultMesh = meshes[0];
        //     }
        // }
        //
        // // if(resultMesh && internalMeshes.length>0){
        // //     let res = new ThreeBSP(resultMesh);
        // //     for (let internalMesh of internalMeshes) {
        // //         res = res.subtract(new ThreeBSP(internalMesh));
        // //     }
        // //     resultMesh = new THREE.Mesh(res.toGeometry(),this.material);
        // // }
        // return resultMesh;
        

        return meshes;
    }

    _getHeightByGroup(group, elements){
        let startZ = elements[group.E[0]].Z;
        if(!startZ){
            throw new Exception("Group doesn't have height!",group);
        }
        let min=startZ;
        let max=startZ;
        for(let i=1; i<group.E.length; i++){
            let z = elements[group.E[i]].Z;
            if(!z){
                throw new Exception("Group elements doesn't have height!",{group, i});
            }
            if(z>max){
                max=z;
            }
            if(z<min){
                min=z;
            }
        }

        if(min<0){
            return min;
        }
        return max;
    }

    /**
     * @param group
     * @param elements
     * @return {Polygon}
     * @private
     */
    _createPolygonsByGroup(group, elements){
        let polygon = new Polygon();
        for(let elementIndex of group.E){
            if(elements[elementIndex].type!='line') {
                throw new Exception("The geometry group has not line elements, the element will not include to result geometry!");
                continue;
            }
            polygon.addEdge(new Line(new Vertex3(elements[elementIndex].P[0].X,elements[elementIndex].P[0].Y),
                new Vertex3(elements[elementIndex].P[1].X,elements[elementIndex].P[1].Y)));
        }
        if(polygon.hasLoop()){
            return polygon.getSimplePolygons();
        }
        return [polygon];
    }

}



export {PolygonMeshBuilder};