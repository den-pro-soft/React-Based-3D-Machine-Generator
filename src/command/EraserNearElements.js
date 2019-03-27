/**
 * Created by dev on 26.03.19.
 */


import ElementModificationCommand from './ElementModificationCommand';
import Document from '../model/Document';
import LineElement from '../model/elements/LineElement';
import Arc from '../model/elements/Arc';
import Group from '../model/elements/Group';
import Point from '../model/Point';
import Shape from './../model/elements/Shape';
import ShapeBuilder from './../analyzer/ShapeBuilder';

export default class EraserNearElements extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Point} point
     * @param {number} eps - the parameter need for not exact calculation
     */
    constructor(document, point, eps){
        super(document, []);

        /** @type {string} */
        this.name = 'EraserNearElements';

        /** @type {Point} */
        this.point=point;

        /** @type {Array.<GraphicElement>} */
        this.newElements = [];

        /** @type {number} */
        this.eps = eps;

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
        let elements = this.document.getListSimpleElements();
        for(let el of elements){
            if(el.isNear(this.point, this.eps)) {
                this.removeLikeShape(el);
                return true;
            }
        }
        return false;
    }

    /**
     * @param {GraphicElement} element
     */
    removeLikeShape(element){
        let shape = this._buildShape(element);
        for(let el of shape.elements){
            let group = this.getGroupByElement(el);
            if(group){
                this.document.removeElement(group);
            }else{
                this.document.removeElement(el);
            }
        }


    }

    getGroupByElement(element){
        for(let el of this.document._elements){
            if(el instanceof Group){
                let simpleElements = el.toSimpleElements();
                for(let groupElement of simpleElements){
                    if(groupElement.compare(element)){
                        return el;
                    }
                }
            }
        }
        return null;
    }

    /**
     * @param {GraphicElement} element
     * @return {Shape| null} - null if the element isn't part opf shape
     * @private
     */
    _buildShape(element){
        let builder = new ShapeBuilder(this.document);
        let shapes = builder.buildShapes();
        for(let shape of shapes){
            if(shape.isHas(element)){
                return shape;
            }
        }
    }

}