import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

 class CircleType extends React.Component {
  constructor(props) {
    super(props);
  this.state={diameter:app.config.diameter}
  }
  componentWillMount() {
    app.addHandler("selectElement", element => {

      if (app.selectElements.length == 1) {
        if (element.typeName === "Arc") {
         let radius= (app.selectElements[0].radius).toFixed(3);
        //  console.log(radius,'angle')
      if (this.props.demensions === "Millimeters") {
        app.config.diameter=radius*2 + " mm" 
        this.setState({ diameter: app.config.diameter });
      } else {
        app.config.diameter=(radius*2 / 25.4).toFixed(3) + ' "' 
        this.setState({ diameter: app.config.diameter });
      }
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

if (prevProps.demensions === "Millimeters") {
app.config.diameter=(this.state.diameter).replace(/[^0-9.]/g, "");
} else {
  app.config.lengthLine=(this.state.diameter).replace(/[^0-9.]/g, "")*25.4;
}

let diameter= app.config.diameter;

if (this.props.demensions === "Millimeters") {
  this.setState({ diameter: diameter +" mm"});
} else {
  this.setState({ diameter:(diameter / 25.4).toFixed(3) + ' "'});
}

  }
}

  handleChangeInputDiameter = e=>{
    // console.log(e.target.value,'e.target-diameter')
    let diameter = (e.target.value).replace(/[^0-9.]/g, "");
    app.setRadiusForSelectedElements(diameter/2);

    this.setState({
      diameter:diameter
    })
    if (event.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
        });
      } else {
        this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + ' "'
        });
      }
    }

  }
  render(){
  return (
    <>
      <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
    <button className="btn-Diameter">
      <a href="#">
        <img
          width="18px"
          src="images/Diameter18.png"
          data-place="bottom"
          data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
     press the Enter key.
    </span>"
        />
      </a>
    </button>
    <input
      type="text"
      value={this.state.diameter}
      onChange={this.handleChangeInputDiameter}
      onKeyPress={this.handleChangeInputDiameter}
      data-place="bottom"
      data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
   press the Enter key.
  </span>"
    />
  </>
   )}
  }
  const mapStateToProps = state => {
    return {
      demensions: state.preferencesReducer.demensions
    };
  };
  
  export default connect(mapStateToProps)(CircleType);
