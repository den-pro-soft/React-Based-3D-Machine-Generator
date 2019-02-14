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
            parser.onopentag = function (tag) {
                newElement = false;
                console.log(tag, 'open tag');
                switch (tag.name){
                    case 'Machine':
                        switch(parseInt(tag.attributes.Id)){
                            case 14:
                                lineType = new CommentToSelfLineType();
                                break;

                            default:
                                lineType = new AutoLineType();
                        }
                        break;
                    case 'Region':
                        height = tag.attributes.Z;
                        break;
                    case 'Straight':
                        let _p1 = tag.attributes.P1.split(',');
                        let _p2 = tag.attributes.P2.split(',');

                        let p1 = new Point(parseFloat(_p1[0]),parseFloat(_p1[1]));
                        let p2 = new Point(parseFloat(_p2[0]),parseFloat(_p2[1]));
                        element = new LineElement(p1,p2);
                        newElement = true;
                        break;
                    case 'Circle':
                    case 'Arc':
                        let _center = tag.attributes.Center.split(',');
                        let _radius = tag.attributes.Radius;
                        let center = new Point(parseFloat(_center[0]),parseFloat(_center[1]));

                        element = new Arc(center,parseFloat(_radius));
                        if(tag.name=='Arc') {
                            let _startAngle = tag.attributes.StartAngle;
                            let _incAngle = tag.attributes.IncAngle;
                            element.startAngle = parseFloat(_startAngle);
                            element.endAngle = (parseFloat(_startAngle) + parseFloat(_incAngle)) % 360;
                        }
                        newElement = true;
                        break;
                    case 'Spline':
                        let _start = tag.attributes.P1.split(',');
                        let _end = tag.attributes.P4.split(',');
                        let _cp1 = tag.attributes.P2.split(',');
                        let _cp2 = tag.attributes.P3.split(',');

                        let start = new Point(parseFloat(_start[0]),parseFloat(_start[1]));
                        let end = new Point(parseFloat(_end[0]),parseFloat(_end[1]));
                        element = new Spline(start, end);

                        element.controlPoint1 = new Point(parseFloat(_cp1[0]),parseFloat(_cp1[1]));
                        element.controlPoint2 = new Point(parseFloat(_cp2[0]),parseFloat(_cp2[1]));
                        newElement = true;
                        break;
                    case 'Text':
                        let _position = tag.attributes.Position.split(',');
                        let _fontSize = tag.attributes.Height;
                        let _angle = tag.attributes.Angle;
                        let position = new Point(parseFloat(_position[0]),parseFloat(_position[1]));
                        element = new Text(position,null);
                        element.fontSize= parseFloat(_fontSize);
                        element.angle= parseFloat(_angle);
                        newElement = true;
                        break;
                }
                if(newElement){
                    element.lineType = lineType.copy();
                    element.height=height;
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
            let xml = this.convertInXML(document.getListSimpleElements());
            if(xml) {
                resolve(new Blob([xml], {type: "text/plain;charset=utf-8"}));
            }else{
                reject('Can\'t convert to Xml!');
            }
        });
    }

    convertInXML(elements) {
        console.log(elements,'element')

        const Figures = elements.map(el => {
            if (el.lineType.name!=="Auto"&&el.typeName === "Line") {
             
                return  `<Region BaseHeight="0" Z="${el.height}">
    <Machine Id="14" Name="Comment" CTM="0"/>
        <Contour>
            <Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>
        </Contour>
</Region>`
               } else 
          if (el.typeName === "Line")
           {
            return `<Region BaseHeight="0" Z="${el.height}" ThroughHole="">
    <Machine Id="41" Name="Auto"/>
        <Contour>
            <Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>
        </Contour>
</Region>`
                 
          }
          
          if (el.typeName === "Arc") {
            if (el.startAngle === 0 && el.endAngle === 0) {
              return `<Region BaseHeight="0" Z="${el.height}" BottomType="Drill" ThroughHole="">
    <Machine Id="41" Name="Auto"/>
        <Contour>
            <Circle Center="${el._center.x},${el._center.y}" Radius="${el.radius}"/>
        </Contour>
</Region>`;
            } else {
            
                let IncAngle =(el.endAngle > el.startAngle)? (el.endAngle - el.startAngle) : (el.startAngle + (360 - el.endAngle))
    
              return `<Arc Center="${el._center.x},${el._center.y}" Radius="${
                el.radius
                }" StartAngle="${el.startAngle}" IncAngle="${IncAngle}"/>`;
            }
          }
      
          if (el.typeName === "Spline") {
            return `<Region BaseHeight="0" Z="AirInside" ThroughHole="">
    <Machine Id="41" Name="Auto"/>
        <Contour>
            <Spline P1="${el._points[0].x},${el._points[0].y}" P2="${el._points[2].x},${el._points[2].y}" 
            P3="${el._points[3].x},${el._points[3].x}" P4="${el._points[1].x},${el._points[1].y}"/>         
        </Contour>
</Region>`
          }
         
           if (el.typeName === "Text") {
              
            return  `<Region BaseHeight="0" Z="${el.height}">
    <Machine Id="14" Name="Comment" CTM="0"/>
        <Contour>
        <Text Position="${el.position.x},${el.position.y}" Height="${el.fontSize}" FontName="" HFlip="0" VFlip="0" Angle="${el.angle}">${el.text}</Text>      
            </Contour>
</Region>`
           }
        });
    
    
        const header =
          '<?xml version="1.0"?>\n' +
          '<eMachineShop3DObjects VersionId="1.1">\n' +
          '<View Type="Top">\n';
          
        const Contour = Figures.join("\n") +'\n';
       
        const footer =
          "</View>\n" +
          '<QuantityOfParts Value="10"/>\n' +
          "</eMachineShop3DObjects>";
        var xml = header + Contour + footer;
        console.log(xml);
    
        return xml;
      }
    }
   