import React from "react";
import "./bottom-panel.scss";
import {connect} from 'react-redux';
 class MouseCoordinates extends React.Component {
    constructor(props){
      super(props);
      this.state={
        mouseX:0,
        mouseY:0 
      }
    }
componentWillMount(){

        app.board.addHandler('mouseMove', e => {
        let point = e;
      
      if(this.props.demensions==='Inches') {
        this.setState({
          mouseX:(point.x).toFixed(3)+' "',
          mouseY:(point.y).toFixed(3)+' "' 
        })
      } else {
        this.setState({
          mouseX:(point.x*25.4).toFixed(3)+' mm',
          mouseY:(point.y*25.4).toFixed(3)+' mm'
        })
      }
     
     
      
        });
}
    render(){
// console.log('State-Props',this.props)

        return(
            <div className="MouseCoordinates">
            <span className="MouseX">{this.state.mouseX}</span>
            <span className="MouseY">{this.state.mouseY}</span>

            </div>
        )
    }

}
const mapStateToProps = (state)=>{
return {
 demensions: state.demensions
}
   }
export default connect(mapStateToProps)(MouseCoordinates)