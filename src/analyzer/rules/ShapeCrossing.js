import Rule from "../Rule";
import ShapeBuilder from "../ShapeBuilder";
import NoChangesSolution from "../solutions/NoChanges";

export default class ShapeCrossing extends Rule{

    /**
     * @param {Document} document
     */
    constructor(document){
        super(document);

        /** @type {string} */
        this.errorMessage = "ERROR: The highlighted shapes are intersecting - please separate them manually.";
    }

    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        let shapes = this.getCrossingShapes(this.document);
        return shapes.length>0;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();

        res[0].previewDocument = this.document.getSnapshot();

        let shapes = this.getCrossingShapes(res[0].previewDocument);

        for(let shape of shapes){
            for(let docel of res[0].previewDocument.getListSimpleElements()){
                for(let shapeel of shape.elements){
                    if(docel.compare(shapeel)){
                        docel._renderer.error=true;
                    }
                }
            }
        }

        return res;
    }


    getCrossingShapes(doc){
        let shapeBuilder = new ShapeBuilder(doc);
        let shapes = shapeBuilder.buildShapes();

        /** @type {Array.<{shape:Shape, polyLine:PolyLine}>} */
        let polygones = shapes.map(shape=>{return {shape:shape, polyLine:shape.toPolyLine()}});

        for(let i=0; i<polygones.length-1; i++){
            for(let j=i+1; j<polygones.length; j++){
                if(i==j){
                    continue;
                }
                if(polygones[i].polyLine.getCrossPoints(polygones[j].polyLine).length>0){
                    return [polygones[i].shape, polygones[j].shape];
                }
            }
        }
        return [];
    }
}