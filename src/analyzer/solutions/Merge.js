import Solution from './../Solution';
import DeleteElementCommand from "../../command/DeleteElementCommand";
import AddElementCommand from "../../command/AddElementCommand";
import MergeElementsCommand from "../../command/MergeElementsCommand";


export default class Merge extends Solution{

    /**
     * @param {Document} document
     * @param {Array.<LineElement>} lines
     */
    constructor(document, lines){
        super(document);
        this.name = "To merge";

        this.lines = lines;



        this.previewDoc = document.getSnapshot();
        // let previeElement = element.copy();
        // previeElement._renderer.error=true;
        // this.previewDoc.addElement(previeElement);

    }

    /**
     * @inheritDoc
     */
    execute(){
        return new Promise((resolve, reject)=>{
            app.executeCommand(new MergeElementsCommand(this.document, this.lines)).then(res=>{
                resolve(res);
            }).catch(e=>{
                reject(e);
            });
        });
    }

    /**
     * @inheritDoc
     * @return {Document}
     */
    getPreviewDocument(){
        return this.previewDoc;
    }

}