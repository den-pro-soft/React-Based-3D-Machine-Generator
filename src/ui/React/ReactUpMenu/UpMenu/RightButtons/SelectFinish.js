import React from "react";
import "./material.scss";

export default class SelectFinish extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false,
      finishing: "Select a Finish"
    };
  }
  componentWillMount() {
    const finishing = localStorage.getItem("finishing");
    if (finishing === null) {
      this.setState({ finishing: this.state.finishing });
    } else {
      this.setState({ finishing: finishing });
    }
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
  handleClick1 = () => {
    localStorage.setItem("finishing", "Powder coat Black");
    this.setState({ finishing: "Powder coat Black" });
  };
  handleClick2 = () => {
    localStorage.setItem("finishing", "Powder coat White");
    this.setState({ finishing: "Powder coat White" });
  };
  handleClick3 = () => {
    localStorage.setItem("finishing", "Powder coat Metallic blue");
    this.setState({ finishing: "Powder coat Metallic blue " });
  };
  handleClick4 = () => {
    localStorage.setItem("finishing", "None");
    this.setState({ finishing: "None" });
  };
  openWindow = () => {
    window.open("https://www.emachineshop.com/");
  };
  render() {
    return (
      <div className="Material">
        <button className="btn-Material" onClick={this.showDropdownMenu}>
          {this.state.finishing}
        </button>

        {this.state.displayMenu ? (
          <ul className="ul-Material">
            <li onClick={this.handleClick1}>
              <a href="#">Powder coat Black</a>
            </li>
            <li onClick={this.handleClick2}>
              <a href="#">Powder coat White</a>
            </li>

            <li onClick={this.handleClick3}>
              <a href="#">Powder coat Metallic blue</a>
            </li>

            <li onClick={this.handleClick4}>
              <a href="#">None</a>
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
      </div>
    );
  }
}
