const initialState = {
  lengthLine: ""
};

export default function toolsPanelReducer(state = initialState, action) {
//   console.log(state, "toolsPanel-Reducer");

  switch (action.type) {
    case "UPDATE_LENGTH_LINE":
      return {
        lengthLine: action.payload
      };

    default:
      return state;
  }
}
