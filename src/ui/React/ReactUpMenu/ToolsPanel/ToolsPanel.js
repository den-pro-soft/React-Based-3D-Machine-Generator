import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

import MachineWindow from "./Machine/MachineWindow";
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
        };
    }

    componentWillMount() {
        app.addHandler("selectElements", elements => {
            this.setState({value: app.selectElements[0]._lineType.label});
            localStorage.setItem('lineType', app.selectElements[0]._lineType.label);

            this.setState({ show: true });
            let text = app.selectElements.every(el => el.typeName == "Text");

            console.log(text, "TEXT");
            let arc = app.selectElements.every(el => el.typeName == "Arc");

            if (text === true && app.selectElements.length > 1) {
                this.setState({ line: false, arc: false,circle:false, group: true, text:true, withoutText:false });
            }else if (arc === true && app.selectElements.length > 1) {
                if(app.selectElements[0].incrementAngle===360){
                    this.setState({ line: false, circle: true,  group: true, });
                }else{
                    this.setState({ line: false, circle: false, arc:false,  group: true, text: false })
                }
            }else if(arc=== true && app.selectElements.length === 1){
                if(app.selectElements[0].incrementAngle===360){
                    this.setState({ line: false, circle: true, arc:false,  group: false, text: false });
                }else{
                    this.setState({ line: false, circle: false,arc:true,  group: false, text: false })
                }
            }else{
                if (app.selectElements.length === 1) {
                    let el = app.selectElements[0];
                    switch(el.typeName){
                        case "Line":     this.setState({ line: true,  circle: false, arc:false, group: false, text: false });  break;
                        case "Group":    this.setState({ line: false, circle: false, arc:false, group: true,  text: false });  break;
                        case "Spline":   this.setState({ line: false, circle: false, arc:false, group: false,text: false });  break;
                        case "Text":     this.setState({ line: false, circle: false, arc:false, group: false, text:true,  withoutText:true });  break;
                    }
                }else {
                    this.setState({ line: false, circle: false, arc:false, group: true});
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
// console.log(this.props.openMachineModal,'openMachineModal')
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
                src="resources/images/Help.png"
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
             onClick={
               ()=>{
             this.props.updateOpenMachineModal(!this.props.openMachineModal,'straight',this.props.isCheckedStockMaterial)
            }
             }>
              <a href="#">
                <img
                  width="18px"
                  src="resources/images/LineType.png"
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
            {this.state.value === "Auto"&&(

               <InputSelect className="CreatableSelect" />
            )}

            <button className="btn-Question">
              <a
                href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="18px"
                  src="resources/images/Help.png"
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
      {/* --------------------------Information-------------------- */}
        <Dialog
          maxWidth={false}
          open={this.state.openBendModal}
          onChange={this.handleChangeSelect}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{
              paddingBottom:'0px',
              textAlign: "left",
              width: "560px",
              height: "130px",
              backgroundColor:'#f0ecec'
            }}
          >
           <div
           style={{
             display:'flex',
             justifyContent:"space-between",
             marginTop:'5px',
             paddingLeft:'15px'}}>
            <span>Information</span>

              <Button
                onClick={this.handleCloseModalBend}
                style={{
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
                src="resources/images/Info.png"
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
          </div>
        </Dialog>

        </div>
    );
  }
}
    const mapStateToProps = (state)=>{
      return {
        openConfirm: state.confirmationReducer.openConfirm,
        demensions: state.preferencesReducer.demensions,
        openMachineModal:state.machineWindowReducer.openMachineModal,
        value:state.machineWindowReducer.value,
        isCheckedStockMaterial: state.machineWindowReducer.isCheckedStockMaterial
      }
    }

    const mapDispatchToProps = dispatch => {
      return {
        updateOpenMachineModal: (openMachineModal,value, isCheckedStockMaterial) => {
          dispatch({ type: "OPEN_MACHINE_MODAL", payload: openMachineModal,payloadValue:value,payloadIsChecked:isCheckedStockMaterial });
        }
      };
    }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPanel));