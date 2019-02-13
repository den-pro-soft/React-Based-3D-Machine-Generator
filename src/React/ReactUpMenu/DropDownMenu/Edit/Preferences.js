import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {connect} from 'react-redux';


// const PreferenceContext = React.createContext();

 class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: 'Inches'
      value: this.props.demensions

    };
    console.log(this.state.value, ' state.value-preferens')
  }

  handleRadioChange = event => {
 
    this.setState({ value: event.target.value });

    console.log(this.state.value, "this.state.value");
  };

  render() {
console.log('Props-Preferens',this.props)

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
                //   onClick={() => { this.props.updateDataDementions(this.state.value)}}

                >
                  <FormControlLabel
                    value="Inches"
                    onClick={() => { this.props.updateDataDemensions(this.state.value==='Inches'?'Millimeters':'Inches')}}
                    // onClick={() => {()=> this.props.updateDataDemensions(5)}}
                    // onClick={() => {this.props.updateDataDemensions}}

                   
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
                    // onClick={() => {()=>this.props.updateDataDemensions(2)}}
                    // onClick={() => {this.props.updateDataDemensions}}


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

// const mapStateToProps = (state)=>{
//   console.log(state,'in mapState-Preferens')
// return {
//  demensions: state.demensions
// }
//    }

//    const mapDispatchToProps = (dispatch)=>{
// return {
//   updateDataDemensions: ()=>{dispatch({type:"UPDATE_DEMENSIONS"})}

   // updateDataDemensions: (value)=>{dispatch({type:"UPDATE_DEMENSIONS",payload: value})}
// }
//    }
// export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
export default Preferences
