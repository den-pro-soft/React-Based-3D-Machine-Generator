import React from "react";
import './react-app.scss';
import LeftMenu from "./LeftMenu/LeftMenu";
import UpMenu from "./UpMenu/UpMenu";
import Aluminium6061 from "./RightButtons/Aluminium6061";
import SelectFinish from "./RightButtons/SelectFinish";

const ReactApp = context => {
  return (
    <div className="ReactApp">
      <div
        className="Up-End-RightMenu"
        // style={{ display: "inline-flex", justifyContent: "space-between"}}
      >
        <>
          <UpMenu />
        </>
        <div className="RightButtons" 
        // style={{ display: "inline-flex", justifyContent: "space-between" }}       
        >
          <Aluminium6061 />
          <SelectFinish />
        </div>
      </div>
      <LeftMenu />
    </div>
  );
};

export default ReactApp;
