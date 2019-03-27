import React from "react";
import "./auto.scss";
import { withRouter } from "react-router-dom";

const CommentsToSelf =  props => {
  return (
    <div
      className="CommentsToSelf"
  >
        <p className="AutoTitle">
         I his type comment is NOT SEEN by the machinist and will have no effect on your parts or cost. I his type of
           line is for your own use only to create comment lines and text to label sections of your design, create alignment
           guides, show inactive portions of a design, etc.
         
        </p>
  </div>)}

  export default withRouter(CommentsToSelf);