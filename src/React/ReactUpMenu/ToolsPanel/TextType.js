import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import TextSelect from "./TextSelect";

export default class TextType extends React.Component {
  constructor(props) {
    super(props);
    //todo: app.selectElements[0].text -   need take from properties
    this.state = {
      text:app.selectElements[0].text,
      textSize:app.config.textSize
    };
  }

  handlyChangeTextInput = e =>{
      this.setState({
        text: e.target.value
      });
      app.setTextForSelectedElement(e.target.value);
  };

  handlyChangeTextSizeInput = e =>{
      if(event.charCode === 13) {
          app.setFontSizeForSelectedElement(e.target.value);
      }else{
          this.setState({
            textSize: e.target.value
          });
      }
  };

  componentDidMount(){
    this.textInput.focus();
  }
  
  render() {
    return (
      <Fragment>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button className="btn-FontSize">
          <a href="#">
            <img
              width="18px"
              src="images/Text.png"
              data-place="bottom"
              data-tip="<span>Font Size<br/>Height of the text.To change,<br/>
      enter a value and press the Enter key</span>"
            />
          </a>
        </button>
        <input
          type="text"
          //   value={this.state.value}
          //   onChange={this.handleChangeInputLength}
          data-place="bottom"
          data-tip="<span>Font Size<br/>Height of the text.To change,<br/>
      enter a value and press the Enter key</span>"

        value={this.state.textSize}
        onChange={this.handlyChangeTextSizeInput}
        onKeyPress={this.handlyChangeTextSizeInput}
        />
        <button className="btn-Text">
          <a href="#">
            <img
              width="18px"
              src="images/Text.png"
              data-place="bottom"
              data-tip="<span>Text<br/>Body of message.To change,<br/>
 enter a value and press the Enter key. </span>"
            />
          </a>
        </button>
        <input
          style={{ width: "200px" }}
          type="text"
          data-place="bottom"
          data-tip="<span>Text<br/>Body of message.To change,<br/>
          enter a value and press the Enter key. </span>"
          value={this.state.text}
          onChange={this.handlyChangeTextInput}

          ref={(input) => { this.textInput = input; }}
        />

        {this.props.value === "Auto" && <TextSelect />}
      </Fragment>
    );
  }
}
