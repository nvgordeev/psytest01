import React, { Component } from 'react';
import {connect} from 'react-redux'
import withRouter from "react-router-dom/es/withRouter";
import {ROUTES} from "../../../constants/routes";
import {loadQuestions} from "../../../actions/question";
import Question from "./Question";
import {acceptAnswer} from "../../../actions/testing";

class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questionNumber: 0
        }
    }

    componentWillMount() {
        if (!this.props.person) {
            this.props.history.push(ROUTES.ROOT)
        }
    }

    componentDidMount() {
        this.props.loadQuestions()
    }

    handleAnswer = (answer) => {
        const question = this.props.questions.items[this.state.questionNumber]
        this.props.acceptAnswer(question.scale, answer)
        if (this.state.questionNumber === this.props.questions.items.length - 1) {
            this.props.history.push(ROUTES.TESTING.RESULT)
        } else {
            this.setState({
                questionNumber: this.state.questionNumber + 1
            })
        }
    }

    render() {
        const {questions} = this.props
        const question = questions.items[this.state.questionNumber]
        if (!question) return <div>Загрузка</div>
        return (
            <div>
                <div className='row'>
                    <div className='col-12' style={{marginBottom: "30px"}}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: parseInt(question.order, 10) / questions.items.length * 100 + '%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                {question.order}/{questions.items.length}
                            </div>
                        </div>
                    </div>
                </div>
                <Question item={question} onAnswer={this.handleAnswer}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        person: state.testing.person
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuestions: () => dispatch(loadQuestions()),
        acceptAnswer: (scale, answer) => dispatch(acceptAnswer(scale, answer))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test))