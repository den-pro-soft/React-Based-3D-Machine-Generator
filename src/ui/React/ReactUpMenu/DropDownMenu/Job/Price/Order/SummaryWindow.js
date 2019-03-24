import React from "react";
// import "./price.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Summary from "../../Settings/Summary";

class SummaryWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props, "props-SummaryWindow");
    return (
      <Dialog
        maxWidth={false}
        open={this.props.openSummary}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <img width="25px" src="resources/images/icon.jpg" />
              <span style={{ marginLeft: "5px" }}>Summary</span>
            </span>
            <Button
              onClick={() => {
                this.props.closeSummaryWindow(!this.props.openSummary);
              }}
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
            height: "480px",
            backgroundColor: "#f0ecec"
          }}
        >
        <div style={{marginTop:'20px'}}>
        <Summary />        
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',padding:'10px'}}>
        <Button
            onClick={() => this.props.closeSummaryWindow(!this.props.openSummary)}
            style={{
              backgroundColor: "#dddada",
              boxShadow: "2px 2px 1px #000",
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </div>
        </DialogContent>
        {/* <DialogActions>
          <Button
            onClick={() => this.props.closePriceModal(!this.props.openPrice)}
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
            onClick={() => this.props.closePriceModal(!this.props.openPrice)}
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
            onClick={this.openHelpPrice}
            style={{
              backgroundColor: "#dddada",
              boxShadow: "2px 2px 1px #000"
            }}
            color="primary"
            autoFocus
          >
            Help
          </Button>
        </DialogActions> */}
      </Dialog>
    );
  }
}
const mapStateToProps = state => {
  return {
    openSummary: state.summaryWindowReducer.openSummary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSummaryWindow: openSummary => {
      dispatch({ type: "CLOSE_SUMMARY_WINDOW", payload: openSummary });
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SummaryWindow)
);
