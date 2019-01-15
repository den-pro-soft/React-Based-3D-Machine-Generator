import React from "react";
import "./up-menu.scss";

const UpMenu = context => {
  console.log("upmenu");

  return (
    <div className="UpMenu">
      <div className="btn-group-two">
        <button>
          <img width="25px" src="images/Group.png" />
        </button>
        <button>
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
          <img width="25px" src="images/Delete.png" />
        </button>
        <button>
          <img width="25px" src="images/Preferences.png" />
        </button>
        <button>
          <img width="25px" src="images/ToggleInch.png" />
        </button>
        <button>
          <img width="25px" src="images/LinyType.png" />
        </button>
        <button>
          <img width="25px" src="images/Intersect.png" />
        </button>
        <button>
          <img width="25px" src="images/3DPreview.png" />
        </button>
        <button>
          <img width="25px" src="images/check2.png" />
        </button>
      </div>
    </div>
  );
};

export default UpMenu;
