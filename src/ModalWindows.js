import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
    constructor() {
        this.okCallBack=null;
        this.noCallBack=null;
    }

    /**
     * @param {function} call1 - the ok button callback
     * @param {function} call2 - the no button callback
     */
    modalOpenConfirmation = (call1=null,call2=null) => {
        
        if(typeof call1==='function'){
            this.okCallBack = call1;
        } else { 
            this.okCallBack=null;
        }
        if(typeof call2==='function'){
            this.noCallBack = call2;

        } else { 
            this.noCallBack=null;
        }
        store.dispatch({ type: "OPEN_CONFIRM", payload: true });
    };

    handleButton1 = () => {
        this.okCallBack();
    };
    
    handleButton2 = () => {
        this.noCallBack();
        store.dispatch({ type: "OPEN_CONFIRM", payload:false });
    };

    modalNonWorkFeature = (infoText = 'Sorry, this feature will be realised in the next versions.') =>{
        store.dispatch({ type: "OPEN_NON_WORK_FEATURE", payload:true,payloadText:infoText });
    }
}
