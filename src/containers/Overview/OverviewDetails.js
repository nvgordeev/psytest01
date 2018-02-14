import React, { Component } from 'react';
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import {loadResults} from "../../actions/result";
import ResultBlock from "../../components/ResultBlock";

class OverviewDetails extends Component {


    componentDidMount() {
        if (this.props.results.length === 0) {
            this.props.loadResults()
        }
    }


    render() {
        const {result} = this.props
        if (!result) {
            return <div>нет данных</div>
        }
        return (
            <div className="row">
                <h2>Результаты тестирования</h2>
                <ResultBlock result={result} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        results: state.results.items,
        result: state.results.items.filter(r => r.id === ownProps.match.params['id'])[0]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadResults: () => dispatch(loadResults()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewDetails))