import React from "react";
import "./react-up.scss";
import UpMenu from "./UpMenu/UpMenu";

import Material from "./RightButtons/Material";
import SelectFinish from "./RightButtons/SelectFinish";
const ReactUp = context => {
  return (
      <div className="Up-And-RightMenu">
        <div className="TopMenu">
           <div className="Drop">
          </div>
         <UpMenu />
        </div>
        <div className="RightButtons">
          <Material />
          <SelectFinish />
        </div>
      </div>
  );
};

export default ReactUp;
