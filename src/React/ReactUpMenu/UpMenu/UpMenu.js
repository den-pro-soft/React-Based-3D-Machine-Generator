import React from "react";
import "./up-menu.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Material from "./RightButtons/Material";
import SelectFinish from "./RightButtons/SelectFinish";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Preferences from "../DropDownMenu/Edit/Preferences";

import { DraggablePopup } from "./../../../popup";
var popup3DView = new DraggablePopup()
  .setSize(800, 600)
  .setPosition(200, 100)
  .moveToCenter()
  .setTitle("3D view")
  .hide();
var view3D = new View3D({ width: 800, height: 600 });
popup3DView.addContent(view3D.getContent());

let show3D = function() {
  try {
    view3D.setGeometry(app.currentDocument);
    popup3DView.show();
  } catch (e) {
    if (e instanceof Exception) {
      console.log(e.message);
      new MessagePopup(null, e.message)
        .setTitle("Error")
        .moveToCenter()
        .show();
    } else {
      throw e;
    }
  }
};

export default class UpMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPreferencesModal: false,
      demensions:''

    };
    console.log(props,'propsUpMenu')
  }
  updateDataDementions = (value) => {
    this.props.updateData(value)
    console.log(value,'demensions')
    // this.setState({ demensions: value })
 }
  // --------------open window Preferences---------------------
  handleOpenPreferences = event => {
    // event.preventDefault();
    this.setState(
      prevState => ({ openPreferencesModal: !prevState.openPreferencesModal }),
      () => {
        this.setState({
          openPreferencesModal: this.state.openPreferencesModal
        });
      }
    );
  };
  handleCloseModalPreferences = () => {
    this.setState(
      prevState => ({ openPreferencesModal: prevState.openPreferencesModal }),
      () => {
        this.setState({
          openPreferencesModal: !this.state.openPreferencesModal
        });
      }
    );
  };
  openHelpPreferences = () => {
    window.open("https://www.emachineshop.com/help-preferences/#measurements");
  };
  render() {
    return (
      <div className="UpMenu">
        <div className="Drop">
          <DropDownMenu />
        </div>
        <div className="Buttons">
          <div className="LeftButtonGroup">
            <div className="btn-group-two">
              <button onClick={() => app.group()}>
                <a href="#">
                  <img width="25px" src="images/Group.png" />
                </a>
              </button>
              <button onClick={() => app.ungroup()}>
                <a href="#">
                  <img width="25px" src="images/Ungroup.png" />
                </a>
              </button>
            </div>
            <div className="btn-group-three">
              <button onClick={() => app.board.zoomToFitScreen()}>
                <a href="#">
                  <img width="25px" src="images/ZoomToFitScreen.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="25px" src="images/ZoomToActualSize.png" />
                </a>
              </button>
              <button onClick={() => app.setTool("Zoom")}>
                <a href="#">
                  <img width="25px" src="images/Zoom.png" />
                </a>
              </button>
            </div>
            <div className="btn-group-other">
              <button onClick={() => app.deleteSelected()}>
                <a href="#">
                  <img width="24px" src="images/Delete.png" />
                </a>
              </button>
              <button onClick={this.handleOpenPreferences}>
                <a href="#">
                  <img width="24px" src="images/Preferences.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="24px" src="images/ToggleInch.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="24px" src="images/LineType.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="24px" src="images/Intersect.png" />
                </a>
              </button>
              <button onClick={() => show3D()}>
                <a href="#">
                  <img width="24px" src="images/3DPreview.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="18px" src="images/check2.png" />
                </a>
              </button>
            </div>
          </div>
          <div className="RightButtons">
            <Material />
            <SelectFinish />
          </div>
        </div>
        <Dialog
          maxWidth={false}
          open={this.state.openPreferencesModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ color: "black", textAlign: "left" }}
            id="alert-dialog-title"
          >
            <span>Preferences</span>
          </DialogTitle>

          <DialogContent
            style={{
              textAlign: "left",
              width: "550px",
              height: "325px",
              backgroundColor: "#f0ecec"
            }}
          >
            <Preferences updateDataDementions={this.updateDataDementions}/>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCloseModalPreferences}
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
              onClick={this.handleCloseModalPreferences}
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
              onClick={this.openHelpPreferences}
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
