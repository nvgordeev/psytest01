import React, { Component } from 'react';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../styles/App.css';
import AppHeader from './AppHeader'
import AppBody from "./AppBody";
import {loadResults} from "../../actions/result";

class App extends Component {

    componentDidMount() {
        this.props.loadResults()
    }

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

function mapDispatchToProps(dispatch) {
    return {
        loadResults: () => dispatch(loadResults())
    }
}

export default connect(null, mapDispatchToProps)(App);
