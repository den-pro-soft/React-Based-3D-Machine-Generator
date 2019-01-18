import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";

const ToolsPanel = context => {
  const data = [
    "Air Inside",
    "Revolve",
    "0.002",
    "0.005",
    "0.010",
    "0.020",
    "0.031",
    "0.045",
    "0.062",
    "0.093",
    "0.125",
    "0.187",
    "0.250",
    "0.375",
    "0.500",
    "0.750",
    "1.000",
    "1.250",
    "1.500",
    "2.000",
    "2.500",
    "3.000",
    "Other"
  ];
  return (
    <div className="ToolsPanel">
      {/* <ReactTooltip
        html={true}
        data-place="right"
        className="tooltipBackgroundTheme"
      /> */}
      <form>
      <select className="select-1">
          <option value="Auto">Auto</option>
          <option value="Bend">Bend</option>
          <option value="mercedes">Thread&amp;Tap</option>
          <option value="LazerMark">Comments to Self</option>
          <option value="LazerMark">Comments to Machinist</option>
          <option value="LazerMark">LazerMark</option>
        </select>
        <button className="btn-Z">
          <a href="#">
            <img
              width="18px"
              src="images/Z.png"
              // data-tip="<span>Z-button</span>"
            />
          </a>
        </button>
       

        <input list="browsers" name="browser" style={{ width: "120px" }} />
        <datalist id="browsers">
          <option value="">Air Inside</option>
          <option value="">Revolve</option>
          {data.map((item, i) => (
            <option key={i} value={item}>
              {/* {item}&quot; */}
            </option>
          ))}
          <option value="">Other</option>
        </datalist>
      </form>
    </div>
  );
};

export default ToolsPanel;
