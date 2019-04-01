const initialState = {
    diameter: "", 
  };
  
  export default function diameterToolsReducer(state = initialState, action) {
    // console.log(state.diameter2, "toolsPanel-Reducer");
  
    switch (action.type) {
  
      case "UPDATE_DIAMETER":
      // console.log(action.payload_D,'diameter-action.payload')
        return {
          diameter: action.payload_D
        };
      default:
        return {...state};
    }
  }
  