/**
 * Created by dev on 12.02.19.
 */
import Trigonometric from './Trigonometric'
import Matrix from './Matrix';

export default class Vector{
    constructor(x=0, y=0, z=0){
        this.x = x;
        this.y = y;
        this.z = z;

    }

    length(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    }

    scalar(vector){
        return this.x*vector.x+this.y*vector.y+ this.z*vector.z;
    }

    /**
     * @param {Vector} vector
     * @return {number} - angle between current line and line in parameter
     */
    getAngle(vector){
        let rad = Math.acos(this.scalar(vector)/(this.length()*vector.length()));
        let grad = 0;
        if(this._prd_vect(vector)<0){
            grad = Trigonometric.radToGrad(rad);
        }else{
            grad = 360-Trigonometric.radToGrad(rad);
        }
        if(isNaN(grad)){
            if(this.x/vector.x>0 || this.y/vector.y>0 || this.z/vector.z>0) {
                return 0;
            }else{
                return 180;
            }
        }
        if(grad==0){
            return 0;
        }
        return 360 - grad;
    }

    _prd_vect(v){
        return this.x*v.y - this.y*v.x;
    }


    /**
     * Convert the vector to matrix
     * @return {Matrix}
     */
    toMatrixRow(){
        return new Matrix([[this.x, this.y, this.z]]);
    }

    /**
     * Convert the vector to matrix
     * @return {Matrix}
     */
    toMatrixColumn(){
        return new Matrix([[this.x], [this.y], [this.z]]);
    }
}