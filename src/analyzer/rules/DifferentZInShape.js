
import ShapeBuilder from "../ShapeBuilder";
import Rule from "../Rule";
import SetZValue from "../solutions/SetZValue";


export default class DifferentZInShape extends Rule{

    constructor(document){
        super(document);

        this.errorMessage = `Error: The selected lines have multiple Z values.`;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();
        res[0].previewDocument = this.document.getSnapshot();
        let shape = this.getIncorrectZValueShape(res[0].previewDocument);

        for(let el of shape.elements){
            el._renderer.error=true;
        }

        let realShape = this.getIncorrectZValueShape(this.document);

        let Z=this.getDafaultZ(realShape.elements);

        let solution = new SetZValue(this.document, realShape.elements, Z);
        solution.previewDoc=res[0].previewDocument;

        res.push(solution);
        return res;
    }


    /**
     * @param {Array.<GraphicElement>} elements
     * @return number
     */
    getDafaultZ(elements){
        let minIndex = 0;

        let values = app.config.defaultZValues;
        let average = 0;
        for(let el of elements){
            average+=el.height;
        }
        average/=elements.length;

        for(let i=0; i<values.length; i++){
            if(Math.abs(average-values[i])< Math.abs(average-values[minIndex])){
                minIndex=i;
            }
        }

        return values[minIndex];
    }

    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        let shape = this.getIncorrectZValueShape(this.document);
        if(shape){
            return true;
        }
        return false;
    }


    getIncorrectZValueShape(doc){
        let shapeBuilder = new ShapeBuilder(doc);

        let shapes = shapeBuilder.buildShapes();

        for(let shape of shapes){
            try{
                shape.height
            }catch (e) {
                return shape;
            }
        }
        return null;
    }

}

