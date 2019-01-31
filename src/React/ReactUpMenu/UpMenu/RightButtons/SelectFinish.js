import React from "react";
// import "./select-finish.scss";
import "./material.scss";

export default class SelectFinish extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false
    };
  }

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };
  openWindow=()=>{
    window.open('https://www.emachineshop.com/')
  }
  render() {
    return (
      <div className="Material">
        <button
          className="btn-Job"
          onClick={this.showDropdownMenu}

          //  onMouseEnter={this.showDropdownMenu}
          // onMouseLeave={this.hideDropdownMenu}
        >
          Select a Finish
          {this.state.displayMenu ? (
            <ul>
              <li>
                <a href="#">Powder coat Black</a>
              </li>
              <li>
                <a href="#">Powder coat White</a>
              </li>

              <li>
                <a href="#">Powder coat Metallic blue</a>
              </li>
              <li onClick={this.openWindow}>
                <a
                  href="https://www.emachineshop.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Help
                </a>
              </li>
            </ul>
          ) : null}
        </button>
      </div>
    );
  }
}
