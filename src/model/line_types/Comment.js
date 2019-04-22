/**
 * Created by dev on 07.02.19.
 */

import LineType from './LineType';

/**
 * @abstract
 */
export default class Comment extends LineType{

    static TYPE_SOLID = "solid";
    static TYPE_DASHES = "dashes";
    static TYPE_FONT = "font";
    static TYPE_ARROW = "arrow";
    static TYPE_DIMENSION = "dimension";

    constructor(){
        super();

        this.type = Comment.TYPE_SOLID;
    }


    /**
     * @inheritDoc
     * @return {Array.<{propName: value}>}
     */
    getLineStyle(){
        let res = super.getLineStyle();

        if(this.type==Comment.TYPE_DASHES){
            res['dash']=[6,4];
        }
        return res;
    }


}