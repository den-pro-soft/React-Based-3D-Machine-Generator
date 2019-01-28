import React from "react";
import "./settings.scss";
import Address from "./Address";
import Payment from "./Payment";
import OrderOptions from "./OrderOptions";
import Summary from "./Summary";
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
const Settings = (context, props) => {
  return (
    <div
      className="Settings"
      // style={{ display: "flex", justifyContent: "flex-start" }}
    >
      <div className="Menu">
        <ul>
          <li>
            <NavLink className="Address" exact activeStyle={{ color: "orangered" }} to="/">
              Address
            </NavLink>
            {/* <Adress onClick={this.props.history.push('/index.html?#/adress')}/> */}
          </li>
          <li>
            <NavLink className="Payment" activeStyle={{ color: "orangered" }} to="/payment">
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink className="OrderOption" activeStyle={{ color: "orangered" }} to="/order-options">
              Order Options
            </NavLink>
          </li>
          <li>
            <NavLink className="Summary" activeStyle={{ color: "orangered" }} to="/summary">
              Summary
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Content">
        <Switch>
          <Route path="/" exact render={() => <Address />} />
          <Route path="/payment" component={Payment} />
          <Route path="/order-options" component={OrderOptions} />
          <Route path="/summary" component={Summary} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(Settings);
