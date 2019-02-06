import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import Line from "../../../model/elements/Line";
export default class LineType extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value:''
    }
  
    app.addHandler("selectElement", element => {
    app.selectElements.map(el=>{
      console.log(el.length(),el, 'length()');
      let lengthLine = (el.length().toFixed(3))+`${String.fromCharCode(34)}`;
      this.setState({value: lengthLine})
    })

    });
  }
  handleChangeInputLength =(event) => {
 console.log(event)
  }
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
          // value={()=>app.length()}
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
// export default LineType;
