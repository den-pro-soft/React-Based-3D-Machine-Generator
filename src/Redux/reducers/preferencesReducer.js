const initialState = {
    demensions: "Millimeters",
  };
  
  export default function preferencesReducer(state = initialState, action){
    app.config.demensions=state.demensions;
console.log(app.config.demensions,'initial');
    if (action.type === "UPDATE_DEMENSIONS") {
      app.config.demensions=action.payload;
      console.log(app.config.demensions,'after action');

      return {
        demensions: action.payload
      };
    }

    return state;
  }