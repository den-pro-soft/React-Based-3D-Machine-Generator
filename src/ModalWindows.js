  export default class ModalWindows  {
constructor(){
    // this.modals = "classModalWindows";
   
}
 modalOpenConfirmation(){
    let modals2 = "2-classModalWindows";
    return modals2
}
}
// var MYAPP = MYAPP || {};
window.modal = new ModalWindows();
// global.modal = ModalWindows;
console.log(MYAPP.modal,'modalWindow - nonReact')
