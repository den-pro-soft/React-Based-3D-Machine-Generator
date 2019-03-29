/**
 * Created by dev on 22.03.19.
 */

import Solution from './../Solution';

import DeleteElementCommand from '../../command/DeleteElementCommand';

export default class RemoveElement extends Solution{

    /**
     * @param {Document} document
     * @param {Array.<GraphicElement>} elements
     * @param {Document} previewDoc
     */
    constructor(document, elements, previewDoc){
        super(document);
        this.elements = elements;
        this.previewDoc=previewDoc;

        this.name="Remove";
    }

    /**
     * @inheritDoc
     */
    execute(){
        app.executeCommand(new DeleteElementCommand(this.document, this.elements));
    }

    /**
     * @inheritDoc
     * @return {Document}
     */
    getPreviewDocument(){
        return this.previewDoc;
    }

}
