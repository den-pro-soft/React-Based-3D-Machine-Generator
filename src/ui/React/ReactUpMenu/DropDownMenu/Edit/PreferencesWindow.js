import React from "react";
import "./edit.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Preferences from "./Preferences";
import { connect } from "react-redux";

class PreferencesWidow extends React.Component {
  constructor(props) {
    super(props);
  }


  openHelpPreferences = () => {
    window.open("https://www.emachineshop.com/help-preferences/#measurements");
  };
  render() {
    return (
        <Dialog
        maxWidth={false}
        open={this.props.openPreferencesModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle
                style={{ color: "black", textAlign: "left" }}
                id="alert-dialog-title"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                         <span>Preferences</span>
                    </div>
                    <Button
                        onClick={() => this.props.updatePreferencesModal(!this.props.openPreferencesModal)}

                        style={{
                            backgroundColor: '#fff',
                            padding: '0px',
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
              height: "325px",
              backgroundColor: "#f0ecec"
            }}
          >
            <Preferences />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={()=>this.props.updatePreferencesModal(!this.props.openPreferencesModal)}
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
              onClick={()=>this.props.updatePreferencesModal(!this.props.openPreferencesModal)}
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
    );
  }
}

const mapStateToProps = state => {
    return {
        openPreferencesModal: state.preferencesWindowReducer.openPreferencesModal
  
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      updatePreferencesModal: openPreferencesModal => {
        dispatch({
          type: "OPEN_PREFERENCES_MODAL",
          payload: openPreferencesModal,
      
        });
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PreferencesWidow);