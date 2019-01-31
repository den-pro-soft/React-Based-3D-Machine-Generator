import React from "react";
import "./material.scss";

export default class Material extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false,
      value:'Material'
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
  handleClick1 = () => {
    this.setState({ value: 'Aluminum 6061' });
  
  };
  handleClick2 = () => {
    this.setState({ value: 'Aluminum 5052' });
  
  };
  handleClick3 = () => {
    this.setState({ value: 'Plain Steel' });
  
  };
  handleClick4 = () => {
    this.setState({ value: 'Brass' });
  
  };
  handleClick5 = () => {
    this.setState({ value: 'Copper' });
  
  };
  handleClick6 = () => {
    this.setState({ value: 'Stainless' });
  
  };
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
     {/* Material */}
     {this.state.value}
          {this.state.displayMenu ? (
            <ul>
              <li value="Aluminum 6061" onClick={this.handleClick1}>
                <a href="#">Aluminum 6061</a>
              </li>
              <li value="Aluminum 5052" onClick={this.handleClick2}>
                <a href="#">Aluminum 5052</a>
              </li>
              
              <li value="Plain Steel" onClick={this.handleClick3}>
                <a href="#">Plain Steel</a>
              </li>
              <li value="Brass" onClick={this.handleClick4}>
                <a href="#">Brass</a>
              </li>
              <li value="Copper" onClick={this.handleClick5}>
                <a href="#">Copper</a>
              </li>
              <li value="Stainless" onClick={this.handleClick6}>
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
