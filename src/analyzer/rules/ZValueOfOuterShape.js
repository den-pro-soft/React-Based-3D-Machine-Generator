import Rule from "../Rule";
import NoChangesSolution from "../solutions/NoChanges";
import ShapeBuilder from "../ShapeBuilder";

export default class ZValueOfOuterShape extends Rule{

    constructor(document){
        super(document);

        /** @type {string} */
        this.errorMessage = "ERROR: The highlighted outermost line(s) must have a positive Z value.";
    }

    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        let shapeBuilder = new ShapeBuilder(this.document);
        let shapes = shapeBuilder.buildShapes();

        /** @type {{shape:Shape, polyLine:PolyLine}} */
        let polygones = shapes.map(shape=>{return {shape:shape, polyLine:shape.toPolyLine()}});

        return false;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        return [
            new NoChangesSolution(this.document)
        ];
    }

}