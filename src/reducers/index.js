import {combineReducers} from "redux";
import {apiReducerFactory} from "./apiReducerFactory";
import {testingReducer} from "./testing";

export default combineReducers({
    questions: apiReducerFactory('question'),
    results: apiReducerFactory('result'),
    persons: apiReducerFactory('person'),
    testing: testingReducer
})