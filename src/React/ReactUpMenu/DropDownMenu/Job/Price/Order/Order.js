import React from "react";
// import "./price.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RoutingPart from "./RoutingPart/RoutingPart"
import StandingPart from "./StandingPart"


class Order extends React.Component {
  constructor(props) {
    super(props);

}

  render() {
    // console.log(this.props, "props-Order");
    return (
      <Dialog
        maxWidth={false}
        open={this.props.openOrder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <span>
              <img width="25px" src="images/icon.jpg" /> */}
              <span style={{ marginLeft: "5px" }}>Order</span>
            {/* </span> */}
            <Button
              onClick={() => {
                this.props.closeOrderModal(!this.props.openOrder);
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
            width: "800px",
            height: "680px",
            backgroundColor: "#f0ecec"
          }}
        >
        <RoutingPart history={this.props.history}/>
        <StandingPart/>
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
    openOrder: state.priceReducer.openOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeOrderModal: openOrder => {
      dispatch({ type: "CLOSE_ORDER", payload: openOrder });
    }
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Order));