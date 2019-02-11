import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

// const PreferenceContext = React.createContext();

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: 'Inches'
      value: this.props.demensions

    };
    console.log(props,this.state.value, 'props and state.value-preferens')
  }

  handleRadioChange = event => {
 
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
{/* <PreferenceContext.Consumer>
{demensions => <Button {...this.props}val={demensions} />}
  </PreferenceContext.Consumer> */}
              <FormControl>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleRadioChange}
                //   onClick={() => { this.props.updateDataDementions(this.state.value)}}

                >
                  <FormControlLabel
                    value="Inches"
                    onClick={() => { this.props.updateDataDemensions(this.state.value==='Inches'?'Millimeters':'Inches')}}
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
                    onClick={() => { this.props.updateDataDemensions(this.state.value==='Millimeters'?'Inches':'Millimeters')}}

                    // onClick={() => { this.props.updateDataDementions(this.state.value)}}
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
