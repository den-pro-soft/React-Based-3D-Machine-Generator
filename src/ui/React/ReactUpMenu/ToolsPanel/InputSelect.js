import React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import { Fragment } from "react";
import { connect } from "react-redux";
import GraphicElement from "../../../../model/GraphicElement";

const options = [
  { value: "Air Inside", label: "Air Inside" },
  // { value: "Revolve",label: `Revolve` },
  { value: "0.050", label: "0.050 mm" },
  { value: "0.080", label: "0.080 mm" },
  { value: "0.130", label: `0.130 mm` },
  { value: "0.250", label: `0.250 mm` },
  { value: "0.510", label: `0.510 mm` },
  { value: "0.790", label: `0.790 mm` },
  { value: "1.140", label: `1.140 mm` },
  { value: "1.590", label: `1.590 mm` },
  { value: "2.360", label: `2.360 mm` },
  { value: "3.170", label: `3.170 mm` },
  { value: "4.750", label: `4.750 mm` },
  { value: "6.350", label: `6.350 mm` },
  { value: "9.520", label: `9.520 mm` },
  { value: "10.000", label: `10.000 mm` },
  { value: "12.700", label: `12.700 mm` },
  { value: "19.050", label: `19.050 mm` },
  { value: "25.400", label: `25.400 mm` },
  { value: "31.750", label: `31.750 mm` },
  { value: "38.100", label: `38.100 mm` },
  { value: "50.800", label: `50.800 mm` },
  { value: "63.500", label: `63.500 mm` },
  { value: "76.200", label: `76.200 mm` },
  { value: "", label: "" },
  { value: "Other", label: `Other` }
];
const options_inch = [
  { value: "Air Inside", label: `Air Inside` },
  // { value: "Revolve", label: `Revolve` },
  { value: "0.002", label: `0.002 "` },
  { value: "0.003", label: `0.003 "` },
  { value: "0.005", label: `0.005 "` },
  { value: "0.009", label: `0.009 "` },
  { value: "0.020", label: `0.020 "` },
  { value: "0.031", label: `0.031 "` },
  { value: "0.044", label: `0.044 "` },
  { value: "0.062", label: `0.062 "` },
  { value: "0.092", label: `0.092 "` },
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
  { value: "", label: "" },
  { value: "Other", label: `Other` }
];
// ---------------------------------------------------------------------------------------------------------------------------------------
class InputSelect extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        options: options,
        displayInputSelect: true,
        newValue: this.props.z_value
      };
    }

    componentWillMount() {
      // console.log(app.config.indexZ,'1-indexZ')
      this.defaultValueFunction();

      this.outputData();
      // console.log(app.config.indexZ,'2-indexZ')
    }

    // componentWillReceiveProps(nextProps){
    componentDidUpdate(prevProps, prevState) {
      if (this.props.demensions !== prevProps.demensions) {
        // console.log(app.config.indexZ, "3-indexZ-Update");

        // if (nextProps.demensions === 'Millimeters') {
        if (this.props.demensions === "Millimeters") {
          this.setState({
            options: options,
            newValue: options[app.config.indexZ]
          });
          localStorage.setItem("z-value", options[app.config.indexZ].label);
        } else {
          this.setState({
            options: options_inch,
            newValue: options_inch[app.config.indexZ]
          });

          localStorage.setItem("z-value", options_inch[app.config.indexZ].label);
        }
      }
    }

    defaultValueFunction = () => {
      let height = app.selectElements[0].height;
      const AirInside = GraphicElement.AirInside;
      // console.log(height,AirInside,'update-height');
      let defaultValue = options.some(el => {
        el.value === height.toFixed(3);
        // console.log(el.value,height.toFixed(3),'defaultValue')
      });
      // let defaultValueInch = options_inch.some(el => el.value === height.toFixed(3));
      if (AirInside !== height && defaultValue === false) {
        options.push({
          value: height.toFixed(3),
          label: height.toFixed(3) + " mm"
        });
        options_inch.push({
          value: (height / 25.4).toFixed(3),
          label: (height / 25.4).toFixed(3) + ' "'
        });
        let indexZ = options.findIndex(el => {
          return el.value === height.toFixed(3);
        });
        app.config.indexZ = indexZ;
      }
    };
    outputData = () => {
      let height = app.selectElements[0].height;
      const AirInside = GraphicElement.AirInside;
      // console.log(height,AirInside,'update-height');

      let some_Z = app.selectElements.every(el => el.height === height);

      // console.log(some_Z,'some-Z')
      if (this.props.demensions === "Millimeters") {
        if (AirInside === height && some_Z === true) {
          this.setState({
            options: options,
            newValue: options[0]
          });
          app.config.indexZ = 0;
        } else if (some_Z === false && app.selectElements.length > 1) {
          this.setState({
            options: options,
            newValue: options[23]
          });
          app.config.indexZ = 23;
        } else if (Number.isNaN(+options[app.config.indexZ].value) === true) {
          this.setState({
            options: options,
            // newValue: options[app.config.indexZ - 1],
            newValue: options[8],
            displayInputSelect: true
          });
          // app.config.indexZ = app.config.indexZ - 1;
          app.config.indexZ = 8;
        } else {
          this.setState({
            options: options,
            newValue: options[app.config.indexZ]
          });
        }
        // let indexZ = options.findIndex(el=> {return el.value===height.toFixed(3)});
        // app.config.indexZ = indexZ;
        localStorage.setItem("z-value", options[app.config.indexZ].label);
      } else {
        if (AirInside === height && some_Z === true) {
          this.setState({
            options: options_inch,
            newValue: options_inch[0]
          });
          app.config.indexZ = 0;
        } else if (some_Z === false && app.selectElements.length > 1) {
          this.setState({
            options: options_inch,
            newValue: options_inch[23]
          });
          app.config.indexZ = 23;
        } else if (Number.isNaN(+options_inch[app.config.indexZ].value) === true) {
          this.setState({
            options: options_inch,
            // newValue: options_inch[app.config.indexZ - 1],
            newValue: options_inch[8],
            displayInputSelect: true
          });
          // app.config.indexZ = app.config.indexZ - 1;
          app.config.indexZ = 8;

        } else {
          this.setState({
            options: options_inch,
            newValue: options_inch[app.config.indexZ]
          });
        }

        localStorage.setItem("z-value", options_inch[app.config.indexZ].label);
      }
    };

    handleChange = (newValue, actionMeta) => {
        // console.log(newValue, "1-defaultState");
        if(newValue.value===''){
          app.congif.indexZ=app.congif.indexZ-1;
        }

        if (this.props.demensions === "Millimeters") {
        localStorage.setItem("z-value", newValue.label);
   
        if (newValue.value === "Air Inside") {
          app.setElementsHeight(GraphicElement.AirInside);
        }
         else {
          // let val = parseInt(newValue.value);
          // app.setElementsHeight(val ? val : 0.075);
          app.setElementsHeight(+newValue.value);
        }
      } else {
        localStorage.setItem("z-value", newValue.label);

        if (newValue.value === "Air Inside") {
          // let val = parseInt( GraphicElement.AirInside);
          app.setElementsHeight(GraphicElement.AirInside);
        } else {
          // let val = parseInt(newValue.value*25.4);
          // app.setElementsHeight(val ? val : 0.075);
          app.setElementsHeight(+newValue.value * 25.4);
        }
      }
    };

    handleInputChange = (inputValue, actionMeta) => {
      // console.group('Input Changed');
      // console.log(+inputValue, " 1-inputValue");
      // console.log(`action: ${actionMeta.action}`);
      // console.groupEnd();

      if (Number.isNaN(+inputValue) === true||inputValue==='') {
        // console.log(Number.isNaN(+inputValue), " 2-inputValue");
        inputValue = app.selectElements[0].height;
        app.setElementsHeight(app.selectElements[0].height);

        }
        let newValue = options.some(
          el => el.value === (+inputValue * 1).toFixed(3)
        );
        let newValueInch = options_inch.some(
          el => el.value === (+inputValue * 1).toFixed(3)
        );
        if (this.props.demensions === "Millimeters") {
     
          if (newValue === false &&inputValue !== null &&inputValue !== "" ) {

            options.push({
              value: (+inputValue * 1).toFixed(3),
              label: (+inputValue * 1).toFixed(3) + " mm"
            });
            options_inch.push({
              value: (+inputValue / 25.4).toFixed(3),
              label: (+inputValue / 25.4).toFixed(3) + ' "'
            });
          }
          let indexZ = options.findIndex(el => {
            return el.value === inputValue;
          });
          // this.props.updateIndexZ(indexZ)
          app.config.indexZ = indexZ;
        } else {
          if (newValueInch === false &&inputValue !== null &&inputValue !== "") {
            options_inch.push({
              value: (+inputValue * 1).toFixed(3),
              label: (+inputValue * 1).toFixed(3) + ' "'
            });
            options.push({
              value: (+inputValue * 25.4).toFixed(3),
              label: (+inputValue * 25.4).toFixed(3) + " mm"
            });
          }
          let indexZ = options_inch.findIndex(el => {
            return el.value === inputValue;
          });
          // this.props.updateIndexZ(indexZ)
          app.config.indexZ = indexZ;
        }
    };

    render() {
      // console.log(this.props,'props-input-select')
      //Warning!!! CustomStyles for React-Select module - https://react-select.com/props#statemanager-props
      const customStyles = {
        container: styles => ({
          ...styles
        }),
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
          paddingTop: "2px",
          paddingBottom: "0px",
          height: 20,
          width: 120,
          color: "black",
          fontFamily: "sans-serif",
          fontSize: "12.5px",
          fontWeght: "bold",
          backgroundColor: "#fff",
          border: "1px solid #808080"
        }),
        input:
          // styles => ({
          //   ...styles,
          () => ({
            background: "white"
          }),
        option: () => ({
          fontFamily: "sans-serif",
          fontSize: "12.5px",
          fontWeght: "bold",
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
        <Fragment>
          <button className="btn-Z tooltip-Z">
            <a href="#">
              <img
                width="18px"
                src="resources/images/Z.png"
                data-place="bottom"
                data-tip={container.resolve("tips").getTip('numeric-Z')} data-html={true}
              />
            </a>
          </button>

          <CreatableSelect
            onMouseLeave={this.handleInputChange}
            styles={customStyles}
            // isClearable
            // defaultValue={this.state.newValue}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            // onKeyPress={this.handleInputChange}
            options={this.state.options}
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
        z_value: state.inputSelectReducer.z_value,
        indexZ: state.inputSelectReducer.indexZ
      };
    }

    const mapDispatchToProps = dispatch => {
      return {
        updateZValue: z_value => {
          dispatch({ type: "UPDATE_Z_VALUE", payload: z_value });
        },
        updateIndexZ: indexZ => {
          dispatch({ type: "UPDATE_INDEX_Z", payload: indexZ });
        }
      };
    }

export default connect(mapStateToProps,mapDispatchToProps)(InputSelect);
