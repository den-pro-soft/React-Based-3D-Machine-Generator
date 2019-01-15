import React from "react";
import LeftMenu from "./LeftMenu/LeftMenu";
import UpMenu from "./UpMenu/UpMenu";

const ReactApp = context => {
  return (
    <>
      <div>
        <UpMenu />
        <LeftMenu />
      </div>
    </>
  );
};

export default ReactApp;
