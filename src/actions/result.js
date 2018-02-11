import {apiActionCreator} from "./actionCreator";
import {API_ACTION_STATUS, API_ACTION_TYPE} from "../constants";
import API from '../api'

const OBJECT_NAME = 'result'

export const loadResults = () => dispatch => {
        dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.LOAD_LIST,
            actionStatus: API_ACTION_STATUS.REQUEST,
            objectName: OBJECT_NAME
        }))
        return API.results.loadList().then(
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

export const saveResults = (data) => dispatch => {
        dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.SAVE_LIST,
            actionStatus: API_ACTION_STATUS.REQUEST,
            objectName: OBJECT_NAME
        }))
        return API.results.saveList(data).then(
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

export const createResult = (data) => dispatch => {
    dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.CREATE,
            actionStatus: API_ACTION_STATUS.SUCCESS,
            objectName: OBJECT_NAME,
            data
        }))
}
