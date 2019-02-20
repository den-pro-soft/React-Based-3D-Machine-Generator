const initialState = {
  firstName: "",
//   lastName: "",
//   businessName: "",
//   email: "",
//   order: "Standard Order"
};

export default function summaryReducer(state = initialState, action) {
  switch (action.type) {
    case "FIRST_NAME":
      return { firstName: action.payload };
    case "LAST_NAME":
      return { lastName: action.payload };
    //   case "CLOSE_TAP_MODAL":
    //     return { openTapModal: action.payload };
    default:
      return state;
  }
}
