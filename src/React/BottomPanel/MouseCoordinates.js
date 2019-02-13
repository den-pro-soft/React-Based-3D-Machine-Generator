import React from "react";
import "./bottom-panel.scss";

export default class MouseCoordinates extends React.Component {
    constructor(props){
      super(props);
      this.state={
        mouseX:0,
        mouseY:0 
      }
    }
componentWillMount(){

        app.board.addHandler('mouseMove', e => {
          // console.log(e,'mouseMove');
        let point = e;
        let {x} = point;
        let {y} = point;
      
        this.setState({
          mouseX:x+' "',
          mouseY:y+' "' 
        })
     
        // console.log(x,y,'mouseMove-Point')
      
        });
}
    render(){


        return(
            <div className="MouseCoordinates">
            <span className="MouseX">{this.state.mouseX}</span>
            <span className="MouseY">{this.state.mouseY}</span>

            </div>
        )
    }
}