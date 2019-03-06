import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

 class GroupType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: app.config.widthGroup,
      height: app.config.heightGroup
    };
  }
  componentWillMount() {
    app.addHandler("selectElement", element => {
   
         
      if (app.selectElements.length == 1||app.selectElements.length > 1) {
          let ext = app.currentDocument.getExtrenum(app.selectElements);
          let width = ext.max.x- ext.min.x;
          let height = ext.max.y- ext.min.y;
          app.config.widthGroup = width;
          app.config.heightGroup = height;
        if (this.props.demensions === "Millimeters") {
          this.setState({
            width: (width*1).toFixed(3) + " mm",
            height: (height*1).toFixed(3) + " mm"
          });

        } else {
          this.setState({
            width: (width / 25.4).toFixed(3) + ' "',
            height: (height / 25.4).toFixed(3) + ' "'
          });
        }
      }
    });
  }
   componentDidUpdate(prevProps, prevState) {
     if (this.props.demensions !== prevProps.demensions) {

       let widthGroup = app.config.widthGroup;
       let heightGroup = app.config.heightGroup;


       if (this.props.demensions === "Millimeters") {
         this.setState({ width: widthGroup.toFixed(3) + " mm" });
         this.setState({ height: heightGroup.toFixed(3) + " mm" });

       }
       else {
         this.setState({ width: (widthGroup / 25.4).toFixed(3) + ' "' });
         this.setState({ height: (heightGroup / 25.4).toFixed(3) + ' "' });
       }
     }
   }

  handleChangeInputWidth = e => { 
    let width = e.target.value;
    let height = app.config.heightGroup;
    this.setState({ width });
  
    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          width: width.replace(/[^0-9.]/g, "")  + " mm"
        });
        let width1 = width.replace(/[^0-9.]/g, ""); 
    app.setSelectedElementsSize(+width1, +height);
    this.widthInput.blur(); 
      } else {
        this.setState({
          width: width.replace(/[^0-9.]/g, "") + ' "'
        });
        let width1 = width.replace(/[^0-9.]/g, ""); 
    app.setSelectedElementsSize(+width1*25.4, +height);
    this.widthInput.blur();
      }
    }
  
  }
  handleChangeInputHeight = e => { 
  
    let height = e.target.value;
    let width = app.config.widthGroup;

    this.setState({ height });
  
    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + " mm"
        });
    let height1 = height.replace(/[^0-9.]/g, ""); 
    app.setSelectedElementsSize(+width, +height1);
    this.heightInput.blur();
      } else {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + ' "'
        });
    let height1 = height.replace(/[^0-9.]/g, ""); 
    app.setSelectedElementsSize(+width, +height1*25.4);
    this.heightInput.blur();
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
    <button className="btn-Horizontal">
      <a href="#">
        <img
          width="18px"
          src="images/Width.png"
          data-place="bottom"
          data-tip="<span>Horizontal size</span>"
        />
      </a>
    </button>
    <input
      type="text"
      value={this.state.width}
      onChange={this.handleChangeInputWidth}
      onKeyPress={this.handleChangeInputWidth}
      ref={input => {
        this.widthInput = input;
      }}
      data-place="bottom"
      data-tip="<span>Horizontal size<br/>Horizontal size of imaginary rectangle enclosing the line.To<br/>
change, enter a value and press the Enter key. </span>"
    />
    <button className="btn-Vertical">
      <a href="#">
        <img
          width="18px"
          src="images/Height.png"
          data-place="bottom"
          data-tip="<span>Vertical size</span>"
        />
      </a>
    </button>
    <input
      type="text"
      value={this.state.height}
      onChange={this.handleChangeInputHeight}
      onKeyPress={this.handleChangeInputHeight}
      ref={input => {
        this.heightInput = input;
      }}
      data-place="bottom"
      data-tip="<span>Vertical size<br/>Vertical size of imaginary rectangle enclosing the line.To<br/>
change, enter a value and press the Enter key. </span>"
    />
  </>)}
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getWidth: width => {
//       dispatch({ type: "GET_WIDTH", payload: width });
//     },
//     getHeight:  height => {
//       dispatch({ type: "GET_HEIGHT", payload: height });
//     },
//   };
// };
export default connect(mapStateToProps/*,mapDispatchToProps*/)(GroupType);
