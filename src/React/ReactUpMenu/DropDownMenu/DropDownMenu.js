import React from "react";
import "./dropdown-menu.scss";
import File from "./File";
import Edit from "./Edit";

import Line from "./Line";
import Job from "./Job/Job";
import Help from "./Help/Help";

const DropDownMenu = context => {
  return (
    <>
      <File />
      <Edit/>
      <Line/>
      <Job />
      <Help />
    </>
  );
};

export default DropDownMenu;
