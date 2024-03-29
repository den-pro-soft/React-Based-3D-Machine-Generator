import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

class CircleType extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // diameter: this.props.diameter
        diameter: app.config.diameter
      };
 
    }

    componentWillMount() {

      const { _elements } = app.currentDocument;
      let arc = _elements.every(el => el.typeName === "Arc");
      let arc_radius = _elements.every(el => el.radius === app.config.diameter / 2);
      // let arc_radius = _elements.every(el => el.radius === this.props.diameter / 2);


      if (arc === true && arc_radius === false && app.selectElements.length > 1) {

        let diameter = '';
        app.config.diameter = diameter;
        // this.props.updateDiameter(diameter);
        this.setState({ diameter })
      } else
        if (arc === true && arc_radius === true && app.selectElements.length > 1) {
          app.addHandler("selectElements", elements => {

            if (this.props.demensions === "Millimeters") {
              // this.setState({ diameter: (this.props.diameter * 1).toFixed(3) + " mm" });
              this.setState({ diameter: (app.config.diameter * 1).toFixed(3) + " mm" });
            } else {
              this.setState({
                // diameter: ((this.props.diameter * 1) / 25.4).toFixed(3) + ' "'
                diameter: ((app.config.diameter * 1) / 25.4).toFixed(3) + ' "'
              });
            }
          })
        } else {

          app.addHandler("selectElements", elements => {

            if (app.selectElements.length === 1) {
              if (elements[0].typeName === "Arc") {

                let radius = app.selectElements[0].radius.toFixed(3);
                // this.props.updateDiameter(radius * 2);
                app.config.diameter = radius * 2;

                if (this.props.demensions === "Millimeters") {
                  this.setState({ diameter: (radius * 2).toFixed(3) + " mm" });
                } else {
                  this.setState({
                    diameter: ((radius * 2) / 25.4).toFixed(3) + ' "'
                  });
                }
              }
            }
          });

        }
    }

    componentWillReceiveProps(nextProps){
 
    // componentDidUpdate(prevProps, prevState) {
    //   if (this.props.demensions !== prevProps.demensions) {

      // let diameter = this.props.diameter!==NaN?this.props.diameter:'';
      let diameter = app.config.diameter!==NaN ? app.config.diameter : '';
      // this.props.updateDiameter(diameter);       
      if(diameter===''){
        this.setState({ diameter});
      } else 
      if (nextProps.demensions === 'Millimeters') {
              // if (this.props.demensions === "Millimeters") {
                this.setState({ diameter: (diameter*1).toFixed(3) + " mm" });

              } else {
                this.setState({ diameter: (diameter / 25.4).toFixed(3) + ' "' });

              }     
          // }
    }

  handleChangeInputDiameter = e => {
    let diameter = e.target.value;

    this.setState({
      diameter
    });
    if (e.charCode === 13) {
 
        if (this.props.demensions === "Millimeters") {

          this.setState({
          diameter: diameter.replace(/[^0-9.]/g, "") + " mm"
        });
      
          let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "");
          // this.props.updateDiameter(+diameter1);
          app.config.diameter = +diameter1;
          app.setRadiusForSelectedElements(+diameter1 / 2);
          this.diameterInput.blur();
        } else {
          this.setState({
            diameter: diameter.replace(/[^0-9.]/g, "") + ' "'
          });
          let diameter1 = this.state.diameter.replace(/[^0-9.]/g, "")
          // this.props.updateDiameter(+diameter1*25.4);
          app.config.diameter = +diameter1*25.4;
          app.setRadiusForSelectedElements((diameter1 / 2) * 25.4);
          this.diameterInput.blur();
 
    }
  }

  };

  render() {
    // console.log(this.props.diameter,'circle-props')
    return (
      <>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-Diameter">
          <a href="#">
            <img
              width="18px"
              src="resources/images/Diameter18.png"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-diameter')} data-html={true}
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
          data-tip={container.resolve("tips").getTip('numeric-diameter')} data-html={true}
        />
      </>
    );
  }


}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    diameter: state.diameterToolsReducer.diameter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDiameter: diameter => {
      dispatch({ type: "UPDATE_DIAMETER", payload_D: diameter });
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(CircleType);
