import React, { Component } from 'react';
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {ROUTES} from "../../constants/routes";

class Result extends Component {

    componentWillMount() {
        if (!this.props.testing.person) {
            this.props.history.push(ROUTES.ROOT)
        }
    }

    render() {
        console.log(this.props.testing)
        const {person} = this.props.testing
        if (!person) return <div>нет данных</div>
        return (
            <div className="row">
                <div className='col-12'>
                    <h2>Результат тестирования</h2>
                </div>
                <div className='col-12'>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>ФИО: </td>
                                <td>{person.fullName}</td>
                            </tr>
                            <tr>
                                <td>Дата рождения: </td>
                                <td>{person.birthDate}</td>
                            </tr>
                            <tr>
                                <td>Пол: </td>
                                <td>{person.gender === 'm'? "мужской" : "женский"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12'>
                    <p><strong>Общий балл: {this.props.testing.total}</strong></p>
                    <p><strong>Данные по шкалам</strong></p>
                    {Object.keys(this.props.testing.scales).map(k => <p key={k}>
                        Шкала {k}: {this.props.testing.scales[k]}
                    </p>)}
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

export default withRouter(connect(mapStateToProps)(Result))