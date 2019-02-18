import React from "react";
import "./machine.scss";
import Auto from "./Auto";
import Tap from "./Tap";
import Bend from "./Bend";
import LazerMark from "./LazerMark";
import CommentsToSelf from "./CommentsToSelf";

import CommentsToMachinist from "./CommentsToMachinist";

import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
const Machine = (props) => {
  return (
    <div
      className="Settings"
    >
      <div className="Menu">
        <ul>
          <li>
            <NavLink
              className="Auto"
              exact
              activeStyle={{ color: "blue" }}
              to="/"
            >
              Auto
            </NavLink>
          </li>
          <li>
            <NavLink
              className="Tap"
              activeStyle={{ color: "blue" }}
              to="/tap"
            >
              Thead&Tap
            </NavLink>
          </li>
          <li>
            <NavLink
              className="Bend"
              activeStyle={{ color: "blue" }}
              to="/bend"
            >
              Bend
            </NavLink>
          </li>
          <li>
            <NavLink
              className="LazerMark"
              activeStyle={{ color: "blue" }}
              to="/lazer-mark"
            >
              Lazer Mark
            </NavLink>
          </li>
          <li>
            <NavLink
              className="LazerMark"
              activeStyle={{ color: "blue" }}
              to="/to-self"
            >
              Comments to Self
            </NavLink>
          </li>
          <li>
            <NavLink
              className="LazerMark"
              activeStyle={{ color: "blue" }}
              to="/to-machinist"
            >
              Comments to Machinist
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Content">
      <Switch>
          <Route path="/" exact render={() => <Auto />} />
          <Route path="/tap" component={Tap} />
          <Route path="/bend" component={Bend} />
          <Route path="/lazer-mark" component={LazerMark} />
          <Route path="/to-self" component={CommentsToSelf} />
          <Route path="/to-machinist" component={CommentsToMachinist} />
        </Switch>

      </div>
    </div>
  );
};

export default withRouter(Machine);
