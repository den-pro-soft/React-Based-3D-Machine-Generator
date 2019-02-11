import React from "react";
import "./edit.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Preferences from "./Preferences";

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      openPreferencesModal: false
    };
    console.log(props,'Edit')

  }
  // --------for Preference - inches/mm---------------------------------------------------
  updateDataDemensions = (value) => {
    this.props.updateDataDemensions (value)
    console.log(value,'demensions')
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
      <div className="Edit">
        <div
          className="btn-Edit"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Edit
          {this.state.displayMenu ? (
            <ul>
              <li onClick={() => app.undo()}>
                <a href="#">Undo</a>
              </li>
              <li onClick={() => app.redo()}>
                <a href="#">Redo</a>
              </li>
              <li onClick={() => app.buffer.cut()}>
                <a href="#">Cut</a>
              </li>
              <li onClick={() => app.buffer.copy()}>
                <a href="#">Copy</a>
              </li>
              <li onClick={() => app.buffer.paste()}>
                <a href="#">Paste</a>
              </li>

              <li onClick={() => app.deleteSelected()}>
                <a href="#">Delete</a>
              </li>
              <li onClick={() => app.selectAll()}>
                <a href="#">Select All</a>
              </li>
              <li onClick={this.handleOpenPreferences}>
                <a href="#">Preferences</a>
              </li>
            </ul>
          ) : null}
        </div>
        <Dialog
          maxWidth={false}
          open={this.state.openPreferencesModal}
          // onClose={this.handleCloseModal}
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
            <Preferences updateDataDemensions={this.updateDataDemensions} demensions={this.props.demensions}/>
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
