import React from "react";
import ReactTooltip from "react-tooltip";
import "./left-menu.scss";

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "transparent",
      bgColorSnapToLines: "#fff"
    };
  }
  componentDidMount() {
    window.addEventListener("load", () => {
      const Snap = localStorage.getItem("bgColorSnapToLines");
      if (Snap === null) {
        this.setState({ bgColorSnapToLines: this.state.bgColorSnapToLines });
      } else {
        this.setState({ bgColorSnapToLines: Snap });
      }

      if (this.state.bgColorSnapToLines === "#fff") {
        app.magnificationMode = true;
      } else {
        app.magnificationMode = false;
      }
    });
  }


  handleClickSnapToLines = () => {
    this.setState(
      {
        bgColorSnapToLines:
          this.state.bgColorSnapToLines === "#fff" ? "#f0f0f0d9" : "#fff"
      },
      () => {
        localStorage.setItem(
          "bgColorSnapToLines",
          this.state.bgColorSnapToLines
        );
        if (this.state.bgColorSnapToLines === "#fff") {
          app.magnificationMode = true;
        } else {
          app.magnificationMode = false;
        }
      }
    );
  };
  render() {
    return (
      <div className="LeftMenu">
        {/* <ReactTooltip
           html={true}
           data-place="right"
           className="leftTooltipBackgroundTheme"
           /> */}
        <button>
          <a href="#">
            <img
              onClick={() => app.setTool("Pointer")}
              width="25px"
              src="resources/images/Select.png"
              data-tip={container.resolve("tips").getTip('select-tool')} data-html={true}
            />
          </a>
        </button>
        <button
          onClick={() => {
            window.app.setTool("Line");
          }}
        >
          <a href="#">
            <img
              // onClick={() => {
              //   window.app.setTool("Line");
              // }}
              width="25px"
              src="resources/images/Line.png"
              data-tip={container.resolve("tips").getTip('line-tool')} data-html={true}
            />
          </a>
        </button>
        <button
          onClick={() => {
            window.app.setTool("Spline");
          }}
        >
          <a href="#">
            <img
              width="25px"
              src="resources/images/Spline.png"
              data-tip={container.resolve("tips").getTip('spline-tool')} data-html={true}
            />
          </a>
        </button>
        <button
          onClick={() => {
            app.setTool("Rectangle");
          }}
        >
          <a href="#">
            <img
              width="25px"
              src="resources/images/Rectangle.png"
              data-tip={container.resolve("tips").getTip('rect-tool')} data-html={true}
            />
          </a>
        </button>
        <button
          onClick={() => {
            app.setTool("Circle");
          }}
        >
          <a href="#">
            <img
              width="25px"
              src="resources/images/Circle.png"
              data-tip={container.resolve("tips").getTip('circle-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("Freehand")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Freehand.png"
              data-tip={container.resolve("tips").getTip('freehand-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("Eraser")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Eraser.png"
              data-tip={container.resolve("tips").getTip('eraser-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("Pointer")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Corner.png"
              data-tip={container.resolve("tips").getTip('corner-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("Text")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Text.png"
              data-tip={container.resolve("tips").getTip('text-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("EditLine")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/LineEdit.png"
              data-tip={container.resolve("tips").getTip('line-edit-tool')} data-html={true}
            />
          </a>
        </button>
        <button onClick={() => app.setTool("Ruler")}>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Ruler.png"
              data-tip={container.resolve("tips").getTip('ruler-tool')} data-html={true}
            />
          </a>
        </button>
        <button
          onClick={this.handleClickSnapToLines}
          style={{
            backgroundColor: this.state.bgColorSnapToLines
          }}
        >
          <a href="#">
            <img
              width="25px"
              src="resources/images/SnapToLines.png"
              data-tip={container.resolve("tips").getTip('snap-tool')} data-html={true}
            />
          </a>
        </button>
        <button>
          <a href="#">
            <img
              width="25px"
              src="resources/images/Help.png"
              data-tip={container.resolve("tips").getTip('help-tool')} data-html={true}
            />
          </a>
        </button>
      </div>
    );
  }
}
