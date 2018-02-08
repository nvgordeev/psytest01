import {apiActionCreator} from "./actionCreator";
import {API_ACTION_STATUS, API_ACTION_TYPE} from "../constants";
import API from '../api'

const OBJECT_NAME = 'question'

export const loadQuestionsAction = () => dispatch => {
        dispatch(apiActionCreator({
            actionType: API_ACTION_TYPE.FETCHING,
            actionStatus: API_ACTION_STATUS.REQUEST,
            objectName: OBJECT_NAME
        }))
        API.questions.loadList().then(
            (data) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.LOAD_LIST,
                    actionStatus: API_ACTION_STATUS.SUCCESS,
                    objectName: OBJECT_NAME,
                    data
                }))
            },
            (error) => {
                dispatch(apiActionCreator({
                    actionType: API_ACTION_TYPE.LOAD_LIST,
                    actionStatus: API_ACTION_STATUS.ERROR,
                    objectName: OBJECT_NAME,
                    data: error
                }))
            }
        )
}