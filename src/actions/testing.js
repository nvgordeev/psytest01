import * as ACTIONS from '../constants/actions'
import API from '../api'


export const startTesting = (person) => dispatch => {
    dispatch({type: ACTIONS.TEST_PROCESS_START, data: {person}})
}

export const acceptAnswer = (scale, answer) => dispatch => {
    dispatch({type: ACTIONS.TEST_PROCESS_ANSWER, data: {scale, answer}})
}

export const loadTMatrix = () => dispatch => {
    dispatch({type: ACTIONS.TEST_PROCESS_LOADING_T_MATRIX_START})
    API.tMatrix.loadList().then(
        (data) => {
                dispatch({type: ACTIONS.TEST_PROCESS_LOADING_T_MATRIX_FINISH, data})
                return Promise.resolve(data)
            },
            (error) => {
                dispatch({type: ACTIONS.TEST_PROCESS_LOADING_T_MATRIX_ERROR, data:error})
                return Promise.reject(error)
            }
    )
}
