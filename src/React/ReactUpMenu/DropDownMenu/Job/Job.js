import React from "react";
import "./job.scss";
import Settings from "./Settings/Settigs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
export default class Job extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false,
      openSubModal: false
    };
  }

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };
  // --------------methods for SubModal Window-------------------------------------
  clickSubModal = event => {
    event.preventDefault();
    this.setState({
      openSubModal: true
      //   prevState => ({ open: !prevState.open }),
      // () => {
      //   this.setState({ open: this.state.open });
      //   console.log(this.state.open, "clickOpen-72");
    });
  };

  closeSubModal = () => {
    this.setState(
      prevState => ({ openSubModal: prevState.openSubModal }),
      () => {
        this.setState({ openSubModal: !this.state.openSubModal });
      }
    );
  };

  // -------------------------------------openLinkHelp---------------------------------------
  openLinkHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-ordering/#address-and-payment"
    );
  };

  render() {
    return (
      <div className="Job">
        <div
          className="btn-Job"
          onClick={this.showDropdownMenu}
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
          // onClick={this.clickSubModal}
          maxWidth={false}
          open={this.state.openSubModal}
          onClose={this.handleClose}
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
            <span>Job settings</span>
          </DialogTitle>

          <DialogContent
            style={{
              width: "950px",
              height: "425px",
              backgroundColor: "#f0ecec"
            }}
          >
            <Settings />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#f0ecec" }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#f0ecec" }}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={this.openLinkHelp}
              style={{ backgroundColor: "#f0ecec" }}
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
