import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./React/LeftMenu/LeftMenu"
import ReactApp from './React/ReactApp';


ReactDOM.render(
  <div classname="root-LeftMenu">
   <LeftMenu /> 
  </div>,
  document.getElementById("LeftMenu")

)
ReactDOM.render(
  <div>
   <ReactApp />
  </div>,
  document.getElementById("UpMenu")

)
