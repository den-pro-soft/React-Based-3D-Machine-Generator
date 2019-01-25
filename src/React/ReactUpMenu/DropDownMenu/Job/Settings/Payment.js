import React from "react";
import "./payment.scss";
import { withRouter } from "react-router-dom";

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order1:true,
      order2:false,
      order3:false,
      selectedOption: "order1",
      isChecked: false,

    };
  }

  handleOptionChange = changeEvent => {
    event.preventDefault();
    console.log(changeEvent.target.value, "event");

    this.setState({
      selectedOption: changeEvent.target.value
    });
if(this.state.selectedOption === "order1") {
  this.setState({
    order1:true,
      order2:false,
      order3:false,
  });
} else if (this.state.selectedOption === "order2"){
  this.setState({
    order1:false,
      order2:true,
      order3:false,
  });
} else if (this.state.selectedOption === "order3"){
  this.setState({
    order1:false,
      order2:false,
      order3:true
  });
}
  };
  handleChecked=(event) =>{
    window.setTimeout(
        () =>{
            this.setState({
                isChecked: !this.state.isChecked,
            });
        }, 0);
  }
  render() {
    return (
      <div className="Payment">
        <form>
          <div className="RadioButton">
            <label>
              <input
                type="radio"
                value="order1"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === "order1"}
              />{" "}
              Standard Order
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="order2"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === "order2"}
              />{" "}
              Change order in progress
            </label>

            <br />
            <label>
              <input
                type="radio"
                value="order3"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === "order3"}
              />
              Resubmit payment information
            </label>
          </div>
          {this.state.order1 && 
          <div className="Text">
          
          <p>
           Use this option normally<br/>
           To process the above selection click OK and then do Order | Place
              Order
          </p>
          <div className="InputOrder">
             Machine IDs #: <input type="text" /> (separated by commas)
             <br />
           </div>
          </div>}

          {this.state.order2 &&
          <div className="Text">
            
            <p>
           Use this option to make a change to in order in progress.(Do not use thismode if you received parts already and are changing your disign.)
           The minimum cost is 25$.The maximum can be substantial if the job has progressed.Your approval of the cost will be requestedif above the minimum.
           The charge will be determined manually be eMachineShop staff.<br/>Changing your order willdelay your job. If your request a change
           and don't approve the cost a 25$ administrative fee will be charged.After placing order, a new order number wiil be assigned
           as a replacement for the old order number.The new number will be emailed to you.<br/>
           To process the above selection click OK and then do Order | Place
              Order
          </p>
          <div className="InputOrder">
             Machine IDs #: <input type="text" /> (separated by commas)
             <br />
           </div>
           <p>Thees numbers can be found in your prior order confirmation email.</p>
          <div className="InputOrder">
             Original order #: <input type="text" />
             <br />
           </div>
           {/* <div> */}
            <p> Summary of changes:</p>
           <textarea name="message" rows="10" cols="80"></textarea>
  {/* </div> */}
          </div>}
         {this.state.order3 && 
          <div className="Text">
         
         <p>
              Use this option if the eMachineShop staff advises you to make a
              change that corrects payment information. There is no
              administrative charge for resubmitting an order in this way.
              <br />
              Note: Any disign changes may be ignored.
              <br />
              To process the above selection click OK and then do Order | Place
              Order
            </p>
             <div className="InputOrder">
             Original order #: <input type="text" />
             <br />
           </div>
           </div>

            }
      

         
          <fieldset className="Fieldset">
            <legend>Wrap parts individually (extra cost):</legend>
            <label>
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.handleChecked}
            />Recommended for decorative parts
            </label>
            <br/>
            
            </fieldset>
            <fieldset className="Fieldset">
            <legend>Reuse tooling</legend>
            <label>
            Reuse from job #: <input type="text" /> Tooling is kept for 1 year (renewed on reordering)
            </label>
            <br/>
            <p>(Use this only if the prior job shows "Hard Tooling - Yes" in the order confirmation e-mail and no disign changes were made)</p>
            </fieldset>
        </form>
      </div>
    );
  }
}
