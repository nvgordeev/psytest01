import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './styles/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Система психологического тестирования</h1>
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
