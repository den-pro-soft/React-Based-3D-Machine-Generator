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
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";

class Machine extends React.Component {
    constructor(props) {
      super(props);
    }
   
    componentDidMount() {
        // console.log(this.props, 'this.props-New')
        // this.props.history.push('/machine/auto') 
        this.props.history.push('/') 

      }
    // componentWillUnmount() {
    //     // console.log(this.props, 'this.props-New')
    //     this.props.history.push('/') 
    //   }
    render() {  
      return (
        <div
          className="Machine"
        >
        <p className="TitleTop">Use the selections below to assign a purpose to each line in your drawing.</p>
        <div className="MenuAndContenet">
          <div className="Menu">
        <p className="MenuTitle">Relevant Items</p>

              <ul>
                <li>
                  <NavLink
                    className="Auto"
                    exact
                    activeStyle={{ color: "blue" }}
                    // to="/machine/auto"
                    to="/"
                  >
                    Auto
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    className="Tap"
                    exact
                    activeStyle={{ color: "blue" }}
                    to="/machine/tap"
                  >
                    Thead&Tap
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    className="Bend"
                    activeStyle={{ color: "blue" }}
                    to="/machine/bend"
                  >
                    Bend
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    className="LazerMark"
                    activeStyle={{ color: "blue" }}
                    to="/machine/lazer-mark"
                  >
                    Lazer Mark
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    className="ToSelf"
                    activeStyle={{ color: "blue" }}
                    to="/machine/to-self"
                  >
                    Comments to Self
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="ToMachinist"
                    activeStyle={{ color: "blue" }}
                    to="/machine/to-machinist"
                  >
                    Comments to Machinist
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="Content">
              <Switch>
                <Route path="/" exact render={() => <Auto />} />
                {/* <Route path="/machine/auto" exact component={Auto} /> */}
                {/* <Route path="/machine/tap" component={Tap} /> */}
                <Route path="/machine/bend" component={Bend} />
                {/* <Route path="/machine/lazer-mark" component={LazerMark} /> */}
                <Route path="/machine/to-self" component={CommentsToSelf} />
                <Route path="/machine/to-machinist" component={CommentsToMachinist} />
              </Switch>

            </div>
          </div>
        </div>
      );
    };
  
}
// export default Machine;
export default withRouter(Machine);

