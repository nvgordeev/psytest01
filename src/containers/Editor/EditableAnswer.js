import React, { Component } from 'react';
import Input from "../../components/Input";

class EditableAnswer extends Component {

    handleChange = (e) => {
        this.props.onUpdate({...this.props.item, [e.target.name]: e.target.value})
    }

    render() {
        const {item} = this.props
        return (
            <tr>
                <td>
                    <Input name='text' value={item.text} onChange={this.handleChange}/>
                </td>
                <td>
                    <Input name='weight' value={item.weight} onChange={this.handleChange}/>
                </td>
                <td>
                    <button className='btn btn-danger' onClick={() => this.props.onDelete(item)}>Удалить</button>
                </td>
            </tr>
        )
    }
}

export default EditableAnswer