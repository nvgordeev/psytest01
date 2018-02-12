const uuidv1 = require('uuid/v1')
const fs = require('fs')
const DELIMITER = ';'

const T_MATRIX_CSV_FILE_NAME = '../data/t-matrix.csv'
const QUESTIONS_CSV_FILE_NAME = '../data/questions.csv'
const T_MATRIX_JSON_FILE_NAME = '../data/t-matrix.json'
const QUESTIONS_JSON_FILE_NAME = '../data/questions.json'


function readCsv(csvFileName) {
    return new Promise((resolve, reject) => {
         fs.readFile(csvFileName, 'utf-8', (err, data) => {
             if(err){
                return reject("An error ocurred reading the file :" + err.message);
             }
             return resolve(data.split('\r\n').map(line => [...line.split(DELIMITER)]))
         })
    })
}

function writeJson(jsonFileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(jsonFileName, JSON.stringify(data), (err) => {
            if(err){
                return reject("An error ocurred writing the file :" + err.message);
            }
            resolve()
        })
    })
}

function convert(csvFileName, jsonFileName, processingFunc) {
    readCsv(csvFileName).then(sourceArray => processingFunc(sourceArray)).then(result => writeJson(jsonFileName, result))
}

function convertTMatrix(csvFileName, jsonFileName) {
    convert(csvFileName, jsonFileName, (sourceArray) => {
        let result = {}
        const titleLine = sourceArray[0]
        sourceArray.slice(1).forEach(line => {
            line.slice(1).forEach((el, index) => {
                if (el.length > 0) {
                    result[titleLine[index + 1]] = {...result[titleLine[index + 1]], [el]: line[0]}
                }
            })
        })
        return result
    })
}

function convertQuestions(csvFileName, jsonFileName) {
    convert(csvFileName, jsonFileName, (sourceArray) => {
        let result = []
        let question = {}
        let order
        sourceArray.forEach(line => {
            if (!line[1] && !line[2] && Object.keys(question).length > 0) {
                result.push(question)
            }
            if (line[0] && line[3]) {
                order = 0
                question = {
                    id: uuidv1(),
                    order: line[0],
                    scale: line[3],
                    answers: []
                }
            }
            if (line[1] && line[2]) {
                question.answers.push({
                    id: uuidv1(),
                    text: line[1],
                    weight: line[2],
                    order
                })
                order += 1
            }
        })
        return result
    })
}

convertTMatrix(T_MATRIX_CSV_FILE_NAME, T_MATRIX_JSON_FILE_NAME)
convertQuestions(QUESTIONS_CSV_FILE_NAME, QUESTIONS_JSON_FILE_NAME)

