import React from "react";
import ReactTooltip from "react-tooltip";
import "./left-menu.scss";

export default class LeftMenu extends React.Component {
  constructor(props){
    super(props)
    this.state={
      background:'transparent',
      bgColorSnapToLines:'#f0f0f0d9',
      
    }
  }
  handleClickSnapToLines =()=>{
      app.magnificationMode=this.state.bgColorSnapToLines==='#f0f0f0d9';
    this.setState({bgColorSnapToLines:(this.state.bgColorSnapToLines==='#f0f0f0d9')?'#fff':'#f0f0f0d9'})
  }

  handlySpline = (e)=>{
    console.log(/*e.target,e.keyCode,*/'Spline')
    app.setTool("Spline");
    // e.stopPropagation();
// e.stopImmediatePropagation();
    // e.preventDefault();
    // if(e.keyCode==32){console.log(e.keyCode,'keyCode');e.preventDefault()}

  }
  render(){
 
    return (
   
      <div className="LeftMenu">
          {/* <ReactTooltip
           html={true}
           data-place="right"
           className="leftTooltipBackgroundTheme"
           /> */}
        <button >
        <a href="#">
          <img
          onClick={() => app.setTool("Pointer")}
            width="25px"
            src="images/Select.png"
            data-tip="<span>Select<br>Chooses a line to which you want to issue a command or make a change. Click on the line.<br>To select multiple lines hold the SHIFT key.<br>To select connected lines hold down CTRL.<br>To select only one line hold down ALT.</span>"
            data-html={true}
          />
        </a>
        </button>
        <button >
        <a href="#">         
          <img
          onClick={() => {console.log('Line'); app.setTool("Line")}}
            width="25px"
            src="images/Line.png"
            data-tip="<span>Line<br>Draws a straight line. Click again at end point. Hold the CTRL key while drawing<br>for a precise 0, 15, 30 or 45 deg angle. Press spacebar to restart line mode.</span>"
          />
        </a>
        </button>
        <button 
        // onClick={(e) => {console.log(e.keyCode,'Spline');app.setTool("Spline");if(e.keyCode==32){e.preventDefault()}}}
        // onClick = {this.handlySpline}
        >
        <a href="#">         
          <img
          onClick = {()=>{console.log('Spline');app.setTool("Spline");}}
            width="25px"
            src="images/Spline.png"
            data-tip="<span>Spline<br>Draws a special style of curve. In workarea? click to specify start point of the curve.<br>Click again at end poin. Drag the control points to define the desired curve.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">         
          <img
            onClick = {()=>{console.log('Rectangle');app.setTool("Rectangle");}}
            width="25px"
            src="images/Rectangle.png"
            data-tip="<span>Rectangle<br>Draws a rectangle. In workarea, click to specify first corner of the rectangle.<br>Click again at opposite corner.</span>"
          />
        </a>
        </button>
        <button>
        <a href="#">         
          <img
            onClick = {()=>{console.log('Circle');app.setTool("Circle");}}          
            width="25px"
            src="images/Circle.png"
            data-tip="<span>Circle.<br>Draws a circle. In workarea, click to specify center of the circle.<br>Click again to specify circle.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">          
          <img
          onClick={() => app.setTool("Freehand")}
            width="25px"
            src="images/Freehand.png"
            data-tip="<span>Freehand.<br>Draws a freehand sketch. To draw click and hold mouse button while moving the mouse.<br>Use the Node edit mode to modify.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">         
          <img
          onClick={() => app.setTool("Eraser")}
            width="25px"
            src="images/Eraser.png"
            data-tip="<span>Eraser.<br>You nttd this essential tool to create most shapes. First draw overlapping circles,<br>rectangles and straight lines; then click this Eraser tool and click on the appropriate line<br>segments to erase up to where it crosses another line.<br>For example, try creating a «D» shape by drawing a vertical line through a circle<br>and then erasing the appropriate line segments.<br>Or try drawing a thick «+» shape by first drawing overlapping vertical and horisontal<br>rectangles and then erasing the internal segments.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">         
          <img
          onClick={() => app.setTool("Pointer")}
            width="25px"
            src="images/Corner.png"
            data-tip="<span>Corner<br>Rounds or chamfers sharp 2D corners when two or more lines are selected.<br>To create arcs separately? enable the arc button in preferences or intercect a circle.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">
          <img
          onClick={() => app.setTool("Pointer")}
            width="25px"
            src="images/Text.png"
            data-tip="<span>Text<br>Adds text to design for making comments or machining letters.<br>In workarea, click to specify starting point. Type the text and press Enter.<br>To machine the text choose Line | Machine | Auto and set Z value on the numeric bar.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">
          <img
          onClick={() => app.setTool("Pointer")}
            width="25px"
            src="images/LineEdit.png"
            data-tip="<span>Line Edit<br>Allows to move line endpoints or full line segments while staying attached.<br>In workarea click on the line. Drag the line or its endpoint to the desired location.</span>"
          />
        </a>
        </button>
        <button >
        <a href="#">         
          <img
          onClick={() => app.setTool("Ruler")}
            width="25px"
            src="images/Ruler.png"
            data-tip="<span>Ruler<br>Measures a distance in the workspace. Left-click on the start and end points to be measured.</span>"
          />
        </a>
        </button>
        <button onClick={this.handleClickSnapToLines} style={{backgroundColor:this.state.bgColorSnapToLines}}/*onClick={() => app.board.setTool("Pointer")}*/>
        <a href="#">
          <img
            width="25px"
            src="images/SnapToLines.png"
            data-tip="<span>Snap to lines<br>Places new or moved lines to meet key points on existing lines.<br>It is generally recommended to keep this pushed in.</span>"
          />
        </a>
        </button>
        <button>
        <a href="#">
          <img
            width="25px"
            src="images/Help.png"
            data-tip="<span>Mechanical drawing is easy if you know a few key methods<br>Click this button for help on these techniques. For example, it is essential to know how<br>to enter dimensions numerically, apply the intersect command, use the snap feature,<br>nudge lines a specified distance, and combine commands to draw needed shapes.</span>"
          />
        </a>
        </button>
      </div>
    );
  }
  
}

