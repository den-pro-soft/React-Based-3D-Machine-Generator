import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import { Fragment } from "react";
import { connect } from "react-redux";

const options = [
  { value: "45.00", label: '45.00 deg' },

  { value: "60.00", label: '60.00 deg' },
  { value: "90.00", label: '90.00 deg' },
  { value: "92.00", label: '92.00 deg'}, 
  { value: "95.00", label: '95.00 deg'}, 
  { value: "135.00", label: '135.00 deg'}, 

//   { value: "", label: "" },
];

// ---------------------------------------------------------------------------------------------------------------------------------------
class InputSelectAuto extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        options:options,
        displayInputSelect: true,
        newValue:options[2]
      };
    }


    handleChange = (newValue, actionMeta) => {
      // console.log(newValue,'1-defaultState');
        
        this.setState({
          options: options,
          newValue: newValue,
          displayInputSelect: false
        });

      }


    handleInputChange = (inputValue, actionMeta) => {
      // console.group('Input Changed');
      // console.log(inputValue);
      // console.log(`action: ${actionMeta.action}`);
      // console.groupEnd();
          let newValue = options.some(el => el.value === (+inputValue * 1).toFixed(2));
      // console.log(newValue, 'valueList')
        if (newValue === false && inputValue !== null && inputValue !== '') {
          options.push({
            value: (+inputValue * 1).toFixed(2), label: (+inputValue * 1).toFixed(2) + ' deg'
          });
        
        }
 
    }
 
    render() {
      // console.log(this.props,'props-input-select')
      //Warning!!! CustomStyles for React-Select module - https://react-select.com/props#statemanager-props
      const customStyles = {
        container:(styles)=>({
            ...styles,
        }),
        menuList: styles => ({
          ...styles,
          position: "relative",
          bottom: 8,
          backgroundColor: "white"
        }),
        control:
         () => ({
          //  styles => ({
          //  ...styles,
          display: "flex",
          paddingTop: '2px',
          paddingBottom:'0px',
          height: 18,
          width: 200,
          color:'black',
          fontFamily:'sans-serif',
          fontSize: '12.5px',
          fontWeght:'bold',
          // color:'green',
          backgroundColor: "#fff",
          border: "1px solid #808080"
        }),
        input: 
        // styles => ({
        //   ...styles,
        () => ({
          background: "white",
        }),
        option: () => ({
          fontFamily:'sans-serif',
          fontSize: '12.5px',
          fontWeght:'bold',
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
          color: "orangered"
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
            // defaultValue={this.state.newValue}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            // onKeyPress={this.handleInputChange}
            // allowCreate={false}
            options={this.state.options}
            value={this.state.newValue}
            placeholder=""
          />
      );
    }
  }
//   const mapStateToProps = state => {
//     return {
//       demensions: state.preferencesReducer.demensions,
//       z_value:state.inputSelectReducer.z_value,
//       indexZ: state.inputSelectReducer.indexZ
//     };
//   };
//   const mapDispatchToProps = dispatch => {
//     return {
//       updateZValue: z_value => {
//         dispatch({ type: "UPDATE_Z_VALUE", payload: z_value });
//       },
//       updateIndexZ: indexZ => {
//         dispatch({ type: "UPDATE_INDEX_Z", payload: indexZ });
//       }
   
//     };
//   }
//   export default connect(mapStateToProps,mapDispatchToProps)(InputSelectAuto);
  export default InputSelectAuto;


