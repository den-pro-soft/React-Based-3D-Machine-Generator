import React from "react";
import "./file.scss";

export default class File extends React.Component {
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
      <div className="File">
        <div
          className="btn-File"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          File
          {this.state.displayMenu ? (
          <ul
          >
            <li>
              {/* className="active" */}
              <a href="#">New</a>
            </li>
            <li>
              <a href="#">Open</a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer noopener">
                Save
              </a>
            </li>
            <li>
              <a href="#">Save As</a>
            </li>
            <li>
              <a href="#">Import</a>
            </li>

            <li>
              <a href="#">Export</a>
            </li>
            <li>
              <a href="#">Exit</a>
            </li>
          </ul>
        ) : null}
        </div>

       
      </div>
    );
  }
}
