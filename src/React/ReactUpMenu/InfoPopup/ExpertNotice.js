import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

class ExpertNotice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "radio1"
      };
    }
    handleRadioChange = event => {
      event.preventDefault();
  
      this.setState({ value: event.target.value });
    //   console.log(this.state.value, "this.state.value");
    };

    render() {
    //   console.log(this.props, "props-ExpertNoticeKU");
        return (
            <Dialog
            maxWidth={false}
            open={this.props.openExpertNotice}
            // open={false}
            // open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <div
            style={{
                paddingBottom:'0px',
                textAlign: "left",
                width: "300px",
                // height: "180px",
                backgroundColor:'#f0ecec'
            }}
            >
            <div 
            style={{
            display:'flex',
            justifyContent:"space-between",
            marginTop:'5px',
            paddingLeft:'15px'}}>
                <span>Expert Notice</span>

                <Button
                   onClick={() => {
                    // this.props.openExpertNotice(!this.props.openExpertNotice);
                    this.props.updateExpertNotice(false);

                  }}
                    style={{
                        backgroundColor:'#f0ecec',
                        padding:'0px',
                    }}
                    color="primary"
                    autoFocus
                >
                <i className = "material-icons">
                    cancel_presentation
                </i>
                </Button>
            </div> 
            {/* <div style={{display:'flex',flexDirection:'column',heigh}}> */}
            <div className="Text"
            style={{ margin: "15px 15px",textAlign:'left' }}>
                <img
                width="30px"
                src="images/InfoIcon.png"
                />
                <p style={{ position:'relative', bottom:'25px',marginLeft: "40px",textAlign:'left'  }}>
                    {this.props.expertNoticeText}
                {/* Sorry, this feature will be realised in the next versions */}
                </p>
            </div>
            <div className="RadioButton" style={{margin:'15px', border:'1px solid #000', padding:'5px'}}>
          <FormControl>
            <RadioGroup
              value={this.state.value}
              onChange={this.handleRadioChange}
            >
        <FormControlLabel
                onClick={() => {
                    container
                      .resolve("confirmChangeArcToSplinesDialog")
                      .handleRadioButton1();
                  }}
                classes={{ root: "root" }}
                // style={{border:'1px solid red',paddinTop:'0px!important'}}
                value="radio1"
                control={
                  <Radio
                  classes={{ root: "root" }}
                    color="primary"
                    // color="default"
                    // style={{margin:"0px"}}
                  />
                }
                label={this.props.label1}
              />
              <FormControlLabel
                  onClick={() => {
                    container
                      .resolve("confirmChangeArcToSplinesDialog")
                      .handleRadioButton2();
                  }}
               classes={{ root: "root" }}
                value="radio2"
                control={
                  <Radio
                    // classes={{ root: "root" }}
                    style={{ margin: "0px" }}
                    color="primary"
                    // color="default"
                  />
                }
                label={this.props.label2}
              />
            {this.props.label3!==''&&this.props.label3!==undefined&&  <FormControlLabel
                onClick={() => {
                    container
                      .resolve("confirmChangeArcToSplinesDialog")
                      .handleRadioButton3();
                  }}
               classes={{ root: "root" }}
                value="radio3"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                }
                label={this.props.label3}
              />}
            {this.props.label4!==''&&this.props.label4!==undefined&&  <FormControlLabel
                  onClick={() => {
                    container
                      .resolve("confirmChangeArcToSplinesDialog")
                      .handleRadioButton4();
                  }}
               classes={{ root: "root" }}
                value="radio4"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                
                }
                label={this.props.label4}
              />}
             {this.props.label5!==''&&this.props.label5!==undefined&& <FormControlLabel
                   onClick={() => {
                    container
                      .resolve("confirmChangeArcToSplinesDialog")
                      .handleRadioButton5();
                  }}
               classes={{ root: "root" }}
                value="radio5"
                control={
                  <Radio
                    color="primary"
                    //  color="default"
                  />
                }
                label={this.props.label5}
              />}
            </RadioGroup>
          </FormControl>
        </div>
            <div 
            // style={{/*position:'absolute',bottom:15,left:250,textAlign:'center'}}
            style={{display:'flex', justifyContent:'flex-end', margin:'10px'}}
            >
                <Button
                    onClick={() => {
                        // this.props.openNonWork(!this.props.openExpertNotice);
                    this.props.updateExpertNotice(false);
                            }}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000",
                        marginRight: "5px",
                        // margin: "0 auto",
                        padding:'2px 2px',
                    }}
                    color="primary"
                    autoFocus
                >
                OK
                </Button>
                <Button
                    onClick={() => {
                        // this.props.openNonWork(!this.props.openExpertNotice);
                    this.props.updateExpertNotice(false);
                            }}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000",
                        marginLeft: "5px",
                        marginRight: "5px",

                        padding:'2px 2px',
                    }}
                    color="primary"
                    autoFocus
                >
                Cancel
                </Button>
            </div>
            </div>
            </Dialog>

            );
        }
    }

    const mapStateToProps = state => {
        return {
            openExpertNotice: state.expertNoticeReducer.openExpertNotice,
            expertNoticeText: state.expertNoticeReducer.expertNoticeText,
            label1: state.expertNoticeReducer.label1,
            label2: state.expertNoticeReducer.label2,
            label3: state.expertNoticeReducer.label3,
            label4: state.expertNoticeReducer.label4,
            label5: state.expertNoticeReducer.label5

        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            updateExpertNotice: (openExpertNotice,expertNoticeText, label1, label2, label3, label4, label5) => {
                dispatch({ type: "OPEN_EXPERT_NOTICE", payload: openExpertNotice,
            payloadText:expertNoticeText,
            payloadLabel1:label1,
            payloadLabel2:label2,
            payloadLabel3:label3,
            payloadLabel4:label4,
            payloadLabel5:label5
         });
            }

        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(ExpertNotice)