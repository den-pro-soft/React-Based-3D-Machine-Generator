import React from "react";
import "./settings.scss";
import Adress from "./Adress";
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
            <NavLink className="Adress" exact activeStyle={{ color: "orange" }} to="/">
              Adress
            </NavLink>
            {/* <Adress onClick={this.props.history.push('/index.html?#/adress')}/> */}
          </li>
          <li>
            <NavLink className="Payment" activeStyle={{ color: "orange" }} to="/payment">
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink className="OrderOption" activeStyle={{ color: "orange" }} to="/order-options">
              OrderOption
            </NavLink>
          </li>
          <li>
            <NavLink className="Summary" activeStyle={{ color: "orange" }} to="/summary">
              Summary
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Content">
        Content
        <Switch>
          <Route path="/" exact render={() => <Adress />} />
          <Route path="/payment" component={Payment} />
          <Route path="/order-options" component={OrderOptions} />
          <Route path="/summary" component={Summary} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(Settings);
