import React from "react";
import "./new.scss";
import BlankDisign from "./BlankDisign";
import Tutorial from "./Tutorial";
import FrontPanel from "./FrontPanel";
// import {browserHistory} from 'react-router';
// browserHistory.listen(location => {
//   browserHistory.push('/super/url');
// });
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink,
  // browserHistory
} from "react-router-dom";

export default class New extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    console.log(this.props, 'this.props-New')
    this.props.history.push('/')

  }
  render(){
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
           
          </ul>
        </div>
        <div className="Content">
          <Switch>
            <Route path="/" exact render={() => <BlankDisign />} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/front-panel" component={FrontPanel} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
}
// export default withRouter(New);
