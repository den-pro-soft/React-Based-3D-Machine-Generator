const initialState = {
  openConfirm: modal.openConfirm,
  // openConfirm:true

 
};

export default function confirmationReducer(state = initialState, action) {
  console.log(state,'confirmReducer')
  switch (action.type) {
    case "OPEN_Confirmation":
    modal.openConfirm = action.payload;
      return { openConfirm: action.payload };
    case "CLOSE_Confirmation":
    modal.openConfirm = action.payload;
      return { openConfirm: action.payload };

    default:
      return state;
  }
}
