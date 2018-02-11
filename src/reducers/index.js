import {combineReducers} from "redux";
import {apiReducerFactory} from "./apiReducerFactory";
import {testingReducer} from "./testing";

export default combineReducers({
    questions: apiReducerFactory('question'),
    results: apiReducerFactory('result'),
    testing: testingReducer
})