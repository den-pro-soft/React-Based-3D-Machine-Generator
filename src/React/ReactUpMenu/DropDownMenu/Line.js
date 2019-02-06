import React from "react";
import "./line.scss";

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySubMenu: false,
      displaySubNudge: false
    };

  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  showSubMenu = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ displaySubMenu: true }, () => {
      document.addEventListener("click", this.hideSubMenu);
    });
  }

  hideSubMenu = () => {
    this.setState({ displaySubMenu: false }, () => {
      document.removeEventListener("click", this.hideSubMenu);
    });
  }

  showSubNudge = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ displaySubNudge: true }, () => {
      document.addEventListener("click", this.hideSubNudge);
    });
  }

  hideSubNudge = () => {
    this.setState({ displaySubNudge: false }, () => {
      document.removeEventListener("click", this.hideSubNudge);
    });
  }
  render() {
    return (
      <div className="Line">
        <div
          className="btn-Line"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Line
          {this.state.displayMenu ? (
          <ul
          >
            <li onClick={() => app.group()}>
              {/* className="active" */}
              <a href="#">Group</a>
            </li>
            <li onClick={() => app.ungroup()}>
              <a href="#">Ungroup</a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer noopener">
                Intersect
              </a>
            </li>
            <li>
              <a href="#">Divide</a>
            </li>
            <li>
              <a href="#">Corner</a>
            </li>

              <li>
                <a href="#">Tangents</a>
              </li>
              <li
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.hideSubMenu}
              >
                <a className="a-Mirror"href="#">
                  <span>Mirror</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubMenu ? (
                  <ul className="SubMirror">
                    <li onClick={() => app.mirrorSelected("axisX")}>"
                      <a href="#">Horizontally</a>
                    </li>
                    <li onClick={() => app.mirrorSelected("axisY")}>
                      <a href="#">Vertically</a>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li
                onMouseEnter={this.showSubNudge}
                onMouseLeave={this.hideSubNudge}
              >
                <a href="#" className="a-Nudge">
                  <span>Nudge</span>
                  <span>&#x25BA;</span>
                </a>
                {this.state.displaySubNudge ? (
                  <ul className="SubNudge">
                    <li onClick={()=>{app.moveSelected(0,app.config.moveStep);}}>
                      <a href="#">
                     Up  Up Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(0,-app.config.moveStep);}}>
                      <a href="#">
                      Down Down Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(-app.config.moveStep,0);}}>
                      <a href="#">
                      Left Left Arrow
                      </a>
                    </li>
                    <li onClick={()=>{app.moveSelected(app.config.moveStep,0);}}>
                      <a href="#">
                      Right Right Arrow
                      </a>
                    </li>
                  </ul>
                ) : null}
              </li>
            </ul>
          ) : null}
        </div>

      
      </div>
    );
  }
}
