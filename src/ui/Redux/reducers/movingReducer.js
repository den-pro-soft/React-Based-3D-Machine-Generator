const initialState = {
    moveStep: app.config.moveStep,
  };
  
  export default function movingReducer(state = initialState, action) {
    // console.log(state,'priceReducer')
    switch (action.type) {
      case "UPDATE_MOVE_STEP":
        return { moveStep: action.payload}
   
      default:
        return state;
    }
  }