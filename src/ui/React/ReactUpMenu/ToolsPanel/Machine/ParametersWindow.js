import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { connect } from "react-redux";

class ParametersWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topDepth:this.props.topDepth.toFixed(3) + ' mm',
      width:this.props.width.toFixed(3) + ' mm',
      horisontalDepth:this.props.horisontalDepth.toFixed(3) + ' mm'
    };
  }

  componentWillMount(){
    let topDepth = this.props.topDepth;
    let width = this.props.width;
    let horisontalDepth = this.props.horisontalDepth;

    if(this.props.demensions==='Millimeters'){  
        this.setState({
          topDepth: (topDepth*1).toFixed(3) + ' mm',
          width: (width*1).toFixed(3) + ' mm',
          horisontalDepth: (horisontalDepth*1).toFixed(3) + ' mm'
      })
    this.props.updateGroovesData(+topDepth,width,horisontalDepth);

      } else {
        this.setState({topDepth: (topDepth/25.4).toFixed(3) + ' "'}),
        this.setState({width: (width/25.4).toFixed(3) + ' "'}),
        this.setState({horisontalDepth: (horisontalDepth/25.4).toFixed(3) + ' "'})
    this.props.updateGroovesData(+topDepth,width,horisontalDepth);

      }
  }
     // componentWillReceiveProps(nextProps){ 
      componentDidUpdate(prevProps, prevState) {
        if (this.props.demensions !== prevProps.demensions) {
          let topDepth = this.props.topDepth;
          let width = this.props.width;
          let horisontalDepth = this.props.horisontalDepth;
  
          if(this.props.demensions==='Millimeters'){  
              this.setState({
                topDepth: (topDepth*1).toFixed(3) + ' mm',
                width: (width*1).toFixed(3) + ' mm',
                horisontalDepth: (horisontalDepth*1).toFixed(3) + ' mm'
            })
          this.props.updateGroovesData(+topDepth,+width,+horisontalDepth);

            } else {
              this.setState({topDepth: (topDepth/25.4).toFixed(3) + ' "'}),
              this.setState({width: (width/25.4).toFixed(3) + ' "'}),
              this.setState({horisontalDepth: (horisontalDepth/25.4).toFixed(3) + ' "'})
          this.props.updateGroovesData(+topDepth,+width,+horisontalDepth);

            }
        }
      }

    handlyChangeInputTopDepth = e => {
      let topDepth = e.target.value;
      let topDepthNumber = topDepth.replace(/[^0-9.]/g, "") ;
      this.props.updateGroovesData((+topDepthNumber*1).toFixed(3),this.props.width,this.props.horisontalDepth)
      this.setState({
        topDepth
      });
    
      if (e.charCode === 13) {
        if (this.props.demensions === 'Millimeters') {
    
            this.setState({
              topDepth: this.props.topDepth.replace(/[^0-9.]/g, "") + ' mm'
            })

          let topDepth1 = +this.state.topDepth.replace(/[^0-9.]/g, "")
          this.props.updateGroovesData(+topDepth1,this.props.width,this.props.horisontalDepth);
          this.topInput.blur();
        } else {
          this.setState({
            topDepth: this.props.topDepth.replace(/[^0-9.]/g, "") + ' "'
          });
          let topDepth1 = this.state.topDepth.replace(/[^0-9.]/g, "")
          this.props.updateGroovesData(+topDepth1*25.4,this.props.width,this.props.horisontalDepth);
          this.topInput.blur();
        }
      }
    }

    handlyChangeInputWidth = e => {
      let width = e.target.value;
      let widthNumber = width.replace(/[^0-9.]/g, "") ;
      this.props.updateGroovesData(this.props.topDepth,(widthNumber*1).toFixed(3),this.props.horisontalDepth)
      this.setState({
        width
      });
    
      if (e.charCode === 13) {
        if (this.props.demensions === 'Millimeters') {
    
            this.setState({
              width: this.props.width.replace(/[^0-9.]/g, "") + ' mm'
            })

          let width1 = this.state.width.replace(/[^0-9.]/g, "")
          this.props.updateGroovesData(+this.props.topDepth,+width1,this.props.horisontalDepth);
          this.widthInput.blur();
        } else {
          this.setState({
            width: this.props.width.replace(/[^0-9.]/g, "") + ' "'
          });
          let width1 = this.state.width.replace(/[^0-9.]/g, "")
          this.props.updateGroovesData(this.props.topDepth,+width1*25.4,this.props.horisontalDepth);
          this.widthInput.blur();
        }
      }
    }

    handlyChangeHorisontalDepthInput = e => {
      let horisontalDepth = e.target.value;
      let horisontalDepthNumber = horisontalDepth.replace(/[^0-9.]/g, "") ;
      this.props.updateGroovesData(this.props.topDepth,this.props.width,(horisontalDepthNumber*1).toFixed(3))
      this.setState({
        horisontalDepth
      });
      // let horisontalDepth1 = this.state.horisontalDepth.replace(/[^0-9.]/g, "")
      if (e.charCode === 13) {
        if (this.props.demensions === 'Millimeters') {
    
            this.setState({
              horisontalDepth:this.props.horisontalDepth.replace(/[^0-9.]/g, "") + ' mm'
            })

          let horisontalDepth1 = this.state.horisontalDepth.replace(/[^0-9.]/g, "")
          this.props.updateGroovesData(+this.props.topDepth,+this.props.width,+horisontalDepth1);
          this.horisontalInput.blur();

        } else {
          this.setState({
            horisontalDepth: this.props.horisontalDepth.replace(/[^0-9.]/g, "") + ' "'
          });
          let horisontalDepth1 = this.state.horisontalDepth.replace(/[^0-9.]/g, "")

          this.props.updateGroovesData(this.props.topDepth,+this.props.width, +horisontalDepth1*25.4);
          this.horisontalInput.blur();        
        }
      }
    }
    addGroovesData= ()=>{
      let groovesData = [{topDepth:this.props.topDepth,width: this.props.width, horisontalDepth:this.props.horisontalDepth}];
      console.log(groovesData ,'groovesDataArray')
      groovesData.push()
    }

    openGroovesHelp = () => {
      window.open("https://www.emachineshop.com/help-3d-drawing/#grooves");
    }
    
    render() {
      // console.log(this.props, "props-Grooves");
      return (
        <Dialog
          maxWidth={false}
          open={this.props.openSetGrooves}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{
              paddingBottom: "0px",
              textAlign: "left",
              width: "420px",
              // height: "180px",
              backgroundColor: "#f0ecec"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
                paddingLeft: "15px"
              }}
            >
              <span>Set grooves parameters</span>

              <Button
                onClick={() => {
                  this.props.updateSetGrooves(!this.props.openSetGrooves);
                }}
                style={{
                  backgroundColor: "#f0ecec",
                  padding: "0px"
                }}
                color="primary"
                autoFocus
              >
                <i className="material-icons">cancel_presentation</i>
              </Button>
            </div>

            <fieldset
              className="SideView"
              style={{
                margin: "15px",
                padding: "5px"
              }}
            >
            <div  style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "10px",
                // padding: "5px"
              }}>
              <div>
                <img src="resources/images/ParametersGrooves.png" />
              </div>
              <div  style={{
                display: "flex",
                flexDirection:"column",
                marginLeft: "10px",
          
              }}>
                  <div className="Input">
                        <input
                            ref={input => {
                              this.topInput = input;
                            }}
                            value={this.state.topDepth}
                            onChange={this.handlyChangeInputTopDepth}
                            onKeyPress={this.handlyChangeInputTopDepth}
                          type="text"
                      style={{width:'80px',margin:'15px'}}
                        />
                        <label
                      style={{fontSize:'14px'}}                                           
                        >Top Depth</label>

                      </div>
                      <div className="Input">
                        <input
                              ref={input => {
                                this.widthInput = input;
                              }}
                              value={this.state.width}
                              onChange={this.handlyChangeInputWidth}
                              onKeyPress={this.handlyChangeInputWidth}
                          type="text"
                          style={{width:'80px',margin:'15px'}}
                      
                        />
                        <label 
                      style={{fontSize:'14px'}}                     
                        >Width</label>

                      </div>
                          <div className="Input">
                        <input
                            ref={input => {
                              this.horisontalInput = input;
                            }}
                            value={this.state.horisontalDepth}
                            onChange={this.handlyChangeHorisontalDepthInput}
                            onKeyPress={this.handlyChangeHorisontalDepthInput}
                          type="text"
                          style={{width:'80px',margin:'15px'}}                   
                        />
                        <label
                      style={{fontSize:'14px'}}                                           
                        >Horisontal Depth</label>

                      </div>
              </div>
              </div>
            </fieldset>

            <fieldset
              className="Grooves"
              style={{ margin: "15px", border: "1px solid #000", padding: "5px" }}
            >
              <legend>Grooves</legend>

              <div  style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "10px",
                // padding: "5px"
              }}>
              <div style={{width:'200px',height:'160px',backgroundColor:"white"}}>
                {/* <img src="resources/images/ParametersGrooves.png" /> */}
              </div>
              <div  style={{
                display: "flex",
                flexDirection:"column",
                marginLeft: "10px",
          
              }}>
                  {/* <div className="Input"> */}
                  <Button
            onClick={this.addGroovesData}
                style={{
                  width:'150px',
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  // marginRight: "5px",
                  marginBottom:'10px',
                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                Add
              </Button>
                      {/* </div>
                      <div className="Input"> */}
                      <Button
            
                style={{
                  width:'150px',

                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  // marginRight: "5px",
                  marginBottom:'10px',
                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                Replace
              </Button>

                      {/* </div>
                          <div className="Input"> */}
                          <Button
            
                style={{
                  width:'150px',
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  // marginRight: "5px",
                  marginBottom:'10px',
                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                Remove
              </Button>
                      {/* </div> */}
              </div>
              </div>
            </fieldset>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px"
              }}
            >
              <Button
                onClick={() => {
                  this.props.updateSetGrooves(!this.props.openSetGrooves);
                }}
                style={{
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  marginRight: "5px",
                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                OK
              </Button>
              <Button
                onClick={() => {
                  this.props.updateSetGrooves(!this.props.openSetGrooves);
                }}
                style={{
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  marginLeft: "5px",
                  marginRight: "5px",

                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button
                onClick={this.openGroovesHelp}
                style={{
                  backgroundColor: "#dddada",
                  boxShadow: "2px 2px 1px #000",
                  marginLeft: "5px",
                  marginRight: "5px",
                  padding: "2px 2px"
                }}
                color="primary"
                autoFocus
              >
                Help
              </Button>
            </div>
          </div>
        </Dialog>
      );
    }
}

    const mapStateToProps = state => {
      return {
        openSetGrooves: state.setGroovesReducer.openSetGrooves,
        demensions: state.preferencesReducer.demensions,
        topDepth:state.groovesParametersReducer.topDepth,
        width:state.groovesParametersReducer.width,
        horisontalDepth:state.groovesParametersReducer.horisontalDepth

      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        updateSetGrooves: openSetGrooves => {
          dispatch({
            type: "OPEN_SET_GROOVES",
            payload: openSetGrooves
          });
        },
        updateGroovesData: (topDepth,width,horisontalDepth) => {
          dispatch({ type: "UPDATE_GROOVES_DATA", 
          payloadTopDepth: topDepth,
          payloadWidth:width,
          payloadHorisontalDepth: horisontalDepth });
        }
      };
    };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParametersWindow);
