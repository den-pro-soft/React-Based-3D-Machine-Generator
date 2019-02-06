import React from "react";
import ReactTooltip from "react-tooltip";

const GroupType =  props => {
  return (
    <>
     <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
    <button className="btn-Horizontal">
      <a href="#">
        <img
          width="18px"
          src="images/Width.png"
          data-place="bottom"
          data-tip="<span>Horizontal size</span>"
        />
      </a>
    </button>
    <input
      type="text"
      data-place="bottom"
      data-tip="<span>Horizontal size<br/>Horizontal size of imaginary rectangle enclosing the line.To<br/>
change, enter a value and press the Enter key. </span>"
    />
    <button className="btn-Vertical">
      <a href="#">
        <img
          width="18px"
          src="images/Height.png"
          data-place="bottom"
          data-tip="<span>Vertical size</span>"
        />
      </a>
    </button>
    <input
      type="text"
      data-place="bottom"
      data-tip="<span>Vertical size<br/>Vertical size of imaginary rectangle enclosing the line.To<br/>
change, enter a value and press the Enter key. </span>"
    />
  </>)}

  export default GroupType;