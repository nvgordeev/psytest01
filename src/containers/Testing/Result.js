import React, { Component } from 'react';
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {ROUTES} from "../../constants/routes";
import {loadTMatrix} from "../../actions/testing";
import {SCALES} from '../../constants'
import {loadResults, saveResults} from "../../actions/result";
import ResultBlock from "../../components/ResultBlock";
class Result extends Component {


    constructor(props) {
        super(props)
        this.state = {
            result: null,
            ready: false,
            saved: false
        }
    }

    getResult = () => {
        const {person, tMatrix}  = this.props.testing
        const ageRange = this.getAgeRange(person.age)
        const totalTIndex =  ageRange && tMatrix[`total_${person.gender}_${ageRange}`][this.props.testing.total]
        const totalTIndexInterpretation =  totalTIndex && this.getInterpretation(totalTIndex)
        const scalesWithTIndex = SCALES.map(s => {
            const tIndex = ageRange && tMatrix[`scale_${s.name.toLowerCase()}_${person.gender}_${ageRange}`][this.props.testing.scales[s.name]]
            return {
                name: s.name,
                description: s.description,
                extendedDescription: s.extendedDescription,
                value: this.props.testing.scales[s.name],
                tIndex,
                interpretation: tIndex && this.getInterpretation(tIndex)
        }})
        this.setState({
            result: {
                person,
                total: this.props.testing.total,
                totalTIndex,
                totalTIndexInterpretation,
                scalesWithTIndex
            }
        })
    }


    componentDidUpdate() {
        if (!this.state.ready && this.props.testing.person && this.props.testing.tMatrix) {
            this.setState({ready: true}, this.getResult)
        }
    }

    componentWillMount() {
        if (!this.props.testing.person) {
            return this.props.history.push(ROUTES.ROOT)
        }
        this.props.loadTMatrix()
    }

    getAgeRange = (age) => {
        if (age >= 7 && age <=12)
            return '7_12'
        if (age >= 13 && age <=17)
            return '13_17'
        return null
    }

    getInterpretation = (tIndex) => {
        if (tIndex > 70) return 'Очень значительно превышает средний'
        if (tIndex >= 66 && tIndex < 70) return 'Значительно выше среднего'
        if (tIndex >= 61 && tIndex <= 65) return 'Выше среднего'
        if (tIndex >= 56 && tIndex <= 60) return 'Чуть выше среднего'
        if (tIndex >= 45 && tIndex <= 55) return 'Средний'
        if (tIndex >= 40 && tIndex <= 44) return 'Чуть ниже среднего'
        if (tIndex >= 35 && tIndex <= 39) return 'Ниже среднего'
        if (tIndex >= 30 && tIndex <= 34) return 'Много ниже среднего'
        if (tIndex < 30) return 'Значительно ниже среднего'
        return ''
    }

    handleSaveResults = () => {
        this.props.loadResults().then((results) => {
            this.props.saveResults([...results, this.state.result])
        })
    }

    render() {
        const {result, saved} = this.state
        if (!result) return <div>Обработка данных...</div>
        return (
            <div className="row">
                <div className='col-12'>
                    <h2>Результат тестирования</h2>
                </div>
                <ResultBlock result={result} />
                <div className='col-12' style={{marginBottom: "30px"}}>
                    {!saved && <button onClick={this.handleSaveResults} className='btn btn-primary btn-block'>Сохранить результаты</button>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        testing: state.testing,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTMatrix: () => dispatch(loadTMatrix()),
        loadResults: () => dispatch(loadResults()),
        saveResults: (data) => dispatch(saveResults(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result))