import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default class PrepayByCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state={isChecked:false}
  }
  handleChecked = event => {
    setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  render() {
    return (
      <div className="PrepayByCheck">
        <div className="Input">
    {this.state.isChecked===false&&(<label>
            Check number: <input type="text"/>
          </label>)}
    {this.state.isChecked===true&&(<label style={{color:'lightgrey'}}>
            Check number: <input type="text" disabled/>
          </label>)}
          {/* <div className="CheckboxInput"> , marginLeft: 0*/}
                            {/* <label > */}
                                <Checkbox
                                    style={{ marginLeft:'10px' }}
                                    checked={this.state.isChecked}
                                    onChange={this.handleChecked}
                                    color="primary"
                                />
                               Paying by company check, but number not yet available. 
                            {/* </label> */}
                        {/* </div> */}
        </div>
        <p style={{ textAlign: "left" }}>
          So that order processing can begin please mail your check to:
          <br />
          eMachineShop
          <br />
          31 Industrial Ave, Unit 6
          <br />
          Mahwah, NJ 07430
        </p>
      </div>
    );
  }
}
