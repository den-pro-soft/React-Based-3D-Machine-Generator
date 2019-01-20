import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";
import Creatable from "react-select/lib/Creatable";
import CreatableSelect from "react-select/lib/Creatable";
import InputSelect from "./InputSelect";

export default class ToolsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedOption: null
      displayInputSelect: true
    };
    // this.state = {
    //   datalist: false
    // };
    // this.toogleDatalist = this.toogleDatalist.bind(this);
    // this.hideDropdownList = this.hideDropdownList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  // toogleDatalist(event) {
  //   console.log(event);
  //   event.preventDefault();
  //   this.setState({ datalist: true }, () => {
  //     document.addEventListener("click", this.hideDropdownList);
  //   });
  // }

  // hideDropdownList() {
  //   this.setState({ datalist: false }, () => {
  //     document.removeEventListener("click", this.hideDropdownList);
  //   });
  // }
  // handleChange(newValue, actionMeta){
  //   console.group('Value Changed');
  //   console.log(newValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };
  handleInputChange(inputValue, actionMeta) {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }
  render() {
    const data = [
      "0.002",
      "0.005",
      "0.010",
      "0.020",
      "0.031",
      "0.045",
      "0.062",
      "0.093",
      "0.125",
      "0.187",
      "0.250",
      "0.375",
      "0.500",
      "0.750",
      "1.000",
      "1.250",
      "1.500",
      "2.000",
      "2.500",
      "3.000"
      // "Other"
    ];

    return (
      <div className="ToolsPanel">
        {/* <ReactTooltip
          html={true}
          data-place="right"
          className="tooltipBackgroundTheme"
        /> */}
        <form>
          <button className="btn-LineType">
            <a href="#">
              <img
                width="18px"
                // src="images/question.png"
                src="images/LineType.png"
                data-tip='<span>Line type.</br>Specifies whether the selected line a shape,bend,</br>thread,relation,comment,etc.Select "Auto" in most cases</br>
                when creating the part shape.
                </span>'
              />
            </a>
          </button>
          <select className="select-1">
            <option value="Auto">Auto</option>
            <option value="Bend">Bend</option>
            <option value="mercedes">Thread&amp;Tap</option>
            <option value="LazerMark">Comments to Self</option>
            <option value="LazerMark">Comments to Machinist</option>
            <option value="LazerMark">LazerMark</option>
          </select>

          <button className="btn-Z">
            <a href="#">
              <img
                width="18px"
                src="images/Z.png"
                // data-tip="<span>Z-button</span>"
              />
            </a>
          </button>
          {/*   <input
            list="browsers"
            onClick={this.toogleDatalist}
            onMouseEnter={this.toogleDatalist}
            name="browser"
            style={{ width: "120px" }}
            autoComplete="on"
          />
        <datalist id="browsers" defaultValue="Air Inside">
            <select>
              <option value="Air Inside" />
              <option value="Revolve" />
              {data.map((item, i) => (
                <option key={i} value={item + String.fromCharCode(34)} />
              ))}
              <option value="Other" />
            </select>
          </datalist> */}

          {/* {this.state.displayInputSelect && ( */}
            <InputSelect className="CreatableSelect" />
          {/* )} */}
        </form>
      </div>
    );
  }
}
