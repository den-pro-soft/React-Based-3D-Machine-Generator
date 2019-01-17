import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./React/LeftMenu/LeftMenu"
import ReactUp from './React/ReactUpMenu/ReactUp';


ReactDOM.render(
  <div className="root-LeftMenu">
   <LeftMenu /> 
  </div>,
  document.getElementById("LeftMenu")

)
ReactDOM.render(
  <div>
   <ReactUp />
  </div>,
  document.getElementById("UpMenu")

)
