const initialState = {
  demensions: "Millimeters",
  openTapModal:false
};

export default function rootReduser(state = initialState, action) {
  // console.log(state.demensions, action.payload, "action.payload");
  if (action.type === "UPDATE_DEMENSIONS") {
    return {
      demensions: action.payload
    };
  }
  if(action.type==="OPEN_TAP_MODAL"){
    return{openTapModal:action.openTapModal}
  }
  return state;
}
