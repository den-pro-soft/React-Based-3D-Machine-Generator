import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import { connect } from "react-redux";

class LineType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthLine: this.props.lengthLine,
      angle: ""
    };
  }

  componentWillMount() {
    app.addHandler("selectElement", element => {
      if (app.selectElements.length == 1) {
        if (element.typeName === "Line") {
          let angle = app.selectElements[0].angle.toFixed(3);
          this.setState({ angle: angle + " deg" });
          //  console.log(angle,'angle')
          let lengthLine = element.length().toFixed(3);
          this.props.updateLengthLine(lengthLine);

          if (this.props.demensions === "Millimeters") {
            this.setState({ lengthLine: lengthLine + " mm" });
          } else {
            this.setState({
              lengthLine: (lengthLine / 25.4).toFixed(3) + ' "'
            });
          }
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
      let lengthLine = this.props.lengthLine;
      if (this.props.demensions === "Millimeters") {
        this.setState({ lengthLine: lengthLine  + " mm" });
      } else {
        this.setState({ lengthLine: (lengthLine / 25.4).toFixed(3) + ' "' });
      }
    }
  }

  handleChangeInputLength = e => {
    let lengthLine = e.target.value;

    this.setState({ lengthLine });

    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          lengthLine: lengthLine.replace(/[^0-9.]/g, "") + " mm"
        });
        let lengthLine1 = this.state.lengthLine.replace(/[^0-9.]/g, "");
        this.props.updateLengthLine(lengthLine1);
        app.setLineLengthElement(lengthLine1);
        this.textInput.blur();
      } else {
        this.setState({
          lengthLine: lengthLine.replace(/[^0-9.]/g, "") + ' "'
        });
        let lengthLine1 = this.state.lengthLine.replace(/[^0-9.]/g, "");
        // console.log(lengthLine1,'leghtInch')
        this.props.updateLengthLine(lengthLine1 * 25.4);
        this.textInput.blur();

        app.setLineLengthElement(lengthLine1 * 25.4);
      }
    }
  };

  handleChangeLineAngle = e => {
    let angle = e.target.value;
    // console.log(angle, "angle-slice");
    // .replace(/[^0-9.]/g, "")

    this.setState({
      angle
    });
    if (e.charCode === 13) {
      this.setState({
        angle: angle.replace(/[^0-9.]/g, "") + " deg"
      });
      let angle1 = this.state.angle.replace(/[^0-9.]/g, "");
      app.setLineAngleElement(angle1);
      this.angleInput.blur();
    }
  };

  render() {
    // console.log(this.props, "props-LineLength");
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
          value={this.state.lengthLine}
          onChange={this.handleChangeInputLength}
          onKeyPress={this.handleChangeInputLength}
          ref={input => {
            this.textInput = input;
          }}
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
          value={this.state.angle}
          onChange={this.handleChangeLineAngle}
          onKeyPress={this.handleChangeLineAngle}
          ref={input => {
            this.angleInput = input;
          }}
          data-place="bottom"
          data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
 enter a value and press the Enter key. </span>"
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    lengthLine: state.toolsPanelReducer.lengthLine
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLengthLine: lengthLine => {
      dispatch({ type: "UPDATE_LENGTH_LINE", payload: lengthLine });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineType);
