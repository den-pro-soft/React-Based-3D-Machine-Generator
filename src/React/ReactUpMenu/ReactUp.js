import React from "react";
import "./react-up.scss";
import ReactTooltip from "react-tooltip";

import UpMenu from "./UpMenu/UpMenu";
import ToolsPanel from "./ToolsPanel/ToolsPanel";


  const ReactUp = props =>{
    return (
      <div className="Up-And-RightMenu">
        <div className="TopMenu">
   

          <UpMenu />

          <div className="InputFieldMenu">
            <div className="Panel">
              <ReactTooltip
                html={true}
                data-place="right"
                className="tooltipBackgroundTheme"
              />

              <ToolsPanel/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default ReactUp;

