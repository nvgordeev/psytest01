import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './App'
import MainPage from "./containers/MainPage/MainPage";

export default () =>
    <BrowserRouter>
            <App>
                <Route exact path="/" component={MainPage}/>
            </App>
    </BrowserRouter>

