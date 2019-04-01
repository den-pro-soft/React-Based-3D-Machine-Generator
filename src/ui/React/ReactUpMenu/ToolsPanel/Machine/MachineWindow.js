import React from "react";
import Machine from "./Machine"

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";


class MachineWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  resetToDefault = () => {
      this.props.updateCloseMachineModal(true,'straight')
  }

  // -------------------------------------openLinkHelp---------------------------------------
  openAutoHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-3d-drawing/#3D-machine-settings"
    );
  }

  openBendHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-bend-drawing/"
    );
  }

  openCommentToSelfHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-2d-advanced/#comments-to-myself"
    );
  }

  openCommentToMachinistHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-comments/"
    );
  }
  render(){
    // console.log(this.props,'machineWindows')

      return(
        <Dialog
        maxWidth={false}
        open={this.props.openMachineModal}
        // open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <img
            width="25px"
            src="resources/images/icon.jpg"
          />
          <span>Machine</span>
          </div>
          <Button
                    onClick={()=>this.props.updateCloseMachineModal(!this.props.openMachineModal)}
                    style={{
                        backgroundColor:'#fff',
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
        </DialogTitle>

        <DialogContent
          style={{
            width: "950px",
            height: "425px",
            backgroundColor: "#f0ecec"
          }}
        >
        <Machine history={this.props.history}/>
        </DialogContent>

        <DialogActions style={{display:'flex',justifyContent:'space-between'}}>
        <Button
            onClick={this.resetToDefault}
    
            style={{ backgroundColor: "#dddada",textAlign:'left' }}
            color="primary"
            autoFocus
          >
            Reset to Default
          </Button>
          <div>
          <Button
            onClick={()=>this.props.updateCloseMachineModal(!this.props.openMachineModal)}
            style={{ backgroundColor: "#dddada",marginRight:'10px' }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
          <Button
            onClick={()=>this.props.updateCloseMachineModal(!this.props.openMachineModal)}
            style={{ backgroundColor: "#dddada", marginRight:'10px'}}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
     {this.props.location.pathname==='/'&&     <Button
            onClick={this.openAutoHelp}
            style={{ backgroundColor: "#dddada" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>}
          {this.props.location.pathname==='/machine/bend'&& <Button
            onClick={this.openBendHelp}
            style={{ backgroundColor: "#dddada" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>}
          {this.props.location.pathname==='/machine/to-self'&& <Button
            onClick={this.openCommentToSelfHelp}
            style={{ backgroundColor: "#dddada" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>}
          {this.props.location.pathname==='/machine/to-machinist'&& <Button
            onClick={this.openCommentToMachinistHelp}
            style={{ backgroundColor: "#dddada" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>}
          </div>
        </DialogActions>
      </Dialog>
      )
  }
}
const mapStateToProps = (state)=>{
  return {
    openMachineModal: state.machineWindowReducer.openMachineModal,
    // value: state.machineWindowReducer.value

  }
     }
     
const mapDispatchToProps = dispatch => {
      return {
        updateCloseMachineModal: (openMachineModal,value/*, isCheckedStockMaterial*/) => {
          dispatch({ type: "CLOSE_MACHINE_MODAL", payload: openMachineModal,payloadValue:value/*, payloadIsChecked: isCheckedStockMaterial */});
        }
      };
    }
    
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MachineWindow))