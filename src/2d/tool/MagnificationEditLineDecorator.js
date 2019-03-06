/**
 * Created by dev on 05.03.19.
 */

import MagnificationToolDecorator from './MagnificationToolDecorator';

export default class MagnificationEditLineDecorator extends MagnificationToolDecorator{
    /**
     * @param document
     * @param {CreatorTool} creatorTool
     */
    constructor(document, creatorTool){
        super(document, creatorTool);
    }

    render(){
        if(this.tool.edited){
            return super.render();
        }
        return this._tool.render();
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