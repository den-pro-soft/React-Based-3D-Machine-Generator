import React from "react";
import ReactTooltip from "react-tooltip";

import { connect } from "react-redux";

class ArcType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: this.props.radius,
      startAngle: "",
      insideAngle: ""
    };
  }
 
  componentWillMount() {
    app.addHandler("selectElements", elements => {
      if (app.selectElements.length == 1) {
        if (elements[0].typeName === "Arc") {

          let startAngle = app.selectElements[0].startAngle.toFixed(3);
          let incrementAngle = app.selectElements[0].incrementAngle.toFixed(3);
          this.setState({
            startAngle: startAngle + " deg",
            insideAngle: incrementAngle + " deg"
          });

          let radius = (app.selectElements[0].radius).toFixed(3);
          // console.log(radius, (2).toFixed(3),'radius');
          this.props.updateRadius(radius);
          if (this.props.demensions === "Millimeters") {

            this.setState({ radius: radius + " mm" });

          } else {
            this.setState({ radius: (radius / 25.4).toFixed(3) + ' "' });

          }
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
  
      let radius = this.props.radius;

      if (this.props.demensions === "Millimeters") {
        this.setState({ radius: radius + " mm" });
      } else {
        this.setState({ radius: (radius / 25.4).toFixed(3) + ' "' });
      }
    }
  }

  handleChangeInputRadius = e => {
      let radius = e.target.value;

    this.setState({ radius });
    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {  
        this.setState({
          radius: radius.replace(/[^0-9.]/g, "") + " mm"
        });
        let radius1 = this.state.radius.replace(/[^0-9.]/g, "");
        this.props.updateRadius(+radius1);

        app.setRadiusForSelectedElements(+radius1);
        this.radiusInput.blur();
      } else {
        this.setState({
          radius: radius.replace(/[^0-9.]/g, "") + ' "'
        });

        let radius1 = this.state.radius.replace(/[^0-9.]/g, "");
        this.props.updateRadius(+radius1*25.4);

        app.setRadiusForSelectedElements(+radius1 * 25.4);
        this.radiusInput.blur();
      }
    }
  };

  handleChangeInputStartAngle = e => {
    let startAngle = e.target.value;

    this.setState({ startAngle });

    if (e.charCode === 13) {

      this.setState({
        startAngle: startAngle.replace(/[^0-9.]/g, "") + " deg"
      });
      let startAngle1 = this.state.startAngle.replace(/[^0-9.]/g, "");
      app.setArcAngles(+startAngle1, null);
      this.startAngle.blur();
    }
  };

  handleChangeInsideAngle = e => {
    let insideAngle = e.target.value;

    this.setState({ insideAngle });

    if (e.charCode === 13) {
      this.setState({
        insideAngle: insideAngle.replace(/[^0-9.]/g, "") + " deg"
      });
      let insideAngle1 = this.state.insideAngle.replace(/[^0-9.]/g, "");
      app.setArcAngles(null, +insideAngle1);
      this.insideAngle.blur();
    }
  };
  render() {
    return (
      <>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-Radius">
          <a href="#">
            <img
              width="18px"
              src="images/Circle.png"
              data-place="bottom"
              data-tip="<span>Radius<br/>Distance from the center of the arc to the edge.To change<br/>
      enter a value and press the Enter key</span>"
            />
          </a>
        </button>
        <input
          type="text"
          value={this.state.radius}
          onChange={this.handleChangeInputRadius}
          onKeyPress={this.handleChangeInputRadius}
          ref={input => {
            this.radiusInput = input;
          }}
          data-place="bottom"
          data-tip="<span>Radius<br/>Distance from the center of the arc to the edge.To change<br/>
      enter a value and press the Enter key</span>"
        />
        <button className="btn-StartAngle">
          <a href="#">
            <img
              width="18px"
              src="images/Circle.png"
              data-place="bottom"
              data-tip="<span>Start Angle<br/>Angle of the line from the center to the most clockwise point of<br/>
      the arc.To change enter a value and press the Enter key</span>"
            />
          </a>
        </button>
        <input
          type="text"
          value={this.state.startAngle}
          onChange={this.handleChangeInputStartAngle}
          onKeyPress={this.handleChangeInputStartAngle}
          ref={input => {
            this.startAngle = input;
          }}
          data-place="bottom"
          data-tip="<span>Start Angle<br/>Angle of the line from the center to the most clockwise point of<br/>
      the arc.To change enter a value and press the Enter key</span>"
        />
        <button className="btn-LineAngle">
          <a href="#">
            <img
              width="18px"
              src="images/Circle.png"
              data-place="bottom"
              data-tip="<span>Inside angle<br/>Angle between lines from the arc center to the end and start<br/> points.To change,
 enter a value and press the Enter key. </span>"
            />
          </a>
        </button>
        <input
          type="text"
          value={this.state.insideAngle}
          onChange={this.handleChangeInsideAngle}
          onKeyPress={this.handleChangeInsideAngle}
          ref={input => {
            this.insideAngle = input;
          }}
          data-place="bottom"
          data-tip="<span>Inside angle<br/>Angle between lines from the arc center to the end and start<br/> points.To change,
      enter a value and press the Enter key. </span>"
        />
       </>
    );
  }
}

const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    radius: state.toolsPanelReducer.radius
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateRadius: radius => {
      dispatch({ type: "UPDATE_RADIUS", payload: radius });
    }
  };
};
 export default connect(mapStateToProps,mapDispatchToProps)(ArcType);
