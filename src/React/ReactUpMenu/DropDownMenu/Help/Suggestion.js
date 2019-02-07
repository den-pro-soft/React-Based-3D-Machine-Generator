import React from "react";
import "./suggestion.scss";
import Checkbox from "@material-ui/core/Checkbox";

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Drawing", isChecked:true };
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
        <p>
          Suggestions, comments and any problems you encounter (even small ones)
          will help us to bring you an even better product.
        </p>
        <form>
        <div className="Email">
          <label>Email:(Not Required)</label>
          <br />
          <input
            className="InputEmail"
            type="email"
            // size="80"
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
          <label>Feedback:</label>
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
            Attach current design file
          </label>
        </div>
        </form>
      </div>
    );
  }
}
