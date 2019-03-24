const initialState = {
    openSummary: false,
  };
  
  export default function summaryWindowReducer(state = initialState, action) {
    // console.log(state,'summaryReducer')
    switch (action.type) {
      case "OPEN_SUMMARY_WINDOW":
        return { openSummary: action.payload };
      case "CLOSE_SUMMARY_WINDOW":
        return { openSummary: action.payload};
    
      default:
        return state;
    }
  }