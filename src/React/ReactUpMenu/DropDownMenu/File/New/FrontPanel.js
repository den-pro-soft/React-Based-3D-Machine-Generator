import React from "react";
import "./front-panel.scss";
import Button from "@material-ui/core/Button";

export default class FrontPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthValue: `6,000${String.fromCharCode(34)}`,
      width: `2,000${String.fromCharCode(34)}`,
      diameter: `0,150${String.fromCharCode(34)}`
    };
  }
  handleInputLenght = event => {
    event.preventDefault();

    this.setState({ lengthValue: event.target.value  });
    // if(event.charCode == '13'){

    //     this.setState({
    //       lengthValue: this.state.lengthValue + `${String.fromCharCode(34)}`
    //     });
    // }
    console.log(
      this.state.lengthValue,
      event.target.value,
      "this.state.lengthValue"
    );
  };
  handleClickInputLenght = event => {
    event.preventDefault();
if(event.charCode == '13'){

    this.setState({
      lengthValue: this.state.lengthValue + `${String.fromCharCode(34)}`
    });
}
    console.log(
      event.charCode,
      event.target.value,
      "charCode===13"
    );
  };

  handleInputWidth = event => {
    event.preventDefault();

    this.setState({ width: event.target.value });
    console.log(this.state.width, "this.state.width");
  };

  handleInputDiameter = event => {
    event.preventDefault();

    this.setState({ diameter: event.target.value });
    console.log(this.state.diameter, "this.state.diameter");
  };
  resetButton = () => {
    this.setState({
      lengthValue: `6,000${String.fromCharCode(34)}`,
      width: `2,000${String.fromCharCode(34)}`,
      diameter: `0,150${String.fromCharCode(34)}`
    });
  };
  render() {
    return (
      <div className="FrontPanel">
        <p className="Title">
          A polygon where each side has the same lenght, and all interior angles
          are equal and less then 180 degrees.
        </p>
        {/* <p className="Parameters">Parameters:</p> */}

        <div className="Parameters">
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
        </div>

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
                <input
                  type="text"
                  className="Input"
                  value={
                    this.state.lengthValue /*`${String.fromCharCode(34)}`*/
                  }
                  onChange={this.handleInputLenght}
                //   onKeyUp={this.handleInputLenght}

                  onKeyUp={this.handleClickInputLenght}
                />
              </td>
            </tr>
            <tr>
              <td>Width</td>
              {/* <td className="Value">2000</td> */}
              <td>
                <input
                  type="text"
                  className="Input"
                  value={this.state.width /*`${String.fromCharCode(34)}`*/}
                  onChange={this.handleInputWidth}
                //   onKeyPress={this.handleClickInputLenght}

                />
              </td>
            </tr>
            <tr>
              <td>Mounting Hole Diameter</td>
              {/* <td className="Value">0.150{String.fromCharCode(34)}</td> */}
              <td>
                <input
                  type="text"
                  className="Input"
                  value={this.state.diameter /*`${String.fromCharCode(34)}`*/}
                  onChange={this.handleInputDiameter}
                //   onKeyPress={this.handleClickInputLenght}

                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="Parameters">Preview:</p>
      </div>
    );
  }
}
