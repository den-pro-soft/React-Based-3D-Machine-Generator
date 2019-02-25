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
    console.log(app.config.widthGroup,'app.width')
  }
  componentWillMount() {
    app.addHandler("selectElement", element => {
   
         
      if (app.selectElements.length == 1||app.selectElements.length > 1) {
          let ext = app.currentDocument.getExtrenum(app.selectElements);
           let width = ext.max.x- ext.min.x;
          let height = ext.max.y- ext.min.y;
          // console.log(ext,width,height,'ext')
        // // if (element.typeName === "Group") {
        if (this.props.demensions === "Millimeters") {
          app.config.widthGroup = width.toFixed(3) + " mm";
          app.config.heightGroup = height.toFixed(3) + " mm"
          this.setState({ width: app.config.widthGroup, height: app.config.heightGroup });
        } else {
          app.config.widthGroup = (width / 25.4).toFixed(3) + ' "';
          app.config.heightGroup = (height / 25.4).toFixed(3) + ' "';
          this.setState({ width: app.config.widthGroup, height: app.config.heightGroup });

        }
    console.log(app.config.widthGroup,'2-app.width')
        
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

if (prevProps.demensions === "Millimeters") {
app.config.widthGroup = (this.state.width).replace(/[^0-9.]/g, "");
app.config.heightGroup =(this.state.height).replace(/[^0-9.]/g, "");

} else {
  app.config.widthGroup =(this.state.width).replace(/[^0-9.]/g, "")*25.4;
  app.config.heightGroup =(this.state.height).replace(/[^0-9.]/g, "")*25.4;

}

let widthGroup = app.config.widthGroup;
let heightGroup = app.config.heightGroup;


if (this.props.demensions === "Millimeters") {
  this.setState({ width: widthGroup.toFixed(3) +" mm"});
  this.setState({ height: heightGroup.toFixed(3) +" mm"});

}
 else {
  this.setState({ width:(widthGroup / 25.4).toFixed(3) + ' "'});
  this.setState({ height:(heightGroup / 25.4).toFixed(3) + ' "'});
}

  }
}
  handleChangeInputWidth = e => {
    app.config.widthGroup = e.target.value;
    console.log(e.target.value,'e.target-width')

    let width = (app.config.widthGroup).replace(/[^0-9.]/g, "");
    app.setSelectedElementsSize(width,(app.config.heightGroup).replace(/[^0-9.]/g, ""));
    this.setState({ width: width });
  
    if (event.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          width: width.replace(/[^0-9.]/g, "") + " mm"
        });
      } else {
        this.setState({
          width: width.replace(/[^0-9.]/g, "") + ' "'
        });
      }
    }
  
  }
  handleChangeInputHeight = e => { 
    // if(e.target.value===''){
    //   e.target.value=0
    // }
      app.config.heightGroup = (e.target.value).replace(/[^0-9.]/g, "");
    console.log(e.target.value,'e.target-height')

    let height = app.config.heightGroup;
    let width = app.config.widthGroup;

    app.setSelectedElementsSize(width.replace(/[^0-9.]/g, ""),height);

    this.setState({ height: height });
  
    if (event.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + " mm"
        });
      } else {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + ' "'
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

export default connect(mapStateToProps)(GroupType);
