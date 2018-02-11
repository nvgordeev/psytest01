import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../styles/App.css';
import AppHeader from './AppHeader'
import AppBody from "./AppBody";

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <AppBody>
            {this.props.children}
        </AppBody>
      </div>
    );
  }
}


export default App;
