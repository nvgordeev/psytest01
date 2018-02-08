import * as ACIONS from '../constants/actions'
import {loadQuestions} from "./question";

export const startTesting = (person) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_START, data: {person}})
}

export const acceptAnswer = (questionId, answerId) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_ANSWER, data: {question: {questionId, answerId}}})
}

export const finishTesting = (result) => dispatch => {
    dispatch({type: ACIONS.TEST_PROCESS_FINISH, data: {result}})
}
