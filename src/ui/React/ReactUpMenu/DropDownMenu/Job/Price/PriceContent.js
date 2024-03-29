import React from "react";
import "./price-content.scss";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MachiningGrid from "./MachiningGrid";
import Order from "./Order/Order";

class PriceContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "UPS Ground",
      isChecked:false,
      country:'U.S.A.',
      quantity:100
    };
  }
  componentWillMount() {
    const Quantity = localStorage.getItem('quantity');
    if (Quantity === null) {
      localStorage.setItem('quantity',this.state.quantity)
      this.setState({ quantity: this.state.quantity })
    }
     else {
      this.setState({ quantity: Quantity })
    }

    const Country = localStorage.getItem('country');
    if (Country === null) {
      this.setState({ country: this.state.country })
    } else {
      this.setState({ country: Country })
    }
  }
  
  handleChangeInputQuantity = e => {
    this.setState({ quantity: e.target.value });
    localStorage.setItem('quantity',e.target.value)
  }
  handleChangeSelect = e => {
    this.setState({ value: e.target.value });
  };

  handleChecked = e => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  render() {
    // console.log(this.props, "props-PriceContent")
    const ShvipVia = [
      "UPS Ground",
      "UPS 3 Day Select",
      "UPS 2nd Day Air",
      "UPS Next Day Air"
    ];
    return (
      <div className="PriceContent">
        <div className="Quantity">
          <div className="LabelQuantity">
            <label>Quantity</label>
          </div>
          <div className="InputNumber">
            <input
             value={this.state.quantity}
             onChange={this.handleChangeInputQuantity}
              type="number"
                min="1"
              //   max="250"
            />
          </div>
        </div>

        <div className="MachiningGrid">
          <div className="LabelMachining">
            <label>Machining</label>
          </div>
          <div className="Grid">
            <MachiningGrid />
          </div>
        </div>
        <div className="ShipVia">
          <div className="LabelShipVia">
            <label>Ship Via</label>
          </div>
          <div className="Select">
            <select
              className="SelectMode"
              value={this.state.value}
              onChange={this.handleChangeSelect}
            >
              {ShvipVia.map((val, i) => (
                <option value={val} key={i}>
                  {val}
                </option>
              ))}
            </select>
            <span>to</span><a href="#">{this.state.country}</a>
          </div>
        </div>

        <div className="Shipping">
          <div className="LabelShipping">
            <label>Shipping</label>
          </div>
          <div className="ShippingValue">
            <span>Free</span>
          </div>
        </div>

     {/* {!this.state.isChecked&&(
                <>
                    <div className="Tax">
                        <div className="LabelTax">
                            <label>Tax</label>
                        </div>
                        <div className="TaxValue">
                            <span>$10</span>
                        </div>
                    </div>

                    <div className="Checkbox">
                        <div className="LabelCheckbox">
                            <label></label>
                        </div>
                        <div className="CheckboxInput">
                            <label >
                                <Checkbox
                                    style={{ paddingLeft: '0px', marginLeft: 0 }}
                                    checked={this.state.isChecked}
                                    onChange={this.handleChecked}
                                    color="primary"
                                />
                                NJ customer exempt from sales tax
                            </label>
                        </div>
                    </div>
                </>)} */}
     

        <div className="Total">
          <div className="LabelTotal">
            <label>Total</label>
          </div>
          <div className="TotalRightPart">
            <span className="TotalResult">$100</span>
            <Button
              onClick={() => this.props.openOrderModal(!this.props.openOrder) }

              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                width: "192px",
                height: "50px"
              }}
              color="primary"
              autoFocus
            >
              Order...
            </Button>
            <Button
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                height: "35px",
                marginTop:'7.5px',
                // marginRight:'5px'
              }}
              color="primary"
              // autoFocus
            >
              Print...
            </Button>
          </div>
        </div>

        <div className="Note">
          <p>
            *Times are{" "}
            <a
              href="https://www.emachineshop.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              estimates
            </a>{" "}
            in business days and exclude delivery transit time.{" "}
          </p>
          <p>
            See our{" "}
            <a
              href="https://www.emachineshop.com/cost-reduction/"
              target="_blank"
              rel="noreferrer noopener"
            >
              cost optimization tips
            </a>
            .
          </p>
        </div>
      <Order history={this.props.history}/>

      </div>

    );
  }
}
const mapStateToProps = state => {
    return {
        openOrder: state.orderWindowReducer.openOrder
    };
  };
const mapDispatchToProps = dispatch => {
    return {
      openOrderModal: openOrder => {
        dispatch({ type: "OPEN_ORDER", payload: openOrder });
      }
    };
  };
  export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PriceContent))
