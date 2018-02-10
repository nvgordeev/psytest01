import React, { Component } from 'react';
import EditableAnswer from "./EditableAnswer";

class EditableQuestion extends Component {

    render() {
        const {number, item} = this.props
        return (
            <div className="row" style={{borderBottom: '1px solid #000', marginBottom: '20px', paddingBottom: '20px'}}>
                <div className="col-2">
                    {number + 1}.
                </div>
                <div className="col-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Утверждение</th>
                                <th>Балл</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.answers.map((a, index) => <EditableAnswer key={index} item={a}/>)}
                        </tbody>
                    </table>
                    <button className='btn btn-success'>Добавить вариант ответа</button>
                    <button className='btn btn-danger'>Удалить вопрос</button>
                </div>
            </div>
        )
    }
}

export default EditableQuestion