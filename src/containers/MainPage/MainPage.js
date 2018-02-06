import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {ROUTES} from "../../constants/routes";

class MainPage extends Component {

    render() {
        return (
            <div className="row controlPanel">
                <div className="col-sm-12">
                    <Link to={ROUTES.TESTING.REGISTRATION}>
                        <button type="button" className="btn btn-success">Новое тестирование</button>
                    </Link>
                </div>
                <div className="col-sm-12">
                    <Link to={ROUTES.OVERVIEW}>
                        <button type="button" className="btn btn-primary">Результаты</button>
                    </Link>
                </div>
                <div className="col-sm-12">
                    <Link to={ROUTES.EDITOR}>
                        <button type="button" className="btn btn-warning">Редактор вопросов</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MainPage