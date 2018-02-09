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
                    <p>ФИО: {person.fullName}</p>
                    <p>Дата рождения: {person.birthDate}</p>
                    <p>Пол: {person.gender === 'm'? "мужской" : "женский"}</p>
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