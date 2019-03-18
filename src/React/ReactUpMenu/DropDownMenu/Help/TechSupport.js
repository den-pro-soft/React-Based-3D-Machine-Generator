import React from "react";
import "./suggestion.scss";
import Checkbox from "@material-ui/core/Checkbox";

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         value: "Drawing", 
         email:'jimlewis@emachineshop.com',         
         isChecked:true };
  }
    
  handleChangeInputEmail = e => {
    console.log(e.target.value, "event");
    this.setState({ email: e.target.value });
 if(e.charCode===13){
    emailInput.blur()
 }
  }

  handleChangeSelect = event => {
    console.log(event.target.value, "event");
    this.setState({ value: event.target.value });
 
  };

  handleChangeCheckbox = event => {
    window.setTimeout(() => {
      this.setState({ isChecked: !this.state.isChecked });
    }, 0);
  };
  render() {
    return (
      <div className="Suggestion">
        {/* <p>
          Suggestions, comments and any problems you encounter (even small ones)
          will help us to bring you an even better product.
        </p> */}
        <form>
        <div className="Email">
          <label>Reply to:</label>
          <br />
          <input
            className="InputEmail"
            type="email"
            value={this.state.email}
            onChange={this.handleChangeInputEmail}
            onKeyPress={this.handleChangeInputEmail}
            ref={input => {
              this.emailInput = input;
            }}
          />
        </div>
        <div className="SelectBlock">
          <label>
            Category:
            <select
              className="Select"
              value={this.state.value}
              onChange={this.handleChangeSelect}
            >
              <option value="Drawing">Drawing</option>
              <option value="Material">Material</option>
              <option value="Finish">Finish</option>
              <option value="Feature">Feature</option>
              <option value="Analyzer">Analyzer</option>
              <option value="Pricing">Pricing</option>
              <option value="Other">Other (please specify)</option>
            </select>
          </label>
          {this.state.value==="Other" && <input className="InputInSelect" type="text" />}
        </div>
        <div className="Textarea">
          <label>Inquiry:</label>
          <br />
          <textarea rows="10" cols="98" />
        </div>
        <div className="Checkbox">
          <label>
            <Checkbox
              onChange={this.handleChangeCheckbox}
              checked={this.state.isChecked}
              color="primary"
            />
            Send my design and command log
          </label>
        </div>
        </form>
      </div>
    );
  }
}
