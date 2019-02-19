import React from "react";
import "./machine.scss";
import Auto from "./Auto";
import Tap from "./Tap";
import Bend from "./Bend";
import LazerMark from "./LazerMark";
import CommentsToSelf from "./CommentsToSelf";
import CommentsToMachinist from "./CommentsToMachinist";

// import { withRouter } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
const Machine = (context,props) => {
  return (
    <div
      className="Machine"
    >
      <div className="Menu">
        <ul>
          <li>
            <NavLink
              className="Auto"
              exact
              activeStyle={{ color: "blue" }}
              to="/auto"
            >
              Auto
            </NavLink>
          </li>
          <li>
            <NavLink
              className="Tap"
              exact
              activeStyle={{ color: "blue" }}
              to="/auto/tap"
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
              className="ToSelf"
              activeStyle={{ color: "blue" }}
              to="/to-self"
            >
              Comments to Self
            </NavLink>
          </li>
          <li>
            <NavLink
              className="ToMachinist"
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
          {/* <Route path="/" exact render={() => <Auto />} /> */}
          <Route path="/auto" exact component={Auto} />

          <Route path="/auto/tap" component={Tap} />
          <Route path="/bend" component={Bend} />
          <Route path="/lazer-mark" component={LazerMark} />
          <Route path="/to-self" component={CommentsToSelf} />
          <Route path="/to-machinist" component={CommentsToMachinist} />
        </Switch>

      </div>
    </div>
  );
};

export default Machine;
// export default withRouter(Machine);

