import Exception from '../../Exception';
import Trigonometric from "../../model/math/Trigonometric";

export default class Matrix {

    /**
     * @param {Array.<Array>.<number>} array
     */
    constructor(array) {
        this._array = array;
    }

    get array(){
        return this._array;
    }

    /**
     * @param {Matrix} matrix
     * @returns {Matrix}
     */
    multiply(matrix) {
        let A = this._array;
        let B = matrix._array;

        var rowsA = A.length, colsA = A[0].length,
            rowsB = B.length, colsB = B[0].length,
            C = [];
        if (colsA != rowsB)
            throw new Exception('colsA != rowsB');
        for (let i = 0; i < rowsA; i++)
            C[i] = [];
        for (let k = 0; k < colsB; k++) {
            for (let i = 0; i < rowsA; i++) {
                C[i][k] = 0;
                for (let j = 0; j < rowsB; j++) {
                    C[i][k] += A[i][j] * B[j][k];
                }
            }
        }
        return new Matrix(C);
    }

     /**
     * @param {number} x
     * @param {number} y
     * @return {Matrix}
     * @protected
     */
    static createMoveMatrix(x,y){
        return new Matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,0,1]]);
    }

    /**
     * @param {number} grad -  -360...360
     */
    static createRotateMatrix(grad){
        grad = Trigonometric.gradToRad(grad);
        return new Matrix([
            [Math.cos(grad),-Math.sin(grad),0,0],
            [Math.sin(grad),Math.cos(grad),0,0],
            [0,0,1,0],
            [0,0,0,1]]);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {Matrix}
     * @protected
     */
    static createResizeMatrix(x,y){
        return new Matrix([[1+x,0,0,0],[0,1+y,0,0],[0,0,1,0],[0,0,0,1]])
    }
    
    static createMirrorMatrix(axis){
        if(axis==Trigonometric.axisX){
            return new Matrix([[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
        }else{
            return new Matrix([[1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]]);
        }
    }
}