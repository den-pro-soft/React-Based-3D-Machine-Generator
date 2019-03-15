const initialState = {
  lengthLine: "",
  diameter: "",
  radius: "",
  width: "",
  height: "",
  textSize: ""
};

export default function toolsPanelReducer(state = initialState, action) {
    console.log(state.diameter, "toolsPanel-Reducer");

  switch (action.type) {
    case "UPDATE_LENGTH_LINE":
      return {
        lengthLine: action.payload
      };
    case "UPDATE_DIAMETER":
      return {
        diameter: (action.payload===undefined)? 0 :  action.payload
      }
 

    case "UPDATE_RADIUS":
      return {
        radius: action.payload
      };
    case "UPDATE_WIDTH":
      return {
        widthGroup: action.payload
      };
    case "UPDATE_WIDTH_HEIGHT":
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
