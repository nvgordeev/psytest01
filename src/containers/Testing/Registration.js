import React, { Component } from 'react';
import Input from "../../components/Input";
import Select from "../../components/Select";
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";

class Registration extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Регистрация</h2>
                </div>
                <div className="col-12">
                    <form>
                        <Input name='fullName' title='Фамилия, Имя, Отчество'/>
                        <Input name='birthDate' type='date' title='Дата рождения'/>
                        <Select name='gender' title='Пол'>
                            <option value={'m'}>Мужской</option>
                            <option value={'f'}>Женский</option>
                        </Select>
                        <button type="submit" className="btn btn-lg btn-primary">Начать тест</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Registration))