import React from "react";
import "./material.scss";
// import { connect } from "react-redux";

class Material extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayMenu: false,
      material: "Material"
    };
  }
  componentWillMount() {
    const material = localStorage.getItem("material");
    if (material === null) {
      this.setState({ material: this.state.material });
    } else {
      this.setState({ material: material });
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
    // this.props.updateMaterial('Aluminum 6061')
    localStorage.setItem("material", "Aluminum 6061");
    this.setState({ material: "Aluminum 6061" });
  };
  handleClick2 = () => {
    // this.props.updateMaterial('Aluminum 5052')
    localStorage.setItem("material", "Aluminum 5052");
    this.setState({ material: "Aluminum 5052" });
  };
  handleClick3 = () => {
    // this.props.updateMaterial('Plain Steel')
    localStorage.setItem("material", "Plain Steel");
    this.setState({ material: "Plain Steel" });
  };
  handleClick4 = () => {
    // this.props.updateMaterial('Brass')
    localStorage.setItem("material", "Brass");
    this.setState({ material: "Brass" });
  };
  handleClick5 = () => {
    // this.props.updateMaterial('Copper')
    localStorage.setItem("material", "Copper");
    this.setState({ material: "Copper" });
  };
  handleClick6 = () => {
    // this.props.updateMaterial('Stainless')
    localStorage.setItem("material", "Stainless");
    this.setState({ material: "Stainless" });
  };
  openWindow = () => {
    window.open("https://www.emachineshop.com/");
  };
  render() {
    // console.log(this.props,'material-props')
    return (
      <div className="Material">
        <button className="btn-Material" onClick={this.showDropdownMenu}>
          {/* Material */}
          {this.state.material}
        </button>

        {this.state.displayMenu ? (
          <ul className="ul-Material">
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
        {/* </button> */}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     material: state.materialReducer.material
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateMaterial: material => {
//       dispatch({ type: "UPDATE_MATERIAL", payload: material });
//     }
//   };
// };
// export default connect(mapStateToProps,mapDispatchToProps)(Material);
export default Material;
