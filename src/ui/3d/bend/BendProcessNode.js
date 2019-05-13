import * as THREE from "three";
import Trigonometric from "../../../model/math/Trigonometric";
var ThreeBSP = require('three-js-csg')(THREE);
/**
 * the class need for saving the bends sequence
 */
export default class BendProcessNode{

    /**
     *
     * @param geometry
     * @param height
     * @param bends
     * @return {BendProcessNode}
     */
    static buildTree(geometry, height, bends){
        let res = new BendProcessNode(geometry, height);

        bends = bends.sort((a,b)=>{
            let ca = a.getCenter();
            let cb = b.getCenter();

            if(ca.y+ca.x>cb.y+cb.x){
                return 1;
            }else{
                if(ca.y+ca.y==cb.y+cb.y){
                    return 0;
                }else{
                    return -1
                }
            }
        });


        for(let bend of bends){
            res.addBend(bend);
        }
        return res;
    }


    /**
     * @param {THREE.Geometry} geometry
     * @param {number} height
     */
    constructor(geometry, height){

        this.height = height;

        this.geometry = geometry;

        /**@type {LineElement} */
        this.bendLine = null;

        /** @type {BendProcessNode} */
        this.left = null;

        /** @type {BendProcessNode} */
        this.right = null;

        this._insideRadius=0;

        this.bendSectoinGeometry = null;
    }

    set insideRadius(angle){
        this._insideRadius=angle;
        if(!this.geometry){
            this.left.insideRadius=angle;
            this.right.insideRadius=angle;
        }
    }


    addAirInside(geometry){
        if(this.geometry){
            this.geometry = new ThreeBSP(this.geometry).subtract(new ThreeBSP(geometry)).toGeometry();
        }else{
            this.bendSectoinGeometry = new ThreeBSP(this.bendSectoinGeometry).subtract(new ThreeBSP(geometry)).toGeometry();
            this.left.addAirInside(geometry);
            this.right.addAirInside(geometry);
        }
    }


    generateBendSections(){
        if(!this.geometry) {
            var geometry = new THREE.CylinderGeometry(this._insideRadius + this.height, this._insideRadius + this.height,
                this.bendLine.length(), 36, 1, false);
            this.bendSectoinGeometry = geometry;

            let center = this.bendLine.getCenter();
            geometry.rotateZ(Trigonometric.gradToRad(this.bendLine.angle-90));
            geometry.translate(center.x-this.height/2, center.y+1, this._insideRadius+this.height);

            this.left.generateBendSections();
            this.right.generateBendSections();
        }
    }

    /**
     * The method used for building the three of bends
     * @param {LineElement} bend
     * @return {boolean} - true if the bend added
     * @private
     */
    addBend(bend){
        if(this.geometry){
            let shape = this.geometry;

            let cutGeometry1 = this._createCutCubeGeometry(bend.angle + 180, bend.getCenter());
            let cutGeometry2 = this._createCutCubeGeometry(bend.angle, bend.getCenter());

            let res1 = new ThreeBSP(shape).subtract(new ThreeBSP(cutGeometry1)).toGeometry();

            let res2 = new ThreeBSP(shape).subtract(new ThreeBSP(cutGeometry2)).toGeometry();

            if(res1.vertices.length!=0 && res2.vertices.length!=0){
                this.left = new BendProcessNode(res1, this.height);
                this.right = new BendProcessNode(res2, this.height);
                this.bendLine = bend;
                this.geometry = null;
                return true;
            }
        }else{
            let res = this.left.addBend(bend);
            if(!res) {
                res = this.right.addBend(bend);
            }else{
                let temp = this.left;
                this.left=this.right;
                this.right=temp;
            }
            return res;
        }
        return false;
    }

    /**
     * The method build the geometry with bends
     * @return {Geometry} - the geometry after rotate part of bends
     * @public
     */
    getGeometry(){
        let res = null;
        if(this.geometry){
            res = this.geometry;
        }else{
            let left = this.left.getGeometry();
            let right = this.right.getGeometry();

            let center = this.bendLine.getCenter();
            right.translate(-center.x, -center.y, 0);
            right.rotateZ(-Trigonometric.gradToRad(this.bendLine.angle));
            right.rotateX(Trigonometric.gradToRad(this.bendLine.lineType.processing[0].angle));
            right.rotateZ(Trigonometric.gradToRad(this.bendLine.angle));
            right.translate(center.x, center.y, 0);

            res = new ThreeBSP(left);
            res = res.union(new ThreeBSP(right));
            // res = res.union(new ThreeBSP(this.bendSectoinGeometry));
            res = res.toGeometry();
        }
        return res;
    }

    /**
     * @param {LineElement} bend
     * @return {Mesh}
     * @private
     */
    _createCutCubeGeometry(angle, center){
        let cubesize = 1000;

        let geometry = new THREE.BoxGeometry( cubesize, cubesize, cubesize );
        geometry.rotateZ(Trigonometric.gradToRad(angle));

        geometry.translate(center.x+(cubesize/2)*Math.sin(Trigonometric.gradToRad(angle)), center.y-(cubesize/2)*Math.cos(Trigonometric.gradToRad(angle)), 0);

        return geometry;
    }

}