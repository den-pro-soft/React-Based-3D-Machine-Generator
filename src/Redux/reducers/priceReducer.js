const initialState = {
  openPrice: false,
  openOrder: false
};

export default function priceReducer(state = initialState, action) {
  // console.log(state,'priceReducer')
  switch (action.type) {
    case "OPEN_PRICE":
      return { openPrice: action.payload,openOrder: !action.payload };
    case "CLOSE_PRICE":
      return { openPrice: action.payload,openOrder: action.payload };
    case "OPEN_ORDER":
      return { openOrder: action.payload, openPrice: !action.payload };
      //working case
    // case "OPEN_ORDER":
    //   return { openOrder: action.payload };
    case "CLOSE_ORDER":
      return { openOrder: action.payload,  openPrice: action.payload};
    default:
      return state;
  }
}
