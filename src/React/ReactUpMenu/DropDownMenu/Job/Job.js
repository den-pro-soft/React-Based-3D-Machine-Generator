import React from "react";
import "./job.scss";
import Settings from "./Settings/Settigs"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
export default class Job extends React.Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      displayMenu: false,
      openSubModal: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.clickSubModal = this.clickSubModal.bind(this);
    this.closeSubModal = this.closeSubModal.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  // --------------methods for SubModal Window-------------------------------------
  clickSubModal(event) {
    event.preventDefault();
    this.setState({
      openSubModal: true
      //   prevState => ({ open: !prevState.open }),
      // () => {
      //   this.setState({ open: this.state.open });
      //   console.log(this.state.open, "clickOpen-72");
    });
  }

  closeSubModal() {
    // this.setState({
    //   openSubModal: false
    // });
    this.setState(
      prevState => ({ openSubModal: prevState.openSubModal }),
      () => {
        this.setState({ openSubModal: !this.state.openSubModal });
        console.log(this.state.openSubModal, "Close");
      }
    );
  }
  render() {
    // const contenClass={
    //   root:{
    //     width: "1600px",height:'800px',background: "#a8a7a7", padding: 0,margin:0 
    //   }
    // }
    return (
      <div className="Job">
        <div
          className="btn-Job"
          // onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Job
          {this.state.displayMenu ? (
            <ul>
              <li onClick={this.clickSubModal}>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="#">Price/Analyze</a>
              </li>
              <li>
                <a
                  href="https://www.emachineshop.com/help-ordering/#pre-order-checklist"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Checklist
                </a>
              </li>
              <li>
                <a href="#">Review Order</a>
              </li>
            </ul>
          ) : null}
        </div>
        <Dialog
          onClick={this.clickSubModal}
          fullScreen={true}
          // fullWidth={false}
          style={{
            backgroundColor: "transparent",
            // width: "1600px",
            // height: "750px",
            width: "100vw",
            height: "100vh",
            // marginTop:'30px',
            // marginBottom:'50px'
            // margin: "0 auto"
          }}
          // onClick={this.handleClickOpen}
          open={this.state.openSubModal}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        
            <DialogTitle
              style={{ height: "10px", color: "black", textAlign: "left" }}
              id="alert-dialog-title"
            >
              <img
                width="25px"
                src="images/icon.jpg"
                // data-tip="<span>Shows how to use numeric values.</span>"
              />
              <span>Job settings</span>
            </DialogTitle>
        
          {/* <div */}
          <DialogContent 
          // fullWidth={true}
          // classes={{container:{width:"1600px"}}}
// maxWidth="lg"
        style={{ 
        /*width: "800px",height:'800px',*/background: "#f0ecec", padding: 0,margin:0 

         }}

          //  maxWidth="1600px"
          //  classes={contenClass.root}
          >
          <Settings 
          // style={{ marginTop:'50px',
          //   marginBottom:'50px'}}
            />
      {/* </div> */}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
              autoFocus
            >
              Cansel
            </Button>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
              autoFocus
            >
              Help
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
