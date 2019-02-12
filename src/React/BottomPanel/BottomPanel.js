import React from "react";
import "./bottom-panel.scss";
import MouseCoordinates from './MouseCoordinates';

export default class BottomPanel extends React.Component {
    constructor(props){
      super(props);

    }

    render(){
        return(
            <div className="BottomPanel">
            <div> </div>
            <MouseCoordinates/>
            </div>
        )
    }
}