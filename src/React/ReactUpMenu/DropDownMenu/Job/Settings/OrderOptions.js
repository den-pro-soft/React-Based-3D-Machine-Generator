import React from "react";
import "./order-options.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

export default class OrderOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "order1",
      isChecked: false
    };
  }

  handleRadioChange = event => {
    event.preventDefault();

    this.setState({ value: event.target.value });
    console.log(this.state.value, "this.state.value");
  };

  handleChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  render() {
    return (
      <div className="OrderOptions">
        <form>
          <div className="RadioButton">
            <FormControl /*component="fieldset" */>
              <RadioGroup
                // aria-label="Order"

                value={this.state.value}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="order1"
                  control={
                    <Radio
                      color="primary"
                      // color="default"
                      classes={{ root: "root" }}
                    />
                  }
                  label="Standard Order"
                />
                <FormControlLabel
                  value="order2"
                  control={
                    <Radio
                      classes={{ root: "root" }}
                      color="primary"
                      // color="default"
                    />
                  }
                  label="Change order in progress"
                />
                <FormControlLabel
                  value="order3"
                  control={
                    <Radio
                      color="primary"
                      //  color="default"
                    />
                  }
                  label="Resubmit payment information"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {this.state.value === "order1" && (
            <div className="Text">
              <p>
                Use this option normally
                <br />
                To process the above selection click OK and then do Order |
                Place Order
              </p>
              <div className="InputOrder">
                Machine IDs #: <input type="text" /> (separated by commas)
                <br />
              </div>
            </div>
          )}

          {this.state.value === "order2" && (
            <div className="Text">
              <p>
                Use this option to make a change to in order in progress.(Do not
                use this mode if you received parts already and are changing your
                disign.) The minimum cost is 25$.The maximum can be substantial
                if the job has progressed.Your approval of the cost will be
                requested if above the minimum. The charge will be determined
                manually by eMachineShop staff.
                <br />
                Changing your order will delay your job. If your request a change
                and don't approve the cost a 25$ administrative fee will be
                charged.After placing order, a new order number will be assigned
                as a replacement for the old order number.The new number will be
                emailed to you.
                <br />
                To process the above selection click OK and then do Order |
                Place Order
              </p>
              <div className="InputOrder">
                Machine IDs: <input type="text" /> (separated by commas)
                <br />
              </div>
              <p>
                Thees numbers can be found in your prior order confirmation
                email.
              </p>
              <div className="InputOrder">
                Original order #: <input type="text" />
                <br />
              </div>
              <div className="Textarea">
                <p> Summary of changes:</p>
                <textarea rows="10" cols="88" />
              </div>
            </div>
          )}

          {this.state.value === "order3" && (
            <div className="Text">
              <p>
                Use this option if the eMachineShop staff advises you to make a
                change that corrects payment information. There is no
                administrative charge for resubmitting an order in this way.
                <br />
                Note: Any disign changes may be ignored.
                <br />
                To process the above selection click OK and then do Order |
                Place Order
              </p>
              <div className="InputOrder">
                Original order #: <input type="text" />
                <br />
              </div>
            </div>
          )}

          <fieldset className="Fieldset">
            <legend>Wrap parts individually (extra cost):</legend>
            <div style={{ padding: "10px" }}>
              <label>
                <Checkbox
                  checked={this.state.isChecked}
                  onChange={this.handleChecked}
                  color="primary"
                />
                Recommended for decorative parts
              </label>
            </div>
        
          </fieldset>
          <fieldset className="Fieldset">
            <legend>Reuse tooling</legend>
            <label>
              Reuse from job # <input type="text" /> Tooling is kept for 1 year
              (renewed on reordering)
            </label>
            <br />
            <p>
              (Use this only if the prior job shows "Hard Tooling - Yes" in the
              order confirmation e-mail and no disign changes were made)
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}
