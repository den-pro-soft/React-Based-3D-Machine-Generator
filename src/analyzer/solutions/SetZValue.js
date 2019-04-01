
import Solution from './../Solution';

import ChangeElementsHeightCommand from '../../command/ChangeElementsHeightCommand';

export default class SetZValue extends Solution{

    /**
     * @param {Document} document
     * @param {Array.<GraphicElement>} elements
     * @param {number} height - in mm
     */
    constructor(document, elements, height){
        super(document);
        this.elements = elements;
        this.previewDoc=null;

        let dimension = 'mm';
        this.height=height;

        if(container.resolve('config').dimension != 'Millimeters'){
            dimension="''";
            height/=25.4;
        }
        this.name="Set Z to "+height.toFixed(3)+' '+dimension;
    }

    /**
     * @inheritDoc
     */
    execute(){
        app.executeCommand(new ChangeElementsHeightCommand(this.document, this.elements, this.height));
    }

    /**
     * @inheritDoc
     * @return {Document}
     */
    getPreviewDocument(){
        return this.previewDoc;
    }

}
