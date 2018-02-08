const electron = window.require('electron');
const fs = electron.remote.require('fs');

const ENDPOINTS = {
    QUESTIONS: 'data/questions.json',
    PERSONS: 'data/persons.json',
    RESULTS: 'data/results.json',
}

function loadJSONFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
        if(err){
            reject("An error ocurred reading the file :" + err.message);
        }
        resolve(JSON.parse(data))
    })})
}

function saveJSONToFile(fileName, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(content), (err) => {
        if(err){
            reject("An error ocurred writing the file :" + err.message);
        }
        resolve(content)
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
    persons: apiFuncFactory(ENDPOINTS.PERSONS),
    results: apiFuncFactory(ENDPOINTS.RESULTS)
}