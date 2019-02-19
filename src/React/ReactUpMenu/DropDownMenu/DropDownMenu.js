import React from "react";
import "./dropdown-menu.scss";
import File from "./File/File";
import Edit from "./Edit/Edit";

import Line from "./Line/Line";
import Job from "./Job/Job";
import Help from "./Help/Help";

const DropDownMenu =props=> {

  return (
    <>
      <File />
      <Edit />
      <Line/>
      <Job />
      <Help />
    </>
  );
}

export default DropDownMenu;
