import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

import MachineWindow from "./Machine/MachineWindow";
import Confirmation from "./Confirmation/Confirmation";

import GroupType from "./GroupType";
import LineType from "./LineType";
import ArcType from "./ArcType";
import CircleType from "./CircleType";
import TextType from "./TextType";

import MoveButtons from "./MoveButtons";

import InputSelect from "./InputSelect";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";


//  export default 
 class ToolsPanel extends React.PureComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {
      show: false,
      line: false,
      arc: false,
      circle: false,
      group: false,
      text:false,
      withoutText:true,
      value:'',
      openBendModal:false,
      openTapModal:false,
    };
  }
  // ---------------React Life Cycle-----------------
  componentWillMount() {

    app.addHandler("selectElements", elements => {
  
      this.setState({value: app.selectElements[0]._lineType.label});
      localStorage.setItem('lineType', app.selectElements[0]._lineType.label);

          this.setState({ show: true });
          let text = app.selectElements.every(el => el.typeName === "Text");
          let arc = app.selectElements.every(el => el.typeName === "Arc");
       
          if (text === true && app.selectElements.length > 1) {

            this.setState({ line: false, arc: false,circle:false, group: true, text:true, withoutText:false });
             } else

          if (arc === true && app.selectElements.length > 1) {
              this.setState({ line: false, circle: true,  group: true });
          } else
          if(arc=== true && app.selectElements.length === 1){
            if(app.selectElements[0].incrementAngle===360){
              this.setState({ line: false, circle: true, arc:false,  group: false, text: false });
            } else {
              this.setState({ line: false, circle: false,arc:true,  group: false, text: false })
            }
          }
          else{
              if (app.selectElements.length === 1) {
                  let el = app.selectElements[0];
                  switch(el.typeName){
                      case "Line":     this.setState({ line: true,  circle: false, arc:false, group: false, text: false });  break;
                      case "Group":    this.setState({ line: false, circle: false, arc:false, group: true,  text: false });  break;
                      case "Spline":   this.setState({ line: false, circle: false, arc:false, group: false, text: false });  break;
                      // case "Arc":      this.setState({ line: false, circle: true,  group: false, text: false });  break;
                      case "Text":     this.setState({ line: false, circle: false, arc:false, group: false, text:true });  break;
                  }
              }else {
                  this.setState({ line: false, circle: false, arc:false, group: true });
              }
          }   
    });

    app.addHandler("clearSelectElements", () => {
      this.setState({ show: false });
      const { _elements } = app.currentDocument;
      if (_elements.length === 0) {
        if (this.props.demensions === 'Millimeters') {
          localStorage.setItem('z-value', '0.000 mm')
        } else {
          localStorage.setItem('z-value', '0.000 "')
        }
      }
    });
  
  }

  // ---------------------------handleChangeSelect type Line-------------------------------------------
  handleChangeSelect =(event)=> {
    if(event.target.value==="Bend" &&this.state.line===false){
      this.setState({openBendModal:true})
    }
    this.setState({value:event.target.value});
    app.config.defaultLineTypes.map((item) => {
      if(event.target.value===item.label){
        localStorage.setItem('lineType', item.label);
        app.config.lineType = item; 
        app.setElementsLineType(item);

      }
    })

}

  handleCloseModalBend = () => {
    this.setState(
      prevState => ({ openBendModal: prevState.openBendModal }),
      () => {
        if (this.state.text === true) {
          this.setState({
            value: "Machinist",
            openBendModal: !this.state.openBendModal
          });
        } else {
          this.setState({
            value: "Auto",
            openBendModal: !this.state.openBendModal
          });
        }
      }
    );
  };

  render() {

    if (this.state.show) {
      return this.getPanelHtml();
    } else {
      return (
        <div className="ToolsPanel">
          <button className="btn-Question">
            <a
              href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                width="18px"
                src="images/Help.png"
                data-place="bottom"
                data-tip="<span>Shows how to use numeric values.</span>"
              />
            </a>
          </button>
        </div>
      );
    }
  }

  getPanelHtml() {
    return (
      <div className="ToolsPanel">
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
          <div className="Left-Tools">
            <button className="btn-LineType"
             onClick={(e)=>{console.log(e.target,'window');
             this.props.updateOpenTapModal(!this.state.openTapModal)}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/LineType.png"
                  data-place="bottom"
                  data-tip='<span>Line type.</br>Specifies whether the selected line a shape,bend,</br>thread,relation,comment,etc.Select "Auto" in most cases</br>
                when creating the part shape.
                </span>'
                />
              </a>
            </button>
            <select
              className="SelectMode"
              value={this.state.value}
              onChange={this.handleChangeSelect}
            >
             {app.config.defaultLineTypes.map((typLine, i) => (
                        <option value={typLine.label} key={i} >
                          {typLine.label}
                        </option>
                      ))}
         
            </select>

            {this.state.line === true && (
              <LineType />
            )}
             {this.state.text === true && (
              <TextType value={this.state.value} withoutText={this.state.withoutText} />
            )}
            {this.state.arc === true && <ArcType />}
            {this.state.circle === true && <CircleType />}

            {this.state.group === true && <GroupType />}
           

            {this.state.value === "Auto" && (
               <InputSelect className="CreatableSelect" />
            )} 

            {/* <input
            list="browsers"
            name="browser"style={{width:'120px'}}
              onChange={e=>{
                e.preventDefault();
                   let val = parseInt(e.target.value);
                       app.setElementsHeight(val?val:0.075);
              }}
            name="browser"
            style={{ width: "120px" }}
            autoComplete="on"
          />
        <datalist id="browsers" defaultValue="Air Inside">
            <select>
              <option value="Air Inside" />
              <option value="Revolve" />
              {data.map((item, i) => (
                <option key={i} value={item + String.fromCharCode(34)} />
              ))}
              <option value="Other" />
            </select>
          </datalist>  */}

            <button className="btn-Question">
              <a
                href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="18px"
                  src="images/Help.png"
                  data-place="bottom"
                  data-tip="<span>Shows how to use numeric values.</span>"
                />
                </a>
            </button>
          </div>
          <div className="Right-Tools">
            <MoveButtons />
          </div>
        <MachineWindow history={this.props.history}/>
        {/* <Confirmation /> */}
      {/* --------------------------Information-------------------- */}
        <Dialog
          maxWidth={false}
          open={this.state.openBendModal}
          onChange={this.handleChangeSelect}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <DialogContent
            style={{
              paddingBottom:'0px',
              textAlign: "left",
              width: "500px",
              height: "130px",
              // backgroundColor: "#fff"
              backgroundColor:'#f0ecec'
            }}
          >
           <div style={{display:'flex',justifyContent:"space-between"}}>
            <span>Information</span>
         
              <Button
                onClick={this.handleCloseModalBend}
                style={{
                  // backgroundColor: "#fff",
                  backgroundColor:'#f0ecec',
                  padding:'0px',
                 
                }}
                color="primary"
                autoFocus
              >
                <i className = "material-icons">
                  cancel_presentation
            </i>
              </Button>
            </div> 
            <div style={{ margin: "15px 15px",textAlign:'left' }}>
              <img
                width="25px"
                src="images/Info.png"
              />
              <span style={{ position:'relative', bottom:'15px',marginLeft: "30px" }}>
                Use only straight segments for Bend lines
              </span>
            </div>
            <div style={{marginTop: "10px",marginBottom:'0px',paddingBottom:'0px',textAlign:'center'}}>
              <Button
                onClick={this.handleCloseModalBend}
                style={{
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  margin: "0 auto",
                  padding:'2px 2px',
                }}
                color="primary"
                autoFocus
              >
                OK
              </Button>
            </div>
          </DialogContent>      
        </Dialog>
        {/* <Confirmation /> */}

        </div>
    );
  }
}
    const mapStateToProps = (state)=>{
      return {
        openConfirm: state.confirmationReducer.openConfirm,
        demensions: state.preferencesReducer.demensions

      }
        }

    const mapDispatchToProps = dispatch => {
      return {
        updateOpenTapModal: openTapModal => {
          dispatch({ type: "OPEN_TAP_MODAL", payload: openTapModal });
        },
        // openConfirmModal: openConfirm => {
        //   dispatch({ type: "OPEN_CONFIRM", payload: openConfirm });
        // }
      };
    }
    
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPanel));