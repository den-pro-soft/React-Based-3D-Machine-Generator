const initialState = {
    openPrice: false,

  };
  
  export default function priceReducer(state = initialState, action) {
    // console.log(state,'confirmReducer')
    switch (action.type) {
      case "OPEN_PRICE":
        return { openPrice: action.payload };
      case "CLOSE_PRICE":
        return { openPrice: action.payload };

      default:
        return state;
    }
  }