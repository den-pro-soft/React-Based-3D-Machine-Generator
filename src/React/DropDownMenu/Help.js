import React from "react";
import "./help.scss";

export default class Help extends React.Component {
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
      <div className="Help">
        {/* style={{ background: "red", width: "200px" }} */}
        <div
          className="btn-Help"
          // style={{ background: "transparent" }}
          onClick={this.showDropdownMenu}
        >
          Help
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              {/* className="active" */}
              <a href="#">Drawing Tutorials</a>
            </li>
            <li>
              <a href="#">Contents</a>
            </li>
            <li>
              <a href="https://www.emachineshop.com/video-tutorials/"   target="_blank"
                rel="noreferrer noopener">Video Tutorials</a>
            </li>
            <li>
              <a href="#">Windows version</a>
            </li>
            <li>
              <a href="#">Tech Support</a>
            </li>

            <li>
              <a href="#">About</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}
