import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import TextSelect from "./TextSelect";
import {connect} from 'react-redux';

class TextType extends React.Component {
  constructor(props) {
    super(props);
    //todo: app.selectElements[0].text -   need take from properties
    this.state = {
      text:app.selectElements[0].text,
      fontSize:app.config.textSize
    };
  }
  componentDidMount() {
    {this.props.withoutText&& this.textInput.focus();}
  }

  componentWillMount() {

    app.addHandler("selectElement", element => {
    if (app.selectElements.length == 1) {
      if (element.typeName === "Text") {
     
         let textSize = app.selectElements[0].fontSize
        //  console.log(this.props,textSize,'props-text-size')

        if (this.props.demensions === "Millimeters") {
          app.config.textSize=textSize.toFixed(3) + " mm" 
          this.setState({ fontSize: app.config.textSize });
        } else {
          app.config.textSize=(textSize / 25.4).toFixed(3) + ' "' 
          this.setState({ fontSize: app.config.textSize });
        }
      }
    }
      
    });

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {

if (prevProps.demensions === "Millimeters") {
app.config.textSize=(this.state.fontSize).replace(/[^0-9.]/g, "");
} else {
  app.config.textSize =(this.state.fontSize).replace(/[^0-9.]/g, "")*25.4;
}

let textSize = app.config.textSize;

if (this.props.demensions === "Millimeters") {
  this.setState({ fontSize: textSize.toFixed(3) +" mm"});
} else {
  this.setState({ fontSize:(textSize / 25.4).toFixed(3) + ' "'});
}

  }
}
  handlyChangeTextInput = e =>{
      this.setState({
        text: e.target.value
      });
      app.setTextForSelectedElement(e.target.value);
  };

  handlyChangeTextSizeInput = e =>{
    app.config.textSize = (e.target.value).replace(/[^0-9.]/g, "");
    let textSize = app.config.textSize;
    this.setState({fontSize:textSize})

      if(e.charCode === 13) {
        if(this.props.demensions==='Millimeters'){
          this.setState({
            fontSize: textSize + ' mm'
          });
    app.setFontSizeForSelectedElement(textSize);

        } else {
          this.setState({
            fontSize: textSize + ' "'
          });
    app.setFontSizeForSelectedElement(textSize*25.4);

        }
      }
  };

 
  
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
          value={this.state.fontSize}
          onChange={this.handlyChangeTextSizeInput}
          onKeyPress={this.handlyChangeTextSizeInput}

          data-place="bottom"
          data-tip="<span>Font Size<br/>Height of the text.To change,<br/>
      enter a value and press the Enter key</span>"     
        />
      {this.props.withoutText&& (<><button className="btn-Text">
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
          id="text"
          style={{ width: "200px" }}
          type="text"
          data-place="bottom"
          data-tip="<span>Text<br/>Body of message.To change,<br/>
          enter a value and press the Enter key. </span>"
          value={this.state.text}
          onChange={this.handlyChangeTextInput}

          ref={(input) => { this.textInput = input; }}
      /></>)}

        {this.props.withoutText && this.props.value === "Auto"&& <TextSelect />}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions
  };
};


export default connect(mapStateToProps)(TextType)