import React from "react";
import "./dropdown-menu.scss";
import File from "./File/File";
import Edit from "./Edit/Edit";

import Line from "./Line/Line";
import Job from "./Job/Job";
import Help from "./Help/Help";

// const DropDownMenu =props=> {
  export default class DropDownMenu extends React.Component{
    constructor(props){
      super(props)
      // console.log(this.props,'props-DropDown')
    }
render(){
  return (
    <>
      <File history={this.props.history}/>
      <Edit />
      <Line/>
      <Job history={this.props.history}/>
      <Help />
    </>
  );
}
  }


// export default DropDownMenu;
