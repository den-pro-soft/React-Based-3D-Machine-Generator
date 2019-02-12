/**
 * Created by dev on 12.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Document from './../../model/Document';

export default class IntersectElementsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.name = 'IntersectElementsCommand';

        this.newElements = [];
    }

    /**
     * @inheritDoc
     * @return {boolean} - return true if the command replacing or adding any elements
     */
    isReplacedElements(){
        return true;
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
        let intersectElements = Document.toSimpleListElements(this.elements);

        for(let el of intersectElements){
            let points = this._getIntersectPoints(el);
            let newElements = el.intersectByPoints(points);
            for(let newElement of newElements){
                this.newElements.push(newElement);
                this._document.addElement(newElement);
            }
            this._document.removeElement(el);
        }
        return true;
    }

    /**
     * @param {GraphicElement} element
     * @private
     */
    _getIntersectPoints(element){
        //todo: can have the errors in polygon discretization

        let elPolyLine = element.toPolyLines()[0];
        let simpleElements = this._document.getListSimpleElements();

        let res = [];

        for(let el of simpleElements){
            if(!el.compare(element)){
                let polyLine = el.toPolyLines()[0];
                res.push(...elPolyLine.getCrossPoints(polyLine));
            }
        }
        return res;
    }
}


















