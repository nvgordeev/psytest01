import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Система психологического тестирования</h1>
        </header>
        <main className="AppBody">
            {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
