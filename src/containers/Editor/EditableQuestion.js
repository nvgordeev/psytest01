import React, { Component } from 'react';
import EditableAnswer from "./EditableAnswer";
import uuidv1 from 'uuid/v1'
import Select from "../../components/Select";
import {SCALES} from "../../constants";

class EditableQuestion extends Component {

    handleCreateAnswer = () => {
        this.props.onUpdate({
            ...this.props.item,
            answers: [...this.props.item.answers, {
                id: uuidv1(),
                text: '',
                weight: 0,
                order: this.props.item.answers.length
            }]
        })
    }

    handleUpdateAnswer = (answer) => {
        let answers = this.props.item.answers.slice()
        let changedAnswerIndex = answers.map(a => a.id).indexOf(answer.id)
        if (changedAnswerIndex !== -1) {
            answers[changedAnswerIndex] = answer
        }
        this.props.onUpdate({
            ...this.props.item,
            answers
        })
    }

    handleDeleteAnswer = (answer) => {
        this.props.onUpdate({
            ...this.props.item,
            answers: this.props.item.answers.filter(a => a.id !== answer.id)
        })
    }

    handleChange = (e) => {
        this.props.onUpdate({...this.props.item, [e.target.name]: e.target.value})
    }

    render() {
        const {number, item} = this.props
        return (
            <div className="row" style={{borderBottom: '1px solid #000', marginBottom: '20px', paddingBottom: '20px'}}>
                <div className="col-2">
                    {number + 1}.
                </div>
                <div className="col-10">
                    Шкала:
                    <Select name='scale' value={item.scale} onChange={this.handleChange}>
                        {Object.keys(SCALES).map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Утверждение</th>
                                <th>Балл</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.answers.map(a => <EditableAnswer key={a.id}
                                                                   item={a}
                                                                   onUpdate={this.handleUpdateAnswer}
                                                                   onDelete={this.handleDeleteAnswer} />)}
                        </tbody>
                    </table>
                    <button className='btn btn-success' onClick={this.handleCreateAnswer}>Добавить вариант ответа</button>
                    <button className='btn btn-danger' onClick={this.props.onDelete}>Удалить вопрос</button>
                </div>
            </div>
        )
    }
}

export default EditableQuestion