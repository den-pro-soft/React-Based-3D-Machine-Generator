/**
 * Created by dev on 22.02.19.
 */

import CommentToSelf from './CommentToSelf';

export default class CommentToMachine extends CommentToSelf{
    constructor(){
        super();
        this.label = "Comment to Machinist";

        this.helpURL="https://www.emachineshop.com/help-comments/";

    }

    /**
     * @inheritDoc
     * @return {CommentToSelf}
     */
    copy(){
        let res = new CommentToMachine();
        res.type=this.type;
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