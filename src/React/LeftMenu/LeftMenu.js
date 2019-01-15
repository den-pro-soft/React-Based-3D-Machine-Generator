import React from "react";
import './left-menu.scss'
const LeftMenu = context => {
  return (
    <div className="LeftMenu">
        <button><img  width='25px' src="images/Select.png"/></button>
        <button><img  width='25px' src="images/Line.png"/></button>
        <button><img  width='25px' src="images/Spline.png"/></button>
        <button><img  width='25px' src="images/Rectangle.png"/></button>
        <button><img  width='25px' src="images/Circle.png"/></button>
        <button><img  width='25px' src="images/Freehand.png"/></button>
        <button><img  width='25px' src="images/Eraser.png"/></button>
        <button><img  width='25px' src="images/Corner.png"/></button>
        <button><img  width='25px' src="images/Text.png"/></button>
        <button><img  width='25px'  src="images/LineEdit.png"/></button>
        <button><img  width='25px' src="images/Ruler.png"/></button>
        <button><img  width='25px' src="images/SnapToLines.png"/></button>
        <button><img  width='25px' src="images/Help.png"/></button>
     {/* <div>Select</div>
     <div>Line</div> */}

      
    </div>
  );
};

export default LeftMenu;