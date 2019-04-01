const initialState = {
  openMachineModal: false,
  value: "staright",
  // isCheckedStockMaterial:false
};

export default function machineWindowReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MACHINE_MODAL":
      return { openMachineModal: action.payload, value: action.payloadValue
       /*isCheckedStockMaterial:action.payloadIsChecked */};
    case "CLOSE_MACHINE_MODAL":
      return { openMachineModal: action.payload, value: action.payloadValue 
        /* isCheckedStockMaterial:action.payloadIsChecked*/};
    default:
      return state;
  }
}
