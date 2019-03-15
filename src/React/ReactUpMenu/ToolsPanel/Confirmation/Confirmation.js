import React from "react";
import "./confirmation.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      // openModal:true
    }
    // const openConfirm = modal.modalOpenConfirmation()
    // this.props.openConfirmModal(openConfirm)
  }
  componentWillMount(){
    // const openConfirm = modal.modalOpenConfirmation()
    // console.log(openConfirm ,'openConfirm ')
    // this.props.openConfirmModal(openConfirm)
  
  }
  static handleYesButton = () => {
    console.log('YES-button')
  }
  static handleNoButton = () => {
    console.log('No-button')
  }
  render() {
    console.log(this.props, "props-Confirm");
    return (
      <Dialog
        maxWidth={false}
        // open={this.props.openConfirm}
        open={this.props.openConfirm}

        // open={this.state.openModal}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Confirmation</span>

            <Button
              onClick={() =>{
                // modal.openConfirm = !this.props.openConfirm;
                this.props.openConfirmModal(!this.props.openConfirm)
              }
              }
              style={{
                backgroundColor: "#fff",
                padding: "0px"
              }}
              color="primary"
              autoFocus
            >
              <i className="material-icons">cancel_presentation</i>
            </Button>
          </div>
        </DialogTitle>
        <DialogContent
          style={{
            paddingBottom: "0px",
            textAlign: "left",
            width: "600px",
            height: "180px",
            backgroundColor: "#f0ecec"
          }}
        >
          <div className="ConfirmContent">
            <div className="Info-Icon">
            <img
              width="40px"
              src="images/InfoIcon.png"/>
            </div>
            <div className="Text" >
            <p>Stretching this shape will convert arcs to splines wich may increase cost. It is usually recommended to cancel this
                request and instead first try clicking the left toolbar Line Edit button and dragging one of the line segments. Or
                consider enabling "Preferences - 2D - [ ] Preserve arcs during stretching."
            </p>
            <p>
                Proceed anyway?
            </p>

              {/*  Not for version 1.0
            <p>
                Tip: If you want to mirror the selection hold the CTRL key down and drag the appropriate selection handle to the
                opposite side of the line.
            </p>*/}
            </div>
          </div>

          <div className="Yes-No-buttons">
            <Button
              onClick={
                ()=>{
                  this.props.openConfirmModal(!this.props.openConfirm);
                  container.resolve('confirmChangeArcToSplinesDialog').handleButton1()}
              }
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                margin: "0 auto",
                marginRight: "5px"
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
            <Button
              onClick={
               ()=>{
                  this.props.openConfirmModal(!this.props.openConfirm);
                  container.resolve('confirmChangeArcToSplinesDialog').handleButton2()
               }
              }
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                margin: "0 auto"
              }}
              color="primary"
            //   autoFocus
            >
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    openConfirm: state.confirmationReducer.openConfirm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openConfirmModal: openConfirm => {
      dispatch({ type: "OPEN_CONFIRM", payload: openConfirm });
    },
  
    // closeConfirmModal: openConfirm => {
    //   dispatch({ type: "CLOSE_Confirmation", payload: openConfirm });
    // }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Confirmation);
