/**
 * Created by dev on 07.02.19.
 */

import Comment from './Comment';

export default class CommentToSelf extends Comment{
    constructor(){
        super();
        this.label = "Comment to Self";
        this.id=14;

        this.helpURL="https://www.emachineshop.com/help-2d-advanced/#comments-to-myself";
    }

    /**
     * @inheritDoc
     * @return {CommentToSelf}
     */
    copy(){
        let res = new CommentToSelf();
        res.type=this.type;
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