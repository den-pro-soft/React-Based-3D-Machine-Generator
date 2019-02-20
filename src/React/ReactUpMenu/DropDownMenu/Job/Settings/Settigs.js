import React from "react";
import "./settings.scss";
import Address from "./Address";
import Payment from "./Payment";
import OrderOptions from "./OrderOptions";
import Summary from "./Summary";
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from "react-router-dom";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstName:'',
      // lastName:'',
      businessName:'',
      email:'',
      // order:'Standard Order'
    }
    }
//   updateFirstName = (value) => {
//     this.setState({ firstName: value })
//  }

//  updateLastName = (value) => {
//   this.setState({ lastName: value })
// }

updateBusinessName = (value) => {
  console.log(value,'value in Settinsg')
  this.setState({ businessName: value })
}

updateEmail = (value) => {
  console.log(value,'value in Settinsg')
  this.setState({ email: value })
}
// updateOrder =  (value) => {
//   console.log(value,'value in Settinsg')
//   this.setState({ order: value })
// }
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
          <Route path="/" exact render={() => <Address 
          // updateFirstName={this.updateFirstName} 
          // updateLastName={this.updateLastName}
          updateBusinessName={this.updateBusinessName}
          updateEmail={this.updateEmail}
          // updateOrder={this.updateOrder}
          />}/>
          {/* <Route path="/" exact component={Address} /> */}

          <Route path="/payment" component={Payment} />
          <Route path="/order-options" component={OrderOptions} />
          {/* <Route path="/summary" component={Summary} /> */}

          <Route path="/summary" render={() => <Summary 
            // firstName={this.state.firstName}
            // lastName={this.state.lastName}
            businessName={this.state.businessName} 
            email={this.state.email} 
            // order={this.state.order}
            />
            } />
        </Switch>

      </div>
    </div>
  );
}
    }

