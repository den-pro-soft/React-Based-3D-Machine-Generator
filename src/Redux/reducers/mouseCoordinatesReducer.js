const initialState = {
  mouseX: 0,
  mouseY: 0
};

export default function mouseCoordinatesReducer(state = initialState, action) {
  // console.log(state, "mouse-Reducer");

  if (action.type === "UPDATE_MOUSE_COORDINATES") {
    return {
      mouseX: action.payload,
      mouseY: action.payload1
    };
  }

  return state;
}
