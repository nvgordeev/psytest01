import {apiActionCreator} from "./actionCreator";
import {API_ACTION_STATUS, API_ACTION_TYPE} from "../constants";
import API from '../api'

const OBJECT_NAME = 'question'

export const loadQuestions = () => dispatch => {
        dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.FETCHING,
            actionStatus: API_ACTION_STATUS.REQUEST,
            objectName: OBJECT_NAME
        }))
        return API.questions.loadList().then(
            (data) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.LOAD_LIST,
                    actionStatus: API_ACTION_STATUS.SUCCESS,
                    objectName: OBJECT_NAME,
                    data
                }))
                return Promise.resolve(data)
            },
            (error) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.LOAD_LIST,
                    actionStatus: API_ACTION_STATUS.ERROR,
                    objectName: OBJECT_NAME,
                    data: error
                }))
                return Promise.reject(error)
            }
        )
}

export const saveQuestions = (data) => dispatch => {
        dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.SAVE_LIST,
            actionStatus: API_ACTION_STATUS.REQUEST,
            objectName: OBJECT_NAME
        }))
        return API.questions.saveList(data).then(
            (data) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.SAVE_LIST,
                    actionStatus: API_ACTION_STATUS.SUCCESS,
                    objectName: OBJECT_NAME,
                }))
                return Promise.resolve(data)
            },
            (error) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.SAVE_LIST,
                    actionStatus: API_ACTION_STATUS.ERROR,
                    objectName: OBJECT_NAME,
                    data: error
                }))
                return Promise.reject(error)
            }
        )
}

export const createQuestion = (data) => dispatch => {
    dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.CREATE,
            actionStatus: API_ACTION_STATUS.SUCCESS,
            objectName: OBJECT_NAME,
            data
        }))
}

export const updateQuestion = (data) => dispatch => {
    dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.UPDATE,
            actionStatus: API_ACTION_STATUS.SUCCESS,
            objectName: OBJECT_NAME,
            data
        }))
}

export const deleteQuestion = (data) => dispatch => {
    dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.DELETE,
            actionStatus: API_ACTION_STATUS.SUCCESS,
            objectName: OBJECT_NAME,
            data
        }))
}