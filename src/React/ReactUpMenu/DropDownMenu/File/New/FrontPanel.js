import React from "react";
import "./front-panel.scss";

export default class FrontPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        value:6000
    }
  }
onChangeInput =event => {

}
  render() {
    return (
      <div className="FrontPanel">
        <p className="Title">
          A polygon where each side has the same lenght, and all interior angles
          are equal and less then 180 degrees.
        </p>
        <p className="Parameters">Parameters:</p>

        {/* <div className="Parameters">
          <p>Parameters:</p>
          <Button
            onClick={this.resetButton}
            style={{
              backgroundColor: "#dddada",
              color: "orangered",
              boxShadow: "2px 2px 1px #000"
            }}
            color="primary"
            autoFocus
          >
            Reset
          </Button>
        </div> */}
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Length</td>
              <td className="Value">
                <input type="text" value={this.state.value+`${String.fromCharCode(34)}`} />
              </td>
            </tr>
            <tr>
              <td>Width</td>
              <td className="Value">2000</td>
            </tr>
            <tr>
              <td>Mounting Hole Diameter</td>
              <td className="Value">0.150{String.fromCharCode(34)}</td>
            </tr>
          </tbody>
        </table>
        <p className="Parameters">Preview:</p>
      </div>
    );
  }
}
