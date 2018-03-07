import {PRINT_TO_PDF, WROTE_PDF} from "../constants/pdfPrinter";
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const {BrowserWindow, dialog, shell, ipcMain} = electron.remote

ipcMain.on(PRINT_TO_PDF, function(event) {
    dialog.showSaveDialog({filters: [{name: 'PDF Documents', extensions: ['pdf']}]}, function(fileName) {
        if (fileName === undefined) return;
        const win = BrowserWindow.fromWebContents(event.sender)
        win.webContents.printToPDF({}, function(error, data) {
            if (error) return console.error(error.message)
            fs.writeFile(fileName, data, function(error) {
                if (error) return alert('Ошибка при сохранении файла. \n ' + error.message)
                shell.openExternal('file://' + fileName)
                event.sender.send(WROTE_PDF, fileName)
            })
        })
    })
})
