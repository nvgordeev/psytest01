import * as ACTION from '../constants/actions'

const initialState = {
    person: null,
    total: 0,
    scales: {},
    tMatrix: null,
    fetching: false,
    errors: null
}

export function testingReducer(state=initialState, action) {
    const {type, data} = action
    switch (type) {
        case ACTION.TEST_PROCESS_START:
            return {...initialState, person: data.person}
        case ACTION.TEST_PROCESS_ANSWER:
            return {...state,
                total: state.total + parseInt(data.answer.weight, 10),
                scales: {...state.scales,
                    [data.scale]: (state.scales[data.scale] || 0) + parseInt(data.answer.weight, 10)
            }}
        case ACTION.TEST_PROCESS_LOADING_T_MATRIX_START:
            return {...state, fetching: true}
        case ACTION.TEST_PROCESS_LOADING_T_MATRIX_ERROR:
            return {...state, fetching: false, errors: data}
        case ACTION.TEST_PROCESS_LOADING_T_MATRIX_FINISH:
            return {...state, fetching: false, tMatrix: data}
        default:
            return state
    }
}