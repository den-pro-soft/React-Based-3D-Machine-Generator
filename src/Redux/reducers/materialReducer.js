// Data can be transferred but not yet in use,
// Data in Summary and Material is transmitted through localSrorage
const initialState = {
    material: 'Material'
  };
  
  export default function materialReducer(state = initialState, action) {
    switch (action.type) {
      case "UPDATE_MATERIAL":
        return { material: action.payload };
    //   case "CLOSE_TAP_MODAL":
    //     return { openTapModal: action.payload };
      default:
        return state;
    }
  }