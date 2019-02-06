import React from "react";
import ReactTooltip from "react-tooltip";

const CircleType = props => {
  return (
    <>
      <ReactTooltip html={true} className="tooltipBackgroundTheme" />
      <button className="btn-Radius">
        <a href="#">
          <img
            width="18px"
            src="images/Circle.png"
            data-place="bottom"
            data-tip="<span>Radius<br/>Distance from the center of the arc to the edge.To change<br/>
      enter a value and press the Enter key</span>"
          />
        </a>
      </button>
      <input
        type="text"
        data-place="bottom"
        data-tip="<span>Radius<br/>Distance from the center of the arc to the edge.To change<br/>
      enter a value and press the Enter key</span>"
      />
      <button className="btn-StartAngle">
        <a href="#">
          <img
            width="18px"
            src="images/Circle.png"
            data-place="bottom"
            data-tip="<span>Start Angle<br/>Angle of the line from the center to the most clockwise point of<br/>
      the arc.To change enter a value and press the Enter key</span>"
          />
        </a>
      </button>
      <input
        type="text"
        data-place="bottom"
        data-tip="<span>Start Angle<br/>Angle of the line from the center to the most clockwise point of<br/>
      the arc.To change enter a value and press the Enter key</span>"
      />
      <button className="btn-LineAngle">
        <a href="#">
          <img
            width="18px"
            src="images/Circle.png"
            data-place="bottom"
            data-tip="<span>Inside angle<br/>Angle between lines from the arc center to the end and start<br/> points.To change,
 enter a value and press the Enter key. </span>"
          />
        </a>
      </button>
      <input
        type="text"
        data-place="bottom"
        data-tip="<span>Inside angle<br/>Angle between lines from the arc center to the end and start<br/> points.To change,
      enter a value and press the Enter key. </span>"
      />
    </>
  );
};

export default CircleType;
