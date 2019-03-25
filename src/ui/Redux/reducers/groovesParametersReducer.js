const initialState = {
    topDepth:0,
    width:0,
    horisontalDepth:0
  };
  
  export default function groovesParametersReducer(state = initialState, action) {
    // console.log(state,'priceReducer')
    switch (action.type) {
  
      case "UPDATE_GROOVES_DATA":
        return { 
          topDepth: action.payloadTopDepth,
          width: action.payloadWidth,
          horisontalDepth: action.payloadHorisontalDepth
        };
   
      default:
        return state;
    }
  }