import React, { Component } from 'react';
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import {loadResults} from "../../actions/result";

class Overview extends Component {

    componentDidMount() {
        console.log('yaaa')
        this.props.loadResults()
    }

    render() {
        const { results } = this.props
        return (
            <div className="row">
                <h2>Обзор результатов</h2>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Дата рождения</th>
                        <th>Возраст</th>
                        <th>Пол</th>
                        <th>Общий балл</th>
                        <th>Общий Т-показатель</th>
                        <th>Интерпретация</th>
                    </tr>
                    </thead>
                    <tbody>
                        {results.map(r => (
                            <tr>
                                <td>{r.person.fullName}</td>
                                <td>{r.person.birthDate}</td>
                                <td>{r.person.age}</td>
                                <td>{r.person.gender === 'm'? 'М' : 'Ж'}</td>
                                <td>{r.total}</td>
                                <td>{r.totalTIndex || 'не определен'}</td>
                                <td>{r.totalTIndexInterpretation || 'невозможно интерпретировать'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.results.items,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadResults: () => dispatch(loadResults()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview))