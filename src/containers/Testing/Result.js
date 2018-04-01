import React, { Component } from 'react';
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {ROUTES} from "../../constants/routes";
import {loadTMatrix} from "../../actions/testing";
import {SCALES} from '../../constants'
import {saveResults} from "../../actions/result";
import ResultBlock from "../../components/ResultBlock";
import uuidv1 from 'uuid/v1'
import {startPrinting} from "../../actions/pdfPrinter";
import moment from "moment";

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
                datetime: new Date(),
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
        if (this.state.saved) {return}
        this.setState({
            saved: true
        })
        this.props.saveResults({...this.state.result, id: uuidv1()})
    }

    render() {
        const {result, saved} = this.state
        const {print, startPrinting} = this.props
        if (!result) return <div>Обработка данных...</div>
        return (
            <div className="row">
                <div className={'col-10'}>
                    <h2>Результаты тестирования</h2>
                </div>
                <div className={'col-2'}>
                    {!print && <button className={'btn btn-default'} onClick={startPrinting}>Печать</button>}
                </div>
                <ResultBlock result={result} />
                <div className='col-12' style={{marginBottom: "30px"}}>
                    {!print && !saved && <button onClick={this.handleSaveResults} className='btn btn-primary btn-block'>Сохранить результаты</button>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        testing: state.testing,
        print: state.pdfPrinter.print
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTMatrix: () => dispatch(loadTMatrix()),
        saveResults: (data) => dispatch(saveResults(data)),
        startPrinting: () => dispatch(startPrinting())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result))