export default class FileLoader {
  load(file) {
    console.log(file, "file");
  }

  static save(file) {
    // const { _elements } = file;

    const SimpleElements = file.getListSimpleElements();

    console.log(file, SimpleElements, "file,SimpleElement");
    FileLoader.convertInXML(SimpleElements);
  }
  static convertInXML(elements) {
    //   variable for 'Line'
    let LineID;
    let p1ID;
    let x1;
    let y1;
    let p2ID;
    let x2;
    let y2;
    let lineElements = [];

    // variable for 'Arc'
    let ArcID;
    let radius;
    let centerID;
    let centerX;
    let centerY;
    let centerZ;
    let arcElements = [];

       // variable for 'Circle'
    //    let CircleID;
    //    let circleRadius;
    //    let circleCenterID;
    //    let circleX;
    //    let circleY;
    //    let circleZ;
    //    let circleElements = [];

    // variable for 'Spline'
    let SplineID;

    let pointID1;
    let pointX1;
    let pointY1;

    let pointID2;
    let pointX2;
    let pointY2;

    let pointID3;
    let pointX3;
    let pointY3;

    let pointID4;
    let pointX4;
    let pointY4;
    let splineElements = [];

    elements.map(el => {
      //   console.log(el, "el-map");
      if (el.typeName === "Line") {
        lineElements.push({
          LineID: el.id,
          p1ID: el._p1.id,
          x1: el._p1.x,
          y1: el._p1.y,
          p2ID: el._p2.id,
          x2: el._p2.x,
          y2: el._p2.y
        });
      }
      if (el.typeName === "Arc") {
        arcElements.push({
          ArcID: el.id,
          radius: el.radius,
          centerID: el._center.id,
          centerX: el._center.x,
          centerY: el._center.y,
          centerZ: el._center.z
        });
      }
    //   if (el.typeName === "Circle") {
    //     circleElements.push({
    //         CircleID: el.id,
    //         circleRadius: el.radius,
    //         circleCenterID: el._center.id,
    //         circleX: el._center.x,
    //         circleY: el._center.y,
    //         circleZ: el._center.z
    //     });
    //   }
      if (el.typeName === "Spline") {
        splineElements.push({
          SplineID: el.id,

          pointID1: el._points[0].id,
          pointX1: el._points[0].x,
          pointY1: el._points[0].y,

          pointID2: el._points[1].id,
          pointX2: el._points[1].x,
          pointY2: el._points[1].y,

          pointID3: el._points[2].id,
          pointX3: el._points[2].x,
          pointY3: el._points[2].y,

          pointID4: el._points[3].id,
          pointX4: el._points[3].x,
          pointY4: el._points[3].y
        });
      }
    });

    let Straight = lineElements.map(el => {
      return `<Straight P1="${el.x1},${el.y1}" P2="${el.x2},${el.y2}"/>`;
    });
    // console.log(Straight, "Straight ");
    let Arc = arcElements.map(el => {
      return `<Arc Center="${el.centerX},${el.centerY}" Radius="${
        el.radius
      }" StartAngle="180" IncAngle="90"/>`;
    });
    let Circle = arcElements.map(el => {
        return `<Circle Center="${el.centerX},${el.centerY}" Radius="${el.radius}"/>`;
      });
    // let Circle = circleElements.map(el => {
    //       return `<Circle Center="${el.circleX},${el.circleY}" Radius="${el.circleRadius}" />`
    //   });
    // console.log(Arc, "Arc");
    let Spline = splineElements.map(el => {
      return `<Spline P1="${el.pointX1},${el.pointY1}" P2="${el.pointX3},${el.pointY3}" P3="${el.pointX4},${el.pointY4}" P4="${el.pointX2},${
        el.pointY2
      }"/> `;
    });

    const header =
      '<?xml version="1.0"?>\n' +
      '<eMachineShop3DObjects VersionId="1.1">\n' +
      '<View Type="Top">\n';
    const Contour =
      "<Region>\n" +
      "<Machine/>\n"+
      "<Contour>\n" +
      Straight.join("\n") +
      "\n" +
      Arc.join("\n") +
      "\n" +
      Circle.join("\n") +
      "\n" +
      Spline.join("\n") +
      "\n" +
      "</Contour>\n" +
      "</Region>\n";
    const footer =
      "</View>\n" +
      '<QuantityOfParts Value="10"/>\n' +
      "</eMachineShop3DObjects>";
    var xml = header + Contour + footer;
    console.log(xml);

    return xml;
  }
//   xml = "";
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
