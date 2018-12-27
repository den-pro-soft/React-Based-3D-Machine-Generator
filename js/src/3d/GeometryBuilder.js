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

    /**
     * @param {Array} of Vertex3
     * @param {int} height
     * @return {THREE.Geometry}
     * @private
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
     * @return {Array}
     */
    getMeshes(elements, groups){
        let meshes = [];
        for(let group of groups){
            let polygons = this._createPolygonsByGroup(group, elements);
            let height = group.E.reduce((max,i)=>(elements[i]['Z'] && elements[i].Z>max)?elements[i].Z:max); //todo: the method of height calculating doesn't take account of inside blocks

            for(let polygon of polygons) {
                if (polygon.isClosed()) {
                    //todo: calculate height for polygon (now it's max height of line)
                    if (height == 0) {
                        throw new Exception("The polygon has zero height, we cant add it to 3D view!",polygon);
                    } else {
                        let vertices = polygon.getConsistentlyVertex();
                        let geometry = this.geometryBuilder.createThreeGeometry(vertices, height);
                        let mesh = new THREE.Mesh(geometry, this.material);
                        meshes.push(mesh);
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



        return meshes;
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