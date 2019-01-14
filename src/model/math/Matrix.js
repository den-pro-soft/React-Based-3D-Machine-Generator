import Exception from '../../Exception';

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
}