import React from "react";
import "./help.scss";

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      displaySubMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
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

  showSubMenu(event) {
    console.log(event);
    event.preventDefault();
    this.setState({ displaySubMenu: true }, () => {
      document.addEventListener("click", this.hideSubMenu);
    });
  }

  hideSubMenu() {
    this.setState({ displaySubMenu: false }, () => {
      document.removeEventListener("click", this.hideSubMenu);
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
            >
              <li
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.hideSubMenu}
              >
                <a href="#"><span>Drawing Tutorials</span><span>&#x25BA;</span></a> 
                {this.state.displaySubMenu ? (
                  <ul className="Submenu">
                    <li>
                      <a href="#">Flat 2D</a>
                    </li>
                    <li>
                      <a href="#">Bend 2D</a>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li>
                <a
                  href="https://www.emachineshop.com/help/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Contents
                </a>
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
