import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

 class GroupType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // width: this.props.width,
      // height:this.props.height
      width: '',
      height:''
    };
    // console.log(this.props,'props')
    // console.log(this.state,'state')
  }
  componentWillMount() {
    app.addHandler("selectElements", elements => {
           
      if (app.selectElements.length == 1||app.selectElements.length > 1) {
          let ext = app.currentDocument.getExtrenum(app.selectElements);
          let width = (ext.max.x- ext.min.x).toFixed(3);
          let height = (ext.max.y- ext.min.y).toFixed(3);
          this.props.updateWidthAndHeight(+width,+height);
        if (this.props.demensions === "Millimeters") {
          this.setState({
            width: width + " mm",
            height: height + " mm"
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

  componentWillReceiveProps(nextProps){

  //  componentDidUpdate(prevProps, prevState) {
    //  if (this.props.demensions !== prevProps.demensions) {
       let width = (this.props.width*1).toFixed(3);
       let height = (this.props.height*1).toFixed(3);;

       if (nextProps.demensions === "Millimeters") {
         this.setState({
           width: width + " mm",
           height: height+ " mm"
         });

       }
       else {
         this.setState({
           width: (width / 25.4).toFixed(3) + ' "',
           height: (height / 25.4).toFixed(3) + ' "'
         });
       }
    //  }
   }

  handleChangeInputWidth = e => {

    let width = e.target.value;
    let height = this.props.height;
    this.setState({ width });
  
    if (e.charCode === 13) {

      if (this.props.demensions === "Millimeters") {

        this.setState({
          width: width.replace(/[^0-9.]/g, "") + " mm"

        });
        let width1 = width.replace(/[^0-9.]/g, ""); 

        this.props.updateWidthAndHeight(+width1,+height);
        app.setSelectedElementsSize(+width1, +height);
        this.widthInput.blur(); 
      } else {
        this.setState({
          width: width.replace(/[^0-9.]/g, "") + ' "'
        });
        let width1 = width.replace(/[^0-9.]/g, ""); 
        this.props.updateWidthAndHeight(+width1*25.4,+height);
    app.setSelectedElementsSize(+width1*25.4, +height);
    this.widthInput.blur();
      }
    }
  
  }
  handleChangeInputHeight = e => { 

    let height = e.target.value;
    let width = this.props.width;

    this.setState({ height });
  
    if (e.charCode === 13) {

      if (this.props.demensions === "Millimeters") {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + " mm"
        });
    let height1 = height.replace(/[^0-9.]/g, ""); 
    this.props.updateWidthAndHeight(+width,+height1);

    app.setSelectedElementsSize(+width, +height1);
    this.heightInput.blur();
      } else {
        this.setState({
          height: height.replace(/[^0-9.]/g, "") + ' "'
        });
    let height1 = height.replace(/[^0-9.]/g, ""); 
    this.props.updateWidthAndHeight(+width,+height1*25.4);

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
          src="resources/images/Width.png"
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
      data-tip={container.resolve("tips").getTip('numeric-horizontal-size')} data-html={true}
    />
    <button className="btn-Vertical">
      <a href="#">
        <img
          width="18px"
          src="resources/images/Height.png"
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
      data-tip={container.resolve("tips").getTip('numeric-vertical-size')} data-html={true}
    />
  </>)}


 }

const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    width: state.toolsPanelReducer.width,
    height: state.toolsPanelReducer.height,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWidthAndHeight: (width,height) => {
      dispatch({ type: "UPDATE_WIDTH_HEIGHT", payload_W:width, payload_H:height });
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(GroupType);
