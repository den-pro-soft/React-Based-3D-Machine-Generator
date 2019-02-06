import React, { Fragment } from "react";
// import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

export default class MoveButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColorCopy: "#f0f0f0d9"
    };
  }
  handleClickCopy = () => {
    this.setState({
      bgColorCopy: this.state.bgColorCopy === "#f0f0f0d9" ? "#fff" : "#f0f0f0d9"
    });
  };

  moveUp = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.moveSelected(0, app.config.moveStep);
    }
  };

  moveDown = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.moveSelected(0, -app.config.moveStep);
    }
  };

  moveLeft = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.moveSelected(-app.config.moveStep, 0);
    }
  };
  moveRight = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.moveSelected(app.config.moveStep, 0);
    }
  };

  rotateLeft = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.rotateSelected(-app.config.rotateStep, 0);
    }
  };

  rotateRight = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.rotateSelected(app.config.rotateStep, 0);
    }
  };

  render() {
    return (
      <Fragment>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
        <button
          className="btn-Copy"
          onClick={this.handleClickCopy}
          style={{ backgroundColor: this.state.bgColorCopy }}
        >
          <a href="#">
            <img
              width="18px"
              src="images/Copy.png"
              data-place="bottom"
              data-tip="<span>Repeat (Ctrl+ D)<br/>When this button is pressed in, the nudge arrow buttons and the<br/>
              nudge rotation buttons will create copies of the selected shape.<br/>
              For example, to create 3 copies to the right of an existing shape,<br/>
              select the shape, press in this Repeat button and press the right<br/>
              arrow button or key 3 times. </span>"
            />
          </a>
        </button>
        <button className="btn-Up" onClick={this.moveUp}>
          <a href="#">
            <img
              width="18px"
              src="images/Up.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <button className="btn-Down" onClick={this.moveDown}>
          <a href="#">
            <img
              width="18px"
              src="images/Down.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <button className="btn-Left" onClick={this.moveLeft}>
          <a href="#">
            <img
              width="18px"
              src="images/Left.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <button className="btn-Right" onClick={this.moveRight}>
          <a href="#">
            <img
              width="18px"
              src="images/Right.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <input
          type="text"
          defaultValue={app.config.moveStep}
          onChange={e => {
            app.config.moveStep = e.target.value;
          }}
        />
        <button className="btn-Right" onClick={this.rotateLeft}>
          <a href="#">
            <img
              width="18px"
              src="images/Unclock.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <button className="btn-Right" onClick={this.rotateRight}>
          <a href="#">
            <img
              width="18px"
              src="images/Clock.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
        <input
          type="text"
          className="InputRotate"
          defaultValue={app.config.rotateStep}
          onChange={e => {
            app.config.rotateStep = e.target.value;
          }}
        />
      </Fragment>
    );
  }
}
