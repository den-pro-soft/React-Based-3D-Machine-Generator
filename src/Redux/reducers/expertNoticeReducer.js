const initialState = {
    openExpertNotice:false,
    // infoText:'Sorry, this feature will be realised in the next versions '
    expertNoticeText:'',
    label1:'',
    label2:'',
    label3:'',
    label4:'',
    label5:'',


   
  };
  
  export default function expertNoticeReducer(state = initialState, action) {
      switch (action.type) {
        case "OPEN_EXPERT_NOTICE":
          return { openExpertNotice: action.payload, expertNoticeText:action.payloadText,
            label1:action.payloadLabel1,
            label2:action.payloadLabel2,
            label3:action.payloadLabel3,
            label4:action.payloadLabel4,
            label5:action.payloadLabel5 };
        default:
          return state;
    }
  }