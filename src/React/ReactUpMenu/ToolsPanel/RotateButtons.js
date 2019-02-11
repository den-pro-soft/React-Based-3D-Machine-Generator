import React, { Fragment } from "react";
// import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

export default class RotateButtons extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props, "MoveButtons");
    this.state = {
      bgColorCopy: "#f0f0f0d9",
      rotateStep: app.config.rotateStep + " deg"
    };
  }

  handleClickCopy = () => {
    this.setState({
      bgColorCopy: this.state.bgColorCopy === "#f0f0f0d9" ? "#fff" : "#f0f0f0d9"
    });
  };


  rotateLeft = () => {
    if (this.copyMode()) {
      app.rotateSelected(-app.config.rotateStep);
    } else {
      app.copyRotateSelected(-app.config.rotateStep);
    }
  };

  rotateRight = () => {
    if (this.copyMode()) {
      app.rotateSelected(app.config.rotateStep);
    } else {
      app.copyRotateSelected(app.config.rotateStep);
    }
  };



  handlyChangeInputRotate = event => {
    console.log(event.target.value, "target-rotate");
    app.config.rotateStep = event.target.value;
    let deg = " deg";
    let rotate = app.config.rotateStep;

    this.setState({
      // rotateStep: rotate.replace(/[^0-9.]/g, "")
      rotateStep: app.config.rotateStep
    });

    if (event.charCode === 13) {
      this.setState({
        rotateStep: rotate.replace(/[^0-9.]/g, "") + deg
      });
    }
    // if (event.charCode === 46) {
    //   event.stopPropagation();
    // }
  };
  render() {
    return (
      <Fragment>
        <ReactTooltip html={true} className="tooltipBackgroundTheme" />
      
        <button className="btn-LeftRotate" onClick={this.rotateLeft}>
          <a href="#">
            <img
              width="18px"
              src="images/Unclock.png"
              data-place="bottom"
              data-tip="<span>Rotate selected line<br/> left(couterclockwise).The state of the<br/>
              Repeat button determines if lines<br/> are duplicated or simply
              rotated. </span>"
            />
          </a>
        </button>
        <button className="btn-RightRotate" onClick={this.rotateRight}>
          <a href="#">
            <img
              width="18px"
              src="images/Clock.png"
              data-place="bottom"
              data-tip="<span>Rotate selected line<br/> right(clockwise).The state of the<br/>
              Repeat button determines if lines<br/> are duplicated or simply
              rotated. </span>"
            />
          </a>
        </button>
        <input
          type="text"
          className="InputRotate"
          // defaultValue={app.config.rotateStep+'deg'}
          // defaultValue={this.state.rotateStep}
          value={this.state.rotateStep}
          // onChange={e => {
          //   app.config.rotateStep = e.target.value+'deg';
          // }}
          onChange={this.handlyChangeInputRotate}
          onKeyPress={this.handlyChangeInputRotate}
          // onFocus={this.handlyChangeInputRotate}

          // data-place="bottom"
          // data-tip="<span>Rotation step angle.<br/> The angle a selected line will rotate<br/> when you press the L or R<br/>
          // keyboard keys.You can set the center<br/> of rotation
          // by dragging the center icon.Hold<br/> Ctrl key
          // during rotation via mouse to rotate<br/>
          // in multiples of this angle. </span>"
        />
      </Fragment>
    );
  }
}