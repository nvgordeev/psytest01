import * as ACIONS from '../constants/actions'

export const startTesting = (personId) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_START, data: {personId}})
}

export const acceptAnswer = (questionId, answerId) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_ANSWER, data: {question: {questionId, answerId}}})
}

export const finishTesting = (result) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_FINISH, data: {result}})
}
