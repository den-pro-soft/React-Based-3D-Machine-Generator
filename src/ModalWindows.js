  export default class ModalWindows  {
constructor(){
    // this.modals = "classModalWindows";
   
}
 modalOpenConfirmation(){
    app.congig.openConfirm=true
}
}
// var MYAPP = MYAPP || {};
window.modal = new ModalWindows();
// global.modal = ModalWindows;
console.log(MYAPP.modal,'modalWindow - nonReact')
