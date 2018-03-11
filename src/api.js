const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = require('path');
const resourcesPath = !electron.remote.process.env.DEVELOPMENT_MODE && path.join(electron.remote.process.resourcesPath, 'app')

const ENDPOINTS = {
    QUESTIONS: path.join(resourcesPath || '', 'data/questions.json'),
    RESULTS: path.join(electron.remote.app.getPath('userData'), 'results.json'),
    T_MATRIX: path.join(resourcesPath || '', 'data/t-matrix.json')
}

function loadJSONFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if(err){
                return reject("An error ocurred reading the file :" + err.message);
            }
            return resolve(JSON.parse(data))
        }
    )}
    )
}

function saveJSONToFile(fileName, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(content), (err) => {
        if(err){
            return reject("An error ocurred writing the file :" + err.message);
        }
        return resolve(content)
    })})
}

function apiFuncFactory(endpoint) {
    return {
        loadList: () => loadJSONFromFile(endpoint),
        saveList: (content) => saveJSONToFile(endpoint, content),
    }
}

export default {
    questions: apiFuncFactory(ENDPOINTS.QUESTIONS),
    results: apiFuncFactory(ENDPOINTS.RESULTS),
    tMatrix: apiFuncFactory(ENDPOINTS.T_MATRIX)
}