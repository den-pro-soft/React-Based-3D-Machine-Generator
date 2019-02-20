import React from "react";
import "./bottom-panel.scss";
import { connect } from "react-redux";
class MouseCoordinates extends React.Component {
  constructor(props) {
    super(props);
    // var x = 0;
    // var y = 0;
    this.state = {
      mouseX: 0 + " mm",
      mouseY: 0 + " mm"
    };
  }

  componentWillMount() {
    // var x=0;
    // var y=0;
    // if(this.props.demensions==='Millimeters') {
    //   this.setState({
    //     mouseX:x+' mm',
    //     mouseY:y+' mm'
    //   })
    // } else {
    //   this.setState({
    //     mouseX:x+' "',
    //     mouseY:y+' "'
    //   })
    // }
    app.board.addHandler("mouseMove", e => {
      // console.log(e, "Will-mouse event");

      let point = e;

      if (this.props.demensions === "Millimeters") {
        this.setState({
          mouseX: point.x.toFixed(3) + " mm",
          mouseY: point.y.toFixed(3) + " mm"
        });
      } else {
        this.setState({
          mouseX: (point.x / 25.4).toFixed(3) + ' "',
          mouseY: (point.y / 25.4).toFixed(3) + ' "'
        });
      }
    });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.demensions === this.props.demensions) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
    
      if (prevState.mouseX === 0 + " mm" && prevState.mouseY === 0 + " mm"||prevState.mouseX === 0 + ' "' && prevState.mouseY === 0 + ' "') {
        //&& this.state.mouseX === 0 +' mm' && this.state.mouseY===0 + ' mm'

        if (this.props.demensions === "Millimeters") {
          //&& this.state.mouseX === 0 +' mm' && this.state.mouseY===0 + ' mm'
          this.setState({
            mouseX: 0 + " mm",
            mouseY: 0 + " mm"
          });
        } else {
          this.setState({
            mouseX: 0 + ' "',
            mouseY: 0 + ' "'
          });
        }
      } else  if (prevState.mouseX !== 0 + " mm" && prevState.mouseY !== 0 + " mm"||prevState.mouseX !== 0 + ' "' && prevState.mouseY !== 0 + ' "'){
        app.board.addHandler("mouseMove", e => {
          // console.log(e, "update-mouse event");
          let point = e;
          // x=point.x.toFixed(3)
          if (this.props.demensions === "Millimeters") {
            this.setState({
              mouseX: point.x.toFixed(3) + " mm",
              mouseY: point.y.toFixed(3) + " mm"
            });
          } else {
            this.setState({
              mouseX: (point.x / 25.4).toFixed(3) + ' "',
              mouseY: (point.y / 25.4).toFixed(3) + ' "'
            });
          }
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
