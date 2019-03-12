const initialState = {
  openConfirm: false,

 
};

export default function confirmationReducer(state = initialState, action) {
    console.log(state,'confirmReducer')
    switch (action.type) {
      case "OPEN_CONFIRM":
        return { openConfirm: action.payload };
      // case "CLOSE_Confirmation":
      //   return { openConfirm: action.payload };

      default:
        return state;
  }
}
