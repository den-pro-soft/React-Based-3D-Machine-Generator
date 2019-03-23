import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
    constructor() {
        this.okCallBack = null;
        this.noCallBack = null;
        this.infoText =
        "Sorry, this feature will be realised in the next versions.";
    }

    /**
     * @param {function} call1 - the ok button callback
     * @param {function} call2 - the no button callback
     */
    modalOpenConfirmation = (call1 = null, call2 = null) => {
        if (typeof call1 === "function") {
        this.okCallBack = call1;
        } else {
        this.okCallBack = null;
        }
        if (typeof call2 === "function") {
        this.noCallBack = call2;
        } else {
        this.noCallBack = null;
        }
        store.dispatch({ type: "OPEN_CONFIRM", payload: true });
    };

    handleButton1 = () => {
        this.okCallBack();
    };

    handleButton2 = () => {
        this.noCallBack();
        store.dispatch({ type: "OPEN_CONFIRM", payload: false });
    };

    modalNonWorkFeature = () => {
        store.dispatch({
        type: "OPEN_NON_WORK_FEATURE",
        payload: true,
        payloadText: this.infoText
        });
    };

       /**
     * @param {string} text - the text for output in window
     * @param {Array.<{text:string,callback:function, callbackOK:function, callbackCancel:function}>} paramArr - the array of objects 
     * with keys text,callback,callbackOK and callbackCancel   
     * @param {function} callbackOK - the OK button callback
     * @param {function} callbackCancel - the Cancel button callback
     */
    modalExpertNotice(
        text = "Expert Notice Text message",
        options= [
        { text: "Text-button1", callback: () => console.log("param1") },
        { text: "Text-button2", callback: () => console.log("param2") },
        { text: "Text-button3", callback: () => console.log("param3") },
        { text: "Text-button4", callback: () => console.log("param4") },
        { text: "Text-button5", callback: () => console.log("param5") }
        ],
        callbackOK=() => console.log("OK"),
        callbackCancel=() => console.log("Cancel")
     
    ) {
        // if (typeof text === "string" && text !== "") {
        // this.expertNoticeText = text;
        // this.openExpertNotice = true;
        // } else {
        // this.openExpertNotice = false;
        // }
        const openExpertNotice = true;
        const expertNoticeText = text;


        store.dispatch({
        type: "OPEN_EXPERT_NOTICE",
        payload: openExpertNotice,
        payloadText: expertNoticeText,
        payloadOptions: options,
        payloadOK: callbackOK,
        payloadCancel:callbackCancel
        });
    }
}
