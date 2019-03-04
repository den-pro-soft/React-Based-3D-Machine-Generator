import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import {connect} from 'react-redux';

class MoveButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColorCopy: "#f0f0f0d9",
      moveStep:app.config.moveStep +' "',
      rotateStep: app.config.rotateStep + " deg"
     
    };
  }
  componentWillMount(){
    if(this.props.demensions==='Millimeters'){
      this.setState({moveStep: app.config.moveStep  + ' mm'})
    } else {
      this.setState({moveStep: (app.config.moveStep/25.4).toFixed(3) + ' "'})
      // `${String.fromCharCode(34)}`
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.demensions !== prevProps.demensions) {
      if(this.props.demensions==='Millimeters'){
        this.setState({moveStep: app.config.moveStep  + ' mm'})
      } else {
        this.setState({moveStep: (app.config.moveStep/25.4).toFixed(3) + ' "'})
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
    app.config.moveStep = event.target.value;
    let move = app.config.moveStep;
    this.setState({
      moveStep: move.replace(/[^0-9.]/g, "")
    });
  

    if (event.charCode === 13) {
      if (this.props.demensions === 'Millimeters') {
        this.setState({
          moveStep: move.replace(/[^0-9.]/g, "") + ' mm'
        });
      } else {
        this.setState({
          moveStep: move.replace(/[^0-9.]/g, "") + ' "'
        });
      }

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
  app.config.rotateStep = event.target.value;
  let rotate = app.config.rotateStep;

  this.setState({
    rotateStep: rotate.replace(/[^0-9.]/g, "")
  });

  if (event.charCode === 13) {
    this.setState({
      rotateStep: rotate.replace(/[^0-9.]/g, "") + " deg"
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
          // defaultValue={this.state.moveStep}
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
            {/* <RotateButtons /> */}
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
 demensions: state.preferencesReducer.demensions
}
   }


export default connect(mapStateToProps)(MoveButtons)