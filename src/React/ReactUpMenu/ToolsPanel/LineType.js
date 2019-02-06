import React from "react";
import ReactTooltip from "react-tooltip";

const LineType =  props => {
  return (
    <>
     <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
    <button className="btn-Length">
      <a href="#">
        <img
          width="18px"
          src="images/Line.png"
          data-place="bottom"
          data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
        />
      </a>
    </button>
    <input
      type="text"
      data-place="bottom"
      data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
    />
    <button className="btn-LineAngle">
      <a href="#">
        <img
          width="18px"
          src="images/Line.png"
          data-place="bottom"
          data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
        />
      </a>
    </button>
    <input
      type="text"
      data-place="bottom"
      data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
    />
  </>)}

  export default LineType;