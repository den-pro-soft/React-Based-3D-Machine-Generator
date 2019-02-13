import React from "react";
import "./react-up.scss";
import ReactTooltip from "react-tooltip";

import UpMenu from "./UpMenu/UpMenu";
import ToolsPanel from "./ToolsPanel/ToolsPanel";
import { createContext } from "react";
const PreferenceContext = React.createContext();

export default class ReactUp extends React.Component {
  constructor(props){

    super(props);
    this.state={
      demensions:'Inches'
    }
  }
    updateData = (value) => {
      console.log(value,'demensions-React-Up');
      this.setState({ demensions: value })
   }
  render() {
    return (
      <div className="Up-And-RightMenu">
        <div className="TopMenu">
        {/* <PreferenceContext.Provider updateData={this.updateData} demensions={this.state.demensions}>
         <UpMenu/>
         </PreferenceContext.Provider> */}

          <UpMenu updateData={this.updateData} demensions={this.state.demensions}/>

          <div className="InputFieldMenu">
            <div className="Panel">
              <ReactTooltip
                html={true}
                data-place="right"
                className="tooltipBackgroundTheme"
              />

              <ToolsPanel demensions={this.state.demensions}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
