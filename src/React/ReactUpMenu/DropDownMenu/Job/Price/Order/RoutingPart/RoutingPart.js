import React from "react";
import "./routing-part.scss";
import CreditCard from "./CreditCard";
import PrepayByCheck from "./PrepayByCheck";
import PurchaseOrder from "./PurchaseOrder";
import {
  Route,
  Switch,
  NavLink,
  Link
} from "react-router-dom";

export default class RoutingPart extends React.Component {
  constructor(props) {
    super(props);
 
    }

    componentDidMount() {
      // console.log(this.props, 'this.props-RoutngPart');
      this.props.history.push('/order/purchase-order') 
    }
    componentWillUnmount() {
      // console.log(this.props, 'this.props-New')
      this.props.history.push('/') 
    }
 render(){
  return (
    <div
      className="RoutingPart"
    >
      <div className="Menu">
        <ul>
          <li>
            <NavLink
              className="CreditCard"
              activeStyle={{ color: "blue" }}
              to="/order/credit-card"
            >
              Credit Card
            </NavLink>
          </li>
          <li>
            <NavLink
              className="PrepayByCheck"
              activeStyle={{ color: "blue" }}
              to="/order/prepay-by-check"
            >
              Prepay by check
            </NavLink>
          </li>
          <li>
            <NavLink
              className="PurchaseOrder"
              exact
              activeStyle={{ color: "blue" }}
              to="/order/purchase-order"
              // replace 
            >
             Purchase Order 
            </NavLink>
          </li>
       
        </ul>
      </div>
      <div className="Content">
        <Switch>

          <Route path="/order/credit-card" component={CreditCard} />
          <Route path="/order/prepay-by-check" component={PrepayByCheck} />
          <Route path="/order/purchase-order" exact component={PurchaseOrder} />

        </Switch>

      </div>
    </div>
  );
}
    }

