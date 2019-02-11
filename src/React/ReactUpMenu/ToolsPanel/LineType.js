import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
export default class LineType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    console.log(props, "props-LineType");

  }

  componentWillMount() {
    app.addHandler("selectElement", element => {
      if(app.selectElements.length==1){
        if (element.typeName === "Line") {
          if(this.props.demensions==='Inches'){
          let lengthLine = element.length().toFixed(3) + `${String.fromCharCode(34)}`;
          this.setState({ value: lengthLine });
          } else {
            let lengthLine = ((element.length())*25.4).toFixed(3) + `mm`;
          this.setState({ value: lengthLine });

          }
        }
      }
    });
  }

  handleChangeInputLength = event => {

  };

  render() {
    return (
      <Fragment>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-Length">
          <a href="#">
            <img
              width="18px"
              src="images/Line.png"
              data-place="bottom"
              data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
            />
          </a>
        </button>
        <input
          type="text"
          // value={this.props.lengthLine}
          value={this.state.value}
          onChange={this.handleChangeInputLength}
          data-place="bottom"
          data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
      enter a value and press the Enter key</span>"
        />
        <button className="btn-LineAngle">
          <a href="#">
            <img
              width="18px"
              src="images/Line.png"
              data-place="bottom"
              data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
            />
          </a>
        </button>
        <input
          type="text"
          data-place="bottom"
          data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
        />
      </Fragment>
    );
  }
}
