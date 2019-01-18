import React from "react";
import "./line.scss";

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
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
            <li>
              <a href="#">Mirror</a>
            </li>
            <li>
              <a href="#">Nudge</a>
            </li>
          </ul>
        ) : null}
        </div>

      
      </div>
    );
  }
}
