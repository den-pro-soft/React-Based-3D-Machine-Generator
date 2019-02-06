import React from "react";
import ReactTooltip from "react-tooltip";

const Arc =  props => {
  return (
    <>
      <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
    <button className="btn-Diameter">
      <a href="#">
        <img
          width="18px"
          src="images/Diameter18.png"
          data-place="bottom"
          data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
     press the Enter key.
    </span>"
        />
      </a>
    </button>
    <input
      type="text"
      data-place="bottom"
      data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
   press the Enter key.
  </span>"
    />
  </>
   )}

  export default Arc;