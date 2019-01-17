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
    console.log(event);
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
        <div
          className="btn-Help"
          // onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Help
          {this.state.displayMenu ? (
            <ul
            // onMouseEnter={this.showDropdownMenu}
            >
              <li>
                <a href="#">Drawing Tutorials</a>
                {/* className="active" */}
              </li>
              <li>
                <a href="#">Contents</a>
              </li>
              <li>
                <a
                  href="https://www.emachineshop.com/video-tutorials/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Video Tutorials
                </a>
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
      
      </div>
    );
  }
}
