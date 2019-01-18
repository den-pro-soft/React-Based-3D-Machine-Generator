import React from "react";
import "./react-up.scss";
import ReactTooltip from "react-tooltip";

import UpMenu from "./UpMenu/UpMenu";
import ToolsPanel from './ToolsPanel/ToolsPanel'
import Material from "./RightButtons/Material";
import SelectFinish from "./RightButtons/SelectFinish";

const ReactUp = context => {
  return (
    <div className="Up-And-RightMenu">
      <div className="TopMenu">
        {/* <div className="Drop">
          </div> */}
        <UpMenu />
        <div className="InputFieldMenu">
         <div className="Panel">
          <ReactTooltip
            html={true}
            data-place="right"
            className="tooltipBackgroundTheme"
          />
          <button className="btn-Question">
            <a
              href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                width="18px"
                // src="images/question.png"
                src="images/Help.png"
                data-tip="<span>Shows how to use numeric values.</span>"
              />
            </a>
          </button>
          <ToolsPanel/>
          </div>
        </div>
      </div>
      <div className="RightButtons">
        <Material />
        <SelectFinish />
      </div>
    </div>
  );
};

export default ReactUp;
