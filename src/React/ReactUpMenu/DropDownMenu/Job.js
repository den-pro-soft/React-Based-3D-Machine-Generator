import React from "react";
import "./job.scss";

export default class Job extends React.Component {
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
      <div className="Job">
        <div
          className="btn-Job"
          // onClick={this.showDropdownMenu}
          onMouseEnter={this.showDropdownMenu}
          onMouseLeave={this.hideDropdownMenu}
        >
          Job
          {this.state.displayMenu ? (
          <ul
          >
            <li>
              {/* className="active" */}
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Price/Analyze</a>
            </li>
            <li>
              <a
                href="https://www.emachineshop.com/help-ordering/#pre-order-checklist"
                target="_blank"
                rel="noreferrer noopener"
              >
                Checklist
              </a>
            </li>
            <li>
              <a href="#">Review Order</a>
            </li>
          </ul>
        ) : null}
        </div>

      
      </div>
    );
  }
}
