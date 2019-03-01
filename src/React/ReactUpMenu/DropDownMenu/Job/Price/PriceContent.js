import React from "react";
import "./price-content.scss";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import MachiningGrid from "./MachiningGrid";

class PriceContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "UPS Ground"
    };
  }

  handleChangeSelect = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    // console.log(this.props, "props-Price");
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
            <label htmlFor="Quantity">Quantity</label>
          </div>
          <div className="InputNumber">
            <input
              type="number"
              id="Quantity"
              //   min="10"
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
            <span>to</span>
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

        <div className="Total">
          <div className="LabelTotal">
            <label>Total</label>
          </div>
          <div className="TotalRightPart">
            <span>$100</span>
            <Button
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                width: "120px",
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
                height: "35px"
              }}
              color="primary"
              autoFocus
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
      </div>
    );
  }
}
// const mapStateToProps = state => {
//     return {
//       openPrice: state.priceReducer.openPrice
//     };
//   };

//   const mapDispatchToProps = dispatch => {
//     return {
//       closePriceModal: openPrice => {
//         dispatch({ type: "CLOSE_PRICE", payload: openPrice });
//       }
//     };
//   };
//   export default connect(mapStateToProps,mapDispatchToProps)(PriceContent);
export default PriceContent;
