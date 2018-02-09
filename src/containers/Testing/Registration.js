import React, { Component } from 'react';
import Input from "../../components/Input";
import Select from "../../components/Select";
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {startTesting} from "../../actions/testing";
import {ROUTES} from "../../constants/routes";

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    handleFieldChange = (e) => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        })
    }

    handleStart = () => {
        this.props.startTesting(this.state.data)
        this.props.history.push(ROUTES.TESTING.TEST)
    }

    render() {
        const {data} = this.state
        const formValid = data.gender && data.fullName && data.birthDate
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Регистрация</h2>
                </div>
                <div className="col-12">
                    <Input name='fullName' title='Фамилия, Имя, Отчество' onChange={this.handleFieldChange}/>
                    <Input name='birthDate' type='date' title='Дата рождения' onChange={this.handleFieldChange}/>
                    <Select name='gender' title='Пол' onChange={this.handleFieldChange}>
                        <option value={''}>Выберите</option>
                        <option value={'m'}>Мужской</option>
                        <option value={'f'}>Женский</option>
                    </Select>
                    {formValid && <button onClick={this.handleStart} className="btn btn-lg btn-primary">Начать тест</button>}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startTesting: (person) => dispatch(startTesting(person))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Registration))