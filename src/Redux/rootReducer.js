const initialState={
    demensions:'Inches'
    // demensions:1

    // demensions:'Millimeters'

}

export default function rootReduser(state = initialState, action) {
    // console.log(action.payload,'action.payload')
    // if(action.type==="UPDATE_DEMENSIONS"){
    //     console.log(state.demensions+2
    //         ,'new state')

        // return {
        //     // demensions: state.demensions?'Millimeters':'Inches'
        //     // demensions: state.demensions + action.payload
        //     // demensions: state.demensions + 2


        // }
    // }
    return state
}