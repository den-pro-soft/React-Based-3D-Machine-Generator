import Solution from './../Solution';
import DeleteElementCommand from "../../command/DeleteElementCommand";
import AddElementCommand from "../../command/AddElementCommand";


export default class AddConnectLine extends Solution{

    /**
     * @param {Document} document
     * @param {GraphicElement} element
     */
    constructor(document, element){
        super(document);
        this.name = "Add connector";

        this.element = element;

        this.previewDoc = document.getSnapshot();
        let previeElement = element.copy();
        previeElement._renderer.error=true;
        this.previewDoc.addElement(previeElement);

    }

    /**
     * @inheritDoc
     */
    execute(){
        app.executeCommand(new AddElementCommand(this.document, this.element));
    }

    /**
     * @inheritDoc
     * @return {Document}
     */
    getPreviewDocument(){
        return this.previewDoc;
    }

}