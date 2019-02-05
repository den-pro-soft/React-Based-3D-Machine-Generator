import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";
import InputSelect from "./InputSelect";

export default class ToolsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      bgColorCopy: "#f0f0f0d9",
      line: false,
      arc: false,
      group: false
    };
  }
  // ---------------React Life Cycle-----------------
  componentWillMount() {
    app.addHandler("selectElement", element => {
      this.setState({ show: true });

      app.selectElements.map(el => {
        if (el.typeName === "Line") {
          this.setState({ line: true, arc: false, group: false });
        }
        if (el.typeName === "Arc") {
          this.setState({ line: false, arc: true, group: false });
        }

        if (el.typeName === "Group") {
          this.setState({ line: false, arc: false, group: true });
        }
        if (el.typeName === "Spline") {
          this.setState({ line: false, arc: false, group: false });
        }
        if (app.selectElements.length > 1 && el.typeName === "Arc") {
          console.log(app.selectElements.length, el, "only Arcs");
          this.setState({ line: false, arc: true, group: true });
        }
         else if (app.selectElements.length > 1 ) {
          this.setState({ line: false, arc: false, group: true });
        }
      });
    
      // if(app.selectElements.length>1){
      //     this.setState({ line: false, arc:false, group:true });

      // }
    });

    app.addHandler("clearSelectElements", () => {
      this.setState({ show: false });
    });
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
      app.rotateSelected(-this.rotateStep);
    }
  };
  rotateRight = () => {
    if (this.state.bgColorCopy === "#f0f0f0d9") {
      app.rotateSelected(this.rotateStep);
    }
  };

  render() {
    if (this.state.show) {
      return this.getPanelHtml();
    } else {
      return <div className="ToolsPanel" />;
    }
  }

  getPanelHtml() {
    return (
      <div className="ToolsPanel">
        <ReactTooltip
          html={true}
          // data-place="right"
          className="tooltipBackgroundTheme"
        />
        <form>
          <div className="Left-Tools">
            <button
              className="btn-LineType"
              onClick={this.handlySelectElements}
            >
              <a href="#">
                <img
                  width="18px"
                  src="images/LineType.png"
                  data-place="bottom"
                  data-tip='<span>Line type.</br>Specifies whether the selected line a shape,bend,</br>thread,relation,comment,etc.Select "Auto" in most cases</br>
                when creating the part shape.
                </span>'
                />
              </a>
            </button>
            <select className="select-1">
              <option value="Auto">Auto</option>
              <option value="Bend">Bend</option>
              <option value="mercedes">Thread&amp;Tap</option>
              <option value="LazerMark">Comments to Self</option>
              <option value="LazerMark">Comments to Machinist</option>
              <option value="LazerMark">LazerMark</option>
            </select>

            {/*-----------------------------------field and buttons for 'Line'-------------------------- */}
            {this.state.line === true && (
              <>
                <button className="btn-Length">
                  {/* {this.state.line&&(<><button className="btn-Length"> */}
                  <a href="#">
                    <img
                      width="18px"
                      src="images/Line.png"
                      data-place="bottom"
                      data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
                  enter a value and press the Enter key</span>"
                    />
                  </a>
                </button>
                <input
                  type="text"
                  data-place="bottom"
                  data-tip="<span>Length<br/>Distance from the beginning of the line to the end.To change<br/>
                  enter a value and press the Enter key</span>"
                />
                <button className="btn-LineAngle">
                  <a href="#">
                    <img
                      width="18px"
                      src="images/Line.png"
                      data-place="bottom"
                      data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
             enter a value and press the Enter key. </span>"
                    />
                  </a>
                </button>
                <input
                  type="text"
                  data-place="bottom"
                  data-tip="<span>Line angle<br/>Angle of the point with respect to the start point.To change,<br/>
             enter a value and press the Enter key. </span>"
                />
              </>
            )}
            {/* -------------------------------for Arc------------------------ */}
            {this.state.arc === true && (
              <>
                <button className="btn-Diameter">
                  <a href="#">
                    <img
                      width="18px"
                      src="images/Diameter18.png"
                      data-place="bottom"
                      data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
                 press the Enter key.
                </span>"
                    />
                  </a>
                </button>
                <input
                  type="text"
                  data-place="bottom"
                  data-tip="<span>Diameter.</br>Distance fully across the circle. To change, enter a value and</br>
               press the Enter key.
              </span>"
                />
              </>
            )}
            {/* ---------------for Group------------------------------------------------------------- */}
            {this.state.group === true && (
              <>
                <button className="btn-Horizontal">
                  <a href="#">
                    <img
                      width="18px"
                      src="images/Width.png"
                      data-place="bottom"
                      data-tip="<span>Horizontal size</span>"
                    />
                  </a>
                </button>
                <input
                  type="text"
                  data-place="bottom"
                  data-tip="<span>Horizontal size<br/>Horizontal size of imaginary rectangle enclosing the line.To<br/>
            change, enter a value and press the Enter key. </span>"
                />
                <button className="btn-Vertical">
                  <a href="#">
                    <img
                      width="18px"
                      src="images/Height.png"
                      data-place="bottom"
                      data-tip="<span>Vertical size</span>"
                    />
                  </a>
                </button>
                <input
                  type="text"
                  data-place="bottom"
                  data-tip="<span>Vertical size<br/>Vertical size of imaginary rectangle enclosing the line.To<br/>
            change, enter a value and press the Enter key. </span>"
                />
              </>
            )}

            <button className="btn-Z tooltip-Z">
              <a href="#">
                <img
                  width="18px"
                  src="images/Z.png"
                  data-place="bottom"
                  data-tip="<span>To make a 3D shape, make a 2D drawling and then set this value</br>
                 to the distance material will extend perpendicular to the screen.</br>The value specifies the perpendicular
                 distance for the material<br> inside the associated line, relative to the material
                  </span>"
                />
              </a>
            </button>
            <InputSelect className="CreatableSelect" />

            {/* <input
            list="browsers"
            name="browser"style={{width:'120px'}}
              onChange={e=>{
                e.preventDefault();
                   let val = parseInt(e.target.value);
                       app.setElementsHeight(val?val:0.075);
              }}
            name="browser"
            style={{ width: "120px" }}
            autoComplete="on"
          />
        <datalist id="browsers" defaultValue="Air Inside">
            <select>
              <option value="Air Inside" />
              <option value="Revolve" />
              {data.map((item, i) => (
                <option key={i} value={item + String.fromCharCode(34)} />
              ))}
              <option value="Other" />
            </select>
          </datalist>  */}

            <button className="btn-Question">
              <a
                href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="18px"
                  src="images/Help.png"
                  data-place="bottom"
                  data-tip="<span>Shows how to use numeric values.</span>"
                />
              </a>
            </button>
          </div>
          <div className="Right-Tools">
            <button
              className="btn-Copy"
              onClick={this.handleClickCopy}
              style={{ backgroundColor: this.state.bgColorCopy }}
            >
              <a href="#">
                <img
                  width="18px"
                  src="images/Copy.png"
                  // data-tip="<span>Z-button</span>"
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
              // onChange={e => {
              //   this.rotateStep = e.target.value;
              // }}
            />
          </div>
        </form>
      </div>
    );
  }
}

ToolsPanel.protoTypes = {
  rotateStep: 10 //todo: move it to config file like as moveStep
};
