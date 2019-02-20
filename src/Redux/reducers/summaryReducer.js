const initialState = {
  firstName: "",
    lastName: "",
  //   businessName: "",
  //   email: "",
  order: "Standard Order"
};

export default function summaryReducer(state = initialState, action) {
  console.log(action.payload,action.payload1,'action')
  if(action.type==='FIRST_NAME'){
    return { firstName: action.payload };
  }
  if(action.type==='LAST_NAME'){
    return { lastName: action.payload1 };
  }
  if(action.type==="ORDER"){
    return { order: action.payload };
  }
  // switch (action.type) {
  //   case "FIRST_NAME":
  //     return { firstName: action.payload };
  //   case "LAST_NAME":
  //     return { lastName: action.payload };
  //   case "ORDER":
  //     return { order: action.payload };
  //   //   case "CLOSE_TAP_MODAL":
  //   //     return { openTapModal: action.payload };
  //   default:
      return state;
  }
// }
