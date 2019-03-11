const initialState = {
  // openConfirm: false,
  openConfirm: app.config.openConfirm,

  // widthConfirm: 0,
  // heightConfirm: 0
};

export default function confirmationReducer(state = initialState, action) {
  // console.log(state,'confirmReducer')
  switch (action.type) {
    case "OPEN_Confirmation":
    app.config.openConfirm = action.payload;
      return { openConfirm: action.payload };
    case "CLOSE_Confirmation":
    app.config.openConfirm = action.payload;
      return { openConfirm: action.payload };
    // case "GET_WIDTH_CONFIRM":
    //   return { widthConfirm: action.payload };
    // case "GET_HEIGHT_CONFIRM":
    //   return {heightConfirm: action.payload };
    default:
      return state;
  }
}
