import React from "react";
// import "./price.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import PriceContent from './PriceContent'


class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  openHelpPrice = () => {
    window.open("https://www.emachineshop.com/help-ordering/#pricing");
  };
  render() {
    console.log(this.props, "props-Price");
    return (
      <Dialog
        maxWidth={false}
        open={this.props.openPrice}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
          <img width="25px" src="images/icon.jpg" />
            <span style={{marginLeft:'5px'}}>Price</span>
          </span>
            <Button
              onClick={() =>{
                this.props.closePriceModal(!this.props.openPrice)
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
            width: "800px",
            height: "700px",
            backgroundColor: "#f0ecec"
          }}
        >
        <PriceContent/>
{/* 
          <div className="Yes-No-buttons">
            <Button
              onClick={() =>{
                app.config.openConfirm = !this.props.openConfirm;
                this.props.closeConfirmModal(!this.props.openConfirm)
              }
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
              onClick={() =>{
                app.config.openConfirm = !this.props.openConfirm;
                this.props.closeConfirmModal(!this.props.openConfirm)
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
          </div> */}
        </DialogContent>
        <DialogActions>
            <Button
            onClick={() => this.props.closePriceModal(!this.props.openPrice) }
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
            onClick={() => this.props.closePriceModal(!this.props.openPrice) }
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
          </DialogActions>
      </Dialog>
    );
  }
}
const mapStateToProps = state => {
  return {
    openPrice: state.priceReducer.openPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePriceModal: openPrice => {
      dispatch({ type: "CLOSE_PRICE", payload: openPrice });
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Price);
// export default Price
