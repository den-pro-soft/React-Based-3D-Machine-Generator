import React from "react";
import "./line.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Corner from "./Corner"
export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySubMenu: false,
      displaySubNudge: false,
      openCornerModal: false
    };

  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  showSubMenu = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ displaySubMenu: true }, () => {
      document.addEventListener("click", this.hideSubMenu);
    });
  }

  hideSubMenu = () => {
    this.setState({ displaySubMenu: false }, () => {
      document.removeEventListener("click", this.hideSubMenu);
    });
  }

  showSubNudge = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ displaySubNudge: true }, () => {
      document.addEventListener("click", this.hideSubNudge);
    });
  }

  hideSubNudge = () => {
    this.setState({ displaySubNudge: false }, () => {
      document.removeEventListener("click", this.hideSubNudge);
    });
  }

    // --------------open window Corner---------------------
    handleOpenCorner = event => {
      // event.preventDefault();
      this.setState(
        prevState => ({ openCornerModal: !prevState.openCornerModal }),
        () => {
          this.setState({
            openCornerModal: this.state.openCornerModal
          });
        }
      );
    };
    handleCloseCornerModal = () => {
      this.setState(
        prevState => ({ openCornerModal: prevState.openCornerModal }),
        () => {
          this.setState({
            openCornerModal: !this.state.openCornerModal
          });
        }
      );
    };
    openHelpCorner = () => {
      window.open("https://www.emachineshop.com/help-2d-drawing/#rounding-corners");
    };
  render() {
    return (
      <div className="Line">
        <div
          className="btn-Line"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Line
          {this.state.displayMenu ? (
          <ul
          >
            <li onClick={() => app.group()}>
              {/* className="active" */}
              <a href="#">Group</a>
            </li>
            <li onClick={() => app.ungroup()}>
              <a href="#">Ungroup</a>
            </li>
            <li onClick={() => app.intersectSelectedElements()}>
              <a href="#" target="_blank" rel="noreferrer noopener">
                Intersect
              </a>
            </li>
            <li onClick={this.handleOpenCorner}>
              <a href="#">Corner</a>
            </li>

              <li>
                <a href="#">Tangents</a>
              </li>
              <li
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.hideSubMenu}
              >
                <a className="a-Mirror"href="#">
                  <span>Mirror</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubMenu ? (
                  <ul className="SubMirror">
                    <li onClick={() => app.mirrorSelected("axisX")}>"
                      <a href="#">Horizontally</a>
                    </li>
                    <li onClick={() => app.mirrorSelected("axisY")}>
                      <a href="#">Vertically</a>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li
                onMouseEnter={this.showSubNudge}
                onMouseLeave={this.hideSubNudge}
              >
                <a href="#" className="a-Nudge">
                  <span>Nudge</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubNudge ? (
                  <ul className="SubNudge">
                    <li onClick={()=>{app.moveSelected(0,app.config.moveStep);}}>
                      <a href="#">
                     Up  Up Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(0,-app.config.moveStep);}}>
                      <a href="#">
                      Down Down Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(-app.config.moveStep,0);}}>
                      <a href="#">
                      Left Left Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(app.config.moveStep,0);}}>
                      <a href="#">
                      Right Right Arrow
                      </a>
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          ) : null}
        </div>

        <Dialog
          maxWidth={false}
          open={this.state.openCornerModal}
        //   style={{
        //     backgroundColor: "#f0ecec"
        // }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ color: "black", textAlign: "left" }}
            id="alert-dialog-title"
          >
            <div style={{display:'flex',justifyContent:"space-between"}}>
            <span>Corner</span>
            <Button
                onClick={this.handleCloseCornerModal}
                style={{
                  backgroundColor: "#fff",
                  padding:'0px',
                 
                }}
                color="primary"
                autoFocus
              >
                <i className="material-icons">
                  cancel_presentation
            </i>
              </Button>
              </div>
          </DialogTitle>

          <DialogContent
            style={{
              textAlign: "left",
              width: "550px",
              height: "375px",
              backgroundColor: "#f0ecec"
            }}
          >
            <Corner />
          </DialogContent>

          <DialogActions 
          // style={{
          //     backgroundColor: "#f0ecec"
          // }}
          >
            <Button
              onClick={this.handleCloseCornerModal}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
            <Button
              onClick={this.handleCloseCornerModal}
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
              onClick={this.openHelpCorner}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
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
