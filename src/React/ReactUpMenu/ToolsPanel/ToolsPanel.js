import React from "react";
import "./tools-panel.scss";
import ReactTooltip from "react-tooltip";
import GroupType from "./GroupType";
import LineType from "./LineType";
import ArcType from "./ArcType";
import CircleType from "./CircleType";
import TextType from "./TextType";

import MoveButtons from "./MoveButtons";
import RotateButtons from "./RotateButtons";

import InputSelect from "./InputSelect";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
export default class ToolsPanel extends React.PureComponent {
  // static defautProps={figures:app.selectElements}

  constructor(props) {
    super(props);
console.log(props,'toolsPanel')
    this.state = {
      show: false,
      line: false,
      arc: false,
      circle: false,
      group: false,
      text:false,

      demensions:'',
      value:'Auto',
      openBendModal:false
    };
  }
  // ---------------React Life Cycle-----------------
  componentWillMount() {
    this.setState({demensions:this.props.demensions})
      app.addHandler("selectElement", element => {
          this.setState({ show: true });
          let arc = app.selectElements.every(el => el.typeName === "Arc");
          if (arc === true && app.selectElements.length > 1) {
              this.setState({ line: false, arc: true, group: true });
          } else {
              if (app.selectElements.length === 1) {
                  let el = app.selectElements[0];
                  switch(el.typeName){
                    // щоб подивитись поля Text - Line в false!!!!а this.state.text=true в конструкторі
                      case "Line":     this.setState({ line: true,  arc: false, group: false, text: false });  break;
                      case "Group":    this.setState({ line: false, arc: false, group: true,  text: false });  break;
                      case "Spline":   this.setState({ line: false, arc: false, group: false, text: false });  break;
                      case "Arc":      this.setState({ line: false, arc: true,  group: false, text: false });  break;
                      case "Text":     this.setState({ line: false, arc: false, group: false, text:true });  break;
                  }
              }else {
                  this.setState({ line: false, arc: false, group: true });
              }
          }
    });

    app.addHandler("clearSelectElements", () => {
      this.setState({ show: false });
    });
  
  }
  handleChangeSelect =(event)=> {
    if(event.target.value==="Bend" &&this.state.line===false&&this.state.group===true){
      this.setState({openBendModal:true})
    }
    console.log(event.target.value,'select')
    this.setState({value: event.target.value});

  }
    // --------------open window Bend---------------------
    // handleOpenBend = event => {
    //   // event.preventDefault();
    //   this.setState(
    //     prevState => ({ openBendModal: !prevState.openBendModal }),
    //     () => {
    //       this.setState({
    //         openBendModal: this.state.openBendModal
    //       });
    //     }
    //   );
  // };
  handleCloseModalBend = () => {
    this.setState(
      prevState => ({ openBendModal: prevState.openBendModal }),
      () => {
        if (this.state.text === true) {
          this.setState({
            value: "Machinist",
            openBendModal: !this.state.openBendModal
          });
        } else {
          this.setState({
            value: "Auto",
            openBendModal: !this.state.openBendModal
          });
        }
      }
    );
  };

  render() {
    if (this.state.show) {
      return this.getPanelHtml();
    } else {
      return (
        <div className="ToolsPanel">
          <button className="btn-Question">
            <a
              href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                width="18px"
                src="images/Help.png"
                data-place="bottom"
                data-tip="<span>Shows how to use numeric values.</span>"
              />
            </a>
          </button>
        </div>
      );
    }
  }

  getPanelHtml() {
    return (
      <div className="ToolsPanel">
        <ReactTooltip
          html={true}
          className="tooltipBackgroundTheme"
        />
        <form>
          <div className="Left-Tools">
            <button
              className="btn-LineType"
            >
              <a href="#">
                <img
                  width="18px"
                  src="images/LineType.png"
                  data-place="bottom"
                  data-tip='<span>Line type.</br>Specifies whether the selected line a shape,bend,</br>thread,relation,comment,etc.Select "Auto" in most cases</br>
                when creating the part shape.
                </span>'
                />
              </a>
            </button>
            <select className="SelectMode" value={this.state.value} onChange={this.handleChangeSelect}>
              <option value="Auto">Auto</option>
              <option value="Bend">Bend</option>
              <option value="Tap">Thread&amp;Tap</option>
              <option value="Self">Comments to Self</option>
              <option value="Machinist">Comments to Machinist</option>
              <option value="LazerMark">LazerMark</option>
            </select>

            {this.state.line === true && (
              <LineType demensions={this.props.demensions} />
            )}
            {this.state.arc === true && <ArcType />}
            {this.state.circle === true && <CircleType />}
            {this.state.group === true && <GroupType />}
            {this.state.text === true && <TextType value={this.state.value}/>}

        
        {this.state.value==="Auto"&&<InputSelect className="CreatableSelect" />}

            {/* <input
            list="browsers"
            name="browser"style={{width:'120px'}}
              onChange={e=>{
                e.preventDefault();
                   let val = parseInt(e.target.value);
                       app.setElementsHeight(val?val:0.075);
              }}
            name="browser"
            style={{ width: "120px" }}
            autoComplete="on"
          />
        <datalist id="browsers" defaultValue="Air Inside">
            <select>
              <option value="Air Inside" />
              <option value="Revolve" />
              {data.map((item, i) => (
                <option key={i} value={item + String.fromCharCode(34)} />
              ))}
              <option value="Other" />
            </select>
          </datalist>  */}

            <button className="btn-Question">
              <a
                href="https://www.emachineshop.com/help-2d-drawing/#numeric-values"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="18px"
                  src="images/Help.png"
                  data-place="bottom"
                  data-tip="<span>Shows how to use numeric values.</span>"
                />
              </a>
            </button>
          </div>
          <div className="Right-Tools">
            <MoveButtons demensions={this.props.demensions}/>
            <RotateButtons/>
          </div>
        </form>
        <Dialog
          maxWidth={false}
          open={this.state.openBendModal}
          onChange={this.handleChangeSelect}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ color: "black", textAlign: "left" }}
            id="alert-dialog-title"
          >
            <span>Information</span>
          </DialogTitle>

          <DialogContent
            style={{
              textAlign: "left",
              width: "400px",
              height: "55px",
              backgroundColor: "#f0ecec"
            }}
          >
             {/* <img
              width="25px"
              src="images/Info.png"
              // data-tip="<span>Shows how to use numeric values.</span>"
            /> */}
          <p style={{marginTop:'15px'}}>  <img
              width="25px"
              src="images/Info.png"
              // data-tip="<span>Shows how to use numeric values.</span>"
            /><span style={{marginLeft:'10px'}}>Use only straight segments for Bend lines</span></p>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCloseModalBend}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000",
                margin:'0 auto'
              }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
            {/* <Button
              onClick={this.handleCloseModalPreferences}
              style={{
                backgroundColor: "#dddada",
                boxShadow: "2px 2px 1px #000"
              }}
              color="primary"
              autoFocus
            >
              Cancel
            </Button> */}
        
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
