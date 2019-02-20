/**
 * Created by dev on 07.02.19.
 */

import LineType from './LineType';

export default class CommentToSelf extends LineType{
    constructor(){
        super();
        this.name='Comment';
        this.label = "Comment to Self";
        this.id=14;

        this.dimension = false;
    }

    /**
     * @inheritDoc
     * @return {CommentToSelf}
     */
    copy(){
        let res = new CommentToSelf();
        res.dimension = this.dimension;
        return res;
    }

    /**
     * @inheritDoc
     * @return {Array.<{propName: value}>}
     */
    getLineStyle(){
        let res = super.getLineStyle();
        res['strokeStyle']='#3f62f3';
        res['fillStyle']='#3f62f3';
        return res;
    }
}