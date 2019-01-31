/**
 * Created by dev on 30.01.19.
 */

import Tool from './Tool';

export default class ZoomTool extends Tool{
    constructor(document){
        super(document);

        this.cursor.src = 'images/Zoom.png';
    }

    mouseClick(point, e){

    }

    mouseDown(point, e){

    }

    mouseDbClick(point, e){
        this.mouseUp(point, e);
        this.mouseUp(point, e);
    }

    mouseUp(point, e){
        let zoom = 1;
        console.log(e.button);
        if(e.button == 0) { //left
            zoom+=0.1;
        }else{
            zoom-=0.1;
        }
        app.board._zoomAroundPoint(zoom,app.board._convertToLocalCoordinateSystem(point));
    }

    render(){
        super.render();
    }
}