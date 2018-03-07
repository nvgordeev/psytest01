import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../styles/App.css';
import AppHeader from './AppHeader'
import AppBody from "./AppBody";
import connect from "react-redux/es/connect/connect";
import withRouter from "react-router-dom/es/withRouter";

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppHeader showMenu={!this.props.print}/>
        <AppBody>
            {this.props.children}
        </AppBody>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        print: state.pdfPrinter.print
    }
}

export default withRouter(connect(mapStateToProps)(App));
