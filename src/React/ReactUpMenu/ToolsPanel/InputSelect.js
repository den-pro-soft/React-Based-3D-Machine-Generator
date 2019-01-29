import React from "react";
import CreatableSelect from "react-select/lib/Creatable";

export default class InputSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      displayInputSelect: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

//data processing from input-select - Z
  handleChange(selectedOption) {
   
    this.setState({ selectedOption, displayInputSelect: false });
    console.log(`Option selected:`, selectedOption.value);
    let val = parseInt(selectedOption.value);
    app.setElementsHeight(val?val:0.075);
  }
  handleInputChange(inputValue, actionMeta) {
    // setState({displayInputSelect:false});
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }
//   onChange={e=>{
//     let val = parseInt(e.target.value);
//         app.setElementsHeight(val?val:0.075);
//         console.log(e.target.value,'targetValue')
// }}
  render() {
    const options = [
      { value: "Air Inside", label: `Air Inside` },
      { value: "Resolve", label: `Resolve` },
      { value: "0.002", label: `0.002${String.fromCharCode(34)}` },
      { value: "0.005", label: `0.005${String.fromCharCode(34)}` },
      { value: "0.010", label: `0.010${String.fromCharCode(34)}` },
      { value: "0.031", label: `0.020${String.fromCharCode(34)}` },
      { value: "0.010", label: `0.031${String.fromCharCode(34)}` },
      { value: "0.045", label: `0.045${String.fromCharCode(34)}` },
      { value: "0.062", label: `0.062${String.fromCharCode(34)}` },
      { value: "0.093", label: `0.093${String.fromCharCode(34)}` },
      { value: "0.125", label: `0.125${String.fromCharCode(34)}` },
      { value: "0.187", label: `0.187${String.fromCharCode(34)}` },
      { value: "0.250", label: `0.250${String.fromCharCode(34)}` },
      { value: "0.375", label: `0.375${String.fromCharCode(34)}` },
      { value: "0.500", label: `0.500${String.fromCharCode(34)}` },
      { value: "0.750", label: `0.750${String.fromCharCode(34)}` },
      { value: "1,000", label: `1,000${String.fromCharCode(34)}` },
      { value: "1,250", label: `1,250${String.fromCharCode(34)}` },
      { value: "1,500", label: `1,500${String.fromCharCode(34)}` },
      { value: "2,000", label: `2,000${String.fromCharCode(34)}` },
      { value: "2,500", label: `2,500${String.fromCharCode(34)}` },
      { value: "3,000", label: `3,000${String.fromCharCode(34)}` },
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
        padding: 3,
        ":hover": {
          backgroundColor: "#e5e5e5",
          borderLeft: "2px solid orange",
          cursor:'pointer'
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
      <CreatableSelect
        onMouseLeave={this.handleInputChange}
        styles={customStyles}
        // isClearable
        // defaultValue={options[2]}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
        placeholder=""
        // inputValue={inputValue +`${String.fromCharCode(34)}`}
      />
    );
  }
}
