const initialState = {
  openMachineModal: false,
  value: "staright"
};

export default function machineWindowReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MACHINE_MODAL":
      return { openMachineModal: action.payload, value: action.payloadValue  };
    case "CLOSE_MACHINE_MODAL":
      return { openMachineModal: action.payload, value: action.payloadValue };
    default:
      return state;
  }
}
