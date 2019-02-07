/**
 * Created by dev on 07.02.19.
 */

import LineType from './LineType';

export default class CommentToSelf extends LineType{
    constructor(){
        super();
        this.name='CommentToSelf';
    }

    copy(){
        return new CommentToSelf();
    }
}