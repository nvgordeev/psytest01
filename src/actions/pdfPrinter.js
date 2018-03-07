import * as ACTIONS from "../constants/actions";
import {CANCEL_WRITING, PRINT_TO_PDF, WROTE_PDF} from "../constants/pdfPrinter";

const ipc = window.require('electron').ipcRenderer

export const startPrinting = () => dispatch => {
    dispatch({type: ACTIONS.PDF_PRINTER_PRINTING_START})
    ipc.send(PRINT_TO_PDF)
    ipc.on(CANCEL_WRITING, () =>  dispatch({type: ACTIONS.PDF_PRINTER_PRINTING_FINISH}))
    ipc.on(WROTE_PDF, () =>  dispatch({type: ACTIONS.PDF_PRINTER_PRINTING_FINISH}))
}