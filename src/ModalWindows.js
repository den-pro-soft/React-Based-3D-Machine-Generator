import Confirmation from "./React/ReactUpMenu/ToolsPanel/Confirmation/Confirmation";
import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
  constructor() {
    this.openConfirm = false;
  }
  modalOpenConfirmation = () => {
    return  this.openConfirm = !this.openConfirm;
    // return this.openConfirm;
  };
  handleYesButton = () => {
    console.log("Yes-from modalWindows");
  };
  handleNoButton = () => {
    console.log("No-from modalWindows");
  };
}
