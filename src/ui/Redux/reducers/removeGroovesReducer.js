const initialState = {
    openRemoveGrooves: false
  };
  
  export default function removeGroovesReducer(state = initialState, action) {
    // console.log(state,'priceReducer')
    switch (action.type) {
      case "OPEN_REMOVE_GROOVES":
        return { openRemoveGroovess: action.payload};

   
      default:
        return state;
    }
  }