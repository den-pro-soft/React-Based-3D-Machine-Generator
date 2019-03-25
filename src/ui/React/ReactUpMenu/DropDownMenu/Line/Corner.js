import React from "react";
import "./corner.scss";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// import { connect } from "react-redux";

class Corner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Round",
      isChecked: true,
      radius: 5 + " mm",
      distance: 12.7 + " mm"
    };
  }

  handleRadioChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeCheckbox = event => {
    window.setTimeout(() => {
      this.setState({ isChecked: !this.state.isChecked });
    }, 0);
  };

  handlyChangeInputRadius = event => {
    this.setState({ radius: event.target.value });
  };
  handlyChangeInputDistance = event => {
    this.setState({ radius: event.target.value });
  };
  render() {
    return (
      <div className="Corner">
        {/* <div className="RadioButton"> */}
        <form>
          <fieldset>
            <legend>Corner</legend>

            <FormControl>
              <RadioGroup
                value={this.state.value}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="Round"
                  onClick={() => {
                    this.state.value === "Round" ? "Chamfer" : "Round";
                  }}
                  control={<Radio color="primary" classes={{ root: "root" }} />}
                  label="Round"
                />
                <FormControlLabel
                  value="Chamfer"
                  onClick={() => {
                    this.state.value === "Chamfer" ? "Round" : "Chamfer";
                  }}
                  control={<Radio classes={{ root: "root" }} color="primary" />}
                  label="Chamfer"
                />
              </RadioGroup>
            </FormControl>
          </fieldset>
          {this.state.value === "Round" && (
            <>
              <p>Sharp corners will be rounded to the specified radius.</p>
              <div className="Block">
              <div className="LeftBlock">
              
                <div className="Input">
                  <label>Radius</label>
                  <br />
                  <input
                    type="text"
                    // onChange={e => {
                    //   app.config.moveStep = e.target.value;
                    // }}
                    value={this.state.radius}
                    onChange={this.handlyChangeInputRadius}
                    //   onKeyPress={this.handlyChangeInputMove}
                    data-place="bottom"
                    data-tip="<span>Radius of fillet.</span>"
                  />
                </div>
                <label className="Label">
                  <Checkbox
                    disabled
                    value="checkedD"
                    style={{ margin: 0, padding: 0, paddingLeft: "10px" }}
                  />
                  Inside corner
                </label>
                <br />
                <label className="Label">
                  <Checkbox
                    disabled
                    checked
                    value="checkedE"
                    style={{ margin: 0, padding: 0, paddingLeft: "10px" }}
                  />
                  Outside corner
                </label>
                <p className="TextBlock">
                  To apply to a specific corner
                  <br /> first ungroup the lines.{" "}
                </p>
              </div>
              <div className="ImageBlock">
                <img width="145px" src="resources/images/Corner.jpg" />
              </div>
            </div>
            </>
          )}
          {this.state.value === "Chamfer" && (
            <>
              <p>Sharp corners will be beveled to the specified distance.</p>

              <div className="Input">
                <label>Distance</label>
                <br />
                <input
                  type="text"
                  // onChange={e => {
                  //   app.config.moveStep = e.target.value;
                  // }}
                  value={this.state.distance}
                  onChange={this.handlyChangeInputDistance}
                  //   onKeyPress={this.handlyChangeInputMove}
                  data-place="bottom"
                  data-tip="<span>Radius of fillet.</span>"
                />
              </div>
            </>
          )}

          <div className="Checkbox">
            <label style={{paddingBottom:0}}>
              <Checkbox
                onChange={this.handleChangeCheckbox}
                checked={this.state.isChecked}
                color="primary"
                style={{paddingBottom:'10px'}}
              />
              Show preview
            </label>
          </div>
        </form>
        {/* </div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     demensions: state.demensions
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateDataDemensions: value => {
//       dispatch({ type: "UPDATE_DEMENSIONS", payload: value });
//     }
//   };
// };
export default Corner;
// export default connect(mapStateToProps,mapDispatchToProps)(Preferences);
