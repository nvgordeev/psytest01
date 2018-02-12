import React, { Component } from 'react';
import {createQuestion, deleteQuestion, loadQuestions, saveQuestions, updateQuestion} from "../../actions/question";
import {connect} from "react-redux";
import EditableQuestion from "./EditableQuestion";
import uuidv1 from 'uuid/v1'
import {SCALES} from "../../constants";
import settings from "../../settings";

class Editor extends Component {

    componentDidMount() {
        this.props.loadQuestions()
    }

    handleCreate = () => {
        if (!settings.EDITOR_READ_ONLY_MODE) {
            this.props.createQuestion({
                id: uuidv1(),
                scale: SCALES.A,
                order: this.props.questions.length,
                answers: [
                    {
                        id: uuidv1(),
                        text: 'Введите утверждение',
                        weight: 0
                    }
                ]
            })
        } else {
            alert('Редактор находится в режиме чтения')
        }

    }

    handleSave = () => {
        if (!settings.EDITOR_READ_ONLY_MODE) {
            this.props.saveQuestions(this.props.questions)
        } else {
            alert('Редактор находится в режиме чтения')
        }
    }

    render() {
        const {questions, saved} = this.props
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Редактор</h2>
                </div>
                <div className="col-12">
                    {!settings.EDITOR_READ_ONLY_MODE && !saved && <button onClick={this.handleSave} className="btn btn-primary">Сохранить</button>}
                    <button onClick={this.handleCreate} className="btn btn-primary">Добавить вопрос</button>
                </div>
                <div className="col-12">
                    {questions.map((q, index) => <EditableQuestion
                        key={q.id}
                        number={index}
                        item={q}
                        onDelete={() => this.props.deleteQuestion(q)}
                        onUpdate={this.props.updateQuestion}
                    />)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions.items,
        saved: state.questions.saved
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuestions: () => dispatch(loadQuestions()),
        saveQuestions: (data) => dispatch(saveQuestions(data)),
        createQuestion: (data) => dispatch(createQuestion(data)),
        updateQuestion: (data) => dispatch(updateQuestion(data)),
        deleteQuestion: (data) => dispatch(deleteQuestion(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor)