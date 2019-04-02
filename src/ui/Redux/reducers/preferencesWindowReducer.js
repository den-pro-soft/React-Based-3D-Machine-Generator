const initialState = {
    openPreferencesModal: false,
  };
  
  export default function preferencesWindowReducer(state = initialState, action) {
    switch (action.type) {
      case "OPEN_PREFERENCES_MODAL":
        return { openPreferencesModal: action.payload };
      default:
        return state;
    }
  }