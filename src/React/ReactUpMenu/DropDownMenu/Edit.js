import React from "react";
import "./edit.scss";

export default class Edit extends React.Component {
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
      <div className="Edit">
        <div
          className="btn-Edit"
          onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Edit
          {this.state.displayMenu ? (
          <ul         
          >
            <li>
              {/* className="active" */}
              <a href="#">Undo</a>
            </li>
            <li>
              <a href="#">Redo</a>
            </li>
            <li>
              <a href="#">Cut</a>
            </li>
            <li>
              <a href="#">Copy</a>
            </li>
            <li>
              <a href="#">Paste</a>
            </li>

            <li>
              <a href="#">Delete</a>
            </li>
            <li>
              <a href="#">Select All</a>
            </li>
            <li>
              <a href="#">Preferences</a>
            </li>
          </ul>
        ) : null}
        </div>

     
      </div>
    );
  }
}
