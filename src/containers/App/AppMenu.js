import React from 'react'
import {ROUTES} from "../../constants/routes";
import {Link} from "react-router-dom";
import settings from "../../settings";

export default () => (
     <div className='dropdown'>
        <button className='btn btn-secondary dropdown-toggle' type="button" id='menu' data-toggle="dropdown">
            Меню
        </button>
        <div className={'dropdown-menu'}>
            <Link className={'dropdown-item'} to={ROUTES.ROOT}>Главная страница</Link>
            {settings.ENABLE_EDITOR && <Link className={'dropdown-item'} to={ROUTES.EDITOR}>Редактор вопросов</Link>}
            <Link className={'dropdown-item'} to={ROUTES.TESTING.REGISTRATION}>Тестирование</Link>
            <Link className={'dropdown-item'} to={ROUTES.OVERVIEW}>Результаты</Link>
        </div>
     </div>
)