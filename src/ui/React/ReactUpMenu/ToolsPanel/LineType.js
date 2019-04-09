import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import { connect } from "react-redux";

class LineType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // lengthLine: this.props.lengthLine,
      lengthLine:'',
      angle: ""
    };
  }

  componentWillMount() {
    app.addHandler("selectElements", elements => {
      if (app.selectElements.length == 1) {
        if (elements[0].typeName === "Line") {
          let angle = app.selectElements[0].angle.toFixed(2);
          this.setState({ angle: angle + " deg" });
          //  console.log(angle,'angle')
          let lengthLine = elements[0].length().toFixed(3);
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

  componentWillReceiveProps(nextProps){

  // componentDidUpdate(prevProps, prevState) {
    // if (this.props.demensions !== prevProps.demensions) {
      let lengthLine = this.props.lengthLine;
      // if (this.props.demensions === "Millimeters") {
      if (nextProps.demensions === "Millimeters") {

        this.setState({ lengthLine: lengthLine  + " mm" });
      } else {
        this.setState({ lengthLine: (lengthLine / 25.4).toFixed(3) + ' "' });
      }
    // }
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
        app.setLineLengthElement(lengthLine1 * 25.4);
        this.textInput.blur();
      }
    }
  };

  handleChangeLineAngle = e => {
    let angle = e.target.value;

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
              src="resources/images/Line-length.jpg"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-line-length')} data-html={true}
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
          data-tip={container.resolve("tips").getTip('numeric-line-length')} data-html={true}
        />
        <button className="btn-LineAngle">
          <a href="#">
            <img
              width="18px"
              src="resources/images/Line-angle.jpg"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-line-angle')} data-html={true}
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
          data-tip={container.resolve("tips").getTip('numeric-line-angle')} data-html={true}
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
}

const mapDispatchToProps = dispatch => {
  return {
    updateLengthLine: lengthLine => {
      dispatch({ type: "UPDATE_LENGTH_LINE", payload: lengthLine });
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineType);
