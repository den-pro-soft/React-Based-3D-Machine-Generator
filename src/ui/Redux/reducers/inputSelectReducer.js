const initialState = {
  
    z_value:''/* { value: "10.00", label: `10.000 mm` }*/,
    indexZ:0
  
  };
  
  export default function inputSelectReducer(state = initialState, action) {
    // console.log(state.diameter2, "toolsPanel-Reducer");
  
    switch (action.type) {
  
      case "UPDATE_Z_VALUE":
        return {
          z_value: action.payload
        };
      case "UPDATE_INDEX_Z":
        return {
          indexZ: action.payload
        };
  
      default:
        return {...state};
    }
  }
  