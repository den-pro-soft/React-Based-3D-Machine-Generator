/**
 * Created by dev on 13.02.19.
 */

import FileLoader from './FileLoader';
import InvalidDataFormatException from './InvalidDataFormatException';
import Sax from 'sax';
import Document from './../model/Document';
import Point from './../model/Point';
import LineElement from './../model/elements/LineElement';
import Arc from './../model/elements/Arc';
import Spline from './../model/elements/Spline';
import Text from './../model/elements/Text';


import AutoLineType from './../model/line_types/Auto';
import CommentToSelfLineType from './../model/line_types/CommentToSelf';
import GraphicElement from "../model/GraphicElement";
import Bend from "../model/line_types/Bend";
import BendProcessing from "../model/line_types/processings/Bend";
import ShapeBuilder from "../analyzer/ShapeBuilder";
import CommentsToMachinist from "./../model/line_types/CommentToMachine";
import Comment from "./../model/line_types/Comment";


export default class XmlFileLoader extends FileLoader{
    constructor(){
        super();
    }

    /**
     * @inheritDoc
     */
    initRead(reader, file){
        reader.readAsText(file);
    }

    /**
     * @inheritDoc
     * @param {string} data
     */
    validate(data){
        //todo: add xml validation

        

        // throw new InvalidDataFormatException('the data doend\'t corresponds to format.dtd structure.', data);
        return true;
    }


    /**
     * For parsing use @see{@link https://www.npmjs.com/package/sax}
     * @param {string} data
     * @return {Promise}
     */
    convertDataToDocument(data){
        return new Promise((resolve, reject)=>{
            let height=0;
            let lineType = null;
            let doc = new Document();

            let element= null;
            let newElement = false;
            let parser = Sax.parser(true);
            parser.onopentag = (tag)=> {
                newElement = false;
                switch (tag.name){
                    case 'Machine':
                        lineType = this._getLineTypeByTag(tag);
                        break;
                    case 'Region':
                        height = tag.attributes.Z;
                        break;
                    case 'Straight':
                        element = this._createLineElementByTag(tag);
                        newElement = true;
                        break;
                    case 'Circle':
                    case 'Arc':
                        element = this._createArcByTag(tag);
                        newElement = true;
                        break;
                    case 'Spline':
                        element = this._createSplineByTag(tag);
                        newElement = true;
                        break;
                    case 'Text':
                        element = this._createTextElementByTag(tag);
                        newElement = true;
                        break;
                    case 'Bend':
                        let line = this._createLineElementByTag(tag);
                        line.lineType=new Bend();
                        doc.addElement(line);
                        let processing = this._createBendProcessingByTag(tag);
                        line.lineType.processing = [processing];
                        break;
                }
                if(newElement){
                    element.lineType = lineType.copy();
                    if(height=='AirInside'){
                        element.height=GraphicElement.AirInside;
                    }else{
                        element.height=parseFloat(height);
                    }
                    doc.addElement(element);
                }
            };
            parser.ontext = function (t) {
                if(element && element.typeName=='Text' && element.text==null){
                    element.text=t;
                }
            };
            parser.onend = function () {
                resolve(doc);
            };

            parser.write(data).close();
        });
    }


    /**
     *@inheritDoc
     */
    getBlobData(document){
        return new Promise((resolve, reject)=>{
            let xml = this.convertInXML(document);
            if(xml) {
                resolve(new Blob([xml], {type: "text/plain;charset=utf-8"}));
            }else{
                reject('Can\'t convert to Xml!');
            }
        });
    }

    convertInXML(doc) {

        let figures = [];
        let shapes = new ShapeBuilder(doc).buildShapes();

        let savedElements = [];

        for(let shape of shapes){
            let height = 0;
            try {
                height = shape.height;
            }catch (e) {
                continue;
            }
            let region = `\n					<Region BaseHeight="0" Z="${height==GraphicElement.AirInside?'AirInside':height}" ThroughHole="">`;
            region+=`\n					    `+this._createMachineByLineType(shape.elements[0].lineType)+`\n`;
            if(shape.bends.length>0) {
                region+=`					    <Processing>\n`;
                for (let bend of shape.bends) {
                    region+=`					        ${this._convertElementToXml(bend)}\n`;
                    savedElements.push(bend);
                }
                region+=`					    </Processing>\n`;
            }
            region+=`						<Contour>\n`;
            for (let element of shape.elements) {
                savedElements.push(element);
                region+=`\t\t\t\t\t\t\t${this._convertElementToXml(element)} \n`
            }
            region+=`						</Contour>\n`;
            region+=`					</Region>`;
            figures.push(region);
        }

        let elements = doc.getListSimpleElements().filter(el=>{
            for(let done of savedElements){
                if(done.compare(el)){
                    return false;
                }
            }
            return true;
        });
        for(let i=0; i<elements.length; i++){

            figures.push(`					<Region BaseHeight="0" Z="${elements[i].height==GraphicElement.AirInside?'AirInside':elements[i].height}" ThroughHole="">
                        ${this._createMachineByLineType(elements[i].lineType)}
                        <Contour>
                            ${this._convertElementToXml(elements[i])}
                        </Contour>
                    </Region>`);
        }
        
        let regions = figures.join("\n") +'\n';

        return `<?xml version="1.0"?>
            <eMachineShop3DObjects VersionId="1.1">
                <View Type="Top">${regions}
                </View>
                <QuantityOfParts Value="10"/>
            </eMachineShop3DObjects>`;
      }

