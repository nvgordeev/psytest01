import * as ACTION from '../constants/actions'

const initialState = {
    personId: null,
    questions: [],
    result: null,
}

export function testingReducer(state=initialState, action) {
    const {type, data} = action
    switch (type) {
        case ACTION.TEST_PROCESS_START:
            return {...initialState, personId: data.personId}
        case ACTION.TEST_PROCESS_ANSWER:
            return {...state, questions: [...state.questions, data.question]}
        case ACTION.TEST_PROCESS_FINISH:
            return {...state, result: data.result}
        default:
            return state
    }
}