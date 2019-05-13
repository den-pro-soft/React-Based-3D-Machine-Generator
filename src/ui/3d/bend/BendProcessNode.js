/**
 * the class need for saving the bends sequence
 */
export default class BendProcessNode{

    /**
     *
     * @param {THREE.Geometry} geometry1
     * @param {THREE.Geometry} geometry2
     * @param {LineElement} bend
     * @param {number} height
     */
    constructor(geometry1, geometry2, bend, height){

        this.left = null;
        this.right = null;
    }



}