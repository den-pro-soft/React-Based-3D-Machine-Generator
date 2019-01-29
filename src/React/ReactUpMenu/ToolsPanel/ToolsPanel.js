import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";
import InputSelect from "./InputSelect";

export default class ToolsPanel extends React.Component {


  render() {
    // const data = [
    //   "0.002",
    //   "0.005",
    //   "0.010",
    //   "0.020",
    //   "0.031",
    //   "0.045",
    //   "0.062",
    //   "0.093",
    //   "0.125",
    //   "0.187",
    //   "0.250",
    //   "0.375",
    //   "0.500",
    //   "0.750",
    //   "1.000",
    //   "1.250",
    //   "1.500",
    //   "2.000",
    //   "2.500",
    //   "3.000"
    //   // "Other"
    // ];

    return (
      <div className="ToolsPanel">
        {/* <ReactTooltip
          html={true}
          data-place="right"
          className="tooltipBackgroundTheme"
        /> */}
        <form>
            <button className="btn-LineType">
              <a href="#">
                <img
                  width="18px"
                  src="images/LineType.png"
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
            {/* <button className="btn-Diameter">
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
            </button> */}
               <button className="btn-Diameter">
              <a href="#">
                <img
                  width="18px"
                  src="images/Width.png"
                  data-place="bottom"
                  data-tip="<span>Horizontal size</span>"
                />
              </a>
            </button>
            <input type="text"  data-place="bottom" data-tip="<span>Horizontal size<br/>Horizontal size of imaginary rectangle enclosing the line.To<br/>
            change, enter a value and press the Enter key. </span>"/>
            <button className="btn-Diameter">
              <a href="#">
                <img
                  width="18px"
                  src="images/Height.png"
                  data-place="bottom"
                  data-tip="<span>Vertical size</span>"
                />
              </a>
            </button>
            <input type="text"  data-place="bottom" data-tip="<span>Vertical size<br/>Vertical size of imaginary rectangle enclosing the line.To<br/>
            change, enter a value and press the Enter key. </span>"/>
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

            <InputSelect className="CreatableSelect"  />
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
        
            <button className="btn-Copy">
              <a href="#">
                <img
                  width="18px"
                  src="images/Copy.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <button className="btn-Up" onClick={()=>{app.moveSelected(0,this.moveValue);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Up.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <button className="btn-Down" onClick={()=>{app.moveSelected(0,-this.moveValue);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Down.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <button className="btn-Left" onClick={()=>{app.moveSelected(-this.moveValue,0);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Left.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <button className="btn-Right" onClick={()=>{app.moveSelected(this.moveValue,0);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Right.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <input type="text" onChange={(e) =>{this.moveValue = e.target.value;}}/>
            <button className="btn-Right" onClick={()=>{app.rotateSelected(-this.rotateStep);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Unclock.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <button className="btn-Right" onClick={()=>{app.rotateSelected(this.rotateStep);}}>
              <a href="#">
                <img
                  width="18px"
                  src="images/Clock.png"
                  // data-tip="<span>Z-button</span>"
                />
              </a>
            </button>
            <input type="text" className="InputRotate" onChange={(e) =>{this.rotateStep = e.target.value;}}/>
          {/* </div> */}
        </form>
      </div>
    );
  }
}

ToolsPanel.protoTypes = {
  moveValue:1,
  rotateStep:10
};