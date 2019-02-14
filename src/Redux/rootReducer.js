const initialState = {
  demensions: "Inches"
};

export default function rootReduser(state = initialState, action) {
  // console.log(state.demensions, action.payload, "action.payload");
  if (action.type === "UPDATE_DEMENSIONS") {
    return {
      demensions: action.payload
    };
  }
  return state;
}
