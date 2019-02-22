/**
 * Created by dev on 22.02.19.
 */

import LineType from './LineType';

export default class Bend extends LineType{
    constructor(){
        super();
        this.name='Bend';
        this.label = "Bend";
        this.id=53;
        //todo: change to processing
    }

    /**
     * @inheritDoc
     * @return {Bend}
     */
    copy(){
        let res = new Bend();
        res.dimension = this.dimension;
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