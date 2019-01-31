import React from "react";
import "./new.scss";
import BlankDisign from "./BlankDisign";
import Tutorial from "./Tutorial";
import FrontPanel from "./FrontPanel";
import BoltPlate from "./BoltPlate";

import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
const New = (context, props) => {
  return (
    <div>
      <p>
        To create your own design select 'Blank Design'. Or select one of the
        listed wizards and enter the desired parameters.
      </p>

      <div className="New">
        <div className="Menu">
          <ul>
            <li>
              <NavLink
                className="BlankDisign"
                exact
                activeStyle={{ color: "blue" }}
                to="/"
              >
                Blank Design
              </NavLink>
            </li>
            <li>
              <NavLink
                className="Tutorial"
                activeStyle={{ color: "blue" }}
                to="/tutorial"
              >
                Tutorial Shapes
              </NavLink>
            </li>
            <li>
              <NavLink
                className="FrontPanel"
                activeStyle={{ color: "blue" }}
                to="/front-panel"
              >
                Front panel/name plate/sign
              </NavLink>
            </li>
            <li>
              <NavLink
                className="BoltPlate"
                activeStyle={{ color: "blue" }}
                to="/bolt-plate"
              >
                Bolt plate
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="Content">
          <Switch>
            <Route path="/" exact render={() => <BlankDisign />} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/front-panel" component={FrontPanel} />
            <Route path="/bolt-plate" component={BoltPlate} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(New);
