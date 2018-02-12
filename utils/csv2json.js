const fs = require('fs')
const CSV_FILE_NAME = '../data/t-matrix.csv'
const JSON_FILE_NAME = '../data/t-matrix.json'
const DELIMITER = ';'
let sourceArray = []
let result = {}

 fs.readFile(CSV_FILE_NAME, 'utf-8', (err, data) => {
    if(err){
        reject("An error ocurred reading the file :" + err.message);
    }
    sourceArray = data.split('\r\n').map(line => [...line.split(DELIMITER)])
    const titleLine = sourceArray[0]
    sourceArray.slice(1).forEach(line => {
        line.slice(1).forEach((el, index) => {
            if (el.length > 0) {
                result[titleLine[index + 1]] = {...result[titleLine[index + 1]], [el]: line[0]}
            }
        })
    })
    fs.writeFile(JSON_FILE_NAME, JSON.stringify(result), (err) => {
        if(err){
            reject("An error ocurred writing the file :" + err.message);
        }
        console.log(result)
    })
})