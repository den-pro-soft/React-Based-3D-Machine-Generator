import React from "react";
import "./standing-part.scss";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SummaryWindow from "./SummaryWindow";


 class StandingPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      statesUSA: true,
      statesCanada: false,
      provinceOther: false,
      provinceOther2: false,
      firstName: "",
      lastName: "",
      // businessName:'',
      email: "",
      // adressLine1:'',
      city: "",
      province: "",
      stateUSA: "AL",
      stateCanada: "AB",
      country: "U.S.A.",

      provinceOther2:'',
      billingProvince:"",
      billingStateUSA:"",
      billingStateCanada:"",
      billingCountry: "U.S.A.",
      zip: "",

      isAgreeChecked:false,
      isAllowPublicChecked:false,
      isConsolidateChecked:false
    };
  }
  handleSelectStateUSA = e => {
    this.setState({ stateUSA: e.target.value }, () => {
      localStorage.setItem("stateUSA", this.state.stateUSA);
    });
  };
  handleSelectStateCanada = e => {
    this.setState({ stateCanada: e.target.value }, () => {
      localStorage.setItem("stateCanada", this.state.stateCanada);
    });
  };
  handleProvinceInputChange = e => {
    this.setState({ province: e.target.value }, () => {
      localStorage.setItem("province", this.state.province);
    });
  };
  handleSelectCountryChange = event => {
    this.setState({ country: event.target.value }, () => {
      localStorage.setItem("country", this.state.country);

      if (this.state.country !== "U.S.A." && this.state.country !== "Canada") {
        localStorage.removeItem("province");
        this.setState({
          provinceOther: true,
          province: ""
        });
      } else {
        this.setState({
          provinceOther: false
        });
      }
    });
  };
// ----------------------------------------Billing Address--------------------------------------
  handleSelectBillingStateUSA = e => {
    this.setState({ billingStateUSA: e.target.value }, () => {
      localStorage.setItem("stateUSA", this.state.billingStateUSA);
    });
  };
  handleSelectBillingStateCanada = e => {
    this.setState({ billingStateCanada: e.target.value }, () => {
      localStorage.setItem("stateCanada", this.state.billingStateCanada);
    });
  };
  handleBillingProvinceInputChange = e => {
    this.setState({ billingProvince: e.target.value }, () => {
      localStorage.setItem("province", this.state.billingProvince);
    });
  };
  handleSelectBillingCountryChange = event => {
    this.setState({ billingCountry: event.target.value }, () => {
      localStorage.setItem("country", this.state.billingCountry);

      if (this.state.billingCountry !== "U.S.A." && this.state.billingCountry !== "Canada") {
        localStorage.removeItem("province");
        this.setState({
          provinceOther2: true,
          billingProvince: ""
        });
      } else {
        this.setState({
          provinceOther2: false
        });
      }
    });
  };
  // handleChangeIsChecked = event => {
  //   this.setState({ value: event.target.value });
  //   if (event.target.value !== "U.S.A." && event.target.value !== "Canada") {
  //     this.setState({
  //       provinceOther2: true
  //     });
  //   } else {
  //     this.setState({
  //       provinceOther2: false
  //     });
  //   }
  // }
