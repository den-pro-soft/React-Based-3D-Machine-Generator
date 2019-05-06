import ElementModificationCommand from "./ElementModificationCommand";
import Intersect from "../model/math/algorithms/intersects/Intersect";
import Line from "../model/math/Line";
import LineElement from "../model/elements/LineElement";


export default class MergeElementsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.name = 'MergeElementsCommand';

        this.newElements = [];

        this.selectOneElement=true;
    }

    /**
     * @inheritDoc
     * @return {boolean} - return true if the command replacing or adding any elements
     */
    isReplacedElements(){
        return this.newElements.length>0;
    }

    /**
     * The realisation of the  @see {@link isReplacedElements} method.
     * @return {Array.<GraphicElement>|null} - new elements or null
     * @protected
     */
    getReplaceElements(){
        return this.newElements;
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let points = [];
        for(let el of this.elements){
            points.push(...el.extremePoints);
        }

        let p1=points[0];
        let p2=points[0];
        let maxLength = new Line(p1,p2).length();
        for(let i=0; i<points.length-1; i++){
            for(let j=i+1; j<points.length; j++){
                let l = new Line(points[i], points[j]).length();
                    if(l>maxLength){
                        maxLength=l;
                        p1=points[i];
                        p2=points[j];
                    }
            }
        }
        for(let el of this.elements){
            this.document.removeElement(el);
        }
        let newline = new LineElement(p1,p2);
        newline.lineType=this.elements[0].lineType.copy();
        this.newElements.push(newline);
        this.document.addElement(newline);
        return true;
    }


}