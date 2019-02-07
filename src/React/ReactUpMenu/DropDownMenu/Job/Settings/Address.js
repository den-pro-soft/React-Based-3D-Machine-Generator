import React from "react";
import "./addres.scss";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

export default class Adress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      statesUSA: true,
      statesCanada: false,
      provinceOther: false,
      provinceOther2: false,

      value: "U.S.A."
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
    if (event.target.value !== "U.S.A." && event.target.value !== "Canada") {
      this.setState({
        provinceOther: true
      });
    } else {
      this.setState({
        provinceOther: false
      });
    }
    console.log(event.target.value, "this.state,value-country");
  };
  
  handleChangeIsChecked = event => {
    this.setState({ value: event.target.value });
    if (event.target.value !== "U.S.A." && event.target.value !== "Canada") {
      this.setState({
        provinceOther2: true
      });
    } else {
      this.setState({
        provinceOther2: false
      });
    }
    console.log(event.target.value, "this.state,value-country");
  };

  handleChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  openLinkPryvacy = () => {
    window.open("https://www.emachineshop.com/privacy/");
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
    const statesCanada = [
      "AB",
      "BC",
      "MB",
      "NB",
      "NL",
      "NS",
      "NT",
      "NU",
      "ON",
      "PE",
      "QC",
      "SK",
      "YT"
    ];

    return (
      <div className="Address">
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
              <div className="InputGroup">
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="Fieldset">
            <legend>E-mail & Phone:</legend>
            <div className="InputLabel-Block">
              <div className="Label">
                <div>
                  {" "}
                  <span>*</span>Email address:
                </div>
                <div>
                  <span>*</span>Phone number:{" "}
                </div>
              </div>
              <div className="InputGroup">
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <input type="text" />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="Fieldset">
            <legend>Shipping address:</legend>
            <div className="InputLabel-Block">
              <div className="Label">
                <div>
                  <span>*</span>Address Line 1:
                </div>
                <div>
                  <span style={{ color: "transparent" }}>*</span>Address Line 2:
                </div>
                <div>
                  <span>*</span>City:
                </div>
                <div>
                  <span>*</span>State or province:
                </div>
                <div>
                  <span>*</span>ZIP or postal code:
                </div>
                <div>
                  <span>*</span>Country:
                </div>
              </div>
              <div className="InputGroup">
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <input type="text" />
                </div>
                {this.state.provinceOther && (
                  <div className="Input">
                    <input type="text" />
                  </div>
                )}
                {this.state.value === "U.S.A." && (
                  <div className="Input">
                    <select>
                      {statesUSA.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {this.state.value === "Canada" && (
                  <div className="Input">
                    <select>
                      {statesCanada.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="Input">
                  <input type="text" />
                </div>
                <div className="Input">
                  <select
                    /*value={this.state.value}*/ onChange={this.handleChange}
                  >
                    {countries.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
          <div style={{ padding: "10px" }}>
            <label>
              <Checkbox
                checked={this.state.isChecked}
                onChange={this.handleChecked}
                color="primary"
              />
              Billing address (enter only if different from shipping address)
            </label>
          </div>

          {this.state.isChecked && (
            <fieldset className="Fieldset">
              <div className="InputLabel-Block InputBlock-Hide">
                <div className="Label">
                  <div>First Name:</div>
                  <div>Last Name: </div>
                  <div>Address Line 1:</div>
                  <div> Address Line 2:</div>
                  <div> City:</div>
                  <div> State or province:</div>
                  <div> ZIP or postal code:</div>
                  <div>Country:</div>
                  <div>Email address:</div>
                  <div>Phone number: </div>
                </div>
                <div className="InputGroup">
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                  {this.state.provinceOther2 && (
                    <div className="Input">
                      <input type="text" />
                    </div>
                  )}
                  {this.state.value === "U.S.A." && (
                    <div className="Input">
                      <select>
                        {statesUSA.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {this.state.value === "Canada" && (
                    <div className="Input">
                      <select>
                        {statesCanada.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <select onChange={this.handleChangeIsChecked}>
                      {countries.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                  <div className="Input">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="CopyBlock">
                <div>
                  Must match the billing address on file for credit card
                </div>
                <Button
                  size="small"
                  style={{ backgroundColor: "#fff", color: "orangered" }}
                  autoFocus
                >
                  Copy
                </Button>
              </div>
            </fieldset>
          )}
          <div>
            <span style={{ color: "red" }}>*</span> - required to place an order  
          </div>
          <div>
            For our privacy policy please visit{" "}
            <a
            onClick={this.openLinkPryvacy}
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
