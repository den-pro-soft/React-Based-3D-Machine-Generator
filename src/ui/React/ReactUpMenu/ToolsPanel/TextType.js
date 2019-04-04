import React from "react";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import TextSelect from "./TextSelect";
import { connect } from "react-redux";

class TextType extends React.Component {
    constructor(props) {
        super(props);
        //todo: app.selectElements[0].text -   need take from properties
        this.state = {
            text: app.selectElements[0].text,
            textSize: this.props.textSize
        };
    }

    componentDidMount() {
        if(this.state.text.length==0 && this.props.withoutText) {
            this.textInput.focus();
        }
    }


  componentWillMount() {
    app.addHandler("selectElements", elements => {
      if (app.selectElements.length == 1) {
        if (elements[0].typeName === "Text") {
          let textSize = app.selectElements[0].fontSize.toFixed(3);
          this.props.updateTextSize(textSize);
          if (this.props.demensions === "Millimeters") {
            this.setState({ textSize: textSize + " mm" });
          } else {
            this.setState({ textSize: (textSize / 25.4).toFixed(3) + ' "' });
          }
        }
      }
    });
  }

  // componentWillReceiveProps(nextProps){ 

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
      let textSize = this.props.textSize;

      if (this.props.demensions === "Millimeters") {
        this.setState({ textSize: textSize + " mm" });
      } else {
        this.setState({ textSize: (textSize / 25.4).toFixed(3) + ' "' });
      }
    }

      if(this.state.text.length==0 && this.props.withoutText) {
          this.textInput.focus();
      }
  }
  handlyChangeTextInput = e => {
    this.setState({
      text: e.target.value
    });
    app.setTextForSelectedElement(e.target.value);
  };

  handlyChangeTextSizeInput = e => {
    let textSize = e.target.value;

    this.setState({ textSize });

    if (e.charCode === 13) {
      if (this.props.demensions === "Millimeters") {
        this.setState({
          textSize: textSize.replace(/[^0-9.]/g, "") + " mm"
        });
        let textSize1 = this.state.textSize.replace(/[^0-9.]/g, "");
        this.props.updateTextSize(textSize1);

        app.setFontSizeForSelectedElement(textSize1);
        this.fontSizeInput.blur();
      } else {
        this.setState({
          textSize: textSize.replace(/[^0-9.]/g, "") + ' "'
        });
        let textSize1 = this.state.textSize.replace(/[^0-9.]/g, "");
        this.props.updateTextSize(textSize1);

        app.setFontSizeForSelectedElement(textSize1 * 25.4);
        this.fontSizeInput.blur();
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
              src="resources/images/Text.png"
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
          ref={input => {
            this.fontSizeInput = input;
          }}
          data-place="bottom"
          data-tip="<span>Font Size<br/>Height of the text.To change,<br/>
      enter a value and press the Enter key</span>"
        />
        {this.props.withoutText && (
          <>
            <button className="btn-Text">
              <a href="#">
                <img
                  width="18px"
                  src="resources/images/Text.png"
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
              ref={input => {
                this.textInput = input;
              }}
            />
          </>
        )}

        {this.props.withoutText && this.props.value === "Auto" && (
          <TextSelect />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    textSize: state.toolsPanelReducer.textSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTextSize: textSize => {
      dispatch({ type: "UPDATE_TEXT_SIZE", payload: textSize });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextType);
