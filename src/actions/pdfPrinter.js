import * as ACTIONS from "../constants/actions";
import {PRINT_TO_PDF, WROTE_PDF} from "../constants/pdfPrinter";

const ipc = window.require('electron').ipcRenderer

export const startPrinting = () => dispatch => {
    dispatch({type: ACTIONS.PDF_PRINTER_PRINTING_START})
    ipc.send(PRINT_TO_PDF)
    ipc.on(WROTE_PDF, function() {
        dispatch({type: ACTIONS.PDF_PRINTER_PRINTING_FINISH})
    })
}