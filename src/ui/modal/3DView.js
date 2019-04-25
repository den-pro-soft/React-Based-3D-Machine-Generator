import {DraggablePopup} from "../popup";

import View3D from './../3Dview';

export default class ThreeDView{
    constructor(board, app){
        this.popup3DView = new DraggablePopup()
            .setSize(800, 600)
            .setPosition(200, 100)
            .moveToCenter()
            .setTitle("3D view")
            .hide();


        this.view3D = new View3D({ width: 800, height: 600 });
        this.popup3DView.addContent(this.view3D.getContent());

        this.board =board;
        this.app=app;
    }

    show3D() {
        this.app.clearSelectElements();
        if(this.board.tool && this.board.tool['clearSelectElements']!=undefined) {
            this.board.tool.clearSelectElements();
        }
        container.resolve('analyzer', this.app.currentDocument).analyze().then((res)=>{
            if(res){
                try {
                    this.view3D.setGeometry(app.currentDocument);
                    this.popup3DView.show();
                } catch (e) {
                    if (e instanceof Exception) {
                        console.log(e.message);
                        new MessagePopup(null, e.message)
                            .setTitle("Error")
                            .moveToCenter()
                            .show();
                    } else {
                        throw e;
                    }
                }
            }
        });
    }
}