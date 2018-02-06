import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import App from './App'
import MainPage from "./containers/MainPage/MainPage";
import Registration from "./containers/Testing/Registration";
import Question from "./containers/Testing/Question";
import Result from "./containers/Testing/Result";
import Editor from "./containers/Editor/Editor";
import Overview from "./containers/Overview/Overview";
import { ROUTES } from './constants/routes'

export default () =>
    <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route path={ROUTES.TESTING.REGISTRATION} component={Registration}/>
                    <Route exact path={`${ROUTES.TESTING.QUESTION}:question`} component={Question}/>
                    <Route path={ROUTES.TESTING.RESULT} component={Result}/>
                    <Route path={ROUTES.EDITOR} component={Editor}/>
                    <Route path={ROUTES.OVERVIEW} component={Overview}/>
                </Switch>
            </App>
    </BrowserRouter>

