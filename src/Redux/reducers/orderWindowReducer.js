const initialState = {
    openOrder: false
  };
  
  export default function orderWindowReducer(state = initialState, action) {
    // console.log(state,'priceReducer')
    switch (action.type) {
  
      case "OPEN_ORDER":
        return { openOrder: action.payload };
      case "CLOSE_ORDER":
        return { openOrder: action.payload};
      default:
        return state;
    }
  }