/**
 * Created by dev on 26.02.19.
 */

import {Container} from 'addict-ioc';

import Exception from './Exception';
import Config from './Config';
import {InteractiveBoard} from './ui/2d/Board';
import IdGenerator from './model/IdGenerator';
import ConfirmChangeArcToSplinesDialog from './ModalWindows';
import Application from "./Application";
import LineTool from "./ui/2d/tool/creator/LineTool";
import RectTool from "./ui/2d/tool/creator/RectTool";
import CircleTool from "./ui/2d/tool/creator/CircleTool";
import SplineTool from "./ui/2d/tool/creator/SplineTool";
import ZoomTool from "./ui/2d/tool/ZoomTool";
import EraserTool from "./ui/2d/tool/EraserTool";
import FreehandTool from "./ui/2d/tool/creator/FreehandTool";
import RulerTool from "./ui/2d/tool/creator/RulerTool";
import TextTool from "./ui/2d/tool/creator/TextTool";
import EditLineTool from "./ui/2d/tool/EditLineTool";
import PointerTool from "./ui/2d/tool/PointerTool";
import PngFileLoader from "./file/PngFileLoader";
import XmlFileLoader from "./file/XmlFileLoader";
import FormatNotSupportedException from "./file/FormatNotSupportedException";

import ErrorModelAnalyzer from './analyzer/analyzers/ErrorModelAnalyzer';

import ExpertNoticeUi from './ui/modal/ExpertNotice';
import UniversalTriangulationAlgorithm from "./ui/3d/algorithms/implementation/UniversalTriangulationAlgorithm";
import Confirmation from "./ui/modal/Confirmation";
import Tips from "./ui/React/Tips";
import LocalStorageBuffer from "./Buffer/LocalStorageBuffer";
import ThreeDView from "./ui/modal/3DView";

/**
 * @param {string} name
 * @param {Document} doc
 */
const toolFactoryMethod = (name, doc)=>{
    switch(name) {
        case 'Line':
            return new LineTool(doc);
        case 'Rectangle':
            return new RectTool(doc);
        case 'Circle':
            return new CircleTool(doc);
        case 'Spline':
            return new SplineTool(doc);
        case 'Zoom':
            return new ZoomTool(doc);
        case 'Eraser':
            return new EraserTool(doc);
        case 'Freehand':
            return new FreehandTool(doc);
        case 'Ruler':
            return new RulerTool(doc);
        case 'Text':
            return new TextTool(doc);
        case 'EditLine':
            return new EditLineTool(doc);
        default:
            return new PointerTool(doc);
    }
};

/**
 * @param {string} formatName - without point
 * @return {FileLoader}
 * @throws FormatNotSupportedException
 */
const fileLoaderFactoryMethod = (formatName)=>{
    let fileLoader;
    switch (formatName){
        case 'png':
            fileLoader = new PngFileLoader();
            break;
        case 'xml':
        case 'emsx':
            fileLoader = new XmlFileLoader();
            break;
        default:
            throw new FormatNotSupportedException('The format not supported!', formatName);
    }
    return fileLoader;
};

/**
 * For using container.resolve('token');
 */
const container = new Container();


container.register( 'config', Config ).singleton();
container.register( 'mainBoard', InteractiveBoard ).singleton();
container.register( 'elementIdGenerator', IdGenerator ).singleton();
container.register( 'commandIdGenerator', IdGenerator ).singleton();
container.register( 'confirmChangeArcToSplinesDialog', ConfirmChangeArcToSplinesDialog ).singleton();
container.register( 'app', Application ).dependencies('config').singleton();
container.register( 'buffer', LocalStorageBuffer ).dependencies('app').singleton();
container.register( 'triangulation', UniversalTriangulationAlgorithm ).singleton();
container.register( '3dView', ThreeDView ).dependencies('mainBoard', 'app').singleton();
container.register( 'tips', Tips ).singleton();
container.registerFactory('toolFactory',toolFactoryMethod);
container.registerFactory('fileLoaderFactory',fileLoaderFactoryMethod);

container.register( 'expertNotice', ExpertNoticeUi);
container.register( 'confirm', Confirmation);
container.register('analyzer',ErrorModelAnalyzer);

container.validateDependencies();
global.container = container;
global.app = container.resolve('app');


global.Exception = Exception;
