import React from "react";
import "./bottom-panel.scss";
import MouseCoordinates from './MouseCoordinates';

export default class BottomPanel extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          fileName:app.currentDocument.fileName
      };

      app.addHandler('openNewFile',(doc)=>{
          console.log(doc, "open new file");
          this.setState({fileName:doc.fileName});
      });
    }

    render(){
        return(
            <div className="BottomPanel">
            <div>{this.state.fileName}</div>
            <MouseCoordinates/>
            </div>
        )
    }
}