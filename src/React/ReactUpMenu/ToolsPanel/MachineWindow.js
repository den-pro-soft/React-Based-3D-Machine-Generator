import React from "react";
// import Settings from "./Settings/Settigs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTapModal: false
    };
    console.log(this.props.openTapModal,'props Machine')
  }
componentWillMount(){
    this.setState({openTapModal:this.props.openTapModal});

}

  // --------------methods for SubModal Window-------------------------------------
//   clickOpenTapModal = event => {
//     event.preventDefault();
//     this.setState({
//         openTapModal: true
//       //   prevState => ({ open: !prevState.open }),
//       // () => {
//       //   this.setState({ open: this.state.open });
//       //   console.log(this.state.open, "clickOpen-72");
//     });
//   };

  closeTapModal = () => {
   this.setState({openTapModal:!this.props.openTapModal});
    console.log(this.props.openTapModal,'this.props.openTapModal')
    // this.setState(
    //   prevState => ({ openTapModal: prevState.openTapModal }),
    //   () => {
    //     this.setState({ openTapModal: !this.state.openTapModal });
    //   }
    // );
  };

  // -------------------------------------openLinkHelp---------------------------------------
  openTapHelp = () => {
    window.open(
      "https://www.emachineshop.com/help-line-types/#tap-and-thread"
    );
  };
  render(){
      return(
        <Dialog
        // onClick={this.clickSubModal}
        maxWidth={false}
        open={this.state.openTapModal}
        // onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "left" }}
          id="alert-dialog-title"
        >
          <img
            width="25px"
            src="images/icon.jpg"
            // data-tip="<span>Shows how to use numeric values.</span>"
          />
          <span>Machine</span>
        </DialogTitle>

        <DialogContent
          style={{
            width: "950px",
            height: "425px",
            backgroundColor: "#f0ecec"
          }}
        >
         <h2>Thead& Tap</h2>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={this.closeTapModal}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
          <Button
            onClick={this.closeTapModal}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={this.openTapHelp}
            style={{ backgroundColor: "#f0ecec" }}
            color="primary"
            autoFocus
          >
            Help
          </Button>
        </DialogActions>
      </Dialog>
      )
  }
}