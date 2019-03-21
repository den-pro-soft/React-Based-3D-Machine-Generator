import { Injectable } from "container-ioc";

@Injectable()
export default class ModalWindows {
        constructor() {
            this.okCallBack = null;
            this.noCallBack = null;
            this.infoText =
            "Sorry, this feature will be realised in the next versions.";

            this.openExpertNotice = null;
            this.expertNoticeText = null;

            this.radioButton1 = null;
            this.radioButton2 = null;
            this.radioButton3 = null;
            this.radioButton4 = null;
            this.radioButton5 = null;
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

        modalExpertNotice = (
            text = "Expert Notice Text message",
            paramArr = [
            { text: "Text-button1", callback: () => console.log("param1") },
            { text: "Text-button2", callback: () => console.log("param2") },
            { text: "Text-button3", callback: () => console.log("param3") },
            { text: "", callback: () => console.log("param4") },
            { text: "", callback: null}
            ]
        ) => {
            if (typeof text === "string"&&text!=='') {
            this.expertNoticeText = text;
            this.openExpertNotice = true;
            } else {
            this.openExpertNotice = false;
            }
            const labels = [];
            const callbacks = [];
            paramArr.forEach((el, i) => {
            labels.push(el.text);
            const [label1, label2, label3, label4, label5] = labels;
            if (label1 === "" || label1 === undefined || label1 === null) {
                this.openExpertNotice = false;
            }
            store.dispatch({
                type: "OPEN_EXPERT_NOTICE",
                payload: this.openExpertNotice,
                payloadText: this.expertNoticeText,
                payloadLabel1: label1,
                payloadLabel2: label2,
                payloadLabel3: label3,
                payloadLabel4: label4,
                payloadLabel5: label5
            });
            callbacks.push(el.callback);
            const [radioCallBack1, radioCallBack2, radioCallBack3, radioCallBack4, radioCallBack5] = callbacks;

            if (typeof el.callback === "function") {
                this.handleRadioButton1 = radioCallBack1;
                this.handleRadioButton2 = radioCallBack2;
                this.handleRadioButton3 = radioCallBack3;
                this.handleRadioButton4 = radioCallBack4;
                this.handleRadioButton5 = radioCallBack5;
            } else {
                this.radioButton1 = null;
                this.radioButton2 = null;
                this.radioButton3 = null;
                this.radioButton4 = null;
                this.radioButton5 = null;
            }
            });
        }

        handleRadioButton1 = () => {
            this.radioCallBack1();
            console.log("radioCallBack1");
        };
        handleRadioButton2 = () => {
            this.radioCallBack2();
            console.log("radioCallBack2");
        };
        handleRadioButton3 = () => {
            this.radioCallBack3();
            console.log("radioCallBack3");
        };
        handleRadioButton4 = () => {
            this.radioCallBack4();
            console.log("radioCallBack4");
        };
        handleRadioButton5 = () => {
            this.radioCallBack5();
            console.log("radioCallBack5");
        };
        }
