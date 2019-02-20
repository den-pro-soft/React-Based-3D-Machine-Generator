import React from "react";
import "./bottom-panel.scss";
import { connect } from "react-redux";
class MouseCoordinates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: app.config.mouseX + " mm",
      mouseY: app.config.mouseY + " mm"
    };
  }

  componentWillMount() {

    app.board.addHandler("mouseMove", e => {

      let point = e;

      if (this.props.demensions === "Millimeters") {
        app.config.mouseX = point.x.toFixed(3) + " mm";
        app.config.mouseY = point.y.toFixed(3) + " mm";

        this.setState({
          mouseX: app.config.mouseX,
          mouseY: app.config.mouseY
        });
      } else {
        app.config.mouseX =  (point.x / 25.4).toFixed(3) + ' "'
        app.config.mouseY = (point.y / 25.4).toFixed(3) + ' "'
        this.setState({
          mouseX: app.config.mouseX,
          mouseY: app.config.mouseY
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

      if (prevProps.demensions === "Millimeters") {
      app.config.mouseX=(this.state.mouseX).replace(/[^0-9.]/g, "");
      app.config.mouseY=(this.state.mouseY).replace(/[^0-9.]/g, "");

      } else {
        app.config.mouseX=(this.state.mouseX).replace(/[^0-9.]/g, "")*25.4;
        app.config.mouseY=(this.state.mouseY).replace(/[^0-9.]/g, "")*25.4;

      }
      
      let newMouseX= app.config.mouseX;
      let newMouseY= app.config.mouseY;

      
      if (this.props.demensions === "Millimeters") {
        this.setState({ 
          mouseX: newMouseX.toFixed(3) +" mm",
          mouseY: newMouseY.toFixed(3) +" mm",

      });
      } else {
        this.setState({ 
          mouseX:(newMouseX / 25.4).toFixed(3) + ' "',
          mouseY:(newMouseY / 25.4).toFixed(3) + ' "'
        });
        
      }
      
        }
   
  }
  render() {
    // console.log('State-Props',this.props)

    return (
      <div className="MouseCoordinates">
        <span className="MouseX">{this.state.mouseX}</span>
        <span className="MouseY">{this.state.mouseY}</span>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};
export default connect(mapStateToProps)(MouseCoordinates);
