import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './styles/App.css';
import Link from "react-router-dom/es/Link";
import {ROUTES} from "./constants/routes";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Опросник детской депрессии по методике М. Ковач</h1>
            <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type="button" id='menu' data-toggle="dropdown">
                    Меню
                </button>
                <div className={'dropdown-menu'}>
                    <Link className={'dropdown-item'} to={ROUTES.ROOT}>Главная страница</Link>
                    <Link className={'dropdown-item'} to={ROUTES.EDITOR}>Редактор вопросов</Link>
                    <Link className={'dropdown-item'} to={ROUTES.TESTING.REGISTRATION}>Тестирование</Link>
                    <Link className={'dropdown-item'} to={ROUTES.OVERVIEW}>Результаты</Link>
                </div>
            </div>
        </header>
        <main className="AppBody">
            <div className="container">
                {this.props.children}
            </div>
        </main>
      </div>
    );
  }
}

export default App;
