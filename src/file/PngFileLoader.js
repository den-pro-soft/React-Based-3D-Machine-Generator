/**
 * Created by dev on 13.02.19.
 */

import FileLoader from './FileLoader';


export default class PngFileLoader extends FileLoader{
    constructor(){
        super();
        this.fileSuffix = '.png';
    }

    /**
     *@inheritDoc
     */
    getBlobData(document){
        return new Promise((resolve, reject)=>{
            app.board.zoomToFitScreen();
            app.board._canvas.toBlob(function(blob) {
                resolve(blob);
            });
        });
    }
}