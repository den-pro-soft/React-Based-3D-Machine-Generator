import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

class CircleType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diameter: this.props.diameter
    };
  }

  componentWillMount() {
    app.addHandler("selectElement", element => {
      let arc = app.selectElements.every(el => el.typeName === "Arc");

      if (app.selectElements.length == 1) {
        if (element.typeName === "Arc") {
          let radius = app.selectElements[0].radius.toFixed(3);
          this.props.updateDiameter(radius * 2);
          if (this.props.demensions === "Millimeters") {
            this.setState({ diameter: (radius * 2).toFixed(3) + " mm" });
          } else {
            this.setState({
              diameter: ((radius * 2) / 25.4).toFixed(3) + ' "'
            });
          }
        }
      } else
        if (arc === true && app.selectElements.length > 1) {
          let diameter = '';
          // this.props.updateDiameter(diameter===undefined? 0.000 :diameter);
          this.props.updateDiameter(diameter===undefined? 0.000 :0.000);

          this.setState({ diameter:this.props.diameter  });

          // if (this.props.demensions === "Millimeters") {
          //   if(this.props.diameter!==''&&this.props.diameter!==undefined){
          //     this.setState({ diameter:this.props.diameter +' mm' });

          //   }
          // } else {
          //   if(this.props.diameter!==''){

          //   this.setState({
          //     diameter: (this.props.diameter/ 25.4).toFixed(3) + ' "'
          //   });
          // }
          // }
        }
      
    });

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
      let diameter = this.props.diameter;
console.log(diameter,'diameter-[rops')
      if (this.props.demensions === "Millimeters") {
        this.setState({ diameter: diameter.toFixed(3) + " mm" });
      } else {
        this.setState({ diameter: (diameter / 25.4).toFixed(3) + ' "' });
      }
    }
  }

  handleChangeInputDiameter = e => {
    let diameter = e.target.value;
    let arc = app.selectElements.every(el => el.typeName === "Arc");

    this.setState({
      diameter
    });
    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        // this.setState({
        //   diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
        // });
        if (arc === true && app.selectElements.length > 1) {
          this.setState({
            diameter: diameter/*.replace(/[^0-9.]/g, "")*/ + " mm"
          });
        this.props.updateDiameter(diameter);

        } else {
          this.setState({
            diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
          });
        }
        let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "");
        this.props.updateDiameter(diameter1===undefined? '':diameter1 );

        app.setRadiusForSelectedElements(diameter1 / 2);
        this.diameterInput.blur();
      } else {
        this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + ' "'
        });
        let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "");
        this.props.updateDiameter(diameter1 * 25.4);

        app.setRadiusForSelectedElements((diameter1 / 2) * 25.4);
        this.diameterInput.blur();
      }
    }
  };
  render() {
    console.log(this.props.diameter,'circle-props')
    return (
      <>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
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
          ref={input => {
            this.diameterInput = input;
          }}
          data-place="bottom"
          data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
   press the Enter key.
  </span>"
        />
      </>
    );
  }


}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    diameter: state.toolsPanelReducer.diameter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDiameter: diameter => {
      dispatch({ type: "UPDATE_DIAMETER", payload: diameter });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CircleType);
