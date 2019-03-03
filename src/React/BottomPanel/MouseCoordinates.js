import React from "react";
import "./bottom-panel.scss";
import { connect } from "react-redux";
class MouseCoordinates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: this.props.mouseX + " mm",
      mouseY: this.props.mouseY + " mm"
    };
  }
  componentWillMount() {
    app.board.addHandler("mouseMove", e => {
      let pointX = e.x.toFixed(3);
      let pointY = e.y.toFixed(3);
      this.props.updateMouseCoordinates( pointX,  pointY);

      if (this.props.demensions === "Millimeters") {
        this.setState({
          mouseX: pointX + " mm",
          mouseY: pointY + " mm"
        });
      } else {
        this.setState({
          mouseX: (e.x / 25.4).toFixed(3) + ' "',
          mouseY: (e.y / 25.4).toFixed(3) + ' "'
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

      if (this.props.demensions === "Millimeters") {
        this.setState({
          mouseX: this.props.mouseX + " mm",
          mouseY: this.props.mouseY + " mm"
        });
      } else {
        this.setState({
          mouseX: (this.props.mouseX / 25.4).toFixed(3) + ' "',
          mouseY: (this.props.mouseY / 25.4).toFixed(3) + ' "'
        });     
      }
    }
  }
  render() {
    // console.log(this.props, 'mouse-Coordinate');

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
    demensions: state.preferencesReducer.demensions,
    mouseX: state.mouseCoordinatesReducer.mouseX,
    mouseY: state.mouseCoordinatesReducer.mouseY
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateMouseCoordinates: (mouseX,mouseY) => {
      dispatch({ type: "UPDATE_MOUSE_COORDINATES", payload: mouseX , payload1: mouseY});
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MouseCoordinates);
