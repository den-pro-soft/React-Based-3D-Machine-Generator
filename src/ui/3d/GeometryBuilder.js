/**
 * Created by dev on 19.12.18.
 */

import * as THREE from 'three';
var ThreeBSP = require('three-js-csg')(THREE);

import {Vertex3} from './model/Vertex';
import Line from './model/Line';

// import Group from './../model/elements/Group';


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
            throw new Exception("Please close open shapes.", this);
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
     * @param document
     * @return {THREE.Mesh}
     */
    getMeshes(document){
        let meshes = [];
        let internalMeshes = [];
        for(let element of document._elements){
            if(element.typeName == 'Group') {
                let polygons = this._createPolygonsByGroup(element);
                for(let polygon of polygons) {
                    if (polygon.isClosed()) {
                        let vertices = polygon.getConsistentlyVertex();
                        let geometry = this.geometryBuilder.createThreeGeometry(vertices, Math.abs(element.height));
                        let mesh = new THREE.Mesh(geometry, this.material);
                        if (element.height>0) {
                            meshes.push(mesh);
                        }else {
                            internalMeshes.push(mesh);
                        }
                    } else {
                        throw new Exception("Please close open shapes.",polygon);
                    }
                }
            }
            if(element.typeName == 'Arc') {
                let polygon = this._createPolygonsByArc(element);
                let vertices = polygon.getConsistentlyVertex();
                let geometry = this.geometryBuilder.createThreeGeometry(vertices, Math.abs(element.height));
                let mesh = new THREE.Mesh(geometry, this.material);
                if (element.height>0) {
                    meshes.push(mesh);
                }else {
                    internalMeshes.push(mesh);
                }
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


    /**
     * @param group
     * @return {Array.<Polygon>}
     * @private
     */
    _createPolygonsByGroup(group){
        let polygon = new Polygon();
        for(let element of group.elements){
            if(element.typeName == 'Line') {
                let points = element._points;

                for (let i = 1; i < points.length; i++) {
                    polygon.addEdge(new Line(new Vertex3(points[i - 1].x, points[i - 1].y),
                        new Vertex3(points[i].x, points[i].y)));
                }
            }
            if(element.typeName == 'Spline') {
                let points = element.toPolyLines()[0].points;
                for (let i = 1; i < points.length; i++) {
                    polygon.addEdge(new Line(new Vertex3(points[i - 1].x, points[i - 1].y),
                        new Vertex3(points[i].x, points[i].y)));
                }
            }
        }
        // if(polygon.hasLoop()){
        //     return polygon.getSimplePolygons();
        // }
        return [polygon];
    }

    _createPolygonsByArc(element){
        let createVertex = function(x){
            return new Vertex3(Math.cos(x)*element.radius+element.center.x, Math.sin(x)*element.radius+element.center.y);
        };

        let randomColor = function(){
            var o = Math.round, r = Math.random, s = 255;
            return 'rgba( 255,' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
            return 'rgba( 255,' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        };

        let polygon = new Polygon();
        let delta = Math.PI /60;
        let board = app.board;
        for (var a = 0; (a+delta) < 2*Math.PI; a += delta) {
            board.style('strokeStyle',randomColor());
            let p1 = createVertex(a);
            let p2 = createVertex(a+delta);
            polygon.addEdge(new Line(p1,p2));
            board.drawLine(p1, p2);
        }
        let p1 = createVertex(a);
        let p2 = createVertex(a+delta);
        board.drawLine(p1, p2);
        polygon.addEdge(new Line(p1,p2));

        return polygon;
    }
}



export {PolygonMeshBuilder};