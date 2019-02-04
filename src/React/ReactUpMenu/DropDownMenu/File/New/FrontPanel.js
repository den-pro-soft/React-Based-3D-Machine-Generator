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
    // event.preventDefault();
    // if(event.charCode !== 13){

    this.setState({ lengthValue: event.target.value  });
    // }else
    if(event.charCode === 13){

        this.setState({
          lengthValue: event.target.value + `${String.fromCharCode(34)}`
        });
    }
    console.log(
    //   this.state.lengthValue,
      event.target,
      "event.target.lengthValue"
    );
  };
  // handleClickInputLenght = event => {
  //   if(event.charCode === 13){

  //       this.setState({
  //         lengthValue: event.target.value + `${String.fromCharCode(34)}`
  //       });
  //   // event.preventDefault();

  //       // event.stopPropagation();
  //   }
  //   console.log(
  //     event.charCode,
  //     event.target.value,
  //     "charCode===13"
  //   );
  // };

  handleInputWidth = event => {
    // event.preventDefault();

    this.setState({ width: event.target.value });
    if(event.charCode === 13){

      this.setState({
        width: event.target.value + `${String.fromCharCode(34)}`
      });
  }
    console.log(this.state.width, "this.state.width");
  };

  handleInputDiameter = event => {
    
    // event.preventDefault();

    this.setState({ diameter: event.target.value });
    if(event.charCode === 13){

      this.setState({
        diameter: event.target.value + `${String.fromCharCode(34)}`
      });
    console.log(this.state.diameter, "this.state.diameter");
  };
}
  // ------------------Rest Button------------
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
        {/* <p className="Title">
          A polygon where each side has the same lenght, and all interior angles
          are equal and less then 180 degrees.
        </p> */}
        <div className="Parameters">
          <p className="ParamTitle">Parameters:</p>{" "}
          <Button
          onClick={this.resetButton}
            style={{
              marginTop:'10px',
              backgroundColor: "#dddada",
              boxShadow: "2px 2px 1px #000",
              height:'30px'
            }}
            color="primary"
            size="small"
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
                    this.state.lengthValue
                  }
                  onKeyPress={this.handleClickInputLenght}

                  onChange={this.handleInputLenght}
                  onKeyPress={this.handleInputLenght}

                />
              </td>
            </tr>
            <tr>
              <td>Width</td>
              <td>
                <input
                  type="text"
                  className="Input"
                  value={this.state.width}
                  onChange={this.handleInputWidth}
                  onKeyPress={this.handleInputWidth}


                //   onKeyPress={this.handleClickInputLenght}

                />
              </td>
            </tr>
            <tr>
              <td>Mounting Hole Diameter</td>
              <td>
                <input
                  type="text"
                  className="Input"
                  value={this.state.diameter}
                  onChange={this.handleInputDiameter}
                  onKeyPress={this.handleInputDiameter}

                //   onKeyPress={this.handleClickInputLenght}

                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <p className="Parameters">Preview:</p> */}
      </div>
    );
  }
  }

