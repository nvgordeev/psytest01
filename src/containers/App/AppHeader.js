import React from 'react'
import AppMenu from './AppMenu'

export default ({showMenu}) => (
    <header className="App-header">
        <h1 className="App-title">Опросник детской депрессии по методике М. Ковач</h1>
        {showMenu && <AppMenu />}
    </header>
)