/**
 * Created by dev on 21.12.18.
 */
import TriangulationAlgorithm from '../TriangulationAlgorithm'
import Line from '../../model/Line';
import Triangle from './../../../../model/math/Triangle';

class ListNode {
    constructor(data, left, right) {
        this.left = left;
        this.right = right;
        this.data = data;
    }
}

class DoubleList {
    constructor() {
        this.head = null;
        this.tail = null;

        this._size = 0;
    }

    addToEnd(data) {
        this._size++;
        let newNode = new ListNode(data);
        if (this.tail) {
            this.tail.right = newNode;
            newNode.left = this.tail;
            this.tail = newNode;
            newNode.right=this.head;
            this.head.left=this.tail;
        } else {
            this.head = newNode;
            this.tail = newNode;
            this.head.right = this.head;
            this.head.left = this.head;
        }
    }

    getNodeByData(data) {
        return this._getNodeByData(this.head, data);
    }

    size() {
        return this._size;
    }

    _getNodeByData(node, data) {
        if (!node) {
            return null;
        }
        if (node.data.compare(data)) {
            return node;
        }
        if(node==this.tail){
            return null;
        }

        return this._getNodeByData(node.right, data);
    }

    removeNodeByData(data) {
        return this._removeNodeByData(this.head, data);
    }

    _removeNodeByData(node, data) {
        if (!node) {
            return false;
        }
        if (node.data.compare(data)) {
            if (node == this.head) {
                if (node == this.tail) {
                    this.head = null;
                    this.tail = null;
                } else {
                    let temp = this.head;
                    this.head = temp.right;
                    this.head.left=temp.left;
                    this.tail.right=this.head;
                }
            } else {
                if (node == this.tail) {
                    this.tail = node.left;
                    this.tail.right = this.head;
                    this.head.left=this.tail;
                } else {
                    node.left.right = node.right;
                    node.right.left = node.left;
                }
            }
            this._size--;
            return true;
        }
        return this._removeNodeByData(node.right, data);
    }



    separateByNodes(node1, node2) {
        return {
            sublist1:this._createNewList(new DoubleList(),node1,node2),
            sublist2:this._createNewList(new DoubleList(),node2,node1)
        };
    }

    _createNewList(list, from,to){
        list.addToEnd(from.data);
        if(from==to){
            return list;
        }
        return this._createNewList(list,from.left, to);
    }

    getDataList(){
        return this._getDataList(this.head);
    }
    _getDataList(node){
        if(!node){
            return [];
        }
        if(node == this.tail){
            return [node.data];
        }
        return [node.data, ...this._getDataList(node.right)];
    }
}

class Vertex {
    constructor(vertex3, index) {
        this.vertex3 = vertex3;
        this.index = index;
    }

    getData() {
        return this.vertex3;
    }

    compare(vertex) {
        return this.vertex3.compare(vertex.vertex3);
    }
}

export default class UniversalTriangulationAlgorithm extends TriangulationAlgorithm {
    _findExtremeVertexByAsix(vertices, asixName) {
        let max = [vertices[0]];

        for (let i = 1; i < vertices.length; i++) {
            if (vertices[i][asixName] > max[0][asixName]) {
                max = [vertices[i]];
            } else {
                if (vertices[i][asixName] == max[0][asixName]) {
                    max.push(vertices[i]);
                }
            }
        }
        return max;
    }

    _getExtremeVertex(vertices) {
        let max = this._findExtremeVertexByAsix(vertices, 'x');
        if (max.length > 1) {
            max = this._findExtremeVertexByAsix(max, 'y');
            if (max.length > 1) {
                max = this._findExtremeVertexByAsix(max, 'z');
                if (max.length > 1) {
                    let template = max[0]
                    for(let vertex of max){
                        if(!vertex.compare(template)){
                            throw new Exception('Error find extreme vertex');
                        }
                    }
                }
            }
        }
        return max[0];
    }

    _getTriangles(res,list) { //todo: the method modify the list argument, but it mustn't do it
        let vertices = list.getDataList().map(e=>e.vertex3);
        let maxVertex = this._getExtremeVertex(vertices);
        let node = list.getNodeByData(new Vertex(maxVertex, 0));

        if (list.size() === 3) {
            res.push([node.data.index, node.left.data.index, node.right.data.index]);
            return res;
        }

        let v1 = node.data.vertex3;
        let v2 = node.left.data.vertex3;
        let v3 = node.right.data.vertex3;
        let triangle = new Triangle(v1, v2, v3);

        //check so the triangle doesn't cross another vertices
        let containsList = [];
        for (let i = 0; i < vertices.length; i++) {
            if (vertices[i].compare(v1) || vertices[i].compare(v2) || vertices[i].compare(v3)) {
                continue;
            }
            if (triangle.contains(vertices[i])) {
                containsList.push(vertices[i]);
            }
        };
        if (containsList.length > 0) {
            let minVertex = containsList[0];
            let minLenght = new Line(v3, containsList[0]).length();
            for(let i=1; i<containsList.length; i++){
                let tempLength = new Line(v1, containsList[i]).length();
                if(tempLength<minLenght){
                    minLenght=tempLength;
                    minVertex=containsList[i];
                }
            }
            let minNode = list.getNodeByData(new Vertex(minVertex, 0));
            let {sublist1, sublist2} = list.separateByNodes(node, minNode);
            this._getTriangles(res,sublist1);
            this._getTriangles(res,sublist2);
        } else {
            res.push([node.data.index, node.left.data.index, node.right.data.index]);
            if(!list.removeNodeByData(node.data)){
                throw new Exception("Can't delete node form list: "+JSON.stringify(node));
            }
            this._getTriangles(res,list);
        }
        return res;
    }
    /**
     * @inheritDoc
     */
    getTriangles(vertices) {
        if (vertices.length < 3) {
            throw new Exception('Too fwe vertices for triangulation!');
        }

        let list = new DoubleList();
        for (let i = 0; i < vertices.length; i++) {
            list.addToEnd(new Vertex(vertices[i], i));
        }

        let res = this._getTriangles([],list);
        return res;
    }
}