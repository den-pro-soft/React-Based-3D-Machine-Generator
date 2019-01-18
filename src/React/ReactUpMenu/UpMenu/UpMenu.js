import React from "react";
import "./up-menu.scss";
import Help from "../DropDownMenu/Help";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

import {DraggablePopup} from './../../../popup';
var popup3DView = new DraggablePopup().setSize(800,600).setPosition(200,100).moveToCenter().setTitle("3D view").hide();
var view3D = new View3D({width:800, height:600});
popup3DView.addContent(view3D.getContent());



let show3D = function(){
  try {
    view3D.setGeometry(app.currentDocument);
    popup3DView.show();
  }catch (e){
    if(e instanceof Exception) {
      console.log(e.message);
      new MessagePopup(null, e.message).setTitle('Error').moveToCenter().show();
    }else{
      throw e;
    }
  }
}


const UpMenu = context => {
  return (
    <div className="UpMenu">
      <div className="Drop">
      
        {/* <span> */}
          <DropDownMenu/>
          {/* </span> */}
      </div>
      <div className="Buttons">
        <div className="btn-group-two">
          <button onClick={() => app.group()}>
            <img width="25px" src="images/Group.png" />
          </button>
          <button onClick={() => app.ungroup()}>
            <img width="25px" src="images/Ungroup.png" />
          </button>
        </div>
        <div className="btn-group-three">
          <button>
            <img width="25px" src="images/ZoomToFitScreen.png" />
          </button>
          <button>
            <img width="25px" src="images/ZoomToActualSize.png" />
          </button>
          <button>
            <img width="25px" src="images/Zoom.png" />
          </button>
        </div>
        <div className="btn-group-other">
          <button>
            <img width="24px" src="images/Delete.png" />
          </button>
          <button>
            <img width="24px" src="images/Preferences.png" />
          </button>
          <button>
            <img width="24px" src="images/ToggleInch.png" />
          </button>
          <button>
            <img width="24px" src="images/LinyType.png" />
          </button>
          <button>
            <img width="24px" src="images/Intersect.png" />
          </button>
          <button onClick={() => show3D()}>
            <img width="24px" src="images/3DPreview.png" />
          </button>
          <button>
            <img width="24px" src="images/check2.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpMenu;
