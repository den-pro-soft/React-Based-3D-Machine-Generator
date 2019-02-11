import React, { Fragment } from "react";
// import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

export default class MoveButtons extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props, "MoveButtons");
    this.state = {
      // demensions:this.props.demensions,
      bgColorCopy: "#f0f0f0d9",
      moveStep: ''/*app.config.moveStep + '"'/*`${String.fromCharCode(34)}`*/,
     
    };
  }
  componentDidMount(){
    if(this.props.demensions==='Inches'){
      this.setState({moveStep: app.config.moveStep  + `${String.fromCharCode(34)}`})
    } else {
      this.setState({moveStep: (app.config.moveStep*25.4).toFixed(3) + 'mm'})

    }
  }
  handleClickCopy = () => {
    this.setState({
      bgColorCopy: this.state.bgColorCopy === "#f0f0f0d9" ? "#fff" : "#f0f0f0d9"
    });
  };

  /**
   * @return {boolean}  - true if enable coppy mode
   */
  copyMode() {
    return this.state.bgColorCopy === "#f0f0f0d9";
  }

  moveUp = () => {
    if (this.copyMode()) {
      app.moveSelected(0, app.config.moveStep);
    } else {
      app.copyMoveSelected(0, app.config.moveStep);
    }
  };

  moveDown = () => {
    if (this.copyMode()) {
      app.moveSelected(0, -app.config.moveStep);
    } else {
      app.copyMoveSelected(0, -app.config.moveStep);
    }
  };

  moveLeft = () => {
    if (this.copyMode()) {
      app.moveSelected(-app.config.moveStep, 0);
    } else {
      app.copyMoveSelected(-app.config.moveStep, 0);
    }
  };
  moveRight = () => {
    if (this.copyMode()) {
      app.moveSelected(app.config.moveStep, 0);
    } else {
      app.copyMoveSelected(app.config.moveStep, 0);
    }
  };


  handlyChangeInputMove = event => {
    console.log(event.target.value, "target-move");
    app.config.moveStep = event.target.value;
    // let demensions = "";
    let move = app.config.moveStep;

    this.setState({
      // rotateStep: rotate.replace(/[^0-9.]/g, "")
      rotateStep: app.config.moveStep
    });

    if (event.charCode === 13) {
      this.setState({
        moveStep: move.replace(/[^0-9.]/g, "") + demensions
      });
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
              data-place="bottom"
              data-tip="<span>Nudge selected line up.(Also see tip for nudge edit box.)<br/> Hold
              the Alt key for faster nudging. The state of Repeat button<br/>
              determines if lines are duplicated or simply moved.</span>"
            />
          </a>
        </button>
        <button className="btn-Down" onClick={this.moveDown}>
          <a href="#">
            <img
              width="18px"
              src="images/Down.png"
              data-place="bottom"
              data-tip="<span>Nudge selected line down.(Also see tip for nudge edit box.)<br/> Hold
              the Alt key for faster nudging. The state of Repeat button<br/>
              determines if lines are duplicated or simply moved.</span>"
            />
          </a>
        </button>
        <button className="btn-Left" onClick={this.moveLeft}>
          <a href="#">
            <img
              width="18px"
              src="images/Left.png"
              data-place="bottom"
              data-tip="<span>Nudge selected line left.(Also see tip for nudge edit box.)<br/> Hold
              the Alt key for faster nudging. The state of Repeat button<br/>
              determines if lines are duplicated or simply moved.</span>"
            />
          </a>
        </button>
        <button className="btn-Right" onClick={this.moveRight}>
          <a href="#">
            <img
              width="18px"
              src="images/Right.png"
              data-place="bottom"
              data-tip="<span>Nudge selected line right.(Also see tip for nudge edit box.)<br/> Hold
              the Alt key for faster nudging. The state of Repeat button<br/>
              determines if lines are duplicated or simply moved.</span>"
            />
          </a>
        </button>
        <input
          type="text"
          // defaultValue={app.config.moveStep}
          // onChange={e => {
          //   app.config.moveStep = e.target.value;
          // }}
          value={this.state.moveStep}
          onChange={this.handlyChangeInputMove}
          onKeyPress={this.handlyChangeInputMove}
          data-place="bottom"
          data-tip="<span>Nudge step.<br/>The distance an object will move when an arrow button or key<br/>
              is pressed.It is generally recommended to move an item by first<br/>
              dragging the item to a snap point on an existing line and then<br/>
              nudging without the mouse.</span>"
        />
      
      </Fragment>
    );
  }
}