    _convertElementToXml(el){
        switch (el.typeName){
            case 'Line':
                if(el.lineType instanceof Bend){
                    return `<Bend P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}" Angle="${el.lineType.processing[0].angle}" Radius="${el.lineType.processing[0].radius}"/>`;
                }else {
                    return `<Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>`;
                }
            case 'Arc':
                if(el.startAngle==0 && el.endAngle==0) {
                    return `<Circle Center="${el._center.x},${el._center.y}" Radius="${el.radius}"/>`;
                }else {
                    return `<Arc Center="${el._center.x},${el._center.y}" Radius="${el.radius}" StartAngle="${el.startAngle}" IncAngle="${el.incrementAngle}"/>`;
                }
            case 'Spline':
                return `<Spline P1="${el._points[0].x},${el._points[0].y}" P2="${el._points[2].x},${el._points[2].y}" P3="${el._points[3].x},${el._points[3].y}" P4="${el._points[1].x},${el._points[1].y}"/>`;
            case 'Text':
                return `<Text Position="${el.position.x},${el.position.y}" Height="${el.fontSize}" FontName="" HFlip="0" VFlip="0" Angle="${el.angle}">${el.text}</Text>`;
        }
    }


    /**
     *
     * @param {LineElement} el
     * @return {string}
     * @private
     */
    _convertLineToBentProcessing(el){
        return `<Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}" Angle="${el.lineType.processing[0].angle}" Radius="${el.lineType.processing[0].radius}"/>`;
    }

    /**
     * @param {LineType} lineType
     * @return {string}
     * @private
     */
    _createMachineByLineType(lineType){
        if(lineType instanceof Comment){
            let CTM=0;
            if(lineType instanceof CommentsToMachinist){
                CTM=1;
            }
            return `<Machine Id="${lineType.id}" Name="${lineType.name}" CTM="${CTM}" LineType="${lineType.type}"/>`;
        }

        return `<Machine Id="${lineType.id}" Name="${lineType.name}"/>`;
    }


    _createLineElementByTag(tag){
        let _p1 = tag.attributes.P1.split(',');
        let _p2 = tag.attributes.P2.split(',');

        let p1 = new Point(parseFloat(_p1[0]),parseFloat(_p1[1]));
        let p2 = new Point(parseFloat(_p2[0]),parseFloat(_p2[1]));
        return new LineElement(p1,p2);
    }

    _createArcByTag(tag){
        let _center = tag.attributes.Center.split(',');
        let _radius = tag.attributes.Radius;
        let center = new Point(parseFloat(_center[0]),parseFloat(_center[1]));

        let element = new Arc(center,parseFloat(_radius));
        if(tag.name=='Arc') {
            let _startAngle = tag.attributes.StartAngle;
            let _incAngle = tag.attributes.IncAngle;
            element.startAngle = parseFloat(_startAngle);
            element.endAngle = (parseFloat(_startAngle) + parseFloat(_incAngle)) % 360;
        }
        return element;
    }

    _createSplineByTag(tag) {
        let _start = tag.attributes.P1.split(',');
        let _end = tag.attributes.P4.split(',');
        let _cp1 = tag.attributes.P2.split(',');
        let _cp2 = tag.attributes.P3.split(',');

        let start = new Point(parseFloat(_start[0]),parseFloat(_start[1]));
        let end = new Point(parseFloat(_end[0]),parseFloat(_end[1]));
        let element = new Spline(start, end);

        element.controlPoint1 = new Point(parseFloat(_cp1[0]),parseFloat(_cp1[1]));
        element.controlPoint2 = new Point(parseFloat(_cp2[0]),parseFloat(_cp2[1]));
        return element;
    }

    _createTextElementByTag(tag) {
        let _position = tag.attributes.Position.split(',');
        let _fontSize = tag.attributes.Height;
        let _angle = tag.attributes.Angle;
        let position = new Point(parseFloat(_position[0]),parseFloat(_position[1]));
        let  element = new Text(position,null);
        element.fontSize= parseFloat(_fontSize);
        element.angle= parseFloat(_angle);
        return element;
    }

    _getLineTypeByTag(tag){
        let res = null;
        switch(parseInt(tag.attributes.Id)){
            case 14:
                if(tag.attributes.CTM=="1"){
                    res= new CommentsToMachinist()
                }else {
                    res= new CommentToSelfLineType();
                }
                res.type=tag.attributes.LineType;
                return res;
            default:
                return new AutoLineType();
        }
    }

    //============Processing=====================//

    /**
     * @param tag
     * @return {Processing}
     * @private
     */
    _createBendProcessingByTag(tag){
        let res = new BendProcessing();
        res.angle=parseFloat(tag.attributes.Angle);
        res.radius=parseFloat(tag.attributes.Radius);
        return res;
    }


}
   