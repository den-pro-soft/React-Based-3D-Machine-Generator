const initialState = {
    openNonWorkFeature:false
   
  };
  
  export default function nonWorkFeatureReducer(state = initialState, action) {
      switch (action.type) {
        case "OPEN_NON_WORK_FEATURE":
          return { openNonWorkFeature: action.payload };
        default:
          return state;
    }
  }