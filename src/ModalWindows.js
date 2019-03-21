import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
    constructor() {
        this.okCallBack=null;
        this.noCallBack=null;
        this.infoText = 'Sorry, this feature will be realised in the next versions.';
        this.label1='labelText1';
        this.label2='labelText2';
        this.label3='labelText3';
        this.label4='labelText4';
        this.label5='';

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

    modalNonWorkFeature = () =>{
        store.dispatch({ type: "OPEN_NON_WORK_FEATURE", payload:true,payloadText:this.infoText });
    }

    modalExpertNotice = () =>{
        store.dispatch({ type: "OPEN_EXPERT_NOTICE", payload:true, payloadText:this.infoText,
        payloadLabel1:this.label1,
        payloadLabel2:this.label2,
        payloadLabel3:this.label3,
        payloadLabel4:this.label4,      
        payloadLabel5:this.label5
    });
    }
}
