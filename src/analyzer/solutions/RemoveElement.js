/**
 * Created by dev on 22.03.19.
 */

import Solution from './../Solution';

import DeleteElementCommand from '../../command/DeleteElementCommand';

export default class RemoveElement extends Solution{

    /**
     * @param {Document} document
     * @param {GraphicElement} element
     * @param {Document} previewDoc
     */
    constructor(document, element, previewDoc){
        super(document);
        this.element = element;
        this.previewDoc=previewDoc;
    }

    /**
     * @inheritDoc
     */
    execute(){
        app.executeCommand(new DeleteElementCommand(this.document, [this.element]));
    }

    /**
     * @inheritDoc
     * @return {Document}
     */
    getPreviewDocument(){
        return this.previewDoc;
    }

}
