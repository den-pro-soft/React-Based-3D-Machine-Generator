import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";

class NonWorkFeature extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
    //   console.log(this.props, "props-Non-Work");
        return (
            <Dialog
            maxWidth={false}
            open={this.props.openNonWorkFeature}
            // open={true}
            // onChange={this.handleChangeSelect}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <div
            style={{
                paddingBottom:'0px',
                textAlign: "left",
                width: "560px",
                height: "130px",
                backgroundColor:'#f0ecec'
            }}
            >
            <div 
            style={{
            display:'flex',
            justifyContent:"space-between",
            marginTop:'5px',
            paddingLeft:'15px'}}>
                <span>Information</span>

                <Button
                   onClick={() => {
                    // this.props.openNonWork(!this.props.openNonWorkFeature);
                    this.props.openNonWork(false);

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
            <div style={{ margin: "15px 15px",textAlign:'left' }}>
                <img
                width="25px"
                src="images/Info.png"
                />
                <span style={{ position:'relative', bottom:'15px',marginLeft: "30px" }}>
                Sorry, this feature will be realised in the next versions
                </span>
            </div>
            <div style={{marginTop: "10px",marginBottom:'0px',paddingBottom:'0px',textAlign:'center'}}>
                <Button
                    onClick={() => {
                        // this.props.openNonWork(!this.props.openNonWorkFeature);
                    this.props.openNonWork(false);

                        // container
                        //     .resolve("confirmChangeArcToSplinesDialog")
                        //     .handleButton1();
                            }}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000",
                        margin: "0 auto",
                        padding:'2px 2px',
                    }}
                    color="primary"
                    autoFocus
                >
                OK
                </Button>
            </div>
            </div>
            </Dialog>

            );
        }
    }

    const mapStateToProps = state => {
        return {
            openNonWorkFeature: state.nonWorkFeatureReducer.openNonWorkFeature
            // openNonWorkFeature: state.nonWorkFeatureReducer.openNonWorkFeature

        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            openNonWork: openNonWorkFeature => {
                dispatch({ type: "OPEN_NON_WORK_FEATURE", payload: openNonWorkFeature });
            }
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(NonWorkFeature)