import React from "react";
import "./Adress.scss";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

export default class Adress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      bottomFieldset: false,
      statesUSA:false
    };
    console.log(this.state, "this.state");
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked(event) {
    event.preventDefault();

    console.log(this.state.isChecked, "Checked before");
    console.log(this.state.bottomFieldset, "fieldset before");

    // this.setState(
    //   prevState => ({
    //     isChecked: !prevState.isChecked,
    //     bottomFieldset: prevState.bottomFieldset
    //   })
    //   // ,
    //   // () => {
    //   //   this.setState({
    //   //     isChecked: this.state.isChecked,
    //   //     bottomFieldset: !this.state.bottomFieldset
    //   //   });
    //   // }
    // );
    this.setState({
      isChecked: !event.target.checked,
      // isChecked: !this.state.isChecked,
      bottomFieldset: !this.state.bottomFieldset
    });
    // this.setState({ isChecked: !this.state.isChecked, bottomFieldset:!this.state.bottomFieldset });
    console.log(this.state.isChecked, "checked after");
    console.log(this.state.bottomFieldset, "fieldset after");
  }

  render() {
    const countries = [
      "U.S.A.",
      "Canada",
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Ukraine",
      "Switzerland",
      "Denmark",
      "Finland",
      "Norway",
      "Sweden",
      "Switzerland",
      "Estonia",
      "Latvia",
      "Lithuania",
      "Austria",
      "Belgium",
      "Netherlands",
      "Mexico",
      "Russia",
      "Belarus",
      "Poland",
      "Czech Republic",
      "Slovakia",
      "Hungary",
      "Romania",
      "Australia",
      "Japan",
      "India",
      "Israel",
      "China",
      "Brazil",
      "Spain",
      "Turkey"
    ];
    const statesUSA = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ];
    return (
      <div className="Adress">
        <form>
          <fieldset className="Fieldset">
            <legend>Name:</legend>
            <div className="InputLabel-Block">
              <div className="Label">
                <div>
                  <span>*</span>First Name:
                </div>
                <div>
                  <span>*</span>Last Name:{" "}
                </div>
                <div>
                  <span style={{ color: "transparent" }}>*</span>Business Email:
                </div>
              </div>
              <div className="Input">
                <input type="text" />
                <br />
                <input type="text" />
                <br />
                <input type="text" />
                <br />
              </div>
            </div>
          </fieldset>
          <fieldset className="Fieldset">
            <legend>E-mail & Phone:</legend>
            <div className="InputLabel-Block">
              <div className="Label">
                <div>
                  {" "}
                  <span>*</span>Email adress:
                </div>
                <div>
                  <span>*</span>Phone number:{" "}
                </div>
              </div>
              <div className="Input">
                <input type="text" />
                <br />
                <input type="text" />
                <br />
              </div>
            </div>
          </fieldset>
          <fieldset className="Fieldset">
            <legend>Shipping adress:</legend>
            <div className="InputLabel-Block">
              <div className="Label">
                <div>
                  <span>*</span>Adress Line 1:
                </div>
                <div>
                  {" "}
                  <span style={{ color: "transparent" }}>*</span>Adress Line 2:
                </div>
                <div>
                  {" "}
                  <span>*</span>City:
                </div>
                <div>
                  {" "}
                  <span>*</span>State of province:
                </div>
                <div>
                  {" "}
                  <span>*</span>ZIP or postal code:
                </div>
                <div>
                  <span>*</span>Country:
                </div>
              </div>
              <div className="Input">
                <input type="text" />
                <br />
                <input type="text" />
                <br />
                <input type="text" />
                <br />
                {this.state.statesUSA &&  <input type="text" />}
                  <select>
                    {statesUSA.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <br />
                <input type="text" />
                <br />
                <select>
                  {countries.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
                <br />
              </div>
            </div>
          </fieldset>
          <div
            style={{ padding: "10px" }}
            // onClick={()=>this.handleChecked()}
          >
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onClick={this.handleChecked}
              onChange={this.handleChecked}
            />
            Billing adress (enter only if different from shipping adress)
            <br />
          </div>
          {this.state.bottomFieldset && (
            <fieldset className="Fieldset">
              {/* <legend></legend> */}
              <div className="InputLabel-Block InputBlock-Hide">
                <div className="Label">
                  <div>First Name:</div>
                  <div>Last Name: </div>
                  <div>Adress Line 1:</div>
                  <div> Adress Line 2:</div>
                  <div> City:</div>
                  <div> State of province:</div>
                  <div> ZIP or postal code:</div>
                  <div>Country:</div>
                  <div>Email adress:</div>
                  <div>Phone number: </div>
                </div>
                <div className="Input">
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
               {this.state.statesUSA &&  <input type="text" />}
                  <select>
                    {statesUSA.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <br />
                  <input type="text" />
                  <br />
                  <select>
                    {countries.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <br />
                  <input type="text" />
                  <br />
                  <input type="text" />
                  <br />
                </div>
              </div>
              <div className="CopyBlock">
                <div>Must match the billing adress on file for credit card</div>
                {/* <button>Copy</button> */}
                <Button
                  size="small"
                  // onClick={this.closeSubModal}
                  style={{ backgroundColor: "#fff", color: "orangered" }}
                  autoFocus
                >
                  Copy
                </Button>
              </div>
            </fieldset>
          )}
          <div>
            <span style={{ color: "red" }}>*</span> -required to place in order
          </div>
          <div>
            For our privacy policy please visit{" "}
            <a
              href="https://www.emachineshop.com/privacy/"
              target="_blank"
              rel="noreferrer noopener"
            >
              emachineshop.com
            </a>
          </div>
        </form>
      </div>
    );
  }
}
