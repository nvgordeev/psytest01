import React, { Component } from 'react';
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import {loadResults} from "../../actions/result";
import ResultBlock from "../../components/ResultBlock";
import {startPrinting} from "../../actions/pdfPrinter";
import '../../utils/printToPdf'

class OverviewDetails extends Component {


    componentDidMount() {
        if (this.props.results.length === 0) {
            this.props.loadResults()
        }
    }


    render() {
        const {result, print, startPrinting} = this.props
        if (!result) {
            return <div>нет данных</div>
        }
        return (
            <div className="row">
                <div className={'col-10'}>
                    <h2>Результаты тестирования</h2>
                </div>
                <div className={'col-2'}>
                    {!print && <button className={'btn btn-default'} onClick={startPrinting}>Печать</button>}
                </div>
                <ResultBlock result={result} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        results: state.results.items,
        result: state.results.items.filter(r => r.id === ownProps.match.params['id'])[0],
        print: state.pdfPrinter.print
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadResults: () => dispatch(loadResults()),
        startPrinting: () => dispatch(startPrinting())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewDetails))