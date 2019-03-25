const initialState = {
  openMachineModal: false
};

export default function machineWindowReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MACHINE_MODAL":
      return { openMachineModal: action.payload };
    case "CLOSE_MACHINE_MODAL":
      return { openMachineModal: action.payload };
    default:
      return state;
  }
}
