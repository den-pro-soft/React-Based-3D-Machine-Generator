/**
 * Created by dev on 07.02.19.
 */

import LineTool from './LineTool';

import CommentToSelf from './../../model/line_types/CommentToSelf';

export default class RulerTool extends LineTool{
    constructor(document){
        super(document);
    }
    createElement(point){
        let line = super.createElement(point);
        line.lineType = new CommentToSelf();
        return line;
    }
}