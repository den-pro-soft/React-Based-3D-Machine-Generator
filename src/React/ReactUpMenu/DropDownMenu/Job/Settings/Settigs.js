import React from "react";
import "./settings.scss";
import Address from "./Address";
import Payment from "./Payment";
import OrderOptions from "./OrderOptions";
import Summary from "./Summary";
import { Route, Redirect, Switch, Link, NavLink } from "react-router-dom";

export default class Settings extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // console.log(this.props, 'this.props-New')
      this.props.history.push("/settings/address");
    }
    componentWillUnmount() {
      // console.log(this.props, 'this.props-New')
      this.props.history.push("/");
    }
    render() {
      return (
        <div className="Settings">
          <div className="Menu">
            <ul>
              <li>
                <NavLink
                  className="Address"
                  exact
                  activeStyle={{ color: "blue" }}
                  to="/settings/address"
                  // replace
                >
                  Address
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="Payment"
                  activeStyle={{ color: "blue" }}
                  to="/settings/payment"
                >
                  Payment
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="OrderOption"
                  activeStyle={{ color: "blue" }}
                  to="/settings/order-options"
                >
                  Order Options
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="Summary"
                  activeStyle={{ color: "blue" }}
                  to="/settings/summary"
                >
                  Summary
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="Content">
            <Switch>
              <Route path="/settings/address" exact component={Address} />
              <Route path="/settings/payment" component={Payment} />
              <Route path="/settings/order-options" component={OrderOptions} />
              <Route path="/settings/summary" component={Summary} />
            </Switch>
          </div>
        </div>
      );
    }
}
