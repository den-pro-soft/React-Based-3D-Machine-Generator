const initialState = {
  demensions: "Millimeters",
};

export default function preferencesReducer(state = initialState, action) {
  // console.log(state,'preference Reducer')
  if (action.type === "UPDATE_DEMENSIONS") {
    app.config.demensions = state.demensions;
    app.config.demensions = action.payload;
    return {
      demensions: action.payload
    };
  }
  if (action.type === "UPDATE_DEMENSIONS_UpMenu") {
    app.config.demensions = state.demensions;
    app.config.demensions = action.payload;
    return {
      demensions: action.payload
    };
  }

  return state;
}
