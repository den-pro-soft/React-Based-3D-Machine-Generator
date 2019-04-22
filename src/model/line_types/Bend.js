/**
 * Created by dev on 22.02.19.
 */

import ProcessingLineType from './ProcessingLineType';
import BendProcessing from "./processings/Bend";

export default class Bend extends ProcessingLineType{
    constructor(){
        super();
        this.name='Bend';
        this.label = "Bend";
        this.id=53;
        this.processing.push(new BendProcessing());

        this.helpURL="https://www.emachineshop.com/help-bend-drawing/";
    }

    /**
     * @inheritDoc
     * @return {Bend}
     */
    copy(){
        let res = new Bend();
        return res;
    }

    /**
     * @inheritDoc
     * @return {Array.<{propName: value}>}
     */
    getLineStyle(){
        let res = super.getLineStyle();
        res['strokeStyle']='#5cd610';
        res['fillStyle']='#5cd610';
        return res;
    }
}