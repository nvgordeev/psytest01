import {combineReducers} from "redux";
import {apiReducerFactory} from "./apiReducerFactory";

export default combineReducers({
    questions: apiReducerFactory('question'),
    results: apiReducerFactory('result'),
    persons: apiReducerFactory('person'),
})