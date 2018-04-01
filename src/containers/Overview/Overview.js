import React, { Component } from 'react';
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import {loadResults} from "../../actions/result";
import Input from "../../components/Input";
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
import moment from "moment";

class Overview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filteredResults: [],
            filterString: ''
        }
    }

    componentDidMount() {
        this.props.loadResults().then((data => this.setState({filteredResults: data})))
    }

    handleFilter = (e) => {
        const filterString = e.target.value
        this.setState({
            filteredResults: this.props.results.filter(r => r.person.fullName.indexOf(filterString) > -1 ),
            filterString
        })
    }

    render() {
        const { filteredResults } = this.state
        return (
            <div className="row">
                <h2>Обзор результатов</h2>
                <div className='col-12'>
                    <Input name={'filter'} value={this.state.filterString} onChange={this.handleFilter} placeholder={'ФИО'} />
                </div>
                <div className='col-12'>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>Дата тестирования</th>
                            <th>ФИО</th>
                            <th>Дата рождения</th>
                            <th>Возраст</th>
                            <th>Пол</th>
                            <th>Общий балл</th>
                            <th>Общий Т-показатель</th>
                            <th>Интерпретация</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map(r => (
                                <tr key={r.id}>
                                    <td>{r.datetime? moment(r.datetime).format('DD.MM.YYYY HH:mm') : 'неизвестно'}</td>
                                    <td><Link to={ROUTES.OVERVIEW + r.id}>{r.person.fullName}</Link></td>
                                    <td>{moment(r.person.birthDate).format('DD.MM.YYYY')}</td>
                                    <td>{r.person.age}</td>
                                    <td>{r.person.gender === 'm'? 'М' : 'Ж'}</td>
                                    <td>{r.total}</td>
                                    <td>{r.totalTIndex || 'не определен'}</td>
                                    <td>{r.totalTIndexInterpretation || 'невозможно интерпретировать'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.results.items.sort((a,b) => new Date(b.datetime) - new Date(a.datetime)),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadResults: () => dispatch(loadResults()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview))