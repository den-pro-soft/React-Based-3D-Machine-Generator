/**
 * Created by dev on 22.02.19.
 */

import CommentToSelf from './CommentToSelf';

export default class CommentToMachine extends CommentToSelf{
    constructor(){
        super();
        this.label = "Comment to Machine";
    }

    /**
     * @inheritDoc
     * @return {CommentToSelf}
     */
    copy(){
        let res = new CommentToMachine();
        res.dimension = this.dimension;
        return res;
    }

    /**
     * @inheritDoc
     * @return {Array.<{propName: value}>}
     */
    getLineStyle(){
        let res = super.getLineStyle();
        res['strokeStyle']='#724040';
        res['fillStyle']='#724040';
        return res;
    }
}