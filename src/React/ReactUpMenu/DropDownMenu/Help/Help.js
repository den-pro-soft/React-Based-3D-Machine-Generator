import React from "react";
import "./help.scss";
import DialogMaterialUi from "./DialogMaterialUI";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySubMenu: false,
      open: false,
      openSubModal: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
  }

  showDropdownMenu(event) {
    // event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  showSubMenu(event) {
    // event.preventDefault();
    this.setState({ displaySubMenu: true }, () => {
      document.addEventListener("click", this.hideSubMenu);
    });
  }

  hideSubMenu() {
    this.setState({ displaySubMenu: false }, () => {
      document.removeEventListener("click", this.hideSubMenu);
    });
  }

  // -----Dialog MOdal-----

  handleClickOpen = event => {
    event.preventDefault();
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        this.setState({ open: this.state.open });
      }
    );
  };

  handleClose = () => {
    this.setState(
      prevState => ({ open: prevState.open }),
      () => {
        this.setState({ open: !this.state.open });
      }
    );
  };
  // --------------methods for SubModal Window-------------------------------------
  clickSubModal = event => {
    event.preventDefault();
    this.setState({
      openSubModal: true
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

  // ------------open link Video Tutorial----------
openWindow =()=>{
  window.open('https://www.emachineshop.com/video-tutorials/')
}
  render() {
    // const { open } = this.state;
    return (
      <div className="Help">
        <div
          className="btn-Help"
          // onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Help
          {this.state.displayMenu ? (
            <ul>
              <li
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.hideSubMenu}
                onClick={this.handleClickOpen}
              >
                <a href="#">
                  <span>Drawing Tutorials</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubMenu ? (
                  <ul className="Submenu">
                    <li>
                      <a href="#">Flat 2D</a>
                    </li>
                    <li>
                      <a href="#">Bend 2D</a>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li>
                <a
                  href="https://www.emachineshop.com/help/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Contents
                </a>
              </li>
              <li  onClick={this.openWindow}>
                <a
                  href="https://www.emachineshop.com/video-tutorials/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="#">Windows version</a>
              </li>
              <li>
                <a href="#">Tech Support</a>
              </li>

              <li onClick={this.handleClickOpen}>
                <a href="#">About</a>
              </li>
            </ul>
          ) : null}
        </div>
        <Dialog
          // style={{
          //   backgroundColor: "transparent",
          //   width: "400px",
          //   height: "750px",
          //   margin: "0 auto"
          // }}
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            // style={{ height: "10px", color: "black", textAlign: "center" }}
            id="alert-dialog-title"
          >
            About eMashine shop
          </DialogTitle>
          <DialogContent
            className="Content"
            style={{ background: "#f0ecec", padding: 10 }}
          >
            <div
              id="alert-dialog-description"
              style={{ height: "320px", width: "280px", color: "black" }}
            >
              <div
                className="ContentHeader"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <img
                  width="45px"
                  src="images/icon.jpg"
                  // data-tip="<span>Shows how to use numeric values.</span>"
                />
                <DialogContentText
                  style={{ textAlign: "center", color: "black" }}
                >
                  {" "}
                  eMashine Shop&reg;Version 1.931.1.26
                </DialogContentText>
              </div>
              <div
                className="ContentTop"
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid black",
                  padding: 5
                }}
              >
                <DialogContentText>
                  {" "}
                  Compilation Data: 22.11.2018
                </DialogContentText>
                <DialogContentText> Price file number: 3527</DialogContentText>
                <DialogContentText>
                  {" "}
                  Program folder: C:\ProgramFiles(x86)\eMashineshop
                </DialogContentText>
              </div>
              <div
                className="ContentBottom"
                style={{ textAlign: "center", padding: 0 }}
              >
                <DialogContentText
                  style={{ margonBottom: "5px", padding: "5px" }}
                >
                  {" "}
                  Copyright&copy; 2003-2018 eMashineshop&reg;
                </DialogContentText>
                <DialogContentText style={{ margon: "5px", padding: "5px" }}>
                  {" "}
                  CAD version is current
                </DialogContentText>
                <DialogContentText style={{ margon: "5px", padding: "5px" }}>
                  {" "}
                  Price File is current
                </DialogContentText>
                <DialogContentText>
                  <a
                    href="https://www.emachineshop.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    www.emachineshop.com
                  </a>
                </DialogContentText>
              </div>
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.clickSubModal}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
            >
              Licenses...
            </Button>
            <Button
              onClick={this.handleClose}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {/* ----------------------------------------------------------------------   */}
        {/* SubModalWindow-License */}

        <Dialog
          onClick={this.clickSubModal}
          style={{
            width: "800px",
            height: "750px",
            margin: "0 auto"
          }}
          open={this.state.openSubModal}
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ height: "10px", color: "black", textAlign: "left" }}
            id="alert-dialog-title"
          >
            Licenses
          </DialogTitle>
          <DialogContent
            style={{ width: "400px", background: "#f0ecec", padding: 10 }}
          >
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Free Type</div>
                <div>
                  <a
                    href="https://www.freetype.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>

            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Indy</div>
                <div>
                  <a
                    href="https://www.indyproject.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>

            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>GLTT</div>
                <div>
                  <a
                    href="http://gltt.sourceforge.net/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Open CASCADE</div>
                <div>
                  <a
                    href="https://www.opencascade.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>FastMM</div>
                <div>
                  <a
                    href="https://sourceforge.net/projects/fastmm/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>JEDY Code Library</div>
                <div>
                  <a
                    href="http://www.delphi-jedi.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ marginRight: "10px" }}
                  >
                    homepage
                  </a>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    show license
                  </a>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.closeSubModal}
              style={{ backgroundColor: "#878787", color: "orangered" }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {/* <DialogMaterialUi open={this.state.open} /> */}
      </div>
    );
  }
}
