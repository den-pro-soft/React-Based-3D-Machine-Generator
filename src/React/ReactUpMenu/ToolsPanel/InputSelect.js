import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import { Fragment } from "react";
import { connect } from "react-redux";
const optionsData=['Air Inside','Revolve','0.005','0.080','0.130']
const options = [
  { value: "Air Inside", label: 'Air Inside'},
  { value: "Revolve", label: `Revolve` },
  { value: "0.05", label: '0.005 mm' },
  { value: "0.08", label: '0.080 mm' },
  { value: "0.13", label: `0.130 mm` },
  { value: "0.25", label: `0.250 mm` },
  { value: "0.51", label: `0.510 mm` },
  { value: "0.79", label: `0.790 mm` },
  { value: "1.14", label: `1.140 mm` },
  { value: "1.59", label: `1.590 mm` },
  { value: "2.36", label: `2.360 mm` },
  { value: "3.17", label: `3.170 mm` },
  { value: "4.75", label: `4.750 mm` },
  { value: "6.35", label: `6.350 mm` },
  { value: "9.52", label: `9.520 mm` },
  { value: "10.00", label: `10.000 mm` },
  { value: "12.70", label: `12.700 mm` },
  { value: "19.05", label: `19.050 mm` },
  { value: "25.40", label: `25.400 mm` },
  { value: "31.75", label: `31.750 mm` },
  { value: "38.10", label: `38.100 mm` },
  { value: "50.80", label: `50.800 mm` },
  { value: "63.50", label: `63.500 mm` },
  { value: "76.20", label: `76.200 mm` },
  { value: "Other", label: `Other` }
];
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
  { value: "0.394", label: `0.394 "` },
  { value: "0.500", label: `0.500 "` },
  { value: "0.750", label: `0.750 "` },
  { value: "1.000", label: `1.000 "` },
  { value: "1.250", label: `1.250 "` },
  { value: "1.500", label: `1.500 "` },
  { value: "2.000", label: `2.000 "` },
  { value: "2.500", label: `2.500 "` },
  { value: "3.000", label: `3.000 "` },
  { value: "Other", label: `Other` }
];
class InputSelect extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        // selectedOption: null,
        newValue:null,
        options:options,
        displayInputSelect: true
      };
    }

        componentWillMount() {

      if (this.props.demensions === 'Millimeters') {
        this.setState({
          options: options,
          newValue:options[15]
        });
      //  let val = parseInt(options[15].value);
      //   app.setElementsHeight(val ? val : 0.075);
          localStorage.setItem('z-value',options[15].label)

      } else {
        this.setState({
          options: options_inch,
          newValue:options_inch[14]

        });
        // let val = parseInt(options_inch[14].value);
        // app.setElementsHeight(val ? val : 0.075);
          localStorage.setItem('z-value',options_inch[14].label)

          }
          app.addHandler("selectElements", elements => {

            if (app.selectElements.length === 1) {
                  let val = parseInt(options[15].value);
                // app.setElementsHeight(val ? val : 0.075);
            }
          })
    }
  

    handleChange = (newValue, actionMeta) => {
      this.setState({newValue})
  
  //  let val = parseInt(newValue.value);
        // app.setElementsHeight(val ? val : 0.075);
        // app.setElementsHeight(75);
      console.group('Value Changed');
      console.log(newValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();

    };
// updateHeight=()=>{
//           app.setElementsHeight(75);

// }
    handleInputChange = (inputValue, actionMeta) => {
      // app.setElementsHeight(inputValue);
      console.group('Input Changed');
      console.log(inputValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
          let newValue = options.some(el => el.value === (+inputValue * 1).toFixed(3));
      let newValueInch = options_inch.some(el => el.value === (+inputValue * 1).toFixed(3));
      console.log(newValue, 'valueList')
      if (this.props.demensions === 'Millimeters') {
        if (newValue === false && inputValue !== null && inputValue !== '') {
          options.push({
            value: (+inputValue * 1).toFixed(3), label: (+inputValue * 1).toFixed(3) + ' mm'
          })
        }
      } else {
        if (newValueInch === false && inputValue !== null && inputValue !== '') {
          options_inch.push({
            value: (+inputValue * 1).toFixed(3), label: (+inputValue * 1).toFixed(3) + ' "'
          })
        }
      }
    }
 

    componentDidUpdate(prevProps, prevState) {
      if (this.props.demensions !== prevProps.demensions) {
        if (this.props.demensions === 'Millimeters') {
          this.setState({
            options: options,
            newValue:options[15]
          });
    
          localStorage.setItem('z-value',options[15].label)

        } else {
          this.setState({
            options: options_inch,
            newValue:options_inch[14]
          });
    
          localStorage.setItem('z-value',options_inch[14].label)
          
        }
      }
    }
  // //data processing from input-select - Z
  //   handleChange = (selectedOption) => {

  //     // this.setState({ selectedOption, displayInputSelect: false},
  //     //   ()=>{
  //     //     this.setState({selectedOption:this.state.selectedOption});
  //     // console.log(this.state.selectedOption, selectedOption,'1-selectedOption ');

  //     //   }
  //     //   );
  //     console.log(/*this.state.selectedOption, */selectedOption,'2-selectedOption ');
  //     if(this.props.demensions==='Millimeters'){
  //       localStorage.setItem('z-value',selectedOption.value + ' mm');
  //       // this.setState({ selectedOption, displayInputSelect: false },
  //       //   ()=>{
  //       //     this.setState({selectedOption, displayInputSelect: true});
  //       // console.log(this.state.selectedOption, selectedOption,'1-selectedOption ');
  
  //       //   }
  //       //   );
  //     console.log(this.state.selectedOption,selectedOption,'3-selectedOption ');

  //       this.setState({
  //         options: options,
  //         selectedOption:selectedOption,
  //         // selectedOption:this.state.selectedOption,

  //         displayInputSelect: false
  //       });
  //     console.log(this.state.selectedOption,selectedOption,'4-selectedOption ');

  //     } else {
  //       localStorage.setItem('z-value',selectedOption.value + ' "')
  //       this.setState({
  //         options: options_inch,
  //         selectedOption

  //       });
  //     }
  //     console.log(`Option selected:`, selectedOption.value);

  //     if (this.props.demensions === 'Millimeters') {
  //       let val = parseInt(selectedOption.value);
  //       app.setElementsHeight(val ? val : 0.075);
  //     } else {
  //       let val = parseInt(selectedOption.value*25.4);
  //       app.setElementsHeight(val ? val : 0.075);
  //     }
  //   };


 
    render() {
    
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
          height: 20,
          width: 120,
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
    
          <CreatableSelect
            onMouseLeave={this.handleInputChange}
            styles={customStyles}
            // isClearable
            // defaultValue={this.state.selectedOption}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            // onKeyPress={this.handleInputChange}
            // allowCreate={false}
            options={this.state.options}

            // options={this.state.options}
            // value={this.state.selectedOption}
            value={this.state.newValue}

            placeholder=""
          />
        </Fragment>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      demensions: state.preferencesReducer.demensions,
      z_value:state.toolsPanelReducer.z_value

    };
  };

  export default connect(mapStateToProps)(InputSelect);

