import React from "react";
import "./standing-part.scss";

export default class StandingPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StandingPart">
        <h3 className="Title">Shipping Address</h3>
      </div>
    );
  }
}
