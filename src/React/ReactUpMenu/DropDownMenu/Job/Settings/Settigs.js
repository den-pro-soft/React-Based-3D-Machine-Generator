import React from "react";
import "./settings.scss";
import Address from "./Address";
import Payment from "./Payment";
import OrderOptions from "./OrderOptions";
import Summary from "./Summary";
import {
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
 
    }

 render(){
  return (
    <div
      className="Settings"
    >
      <div className="Menu">
        <ul>
          <li>
            <NavLink
              className="Address"
              exact
              activeStyle={{ color: "blue" }}
              to="/"
            >
              Address
            </NavLink>
          </li>
          <li>
            <NavLink
              className="Payment"
              activeStyle={{ color: "blue" }}
              to="/payment"
            >
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink
              className="OrderOption"
              activeStyle={{ color: "blue" }}
              to="/order-options"
            >
              Order Options
            </NavLink>
          </li>
          <li>
            <NavLink
              className="Summary"
              activeStyle={{ color: "blue" }}
              to="/summary"
            >
              Summary
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Content">
        <Switch>

          <Route path="/" exact component={Address} />
          <Route path="/payment" component={Payment} />
          <Route path="/order-options" component={OrderOptions} />
          <Route path="/summary" component={Summary} />

        </Switch>

      </div>
    </div>
  );
}
    }

