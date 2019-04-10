import React from "react";
import "./edit.scss";
import PreferencesWidow from './PreferencesWindow.js';
import { connect } from "react-redux";

 class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
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

  render() {
    return (
      <div className="Edit">
        <div
          className="btn-Edit"
          onClick={this.showDropdownMenu}
        >
          Edit
          {this.state.displayMenu ? (
            <ul>
              <li onClick={() => app.undo()}>
                <a href="#">Undo</a>
              </li>
              <li onClick={() => app.redo()}>
                <a href="#">Redo</a>
              </li>
              <li onClick={() => container.resolve('buffer').cut()}>
                <a href="#">Cut</a>
              </li>
              <li onClick={() => container.resolve('buffer').copy()}>
                <a href="#">Copy</a>
              </li>
              <li onClick={() => container.resolve('buffer').paste()}>
                <a href="#">Paste</a>
              </li>

              <li onClick={() => app.deleteSelected()}>
                <a href="#">Delete</a>
              </li>
              <li onClick={() => app.selectAll()}>
                <a href="#">Select All</a>
              </li>
              <li onClick={()=>this.props.updatePreferencesModal(!this.props.openPreferencesModal)}>
                <a href="#">Preferences</a>
              </li>
            </ul>
          ) : null}
        </div>
        <PreferencesWidow/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      openPreferencesModal: state.preferencesWindowReducer.openPreferencesModal

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePreferencesModal: openPreferencesModal => {
      dispatch({
        type: "OPEN_PREFERENCES_MODAL",
        payload: openPreferencesModal,
    
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);