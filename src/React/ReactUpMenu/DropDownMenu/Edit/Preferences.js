import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Inches"
    };
  }

  handleRadioChange = event => {
    event.preventDefault();

    this.setState({ value: event.target.value });
    console.log(this.state.value, "this.state.value");
  };

  render() {
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
                    control={
                      <Radio
                        color="primary"
                        // color="default"
                        classes={{ root: "root" }}
                      />
                    }
                    label="Inches"
                  />
                  <FormControlLabel
                    value="Millimeters"
                    control={
                      <Radio
                        classes={{ root: "root" }}
                        color="primary"
                        // color="default"
                      />
                    }
                    label="Millimeters"
                  />
                </RadioGroup>
              </FormControl>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