// ----------------------------------------------Checkboxes handlers----------------------------------------------------
  handleChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isChecked: !this.state.isChecked
      });
    }, 0);
  };
  handleAgreeChecked= event => {
    window.setTimeout(() => {
      this.setState({
        isAgreeChecked: !this.state.isAgreeChecked
      });
    }, 0);
  }

  handleAllowPublicChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isAllowPublicChecked: !this.state.isAllowPublicChecked
      });
    }, 0);
  }

  handleConsolidateChecked = event => {
    window.setTimeout(() => {
      this.setState({
        isConsolidateChecked: !this.state.isConsolidateChecked
      });
    }, 0);
  }

  render() {
    // console.log(this.props,'Standing-props')
    const countries = [
      "U.S.A.", "Canada", "United Kingdom","France","Germany","Italy","Ukraine","Switzerland","Denmark","Finland","Norway","Sweden",
      "Switzerland","Estonia","Latvia","Lithuania","Austria","Belgium","Netherlands","Mexico","Russia","Belarus","Poland","Czech Republic","Slovakia",
      "Hungary","Romania","Australia","Japan","India","Israel","China","Brazil","Spain","Turkey"
    ];
    const statesUSA = [
      "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
      "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
    ];
    const statesCanada = [
      "AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"
    ];

    return (
      
      <div className="StandingPart">
        <h3 className="Title">Shipping Address</h3>
        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>First Name:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
            <div className="LabelLast">
              <label>Last Name:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
        </div>

        <div className="Address">
          <div className="LabelAddress">
            <label>Address:</label>
          </div>
          <div className="InputAddress">
            <input className="InputFieldAddress" type="text" />
          </div>
        </div>

        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>City:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
            <div className="LabelLast">
              <label>State:</label>
            </div>
            {this.state.provinceOther && (
              <div className="InputText">
                <input
                  className="InputField"
                  type="text"
                  value={this.state.province}
                  onChange={this.handleProvinceInputChange}
                />
              </div>
            )}
            {this.state.country === "U.S.A." && (
              <div className="InputText">
                <select
                  className="InputSelect"
                  value={this.state.stateUSA}
                  onChange={this.handleSelectStateUSA}
                >
                  {statesUSA.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {this.state.country === "Canada" && (
              <div className="InputText">
                <select
                  className="InputSelect"
                  value={this.state.stateCanada}
                  onChange={this.handleSelectStateCanada}
                >
                  {statesCanada.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>ZIP:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
            <div className="LabelLast">
              <label>Country:</label>
            </div>
            <div className="InputText">
              <select
                className="InputSelect"
                value={this.state.country}
                onChange={this.handleSelectCountryChange}
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

        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>Company:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
            <div className="LabelLast">
              <label>Phone:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
        </div>

        <div className="FirstLastName">
          <div className="First">
            <div className="LabelFirst">
              <label>Email:</label>
            </div>
            <div className="InputText">
              <input className="InputField" type="text" />
            </div>
          </div>
          <div className="Last">
          <img width="260px" style={{marginLeft:'160px'}} src="images/ShippingLogos2.png" />
          </div>
        </div>

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
          <>
        <h3 className="Title">Billing Address</h3>

            <div className="FirstLastName">
              <div className="First">
                <div className="LabelFirst">
                  <label>First Name:</label>
                </div>
                <div className="InputText">
                  <input className="InputField" type="text" />
                </div>
              </div>
              <div className="Last">
                <div className="LabelLast">
                  <label>Last Name:</label>
                </div>
                <div className="InputText">
                  <input className="InputField" type="text" />
                </div>
              </div>
            </div>

            <div className="Address">
              <div className="LabelAddress">
                <label>Address:</label>
              </div>
              <div className="InputAddress">
                <input className="InputFieldAddress" type="text" />
              </div>
            </div>

            <div className="FirstLastName">
              <div className="First">
                <div className="LabelFirst">
                  <label>City:</label>
                </div>
                <div className="InputText">
                  <input className="InputField" type="text" />
                </div>
              </div>
              <div className="Last">
                <div className="LabelLast">
                  <label>State:</label>
                </div>
                {this.state.provinceOther2 && (
                  <div className="InputText">
                    <input
                      className="InputField"
                      type="text"
                      value={this.state.billingProvince}
                      onChange={this.handleBillingProvinceInputChange}
                    />
                  </div>
                )}
                {this.state.billingCountry === "U.S.A." && (
                  <div className="InputText">
                    <select
                      className="InputSelect"
                      value={this.state.billingStateUSA}
                      onChange={this.handleSelectBillingStateUSA}
                    >
                      {statesUSA.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {this.state.billingCountry === "Canada" && (
                  <div className="InputText">
                    <select
                      className="InputSelect"
                      value={this.state.billingStateCanada}
                      onChange={this.handleSelectBillingStateCanada}
                    >
                      {statesCanada.map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="FirstLastName">
              <div className="First">
                <div className="LabelFirst">
                  <label>ZIP:</label>
                </div>
                <div className="InputText">
                  <input className="InputField" type="text" />
                </div>
              </div>
              <div className="Last">
                <div className="LabelLast">
                  <label>Country:</label>
                </div>
                <div className="InputText">
                  <select
                    className="InputSelect"
                    value={this.state.billingCountry}
                    onChange={this.handleSelectBillingCountryChange}
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
          </>
        )}

        <div className="FunctionOfPart">
          <div className="LabelOfPart">
            <label>Function of Part:</label>
          </div>
          <div className="InputOfPart">
            <input className="InputFieldOfPart" type="text" />
          </div>
        </div>

        <div className="OptionalPurchase">
          <div className="LabelOptional">
            <label>Optional Purchase Order number for your reference only:</label>
          </div>
          <div className="InputAndButton">
          <div className="InputFieldOptional" >
            <input type="text" />
          </div>
            <Button
              onClick={() => this.props.updateSummaryWindow(!this.props.openSummary) }

              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                width: "192px",
                // height: "50px"
              }}
              color="primary"
            //   autoFocus
            >
              Show Summary
            </Button>
          </div>
        </div>

        <div className="BottomContent">
          <div className="Left">
            <p>Having trouble?</p>
            <p><a href="https://www.emachineshop.com/contact/" target="_blank"
              rel="noreferrer noopener">Contact us for help</a></p>
          </div>
          <div className="Right">
            <div style={{ padding: "10px" }}>
              <label>
                <Checkbox
                  checked={this.state.isAgreeChecked}
                  onChange={this.handleAgreeChecked}
                  style={{ padding: '0', margin: '0' }}
                  color="primary"
                />
                I agree to the <a href="https://www.emachineshop.com/terms-and-order-policies/" target="_blank"
                  rel="noreferrer noopener">Terms of Use and Order Policies</a> and have reviewed the
              <a href="https://www.emachineshop.com/help-ordering/#pre-order-checklist" target="_blank"
                  rel="noreferrer noopener"> Pre-Order Checklist</a>
              </label>
            </div>
            <div style={{ padding: "10px" }}>
              <label>
                <Checkbox
                  checked={this.state.isAllowPublicChecked}
                  onChange={this.handleAllowPublicChecked}
                  style={{ padding: '0', margin: '0' }}

                  color="primary"
                />
                Allow publication of part images. (Not Required)
          </label>
            </div>
            <div style={{ padding: "10px" }}>
              <label>
                <Checkbox
                  checked={this.state.isConsolidateChecked}
                  onChange={this.handleConsolidateChecked}
                  style={{ padding: '0', margin: '0' }}

                  color="primary"
                />
                <a href="https://www.emachineshop.com/help-ordering/#special-shipping" target="_blank"
                  rel="noreferrer noopener">Consolidate shipment</a> of orders placed today.
          </label>
            </div>
          </div>
        
        </div> 
        <div className="ButtonSubmit">
            <Button
              // onClick={() => this.props.openOrderModal(!this.props.openOrder) }

              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                // width: "192px",
                // height: "50px"
              }}
              color="primary"
              //   autoFocus
              disabled
            >
              Submit
            </Button>
          </div>
          <SummaryWindow/>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    openSummary: state.summaryWindowReducer.openSummary
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateSummaryWindow: openSummary => {
      dispatch({ type: "OPEN_SUMMARY_WINDOW", payload: openSummary });
    }
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StandingPart));