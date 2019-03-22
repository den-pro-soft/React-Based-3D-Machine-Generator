const initialState = {
    openExpertNotice:false,
    expertNoticeText:'',
    expertParamArr:  [
      { text: "Text-button1", callback: () => console.log("param1") },
      { text: "Text-button2", callback: () => console.log("param2") },
      { text: "Text-button3", callback: () => console.log("param3") },
      { text: "", callback: () => console.log("param4") },
      { text: "", callback: () => console.log("param5")}
      ]
   
  };
  
  export default function expertNoticeReducer(state = initialState, action) {
      switch (action.type) {
        case "OPEN_EXPERT_NOTICE":
          return { openExpertNotice: action.payload, expertNoticeText:action.payloadText,
            expertParamArr: action.payloadParamArr
           };
        default:
          return state;
    }
  }