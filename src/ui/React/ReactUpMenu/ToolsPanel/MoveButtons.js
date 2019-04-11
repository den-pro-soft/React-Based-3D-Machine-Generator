import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import {connect} from 'react-redux';

class MoveButtons extends React.Component {
    constructor(props) {
      super(props);

        let moveStep = '';
        if(container.resolve('config').dimension=='Millimeters'){
            moveStep= (this.props.moveStep*1).toFixed(3) + ' mm';
        } else {
            moveStep = (this.props.moveStep/25.4).toFixed(3) + ' "';
        }

      this.state = {
        bgColorCopy: "#f0f0f0d9",
        moveStep:moveStep,
        rotateStep: app.config.rotateStep.toFixed(2) + " deg"
      };
    }

    // componentWillReceiveProps(nextProps){ 
    componentDidUpdate(prevProps, prevState) {
      if (this.props.demensions !== prevProps.demensions) {
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
    }

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
    }

    moveDown = () => {
      if (this.copyMode()) {
        app.moveSelected(0, -app.config.moveStep);
      } else {
        app.copyMoveSelected(0, -app.config.moveStep);
      }
    }

    moveLeft = () => {
      if (this.copyMode()) {
        app.moveSelected(-app.config.moveStep, 0);
      } else {
        app.copyMoveSelected(-app.config.moveStep, 0);
      }
    }

    moveRight = () => {
      if (this.copyMode()) {
        app.moveSelected(app.config.moveStep, 0);
      } else {
        app.copyMoveSelected(app.config.moveStep, 0);
      }
    };


    handlyChangeInputMove = event => {

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
      let rotateStep = event.target.value;
      let rotateNumber = rotateStep.replace(/[^0-9.]/g, "") ;
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
              src="resources/images/Copy.png"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-repeat')} data-html={true}
            />
          </a>
        </button>
        <button className="btn-Up" onClick={this.moveUp}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Up.png"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-nudge')} data-html={true}
            />
          </a>
        </button>
        <button className="btn-Down" onClick={this.moveDown}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Down.png"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-nudge')} data-html={true}
            />
          </a>
        </button>
        <button className="btn-Left" onClick={this.moveLeft}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Left.png"
              data-place="bottom"
              data-tip={container.resolve("tips").getTip('numeric-nudge')} data-html={true}
            />
          </a>
        </button>
        <button className="btn-Right" onClick={this.moveRight}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Right.png"
              data-place="left"
              data-tip={container.resolve("tips").getTip('numeric-nudge')} data-html={true}
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
          data-place="left"
          data-tip={container.resolve("tips").getTip('numeric-nudge-step')} data-html={true}
        />
            <button className="btn-LeftRotate" onClick={this.rotateLeft}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Unclock.png"
              data-place="left"
              data-tip={container.resolve("tips").getTip('numeric-rotate-counterclockwise')} data-html={true}
            />
          </a>
        </button>
        <button className="btn-RightRotate" onClick={this.rotateRight}>
          <a href="#">
            <img
              width="18px"
              src="resources/images/Clock.png"
              data-place="left"
              data-tip={container.resolve("tips").getTip('numeric-rotate-clockwise')} data-html={true}
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
          data-place="left"
          data-tip={container.resolve("tips").getTip('numeric-rotate-step')} data-html={true}
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