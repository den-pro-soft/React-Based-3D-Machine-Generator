import React from "react";
import "./file.scss";
// import FileLoader from '../../../../file/FileLoader'
import New from './New/New.js';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
export default class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            openNewModal: false
        };
// console.log(this.props,'props-File')
    }

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener("click", this.hideDropdownMenu);
        });
    };

    hideDropdownMenu = () => {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener("click", this.hideDropdownMenu);
        });
    };
    // --------------methods for NewModal Window-------------------------------------
    clickNewModal = event => {
        event.preventDefault();
        this.setState({
            openNewModal: true
        });
    };


    closeNewModal = () => {

        this.setState(
            prevState => ({openNewModal: prevState.openNewModal}),
            () => {
                this.setState({openNewModal: !this.state.openNewModal});
            }
        );
    };
// ------------open link button Help----------
    openWindow = ()=> {
        window.open('https://www.emachineshop.com/help-wizards/')
    };

    openFile = e =>{
        //todo: the code have copy in Helper Ctrl+O key handler
        var newInput = document.createElement('input');
        newInput.setAttribute('type','file');
        // newInput.setAttribute('accept',this.accept);
        newInput.setAttribute('accept','.emsx');

        newInput.onchange = function(){
            //todo: check count files
            app.open(this.files[0]);
            newInput.remove();
        };
        newInput.click();
    };

    importFile = e =>{
         //todo: the code have copy in Helper Ctrl+O key handler
        var newInput = document.createElement('input');
        newInput.setAttribute('type','file');
        // newInput.setAttribute('accept',this.accept);
        newInput.setAttribute('accept','.dfx');

        newInput.onchange = function(){
            //todo: check count files
            app.open(this.files[0]);
            newInput.remove();
        };
        newInput.click();
    };

    render() {
        return (
            <div className="File">
                <div
                    className="btn-File"
                    onClick={this.showDropdownMenu}
                    onMouseEnter={this.showDropdownMenu}
                    onMouseLeave={this.hideDropdownMenu}
                >
                    File
                    {this.state.displayMenu ? (
                        <ul>
                            <li onClick={this.clickNewModal}>
                                <a href="#">New</a>
                            </li>
                            <li onClick={this.openFile}>
                                <a href="#">Open</a>
                            </li>
                            <li onClick={()=> app.saveAs('xml')}>
                                <a href="#">
                                    Save
                                    {/* <Save/> */}
                                </a>
                            </li>
                            <li onClick={()=> app.saveAs('png')}>
                                <a href="#">Save As</a>
                            </li>
                            <li onClick={this.importFile}>
                                <a href="#">Import</a>
                            </li>
                            <li>
                                <a href="#">Exit</a>
                            </li>
                        </ul>
                    ) : null}
                </div>
                <Dialog
                    maxWidth={false}
                    open={this.state.openNewModal}
                    onClose={this.handleClose}
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
                        <span>New Design</span>
                    </DialogTitle>

                    <DialogContent

                        style={{ width: "950px",height:'425px', backgroundColor: "#f0ecec" }}
                    >
                        <New history={this.props.history}/>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={this.closeNewModal}
                            style={{
                                    backgroundColor: "#dddada",
                                    boxShadow: "2px 2px 1px #000"
                                  }}
                            color="primary"
                            autoFocus
                        >
                            OK
                        </Button>
                        <Button
                            onClick={this.closeNewModal}
                            style={{
                                    backgroundColor: "#dddada",
                                    boxShadow: "2px 2px 1px #000"
                                  }}
                            color="primary"
                            autoFocus
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.openWindow}
                            style={{
                                    backgroundColor: "#dddada",
                                    boxShadow: "2px 2px 1px #000"
                                  }}
                            color="primary"
                            autoFocus
                            // https://www.emachineshop.com/help-wizards/''
                        >
                            Help
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}
