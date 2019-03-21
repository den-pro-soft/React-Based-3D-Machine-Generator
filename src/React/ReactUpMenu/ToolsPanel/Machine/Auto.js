import React from "react";
import "./auto.scss";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

import InputSelectAuto from "./InputSelectAuto";
import InputSelectRadius from "./InputSelectRadius";
import InputSelectAngle from "./InputSelectAngle";

import { withRouter } from "react-router-dom";

export default class Auto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "straight",
      isChecked: false
    };
  }
  handleRadioChange = event => {
    event.preventDefault();

    this.setState({ value: event.target.value });
    // console.log(this.state.value, "this.state.value");
  };
  // resetButton = () => {
  //     this.setState({ value: "emsx1" });
  // };
  handleChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  render() {
    return (
      <div className="Auto">
        <p className="AutoTitle">
          Use this selection to design the shape of your part.
        </p>
        {/* <div className="RadioButton"> */}
        <fieldset className="RadiButtonsFieldset">
          <legend>Near edge</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt">
              <FormControl>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel
                    classes={{ root: "root" }}
                    // style={{border:'1px solid red',paddinTop:'0px!important'}}
                    value="straight"
                    control={
                      <Radio
                        classes={{ root: "root" }}
                        color="primary"
                        // color="default"
                        // style={{margin:"0px"}}
                      />
                    }
                    label="Straight"
                  />
                  <FormControlLabel
                    classes={{ root: "root" }}
                    value="chamfer"
                    control={
                      <Radio
                        // classes={{ root: "root" }}
                        style={{ margin: "0px" }}
                        color="primary"
                        // color="default"
                      />
                    }
                    label="Chamfer"
                  />
                  <FormControlLabel
                    classes={{ root: "root" }}
                    value="round"
                    control={
                      <Radio
                        color="primary"
                        //  color="default"
                      />
                    }
                    label="Round"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="RadioButtonsContent">
              {this.state.value === "straight" && (
                <div className="Chamfer">
                  <div>
                    <img src="images/Auto4.jpg" />
                  </div>
                </div>
              )}
              {this.state.value === "chamfer" && (
                <div className="Chamfer">
                  <div>
                    <img src="images/Chamfer.png" />
                  </div>
                  <div className="Inputs">
                    <div className="InputSizeGroup">
                      <label>Size:</label>
                      <input
                        type="text"
                        className="InputSize"
                        // value={this.state.businessName}
                        // onChange={this.handleBusinessNameChange}
                      />
                    </div>
                    <div className="InputSelectAngleGroup">
                      {/* <label>Angle:</label> */}
                      <span>Angle:</span>

                      <span className="InputSelectAngle">
                        <InputSelectAuto />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {this.state.value === "round" && (
                <div className="Chamfer">
                  <div>
                    <img src="images/radius.png" />
                  </div>
                  <div className="Inputs">
                    {/* <div className="InputSizeGroup"> */}

                    <div className="InputSelectRadiusGroup">
                      <span>Radius:</span>

                      <span className="InputSelectRadius">
                        <InputSelectRadius />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>
        <fieldset className="Checkbox">
          <legend>Stock material wall</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt">
              <Checkbox
                checked={this.state.isChecked}
                onChange={this.handleChecked}
                color="primary"
              />
            </div>
            <div className="RadioButtonsContent">
              <div className="Chamfer">
                <p className="AutoTitle">
                  Use to specify raw material shape of tube, beam, etc. -
                  specify vendor and part number in comments.
                </p>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="AngleInputFieldset">
          <legend>Side wall</legend>
          <div className="RadioButtons">
            <div className="RadioButtonsElelemt" />
            <div className="RadioButtonsContent">
              <div className="Chamfer">
                <div>
                  <img src="images/angle90.png" />
                </div>
                <div className="InputAngle">
                  <div className="InputSelectAngleGroup2">
                    <span>Angle:</span>

                    <span className="InputSelectAngle2">
                      <InputSelectAngle />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="RadioFarEdge">
          <legend>Far edge</legend>
        </fieldset>
        <fieldset className="Notes">
          <legend>Notes</legend>
          <p className="AutoTitle">
            To set edge settings for the Bottom view first select View | Bottom.
          </p>
          <p className="AutoTitle">
            *Drilled holes may be machined with flat bottoms.
          </p>
        </fieldset>
      </div>
    );
  }
}

