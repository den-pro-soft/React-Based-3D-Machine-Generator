import React from "react";
import "./material.scss";

const materialList = [
    'Aluminum 6061',
    'Aluminum 5052',
    'Steel 1018',
    'Brass 260',
    'Copper 110',
    'Stainless 304'
];

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

    chengeMaterial(material){
        localStorage.setItem("material", material);
        this.setState({ material: material });
    }

  openWindow = () => {
    window.open("https://www.emachineshop.com/materials/");
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
              {materialList.map((material, i) =>(
                  <li value={material} onClick={()=>this.chengeMaterial(material)}>
                      <a href="#">{material}</a>
                  </li>
              ))}
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


export default Material;
