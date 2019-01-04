/**
 * Created by dev on 19.12.18.
 */

import * as THREE from 'three';
var ThreeBSP = require('three-js-csg')(THREE);

import {Vertex3} from './model/Vertex';
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
                // console.log(currentEdge.v2);
                // console.log(edges);
                // console.log(this.consistentlyVertex);
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
            throw new Exception("Please close open shapes.");
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
        throw new Exception('Lines must not intersect. Consider using the eraser tool to remove appropriate line segments.');
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
     * @param elements
     * @param groups
     * @return {THREE.Mesh}
     */
    getMeshes(elements, groups){
        let meshes = [];
        let internalMeshes = [];
        for(let group of groups){
            let polygons = this._createPolygonsByGroup(group, elements);
            let height = this._getHeightByGroup(group,elements);
            for(let polygon of polygons) {
                if (polygon.isClosed()) {
                    let vertices = polygon.getConsistentlyVertex();
                    let geometry = this.geometryBuilder.createThreeGeometry(vertices, Math.abs(height));
                    let mesh = new THREE.Mesh(geometry, this.material);
                    if (height>0) {
                        meshes.push(mesh);
                    }else {
                        internalMeshes.push(mesh);
                    }
                } else {
                    throw new Exception("Please close open shapes.",polygon);
                }
            }
        }

        let circles = this._getCirclesWithoutGroup(groups, elements);
        for(let circle of circles){
            if(!circle.Z){
                circle.Z=0.76;
            }
            let vertices = [];

            for(let point of circle.P){
                vertices.push(new Vertex3(point.X,point.Y,0));
            }

            let geometry = this.geometryBuilder.createThreeGeometry(vertices, Math.abs(circle.Z));
            let mesh = new THREE.Mesh(geometry, this.material);
            if (circle.Z>0) {
                meshes.push(mesh);
            }else {
                internalMeshes.push(mesh);
            }
        }


        return this._groupMeshes(meshes,internalMeshes);
    }

    /**
     * @param {Array} groups
     * @param {Array} elements
     * @return {Array} elements
     * @private
     */
    _getCirclesWithoutGroup(groups, elements){
        let el = [];
        e: for(let i=0; i<elements.length; i++){
            if(elements[i].enable && elements[i].type=='circle') {
                for (let group of groups) {
                    for (let ind of group.E) {
                        if (ind == i) {
                            continue e;
                        }
                    }
                }
                el.push(elements[i]);
            }
        }
        return el;
    }

    /**
     * @param {Array} addMeshList
     * @param {Array} intersectMeshList
     * @return {Mesh|null}
     * @private
     */
    _groupMeshes(addMeshList,intersectMeshList){
        let resultMesh = null;
        if(addMeshList.length>1) {
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

    _getHeightByGroup(group, elements){
        let startZ = elements[group.E[0]].Z;
        if(!startZ){
            startZ=0.76;
            // throw new Exception("Please fill the  Z value for the Group 3D displaying!",group);
        }
        let min=startZ;
        let max=startZ;
        for(let i=1; i<group.E.length; i++){
            let z = elements[group.E[i]].Z;
            if(!z){
                z=0.76;
                // throw new Exception("Please fill the  Z value for the Group Element  3D displaying!",{group, i});
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
     * @return {Array} of {Polygon}
     * @private
     */
    _createPolygonsByGroup(group, elements){
        let polygon = new Polygon();
        for(let elementIndex of group.E){
            switch(elements[elementIndex].type){
                case 'line':
                case 'spline':
                case 'circle':
                    for(let i=1; i<elements[elementIndex].P.length; i++){
                        polygon.addEdge(new Line(new Vertex3(elements[elementIndex].P[i-1].X,elements[elementIndex].P[i-1].Y),
                            new Vertex3(elements[elementIndex].P[i].X,elements[elementIndex].P[i].Y)));
                    }
                    break;
                default:
                    throw new Exception(`This MVP 3D version is working only with line, spline and circle!`);
            }
        }
        if(polygon.hasLoop()){
            return polygon.getSimplePolygons();
        }
        return [polygon];
    }

}



export {PolygonMeshBuilder};