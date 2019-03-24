import React from "react";
import "./routing-part.scss";

export default class CreditCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const years = [
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026,
      2027,
      2028,
      2029,
      2030
    ];
    return (
      <div className="CreditCardContent">
        <div className="LeftContent">
          <div className="Input">
            <label>
              Name on card: <input className="InpitField" type="text" />
            </label>
          </div>
          <div className="Month-Year-CW">
            <label className="SelectMonth">
              Month:
              <select>
                {months.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            {/* </div> */}
            {/* <div className="Input"> */}
            <label className="SelectYear">
              Year:
              <select>
                {years.map((item, i) => (
                  <option value={item} key={i}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              CW: <input className="CW" type="text" />
            </label>
          </div>
        </div>
        <div className="RightContent">
          <div className="Input">
            <label>
              Card number: <input className="InpitField" type="text" />
            </label>
          </div>
          <div className="Cards">
            {/* <img width="60px" src="resources/images/Visa.png" />
            <img width="60px" src="resources/images/MasterCard.png" />
            <img style={{marginBottom:'10px'}} width="60px" src="resources/images/American.png" /> */}
            <img width="323px" src="resources/images/cards.png"/>
            </div>
        </div>
      </div>
    );
  }
}
