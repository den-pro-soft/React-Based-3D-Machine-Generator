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
  }

  // -------------------------------------openLinkHelp---------------------------------------
  openTapHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-line-types/#tap-and-thread"
    );
  };
  render(){

      return(
        <Dialog
        maxWidth={false}
        open={this.props.openTapModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <img
            width="25px"
            src="images/icon.jpg"
            // data-tip="<span>Shows how to use numeric values.</span>"
          />
          <span>Machine</span>
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

        <DialogActions>
          <Button
            onClick={()=>this.props.updateCloseTapModal(!this.props.openTapModal)}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
          <Button
            onClick={()=>this.props.updateCloseTapModal(!this.props.openTapModal)}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={this.openTapHelp}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>
        </DialogActions>
      </Dialog>
      )
  }
}
const mapStateToProps = (state)=>{
  return {
    openTapModal: state.machineWindowReducer.openTapModal
  }
     }
     
const mapDispatchToProps = dispatch => {
      return {
        updateCloseTapModal: openTapModal => {
          dispatch({ type: "CLOSE_TAP_MODAL", payload: openTapModal });
        }
      };
    };
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MachineWindow))