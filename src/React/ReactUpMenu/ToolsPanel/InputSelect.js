import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import { Fragment } from "react";
import { connect } from "react-redux";


 class InputSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      displayInputSelect: true
    };
  }

  //data processing from input-select - Z
  handleChange = selectedOption => {
    this.setState({ selectedOption, displayInputSelect: false });
    console.log(`Option selected:`, selectedOption.value);
    let val = parseInt(selectedOption.value);
    app.setElementsHeight(val ? val : 0.075);
  };

  handleInputChange = (inputValue, actionMeta) => {
    // setState({displayInputSelect:false});
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  //   onChange={e=>{
  //     let val = parseInt(e.target.value);
  //         app.setElementsHeight(val?val:0.075);
  //         console.log(e.target.value,'targetValue')
  // }}
  render() {
    const options_inch = [
      { value: "Air Inside", label: `Air Inside` },
      { value: "Revolve", label: `Revolve` },
      { value: "0.002", label: `0.002 "` },
      { value: "0.005", label: `0.005 "` },
      { value: "0.010", label: `0.010 "` },
      { value: "0.031", label: `0.020 "` },
      { value: "0.010", label: `0.031 "` },
      { value: "0.045", label: `0.045 "` },
      { value: "0.062", label: `0.062 "` },
      { value: "0.093", label: `0.093 "` },
      { value: "0.125", label: `0.125 "` },
      { value: "0.187", label: `0.187 "` },
      { value: "0.250", label: `0.250 "` },
      { value: "0.375", label: `0.375 "` },
      { value: "0.500", label: `0.500 "` },
      { value: "0.750", label: `0.750 "` },
      { value: "1.000", label: `1,000 "` },
      { value: "1.250", label: `1,250 "` },
      { value: "1.500", label: `1,500 "` },
      { value: "2.000", label: `2,000 "` },
      { value: "2.500", label: `2,500 "` },
      { value: "3.000", label: `3,000 "` },
      { value: "Other", label: `Other` }
    ];

    const options = [
      { value: "Air Inside", label: `Air Inside` },
      { value: "Revolve", label: `Revolve` },
      { value: "0.05", label: `0.05 mm` },
      { value: "0.08", label: `0.08 mm` },
      { value: "0.13", label: `0.13 mm` },
      { value: "0.25", label: `0.25 mm` },
      { value: "0.51", label: `0.51 mm` },
      { value: "0.79", label: `0.79 mm` },
      { value: "1.14", label: `1.14 mm` },
      { value: "1.59", label: `1.59 mm` },
      { value: "2.36", label: `2.36 mm` },
      { value: "3.17", label: `3.17 mm` },
      { value: "4.75", label: `4.75 mm` },
      { value: "6.35", label: `6.35 mm` },
      { value: "9.52", label: `9.52 mm` },
      { value: "12.70", label: `12.70 mm` },
      { value: "19.05", label: `19.05 mm` },
      { value: "25.40", label: `25.40 mm` },
      { value: "31.75", label: `31.75 mm` },
      { value: "38.10", label: `38.10 mm` },
      { value: "50.80", label: `50.80 mm` },
      { value: "63.50", label: `63.50 mm` },
      { value: "76.20", label: `76.20 mm` },
      { value: "Other", label: `Other` }
    ];
    //Warning!!! CustomStyles for React-Select module - https://react-select.com/props#statemanager-props
    const customStyles = {
      // container:(styles)=>({
      //     ...styles,
      // }),
      menuList: styles => ({
        ...styles,
        position: "relative",
        bottom: 8,
        backgroundColor: "white"
      }),
      control: () => ({
        //  styles => ({
        //  ...styles,
        display: "flex",
        padding: 0,
        height: 22,
        width: 120,
        backgroundColor: "#fff",
        border: "1px solid #808080"
      }),
      input: styles => ({
        ...styles,
        background: "white"
      }),
      option: () => ({
        borderLeft: "2px solid transparent",
        borderBottom: "1px solid #e5e5e5",
        padding: 2,
        ":hover": {
          backgroundColor: "#e5e5e5",
          borderLeft: "2px solid orange",
          cursor: "pointer"
        }
      }),
      dropdownIndicator: () => ({
        color: "orange"
      }),
      indicatorSeparator: () => ({
        color: "orange"
      })
    };

    return (
      <Fragment>
        <button className="btn-Z tooltip-Z">
          <a href="#">
            <img
              width="18px"
              src="images/Z.png"
              data-place="bottom"
              data-tip="<span>To make a 3D shape, make a 2D drawling and then set this value</br>
         to the distance material will extend perpendicular to the screen.</br>The value specifies the perpendicular
         distance for the material<br> inside the associated line, relative to the material
          </span>"
            />
          </a>
        </button>
       {this.props.demensions==="Millimeters" &&  <CreatableSelect
          onMouseLeave={this.handleInputChange}
          styles={customStyles}
          // isClearable
          // defaultValue={options[2]}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          options={options}
          placeholder=""
        />}
        {this.props.demensions==="Inches" &&  <CreatableSelect
          onMouseLeave={this.handleInputChange}
          styles={customStyles}
          // isClearable
          // defaultValue={options[2]}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          options={options_inch}
          placeholder=""
        />}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,

  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     updateMouseCoordinates: (mouseX,mouseY) => {
//       dispatch({ type: "UPDATE_MOUSE_COORDINATES", payload: mouseX , payload1: mouseY});
//     }
//   };
// };
export default connect(
  mapStateToProps,
 /* mapDispatchToProps*/
)(InputSelect);