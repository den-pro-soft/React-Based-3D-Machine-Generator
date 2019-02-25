import React from "react";
import ReactTooltip from "react-tooltip";

import { connect } from "react-redux";

 class ArcType extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    radius:app.config.radius,
    startAngle: '',
    insideAngle:''
  }
  }
  componentWillMount() {
    app.addHandler("selectElement", element => {

      if (app.selectElements.length == 1) {
        if (element.typeName === "Arc") {
         let radius = (app.selectElements[0].radius).toFixed(3);
         let startAngle = (app.selectElements[0].startAngle).toFixed(3);
         let incrementAngle = (app.selectElements[0].incrementAngle).toFixed(3);
         this.setState({
          startAngle: startAngle + ' deg',
          insideAngle: incrementAngle + ' deg'
         })
      if (this.props.demensions === "Millimeters") {
        app.config.radius = radius + " mm" 
        this.setState({ radius: app.config.radius });
      } else {
        app.config.radius = (radius / 25.4).toFixed(3) + ' "' 
        this.setState({ radius: app.config.radius });
      }
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

if (prevProps.demensions === "Millimeters") {
app.config.radius = (this.state.radius).replace(/[^0-9.]/g, "");
} else {
  app.config.radius = (this.state.radius).replace(/[^0-9.]/g, "")*25.4;
}

let radius = app.config.radius;

if (this.props.demensions === "Millimeters") {
  this.setState({ radius: radius.toFixed(3) +" mm"});
} else {
  this.setState({ radius:(radius / 25.4).toFixed(3) + ' "'});
}

  }
}

  handleChangeInputRadius = e=>{
    let radius = (e.target.value).replace(/[^0-9.]/g, "");
    app.setRadiusForSelectedElements(radius);

    this.setState({
      radius:radius
    })
    if (event.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          radius: radius.replace(/[^0-9.]/g, "").toFixed(3) + " mm"
        });
      } else {
        this.setState({
          radius: radius.replace(/[^0-9.]/g, "").toFixed(3) + ' "'
        });
      }
    }
  }

  handleChangeInputStartAngle = e => {
    let startAngle = (e.target.value).replace(/[^0-9.]/g, "");

    this.setState({
      startAngle
    });
    if (event.charCode === 13) {
    this.setState({
      startAngle:startAngle + ' deg'
    })
  }
}

handleChangeInsideAngle = e => {
  let insideAngle = (e.target.value).replace(/[^0-9.]/g, "");

  this.setState({
    insideAngle
  });
  if (event.charCode === 13) {
  this.setState({
    insideAngle:insideAngle + ' deg'
  })
}
}
  render(){
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
        data-place="bottom"
        data-tip="<span>Inside angle<br/>Angle between lines from the arc center to the end and start<br/> points.To change,
      enter a value and press the Enter key. </span>"
      />
    </>
  );
};
 }
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};

export default connect(mapStateToProps)(ArcType);


