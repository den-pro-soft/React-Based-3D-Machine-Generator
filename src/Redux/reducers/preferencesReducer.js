const initialState = {
  demensions: "Millimeters",
};

export default function preferencesReducer(state = initialState, action) {
  app.config.demensions = state.demensions;
  // console.log(state,'preference Reducer')
  if (action.type === "UPDATE_DEMENSIONS") {
    app.config.demensions = action.payload;
    return {
      demensions: action.payload
    };
  }
  if (action.type === "UPDATE_DEMENSIONS_UpMenu") {
    app.config.demensions = action.payload;
    return {
      demensions: action.payload
    };
  }

  return state;
}
