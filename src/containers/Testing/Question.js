import React, { Component } from 'react';
import {connect} from 'react-redux'
import withRouter from "react-router-dom/es/withRouter";
import {ROUTES} from "../../constants/routes";
import {loadQuestions} from "../../actions/question";

class Question extends Component {

    componentWillMount() {
        if (!this.props.person) {
            this.props.history.push(ROUTES.ROOT)
        }
    }

    componentDidMount() {
        if (this.props.questions.items.length === 0 && !this.props.questions.fetching) {
            this.props.loadQuestions()
        }
    }

    render() {
        const {question} = this.props
        if (!question) return <div>Загрузка</div>
        return (
            <div className="row">
                <div className='col-12'>
                    <h2>{question.text}</h2>
                </div>
                <div className='col-12'>
                    {question.answers.map(a => <button data-toggle="button" className='btn btn-lg btn-block btn-primary'>{a.text}</button>)}
                </div>
                <div className='col-12'>
                    <button className='btn btn-lg btn-success'>Ответить</button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const questionOrder = parseInt(ownProps.match.params.question, 10)
    return {
        questions: state.questions,
        person: state.testing.person,
        question: state.questions.items.filter(q => q.order === questionOrder)[0]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuestions: () => dispatch(loadQuestions())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question))