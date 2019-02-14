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
      textSize:app.selectElements[0].fontSize + ' "'//app.config.textSize 
    };
    // console.log(app.selectElements[0].text,'elementText')
  }

  componentWillMount() {
    app.addHandler("selectElement", element => {
    console.log(element,'elementText')

      // if(app.selectElements.length==1){
        if (element.typeName === "Text") {
         let textSize = app.selectElements[0].fontSize
          if(this.props.demensions==='Inches'){
          this.setState({ textSize: textSize + ' "' });
          console.log(this.state.textSize,'value-inch');
          console.log(element,'elementText');
          } else {
          this.setState({ textSize: (textSize*25.4).toFixed(3) + ' mm'});
          }
          app.setFontSizeForSelectedElement((this.state.textSize).replace(/[^0-9.]/g, ""));
        }
      // }
    });
  }
  handlyChangeTextInput = e =>{
      this.setState({
        text: e.target.value
      });
      app.setTextForSelectedElement(e.target.value);
  };

  handlyChangeTextSizeInput = e =>{
    let textSize = e.target.value;
  
      if(e.charCode === 13) {
        if(this.props.demensions==='Inches'){
          this.setState({
            textSize: textSize.replace(/[^0-9.]/g, "")  + ' "'
          });
        } else {
          this.setState({
            textSize: textSize.replace(/[^0-9.]/g, "")  + ' mm'
          });
        }
          app.setFontSizeForSelectedElement(textSize.replace(/[^0-9.]/g, ""));
      }
      else{
          this.setState({
            textSize: textSize.replace(/[^0-9.]/g, "")
          });
      }
  };

  componentDidMount(){
    this.textInput.focus();
    // document.getElementById('text').focus();

  // console.log(app.board, app,'app.board')

  //   app.board.addHandler('mouseMove', e => {console.log(e,'mouseMove')});

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
          value={this.state.textSize}
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
const mapStateToProps = (state) => {
  return {
    demensions: state.demensions
  }
}


export default connect(mapStateToProps)(TextType)