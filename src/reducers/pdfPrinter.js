import * as ACTION from '../constants/actions'

export function pdfPrinterReducer(state={print: false}, action) {
    const {type} = action
    switch (type) {
        case ACTION.PDF_PRINTER_PRINTING_START:
            return {print: true}
        case ACTION.PDF_PRINTER_PRINTING_FINISH:
            return {print: false}
        default:
            return state
    }
}