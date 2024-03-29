import React from "react";
import "./machine.scss";
import Auto from "./Auto";
import Tap from "./Tap";
import Bend from "./Bend";
import LazerMark from "./LazerMark";
import CommentsToSelf from "./CommentsToSelf";
import CommentsToMachinist from "./CommentsToMachinist";

import AutoLineType from './../../../../../model/line_types/Auto';
import BendLineType from './../../../../../model/line_types/Bend';
import CommentToSelfLineType from './../../../../../model/line_types/CommentToSelf';
import CommentToMachinistLineType from './../../../../../model/line_types/CommentToMachine';

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
      // console.log(this.props, "this.props-New");
      // this.props.history.replace("/machine/auto");
      // this.props.history.push('/');
        if(this.props.lineType instanceof Bend){
            this.props.history.replace('/machine/bend');
        }else{
            this.props.history.replace('/');
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.lineType instanceof Bend){
            console.log("Bend props");
        }
    }

    changeLineType(typeName){
        let newLineType = null;
        switch (typeName) {
            case "Bend":
                newLineType = new BendLineType();
                break;
            case "CommentToSelf":
                newLineType = new CommentToSelfLineType();
                break;
            case "CommentToMachinist":
                newLineType = new CommentToMachinistLineType();
                break;
            default:
                newLineType = new AutoLineType();
        }
        this.props.changeLineType(newLineType);
    }

    render() {
      // console.log(this.props,'machine')
      return (
        <div className="Machine">
          <p className="TitleTop">
            Use the selections below to assign a purpose to each line in your
            drawing.
          </p>
          <div className="MenuAndContenet">
            <fieldset className="Menu">
              <legend className="MenuTitle">Relevant Items</legend>
              <div className="Menu-UL">
                <ul>
                  <li onClick={()=>{this.changeLineType('Auto')}}>
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
                    <li>
                    <NavLink
                      className="Tap"
                      exact
                      activeStyle={{ color: "blue" }}
                      to="/machine/tap"
                    >
                      Thead&Tap
                    </NavLink>
                  </li>
                  <li onClick={()=>{this.changeLineType('Bend')}}>
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
                  <li onClick={()=>{this.changeLineType('CommentToSelf')}}>
                    <NavLink
                      className="ToSelf"
                      activeStyle={{ color: "blue" }}
                      to="/machine/to-self"
                    >
                      Comments to Self
                    </NavLink>
                  </li>
                  <li onClick={()=>{this.changeLineType('CommentToMachinist')}}>
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
            </fieldset>
            <div className="Content">
              <Switch>
                <Route path="/" exact render={() => <Auto />} />
                {/* <Route path="/machine/auto" exact render={() => <Auto />}  /> */}
                {/* <Route path="/machine/tap" component={Tap} /> */}
                <Route path="/machine/bend" component={Bend} />
                {/* <Route path="/machine/lazer-mark" component={LazerMark} /> */}
                <Route path="/machine/to-self" component={CommentsToSelf} />
                <Route
                  path="/machine/to-machinist"
                  component={CommentsToMachinist}
                />
              </Switch>
            </div>
          </div>
        </div>
      );
    }
}

export default withRouter(Machine);
