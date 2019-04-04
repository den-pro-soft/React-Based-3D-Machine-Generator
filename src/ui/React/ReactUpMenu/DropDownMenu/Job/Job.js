import React from "react";
import "./job.scss";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Settings from "./Settings/Settigs";
import Price from "./Price/Price";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//working  import 
import Order from "./Price/Order/Order"

class Job extends React.Component {
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
    // console.log(this.props, "props-Job");

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
              {/*<li   */}
              {/*onClick={() => {*/}
                {/*this.props.openPriceModal(!this.props.openPrice);*/}
              {/*} }*/}
              {/*>*/}
                {/*<a href="#">Price/Analyze</a>*/}
              {/*</li>*/}
              <li onClick={()=>{
                  window.open('https://www.emachineshop.com/help-ordering/#pre-order-checklist');
                }}>
                <a
                  href="https://www.emachineshop.com/help-ordering/#pre-order-checklist"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Checklist
                </a>
              </li>
              <li 
                onClick={() => {
                  this.props.openPriceModal(!this.props.openPrice);
                } }
                  >
                <a href="#">Review & Place Order...</a>
              </li>
            </ul>
          ) : null}
        </div>
        <Dialog
          maxWidth={false}
          open={this.state.openSubModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ color: "black", textAlign: "left" }}
            id="alert-dialog-title"
          >
            <img
              width="25px"
              src="resources/images/icon.jpg"
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
            <Settings history={this.props.history}/>
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
        <Price history={this.props.history}/>
        {/* <Order history={this.props.history}/> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    openPrice: state.priceReducer.openPrice
    // openOrder: state.priceReducer.openOrder

  };
};
const mapDispatchToProps = dispatch => {
  return {
    openPriceModal: openPrice => {
      dispatch({ type: "OPEN_PRICE", payload: openPrice });
    }

  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Job));