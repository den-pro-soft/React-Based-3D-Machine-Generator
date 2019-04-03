import React from "react";
import "./up-menu.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Material from "./RightButtons/Material";
import SelectFinish from "./RightButtons/SelectFinish";
import PreferencesWidow from '../DropDownMenu/Edit/PreferencesWindow';
import { connect } from "react-redux";
import {withRouter}from 'react-router-dom';
import Confirmation from '../InfoPopup/Confirmation/Confirmation';
import NonWorkFeature from '../InfoPopup/NonWorkFeature';
import ExpertNotice from "../InfoPopup/ExpertNotice";

import { DraggablePopup } from "../../../../ui/popup";
var popup3DView = new DraggablePopup()
  .setSize(800, 600)
  .setPosition(200, 100)
  .moveToCenter()
  .setTitle("3D view")
  .hide();
var view3D = new View3D({ width: 800, height: 600 });
popup3DView.addContent(view3D.getContent());

let show3D = function() {
    container.resolve('app').clearSelectElements();
    if(container.resolve('mainBoard').tool) {
        container.resolve('mainBoard').tool.clearSelectElements();
    }
  container.resolve('analyzer', app.currentDocument).analyze().then((res)=>{
    if(res){
      try {
        view3D.setGeometry(app.currentDocument);
        popup3DView.show();
      } catch (e) {
        if (e instanceof Exception) {
          console.log(e.message);
          new MessagePopup(null, e.message)
              .setTitle("Error")
              .moveToCenter()
              .show();
        } else {
          throw e;
        }
      }
    }
  });
};

class UpMenu extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="UpMenu">
        <div className="Drop">
          <DropDownMenu history={this.props.history}/>
        </div>
        <div className="Buttons">
          <div className="LeftButtonGroup">
            <div className="btn-group-two">
              <button onClick={() => app.group()}>
                <a href="#">
                  <img width="25px" src="resources/images/Group.png" />
                </a>
              </button>
              <button onClick={() => app.ungroup()}>
                <a href="#">
                  <img width="25px" src="resources/images/Ungroup.png" />
                </a>
              </button>
            </div>
            <div className="btn-group-three">
              <button onClick={() => app.board.zoomToFitScreen()}>
                <a href="#">
                  <img width="25px" src="resources/images/ZoomToFitScreen.png" />
                </a>
              </button>
              <button>
                <a href="#">
                  <img width="25px" src="resources/images/ZoomToActualSize.png" />
                </a>
              </button>
              <button onClick={() => app.setTool("Zoom")}>
                <a href="#">
                  <img width="25px" src="resources/images/Zoom.png" />
                </a>
              </button>
            </div>
            <div className="btn-group-other">
              <button onClick={() => app.deleteSelected()}>
                <a href="#">
                  <img width="24px" src="resources/images/Delete.png" />
                </a>
              </button>
              <button 
              onClick={()=>this.props.updatePreferencesModal(!this.props.openPreferencesModal)}
              >
                <a href="#">
                  <img width="24px" src="resources/images/Preferences.png" />
                </a>
              </button>
              <button
                   onClick={() => {
                    this.props.updateDataDemensions(
                      this.props.demensions === "Millimeters"?"Inches":"Millimeters" 
                    );
                  }}
                  >
                <a href="#">
                  <img width="24px" src="resources/images/ToggleInch.png" />
                </a>
              </button>
              <button onClick={() => app.intersectSelectedElements()}>
                <a href="#">
                  <img width="24px" src="resources/images/Intersect.png" />
                </a>
              </button>
              <button onClick={() => show3D()}>
                <a href="#">
                  <img width="24px" src="resources/images/3DPreview.png" />
                </a>
              </button>
              <button >
                <a href="#">
                  <img width="18px" src="resources/images/check2.png" />
                </a>
              </button>
            </div>
          </div>
          <div className="RightButtons">
            <Material />
            <SelectFinish />
          </div>
        </div>
        <PreferencesWidow/>
        <Confirmation />
        <NonWorkFeature/>
        <ExpertNotice/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    demensions: state.preferencesReducer.demensions,
    openPreferencesModal: state.preferencesWindowReducer.openPreferencesModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataDemensions: value => {
      dispatch({ type: "UPDATE_DEMENSIONS_UpMenu", payload: value });
    },
    updatePreferencesModal: openPreferencesModal => {
      dispatch({
        type: "OPEN_PREFERENCES_MODAL",
        payload: openPreferencesModal,
    
      });
    }
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpMenu));
