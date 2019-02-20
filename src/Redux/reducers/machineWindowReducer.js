const initialState = {
  openTapModal: false
};

export default function machineWindowReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_TAP_MODAL":
      return { openTapModal: action.payload };
    case "CLOSE_TAP_MODAL":
      return { openTapModal: action.payload };
    default:
      return state;
  }
}
