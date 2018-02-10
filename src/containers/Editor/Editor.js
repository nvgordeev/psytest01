import React, { Component } from 'react';
import {loadQuestions} from "../../actions/question";
import {connect} from "react-redux";
import EditableQuestion from "./EditableQuestion";

class Editor extends Component {

    componentDidMount() {
        this.props.loadQuestions()
    }

    render() {
        const {questions} = this.props
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Редактор</h2>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
                <div className="col-12">
                    {questions.map((q, index) => <EditableQuestion key={index} number={index} item={q}/>)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions.items,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuestions: () => dispatch(loadQuestions()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor)