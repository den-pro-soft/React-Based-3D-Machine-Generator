import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";

export default class InputSelect extends React.Component {
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
    const options = [
      { value: "_eMachineShop 2D", label: `_eMachineShop 2D` },
      { value: "_eMachineShop 3D", label: "_eMachineShop 3D" },
      { value: "Algerian", label: `Algerian` },
      { value: "Arial", label: "Arial" },
      { value: "Arial Black", label: "Arial Black" },
      { value: "Arial Bold", label: "Arial Bold" },
      { value: "Arial Bold Italic", label: "Arial Bold Italic" },
      { value: "Arial Italic", label: "Arial Italic" },
      { value: "Arial Narrow", label: "Arial Narrow" },
      { value: "Arial Narrow Bold", label: "Arial Narrow Bold" },
      { value: "Arial Narrow Bold Italic", label: "Arial Narrow Bold Italic" },
      { value: "Arial Italic", label: "Arial Italic" },
      { value: "Bahnschrift", label: "Bahnschrift" },
      { value: "Baskerville Old Face", label: "Baskerville Old Face" },
      { value: "Bauhaus 93", label: "Bauhaus 93" }
      //   { value: "0.750", label: `0.750${String.fromCharCode(34)}` },
      //   { value: "1,000", label: `1,000${String.fromCharCode(34)}` },
      //   { value: "1,250", label: `1,250${String.fromCharCode(34)}` },
      //   { value: "1,500", label: `1,500${String.fromCharCode(34)}` },
      //   { value: "2,000", label: `2,000${String.fromCharCode(34)}` },
      //   { value: "2,500", label: `2,500${String.fromCharCode(34)}` },
      //   { value: "3,000", label: `3,000${String.fromCharCode(34)}` },
      //   { value: "Other", label: `Other` }
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
        width: 160,
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
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-Font">
          <a href="#">
            <img
              width="18px"
              src="images/Text.png"
              data-place="bottom"
              data-tip="<span>Font<br/>Name of font used to draw text.To change,<br/>
 select a new value. </span>"
            />
          </a>
        </button>
        {/* <span
          stile={{ margin: 0, padding: 0 }}
          data-place="bottom"
          data-tip="<span>Font<br/>Name of font used to draw text.To change,<br/>
select a new value. </span>"
        > */}
        <CreatableSelect
          onMouseLeave={this.handleInputChange}
          styles={customStyles}
          // isClearable
          // defaultValue={options[2]}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          options={options}
          // placeholder=''
        />
        {/* </span> */}
      </Fragment>
    );
  }
}
