import React from "react";
import "./dropdown-menu.scss";
import File from "./File/File";
import Edit from "./Edit/Edit";

import Line from "./Line";
import Job from "./Job/Job";
import Help from "./Help/Help";

export default class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props,'dropdownmenu')

  }
  updateDataDemensions = (value) => {
    this.props.updateDataDemensions (value)
    // console.log(value,'demensions')
 }
  render(){
  return (
    <>
      <File />
      <Edit updateDataDemensions={this.updateDataDemensions} demensions={this.props.demensions}/>
      <Line/>
      <Job />
      <Help />
    </>
  );
}
}

// export default DropDownMenu;
