const initialState = {
  lengthLine: "",
  diameter: "",
  radius:""
};

export default function toolsPanelReducer(state = initialState, action) {
  //   console.log(state, "toolsPanel-Reducer");

  switch (action.type) {
    case "UPDATE_LENGTH_LINE":
      return {
        lengthLine: action.payload
      };
    case "UPDATE_DIAMETER":
      return {
        diameter: action.payload
      };
      case "UPDATE_RADIUS":
      return {
        radius: action.payload
      };

    default:
      return state;
  }
}
