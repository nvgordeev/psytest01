import * as ACTION from '../constants/actions'

const initialState = {
    person: null,
    total: 0,
    scales: {},
    result: null,
}

export function testingReducer(state=initialState, action) {
    const {type, data} = action
    switch (type) {
        case ACTION.TEST_PROCESS_START:
            return {...initialState, person: data.person}
        case ACTION.TEST_PROCESS_ANSWER:
            console.log(data.answer)
            return {...state,
                total: state.total + data.answer.weight,
                scales: {...state.scales,
                    [data.scale]: (state.scales[data.scale]) || 0 + data.answer.weight
            }}
        case ACTION.TEST_PROCESS_FINISH:
            return {...state, result: data.result}
        default:
            return state
    }
}