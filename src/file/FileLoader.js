// const fs = require("fs");
export default class FileLoader {
  load(file) {
    console.log(file, "file");
  }

  static save(currentDocument) {

    const SimpleElements = currentDocument.getListSimpleElements();

    console.log(currentDocument, SimpleElements, "file,SimpleElement");
    this.convertInXML(SimpleElements);
  }

  static convertInXML(elements) {
    const Figures = elements.map(el => {
      //   console.log(el, "el-map");
      if (el.typeName === "Line") {
        return `<Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${
          el.p2.y
        }"/>`;
      }
      
      if (el.typeName === "Arc") {
        if(el.startAngle===0 && el.endAngle===0){
          return `<Circle Center="${el._center.x},${el._center.y}" Radius="${
            el.radius
          }"/>`;
        } else {
        return `<Arc Center="${el._center.x},${el._center.y}" Radius="${
          el.radius
        }" StartAngle="${el.startAngle}" IncAngle="${el.endAngle}"/>`;
      }
      }
  
      if (el.typeName === "Spline") {
        return `<Spline P1="${el._points[0].x},${el._points[0].y}" P2="${
          el._points[2].x
        },${el._points[2].y}" P3="${el._points[3].x},${el._points[3].x}" P4="${
          el._points[1].x
        },${el._points[1].y}"/> `;
      }

    });

    const comment = elements.map(el => {
      if (el.lineType.name!=="Auto"&&el.typeName === "Line") {
         
       return  `<Region BaseHeight="0" Z="${el.height}">
          <Machine Id="14" Name="Comment" CTM="0"/>
            <Contour>
              <Straight P1="${el.p1.x},${el.p1.y}" P2="${el.p2.x},${el.p2.y}"/>
            </Contour>
        </Region>`
      }
    // })
    // const text = elements.map(el => {
      if (el.typeName === "Text") {
         
       return  `<Region BaseHeight="0" Z="${el.height}">
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


// <?xml version="1.0"?>
// <eMachineShop3DObjects VersionId="1.1">
//     <View Type="Top">
//         <Region BaseHeight="0" Z="1.5875">
//             <Machine Id="41" Name="Auto"/>
//             <Contour>
//                 <Straight P1="-364.352081,135.192897" P2="-364.352081,45.192897"/>
//                 <Arc Center="-359.352081,45.192897" Radius="5" StartAngle="180" IncAngle="90"/>
//                 <Straight P1="-359.352081,40.192897" P2="-269.352081,40.192897"/>
//                 <Arc Center="-269.352081,45.192897" Radius="5" StartAngle="270" IncAngle="90"/>
//                 <Straight P1="-264.352081,45.192897" P2="-264.352081,135.192897"/>
//                 <Arc Center="-269.352081,135.192897" Radius="5" StartAngle="0" IncAngle="90"/>
//                 <Straight P1="-269.352081,140.192897" P2="-359.352081,140.192897"/>
//                 <Arc Center="-359.352081,135.192897" Radius="5" StartAngle="90" IncAngle="90"/>
//             </Contour>
//         </Region>
//         <Region BaseHeight="1.5875" Z="AirInside" BottomType="Drill" ThroughHole="">
//             <Machine Id="41" Name="Auto"/>
//             <Contour>
//                 <Circle Center="-345.812776,121.237432" Radius="5.904003"/>
//             </Contour>
//         </Region>
//         <Region BaseHeight="1.5875" Z="AirInside" ThroughHole="">
//             <Machine Id="41" Name="Auto"/>
//             <Contour>
//                 <Spline P1="-305.696256,46.331059" P2="-298.398609,62.927324" P3="-279.20281,42.885025" P4="-271.905162,59.481289"/>
//                 <Spline P1="-271.905162,59.481289" P2="-288.501426,66.778937" P3="-268.459128,85.974736" P4="-285.055392,93.272383"/>
//                 <Spline P1="-285.055392,93.272383" P2="-292.35304,76.676119" P3="-311.548838,96.718417" P4="-318.846486,80.122153"/>
//                 <Spline P1="-318.846486,80.122153" P2="-302.250222,72.824506" P3="-322.29252,53.628707" P4="-305.696256,46.331059"/>
//             </Contour>
//         </Region>
//         <Region BaseHeight="0" Z="-1">
//             <Machine Id="14" Name="Comment" CTM="0"/>
//             <Contour>
//                 <Text Position="-307.860218,130.559114" Height="5" FontName="" HFlip="0" VFlip="0" Angle="0">text message</Text>
//             </Contour>
//         </Region>
//     </View>
//     <QuantityOfParts Value="10"/>
// </eMachineShop3DObjects>
