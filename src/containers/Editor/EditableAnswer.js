import React, { Component } from 'react';
import Input from "../../components/Input";

class EditableAnswer extends Component {

    render() {
        const {item} = this.props
        return (
            <tr>
                <td>
                    <Input name='text' value={item.text}/>
                </td>
                <td>
                    <Input name='weight' value={item.weight}/>
                </td>
                <td>
                    <button className='btn btn-danger'>Удалить</button>
                </td>
            </tr>
        )
    }
}

export default EditableAnswer