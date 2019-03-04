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
        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>First Name:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
            <div className="LabelLast">
              <label>Last Name:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
