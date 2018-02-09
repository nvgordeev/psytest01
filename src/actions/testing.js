import * as ACIONS from '../constants/actions'

export const startTesting = (person) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_START, data: {person}})
}

export const acceptAnswer = (scale, answer) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_ANSWER, data: {scale, answer}})
}

export const finishTesting = (result) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_FINISH, data: {result}})
}
