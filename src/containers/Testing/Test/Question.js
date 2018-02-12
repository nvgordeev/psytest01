import React, { Component } from 'react';


class Question extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedAnswer: null
        }
    }

    handleSelect = (answer) => {
        this.setState({
            selectedAnswer: answer
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item.id !== this.props.item.id) {
            this.setState({
                selectedAnswer: null
            })
        }
    }

    render() {
        const {item, onAnswer} = this.props
        const {selectedAnswer} = this.state
        return (
            <div className="row">
                <div className='col-12' style={{marginBottom: "30px"}}>
                    <h2>Выберите верное утверждение</h2>
                </div>
                <div className='col-12'>
                    {item.answers.map(a => (
                        <button
                            key={a.id}
                            data-toggle="button"
                            className={`btn btn-lg btn-block ${selectedAnswer && a.id === selectedAnswer.id? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => this.handleSelect(a)}
                        >
                            {a.text}
                        </button>
                    ))}
                </div>
                <div className='col-12' style={{marginTop: "30px"}}>
                    {selectedAnswer && <button className='btn btn-lg btn-block btn-success' onClick={() => onAnswer(selectedAnswer)}>Ответить</button>}
                </div>

            </div>
        )
    }
}

export default Question