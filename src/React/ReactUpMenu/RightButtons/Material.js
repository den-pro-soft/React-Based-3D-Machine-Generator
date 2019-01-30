import React from "react";
import "./material.scss";
// import {
 
//   Link
// } from "react-router-dom";
import Link from '@material-ui/core/Link';
export default class Material extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false,
    };
  }

  showDropdownMenu = (event)=> {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu = ()=> {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  openWindow=()=>{
    window.open('https://www.emachineshop.com/')
  }
  render(){
  return (
    <div className="Material">

   
          <button className="btn-Job"
          onClick={this.showDropdownMenu}

          //  onMouseEnter={this.showDropdownMenu}
          // onMouseLeave={this.hideDropdownMenu}
          >
     Material
          {this.state.displayMenu ? (
            <ul>
              <li onClick={this.clickSubModal}>
                <a href="#">Aluminum 6061</a>
              </li>
              <li>
                <a href="#">Aluminum 5052</a>
              </li>
              
              <li>
                <a href="#">Plain Steel</a>
              </li>
              <li>
                <a href="#">Brass</a>
              </li>
              <li>
                <a href="#">Copper</a>
              </li>
              <li>
                <a href="#">Stainless</a>
              </li>
              <li onClick={this.openWindow}>

                <a href='https://www.emachineshop.com/' target="_blank"  rel="noreferrer noopener">Help</a>
              </li>
            </ul>
          ) : null}
     </button>

    </div>
  );
}
}
