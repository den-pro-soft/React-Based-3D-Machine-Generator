const initialState = {
    demensions: "Millimeters"
  };
  
  export default function preferencesReducer(state = initialState, action){
    if (action.type === "UPDATE_DEMENSIONS") {
      return {
        demensions: action.payload
      };
    }

    return state;
  }