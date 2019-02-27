import React from "react";
import "./help.scss";
import Suggestion from "./Suggestion";
import DialogMaterialUi from "./DialogMaterialUI";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import fl from 'doc/Flat2D.emsx';
export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySubMenu: false,
      open: false,
      openSubModal: false,
      openSuggestionModal: false
    };
  }
 
  outputFlat2D = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "/doc/Flat2D.emsx", true);

    request.onload = function() {
      // var out = new Blob([request.response]);
      var file = new File([request.response], "Flat2D.emsx");
      // console.log(file, "Flat2D");
      app.open(file);
    };

    request.send();
  };

  outputBend2D = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "/doc/Bend2D.emsx", true);

    request.onload = function() {
      // var out = new Blob([request.response]);
      var file = new File([request.response], "Bend2D.emsx");
      // console.log(file, "Bend2D");
      app.open(file);
    };

    request.send();
  };
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

  showSubMenu = event => {
    event.preventDefault();
    this.setState({ displaySubMenu: true }, () => {
      document.addEventListener("click", this.hideSubMenu);
    });
  };

  hideSubMenu = () => {
    this.setState({ displaySubMenu: false }, () => {
      document.removeEventListener("click", this.hideSubMenu);
    });
  };
  // --------------open window Suggestion---------------------
  handleOpenSuggestion = event => {
    // event.preventDefault();
    this.setState(
      prevState => ({ openSuggestionModal: !prevState.openSuggestionModal }),
      () => {
        this.setState({ openSuggestionModal: this.state.openSuggestionModal });
      }
    );
  };
  handleCloseModalSuggestion = () => {
    this.setState(
      prevState => ({ openSuggestionModal: prevState.openSuggestionModal }),
      () => {
        this.setState({ openSuggestionModal: !this.state.openSuggestionModal });
      }
    );
  };
  openGuideSuggestionWindow = () => {
    window.open("https://www.emachineshop.com/help/");
  };

  // -----Dialog MOdal About-----

  handleClickOpen = event => {
    event.preventDefault();
    console.log(event.target, "about window");
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
  openWindow = () => {
    window.open("https://www.emachineshop.com/video-tutorials/");
  };
  render() {
    // const { open } = this.state;
    return (
      <div className="Help">
        <div
          className="btn-Help"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Help
          {this.state.displayMenu ? (
            <ul>
              <li
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.hideSubMenu}
              >
                <a href="#">
                  <span>Drawing Tutorials</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubMenu ? (
                  <ul className="Submenu">
                    <li onClick={this.outputFlat2D}>
                      <a href="#">Flat 2D</a>
                    </li>
                    <li onClick={this.outputBend2D}>
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
              <li onClick={this.openWindow}>
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
              <li onClick={this.handleOpenSuggestion}>
                <a href="#">Suggestion</a>
              </li>
              <li onClick={this.handleClickOpen}>
                <a href="#">About</a>
              </li>
            </ul>
          ) : null}
        </div>
        {/* --------------Suggestion window------------------------------------------ */}
        <Dialog
          maxWidth={false}
          open={this.state.openSuggestionModal}
          onClose={this.handleCloseModal}
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
            <span>Suggestion</span>
          </DialogTitle>

          <DialogContent
            style={{
              textAlign: "left",
              width: "750px",
              height: "425px",
              backgroundColor: "#f0ecec"
            }}
          >
            <Suggestion />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCloseModalSuggestion}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
              color="primary"
              autoFocus
            >
              Confirm
            </Button>
            <Button
              onClick={this.handleCloseModalSuggestion}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={this.openGuideSuggestionWindow}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
              color="primary"
              autoFocus
            >
              CAD Guide
            </Button>
          </DialogActions>
        </Dialog>
        {/* -------------------------About window-------------------------------------------- */}
        <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">About eMachineShop CAD</DialogTitle>
          <DialogContent
            className="Content"
            style={{ background: "#f0ecec", padding: 10 }}
          >
            <div
              id="alert-dialog-description"
              style={{ height: "150px", width: "280px", color: "black" }}
            >
              <div
                className="ContentHeader"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <img width="45px" src="images/icon.jpg" />
                <DialogContentText
                  style={{ textAlign: "center", color: "black", marginLeft:'45px' }}
                >
                  Version 0.5
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
                 Released ...
                </DialogContentText>
            
              </div>
              <div
                className="ContentBottom"
                style={{ textAlign: "center", padding: 0 }}
              >
                <DialogContentText
                  style={{ margonBottom: "5px", padding: "5px" }}
                >
                  Copyright&copy; 2018-2019
                </DialogContentText>
           
                <DialogContentText>
                  <a
                    href="https://www.emachineshop.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                  eMachineShop
                  </a>
                </DialogContentText>
              </div>
            </div>
          <div className="OK-buttons" style={{textAlign:'center'}}>

            <Button
              onClick={this.handleClose}
              style={{ backgroundColor: "#dddada", boxShadow: "2px 2px 1px #000",margin:'0 auto' }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
                {/* 
             <Button
              onClick={this.clickSubModal}
              style={{ backgroundColor: "#f0ecec", color: "orangered" }}
              color="primary"
            >
              Licenses...
            </Button> 
         */}
            </div>
          </DialogContent>

      
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
