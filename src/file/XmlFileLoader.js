/**
 * Created by dev on 13.02.19.
 */

import FileLoader from './FileLoader';

export default class XmlFileLoader extends FileLoader{
    constructor(){
        super();
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
        const Figures = elements.map(el => {
            //   console.log(el, "el-map");
            if (el.typeName === "Line") {
                return `<Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>`;
            }

            if (el.typeName === "Arc") {
                if (el.startAngle === 0 && el.endAngle === 0) {
                    return `<Circle Center="${el._center.x},${el._center.y}" Radius="${el.radius}"/>`;
                } else {
                    return `<Arc Center="${el._center.x},${el._center.y}" Radius="${el.radius}" 
                                 StartAngle="${el.startAngle}" IncAngle="${el.endAngle}"/>`;
                }
            }

            if (el.typeName === "Spline") {
                return `<Spline P1="${el._points[0].x},${el._points[0].y}" 
                                P2="${el._points[2].x},${el._points[2].y}" 
                                P3="${el._points[3].x},${el._points[3].x}"
                                P4="${el._points[1].x},${el._points[1].y}"/>`;
            }

        });

        const comment = elements.map(el => {
            if (el.lineType.name !== "Auto" && el.typeName === "Line") {

                return `<Region BaseHeight="0" Z="${el.height}">
          <Machine Id="14" Name="Comment" CTM="0"/>
            <Contour>
              <Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>
            </Contour>
        </Region>`
            }
            // })
            // const text = elements.map(el => {
            if (el.typeName === "Text") {

                return `<Region BaseHeight="0" Z="${el.height}">
          <Machine Id="14" Name="Comment" CTM="0"/>
            <Contour>
              <Text Position="${el.position.x},${el.position.y}" Height="${el.fontSize}" FontName="" HFlip="0" VFlip="0" Angle="${el.angle}">${el.text}</Text>      
            </Contour>
        </Region>`
            }
        })
        const header =
            '<?xml version="1.0"?>\n' +
            '<eMachineShop3DObjects VersionId="1.1">\n' +
            '<View Type="Top">\n';
        const Contour =
            "<Region>\n" +
            "<Machine/>\n" +
            "<Contour>\n" +
            Figures.join("\n") +
            "</Contour>\n" +
            "</Region>\n"+
            comment.join("\n");
        const footer =
            "</View>\n" +
            '<QuantityOfParts Value="10"/>\n' +
            "</eMachineShop3DObjects>";
        var xml = header + Contour + footer;
        console.log(xml);
        // fs.writeFileSync(`file/hello.emsx`, xml);

        return xml;
    }
}