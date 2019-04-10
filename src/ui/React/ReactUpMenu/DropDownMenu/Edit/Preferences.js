import React from "react";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.demensions
    };
  }

  handleRadioChange = event => {
    this.setState({ value: event.target.value });

  };

  render() {
    // console.log(this.props,'props-Preference')
    return (
      <div className="Preferences">
        <p style={{ textAlign: "left" }}>Measurements</p>
        <div className="RadioButton">
          <form>
            <fieldset>
              <legend>All dimensions are in</legend>

              <FormControl>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel
                    value="Inches"
                    onClick={() => {
                      this.props.updateDataDemensions(
                        this.state.value === "Inches" ? "Millimeters" : "Inches"
                      );
                    }}
                    control={
                      <Radio
                        color="primary"
                        classes={{ root: "root" }}
                      />
                    }
                    label="Inches"
                  />
                  <FormControlLabel
                    value="Millimeters"
                    onClick={() => {
                      this.props.updateDataDemensions(
                        this.state.value === "Millimeters"? "Inches": "Millimeters"
                      );
                    }}
                    control={
                      <Radio
                        classes={{ root: "root" }}
                        color="primary"
                      />
                    }
                    label="Millimeters"
                  />
                </RadioGroup>
              </FormControl>
            </fieldset>
            <fieldset>
                <legend>Calibrate Screen</legend>
                <Button variant="contained" onClick={app.screenCalibrate()}>Calibrate</Button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataDemensions: value => {
      dispatch({ type: "UPDATE_DEMENSIONS", payload: value });
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Preferences);
