const initialState = {
  // openConfirm: false,
  openConfirm: app.config.openConfirm,

  width: 0,
  height: 0
};

export default function confirmationReducer(state = initialState, action) {
  console.log(state,'confirmReducer')
  switch (action.type) {
    case "OPEN_Confirmation":
      return { openConfirm: action.payload };
    case "CLOSE_Confirmation":
      return { openConfirm: action.payload };
    case "GET_WIDTH":
      return { width: action.payload };
    case "GET_HEIGHT":
      return { width: action.payload };
    default:
      return state;
  }
}
