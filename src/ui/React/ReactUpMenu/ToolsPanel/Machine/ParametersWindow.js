import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { connect } from "react-redux";

class ParametersWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openGroovesHelp = () => {
    window.open("https://www.emachineshop.com/help-3d-drawing/#grooves");
  };
  render() {
    // console.log(this.props, this.state.value,"props-ExpertNoticeKU");
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
                        type="text"
                    style={{width:'80px',margin:'15px'}}
                      />
                      <label
                    style={{fontSize:'14px'}}                                           
                      >Top Depth</label>

                    </div>
                    <div className="Input">
                      <input
                        type="text"
                        style={{width:'80px',margin:'15px'}}
                    
                      />
                      <label 
                    style={{fontSize:'14px'}}                     
                      >Width</label>

                    </div>
                        <div className="Input">
                      <input
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
    openSetGrooves: state.setGroovesReducer.openSetGrooves
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetGrooves: openSetGrooves => {
      dispatch({
        type: "OPEN_SET_GROOVES",
        payload: openSetGrooves
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParametersWindow);
