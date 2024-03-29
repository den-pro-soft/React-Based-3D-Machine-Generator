/**
 * Created by dev on 07.02.19.
 */

import LineTool from './LineTool';

import CommentToSelf from '../../../../model/line_types/CommentToSelf';
import Comment from "../../../../model/line_types/Comment";

export default class RulerTool extends LineTool{
    constructor(document){
        super(document);
    }
    createElement(point){
        let line = super.createElement(point);
        line.lineType = new CommentToSelf();
        line.lineType.type=Comment.TYPE_DIMENSION;
        return line;
    }
}