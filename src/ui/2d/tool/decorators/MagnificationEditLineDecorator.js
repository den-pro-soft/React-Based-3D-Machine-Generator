/**
 * Created by dev on 05.03.19.
 */

import MagnificationCreatorToolDecorator from './MagnificationCreatorToolDecorator';

export default class MagnificationEditLineDecorator extends MagnificationCreatorToolDecorator{
    /**
     * @param document
     * @param {CreatorTool} tool
     */
    constructor(document, tool){
        super(document, tool);
    }

    render(){
        if(this.tool.edited){
            return super.render();
        }
        return this.tool.render();
    }

    getPointsList(){
        return app.currentDocument._elements.reduce((res,el)=> {
            for(let selectElement of app.selectElements){
                if(selectElement.compare(el)){
                    return res;
                }
            }
            return [...res, ...el.getMagnificationPoints()];
        },[]);
    }

}