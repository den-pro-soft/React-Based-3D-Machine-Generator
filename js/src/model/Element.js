/**
 * Created by dev on 04.01.19.
 */
import Render from '../2d/renderer/Render'

export default class Element{
    constructor(){
        this._constrolPoints = [];
        this._points = [];

        /** @var {Render} */
        this._renderer = null; //todo: transfer the creation of a new sample from Element classes to a IOC container
    }

    render(){
        this._renderer.drawElement();
    }
}