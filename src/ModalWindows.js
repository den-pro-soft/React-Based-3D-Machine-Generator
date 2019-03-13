import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
    constructor() {
        this.handly1=null;
        this.handly2=null;

    }

    modalOpenConfirmation = (call1=null,call2=null) => {
        
        if(typeof call1==='function'){
            this.handly1 = call1;
        } else { 
            this.handly1=null;
        }
        if(typeof call2==='function'){
            this.handly2 = call2;

        } else { 
            this.handly2=null;
        }
        store.dispatch({ type: "OPEN_CONFIRM", payload: true });
    };

    handleButton1 = () => {
        this.handly1()
        // store.dispatch({ type: "OPEN_CONFIRM", payload:false });
        console.log("Yes-from modalWindows");
    };
    
    handleButton2 = () => {
        this.handly2();
        // store.dispatch({ type: "OPEN_CONFIRM", payload:false });
        console.log("No-from modalWindows");
    };
}
