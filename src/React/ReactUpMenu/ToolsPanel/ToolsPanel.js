import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";
import GroupType from "./GroupType";
import LineType from "./LineType";
import ArcType from "./ArcType";
import CircleType from "./CircleType";

import MoveButtons from "./MoveButtons";

import InputSelect from "./InputSelect";

export default class ToolsPanel extends React.PureComponent {
  // static defautProps={figures:app.selectElements}

  constructor(props) {
    super(props);
    console.log(props, "props");

    this.state = {
      show: false,
      line: false,
      arc: false,
      circle: false,
      group: false
    };
  }
  // ---------------React Life Cycle-----------------
  componentWillMount() {
    app.addHandler("selectElement", element => {
      this.setState({ show: true });

      app.selectElements.map(el => {
        // if (app.selectElements.length === 1) {
          if (el.typeName === "Line") {
            // app.selectElements.length=0;
            // this.lengthLine =
            // el.length().toFixed(3) + `${String.fromCharCode(34)}`;
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
        // } 
        if (app.selectElements.length > 1 && el.typeName === "Arc") {
          this.setState({ line: false, arc: true, group: true });
        } 
        else if(app.selectElements.length > 1) {
          app.selectElements.length=0;
          console.log(app.selectElements, "group-true");

          this.setState({ line: false, arc: false, group: true });
        }
      });
    });

    app.addHandler("clearSelectElements", () => {
      this.setState({ show: false });
    });
  }

  render() {
    if (this.state.show) {
      return this.getPanelHtml();
    } else {
      return (
        <div className="ToolsPanel">
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
      );
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
              // onClick={this.handlySelectElements}
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

            {this.state.line === true && (
              <LineType /*lengthLine={this.lengthLine}*/ />
            )}
            {this.state.arc === true && <ArcType />}
            {this.state.circle === true && <CircleType />}
            {this.state.group === true && <GroupType />}

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
            <MoveButtons />
          </div>
        </form>
      </div>
    );
  }
}

// ToolsPanel.protoTypes = {
//   rotateStep: 10 //todo: move it to config file like as moveStep
// };
