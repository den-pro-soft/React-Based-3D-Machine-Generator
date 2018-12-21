/**
 * Created by dev on 19.12.18.
 */

var THREE = require("three-js")();
var ThreeBSP = require('three-js-csg')(THREE);

import {Vertex3} from './model/Vertex';
import TriangulationAlgorithm from './algorithms/implementation/UniversalTriangulationAlgorithm';
import Line from './model/Line';



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
            geometry.faces.push(new THREE.Face3(...triangle));
        }

        for(let triangle of triangles){
            geometry.faces.push(new THREE.Face3(...triangle.map((x)=>x+vertices.length).reverse()));
        }

        for(let i=0; i<vertices.length; i++){
            let temp = (i+1)%vertices.length; //need for last edge
            geometry.faces.push(new THREE.Face3(temp, i, i+vertices.length));
            geometry.faces.push(new THREE.Face3(temp+vertices.length,temp,i+vertices.length));
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
     * @return {Array}
     */
    getMeshes(elements, groups){
        let meshes = [];
        for(let group of groups){
            let polygon = this._createPolygonByGroup(group, elements);
            let height = group.E.reduce((max,i)=>(elements[i]['Z'] && elements[i].Z>max)?elements[i].Z:max); //todo: the method of height calculating doesn't take account of inside blocks

            //todo: check cross edges of polygon
            if(polygon.isClosed()){
                //todo: calculate height for polygon (now it's max height of line)
                if(height==0){
                    console.warn("The polygon has zero height, we cant add it to 3D view!");
                }else{
                    let vertices = polygon.getConsistentlyVertex();
                    let geometry = this.geometryBuilder.createThreeGeometry(vertices, height);
                    let mesh = new THREE.Mesh(geometry, this.material);
                    meshes.push(mesh);
                }
            }else{
                console.warn("The polygon isn't closed!");
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
    _createPolygonByGroup(group, elements){
        let polygon = new Polygon();
        for(let elementIndex of group.E){
            if(elements[elementIndex].type!='line') {
                console.warn("The geometry group has not line elements, the element will not include to result geometry!");
                continue;
            }
            polygon.addEdge(new Line(new Vertex3(elements[elementIndex].P[0].X,elements[elementIndex].P[0].Y),
                new Vertex3(elements[elementIndex].P[1].X,elements[elementIndex].P[1].Y)));
        }
        return polygon;
    }

}



export {PolygonMeshBuilder};