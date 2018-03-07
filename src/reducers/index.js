import {combineReducers} from "redux";
import {apiReducerFactory} from "./apiReducerFactory";
import {testingReducer} from "./testing";
import {pdfPrinterReducer} from "./pdfPrinter";

export default combineReducers({
    questions: apiReducerFactory('question'),
    results: apiReducerFactory('result'),
    testing: testingReducer,
    pdfPrinter: pdfPrinterReducer
})