import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import {connect} from 'react-redux';

class MoveButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColorCopy: "#f0f0f0d9",
      moveStep:this.props.moveStep.toFixed(3) + ' mm',
      rotateStep: app.config.rotateStep.toFixed(2) + " deg"
    };
  }

 
  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
      console.log(this.props,'this.props')
      let moveStep = this.props.moveStep;

      if(this.props.demensions==='Millimeters'){
 
      this.setState({moveStep: (moveStep*1).toFixed(3) + ' mm'})
    } else {
      this.setState({moveStep: (moveStep/25.4).toFixed(3) + ' "'})
    }
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
    // console.log(event.target.value, "target-move");
    // app.config.moveStep = event.target.value;
    let moveStep = event.target.value;
    let moveNumber = moveStep.replace(/[^0-9.]/g, "") ;
    this.props.updateMoveStep((+moveNumber*1).toFixed(3))
    this.setState({
      moveStep
    });
  
    if (event.charCode === 13) {
      if (this.props.demensions === 'Millimeters') {
  
          this.setState({
          moveStep: this.props.moveStep.replace(/[^0-9.]/g, "") + ' mm'
          })

        let moveStep1 = this.state.moveStep.replace(/[^0-9.]/g, "")
        this.props.updateMoveStep(+moveStep1);
        app.config.moveStep = +moveStep1;
        this.moveInput.blur();

      } else {
        this.setState({
          moveStep: this.props.moveStep.replace(/[^0-9.]/g, "") + ' "'
        });
        let moveStep1 = this.state.moveStep.replace(/[^0-9.]/g, "")

        this.props.updateMoveStep(+moveStep1*25.4);
        app.config.moveStep = +moveStep1*25.4;
        this.moveInput.blur();

      }
console.log(app.config.moveStep,this.props.moveStep,'app.config.moveStep-props')
    }
  };
// -------------------------------------Rotate-------------------------------------------------------
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
  // console.log(event.target.value, "target-rotate");
  // app.config.rotateStep = event.target.value;
  let rotateStep = event.target.value;
  let rotateNumber = rotateStep.replace(/[^0-9.]/g, "") ;
  // this.props.updateMoveStep((+rotateNumber*1).toFixed(3))
  this.setState({
    rotateStep 
  });

  if (event.charCode === 13) {
    this.setState({
      rotateStep: (+rotateNumber*1).toFixed(2) + " deg"
    });
  app.config.rotateStep = +this.state.rotateStep.replace(/[^0-9.]/g, "");

    this.rotateInput.blur();

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
          ref={input => {
            this.moveInput = input;
          }}
          value={this.state.moveStep}
          onChange={this.handlyChangeInputMove}
          onKeyPress={this.handlyChangeInputMove}
          data-place="bottom"
          data-tip="<span>Nudge step.<br/>The distance an object will move when an arrow button or key<br/>
              is pressed.It is generally recommended to move an item by first<br/>
              dragging the item to a snap point on an existing line and then<br/>
              nudging without the mouse.</span>"
        />
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
          ref={input => {
            this.rotateInput = input;
          }}
          value={this.state.rotateStep}
          onChange={this.handlyChangeInputRotate}
          onKeyPress={this.handlyChangeInputRotate}

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
    const mapStateToProps = (state)=>{
      return {
        demensions: state.preferencesReducer.demensions,
        moveStep: state.movingReducer.moveStep,
      }
    }
    const mapDispatchToProps = dispatch => {
      return {
        updateMoveStep: moveStep => {
          dispatch({ type: "UPDATE_MOVE_STEP", payload: moveStep });
        }
      };
    };

export default connect(mapStateToProps,mapDispatchToProps)(MoveButtons)