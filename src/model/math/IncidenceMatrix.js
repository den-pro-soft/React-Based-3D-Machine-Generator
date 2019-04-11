/**
 * Created by dev on 27.03.19.
 */

import Matrix from './Matrix';

/**
 * Incidence matrix - is math view of a graph.
 * The class need for executing operation with incidence matrix.
 */
export default class IncidenceMatrix extends Matrix{

    /**
     * @param {Array.<Array.<number>>} array
     */
    constructor(array){
        super(array);
    }

    /**
     * @see https://en.wikipedia.org/wiki/Component_(graph_theory)
     * @return {Array.<Array<number>>} - the list of connecting components
     */
    getConnectedComponents(){
        let listOfVertex = new Array(this.array.length);
        for(let i=0; i<this.array.length; i++){
            listOfVertex[i]=false;
        }

        let falseIndex = 0;

        let res = [];
        do{
            res.push(this.buildComponent(listOfVertex, falseIndex));
            falseIndex = this.getFalseIndex(listOfVertex);
        }while (falseIndex!=-1);

        return res;
    }

    getFalseIndex(array){
        for(let i=0; i<array.length; i++){
            if(array[i]==false){
                return i;
            }
        }
        return -1;
    }


    buildComponent(visitedVertex, currentVertexIndex){
        let res = [];
        visitedVertex[currentVertexIndex]=true;
        for(let i=0; i<this.array.length; i++){
            if(this.array[currentVertexIndex][i] && !visitedVertex[i]){
                res.push(...this.buildComponent(visitedVertex, i));
            }
        }
        res.push(currentVertexIndex);
        return res;

    }


    toString(){
        let temp = "";
        for(let i=0; i<this.array.length; i++){
            for(let j=0; j<this.array[i].length; j++){
                temp +=this.array[i][j]?"1  ":"0  ";
            }
            temp+='\n';
        }
        return temp;
    }
}