const initialState = {
  lengthLine: "",
  diameter: "",
  radius: "",
  width: "",
  height: "",
  textSize: "",
  z_value:null/* { value: "10.00", label: `10.000 mm` }*/,

};

export default function toolsPanelReducer(state = initialState, action) {
  // console.log(state.diameter2, "toolsPanel-Reducer");

  switch (action.type) {
    case "UPDATE_LENGTH_LINE":
      return {
        lengthLine: action.payload
      };
    case "UPDATE_DIAMETER":
    // console.log(action.payload_D,'diameter-action.payload')
      return {
        diameter: action.payload_D
      };

    case "UPDATE_RADIUS":
      return {
        radius: action.payload
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
      case "UPDATE_Z_VALUE":
      return {
        z_value: action.payload
      };

    default:
      return {...state};
  }
}
