const initialState = {
  lengthLine: "",
  diameter: "",
  diameter2: "",

  radius: "",
  width: "",
  height: "",
  textSize: ""
};

export default function toolsPanelReducer(state = initialState, action) {
  // console.log(state.diameter2, "toolsPanel-Reducer");

  switch (action.type) {
    case "UPDATE_LENGTH_LINE":
      return {
        lengthLine: action.payload
      };
    case "UPDATE_DIAMETER":
    console.log(action.payload,'action.payload')
      return {
        diameter: action.payload
      };

    case "UPDATE_RADIUS":
      return {
        radius: action.payload
      };

    case "UPDATE_WIDTH_HEIGHT":
    console.log(action.payload_W,action.payload_H,'WH-action.payload')

      return {
        width: action.payload_W,
        height: action.payload_H
      };
    case "UPDATE_TEXT_SIZE":
      return {
        textSize: action.payload
      };

    default:
      return state;
  }
}
