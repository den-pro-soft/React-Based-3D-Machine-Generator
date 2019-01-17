import React from "react";
import "./react-app.scss";
import UpMenu from "./UpMenu/UpMenu";
import Aluminium6061 from "./RightButtons/Aluminium6061";
import SelectFinish from "./RightButtons/SelectFinish";
const ReactApp = context => {
  return (
    // <div className="ReactApp">
      <div className="Up-And-RightMenu">
        <div className="TopMenu">
           <div className="Drop">
          </div>
         <UpMenu />
        </div>
        <div className="RightButtons">
          <Aluminium6061 />
          <SelectFinish />
        </div>
      </div>
    // </div>
  );
};

export default ReactApp;
