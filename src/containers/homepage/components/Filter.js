import React, {Component} from 'react'
import {getDepartments} from '../../../services/api/DepartmentsServices'
import classnames from 'classnames'
import {getFields} from '../../../services/api/FieldsServices'

class Filter extends Component {
    state = {
        selected: 'departments',
        departments: {
            entity: [],
            total: 0,
            params: {
                page: 1,
                limit: 10,
                name: '',
            },
            loading: false,
        },
        fields: {
            entity: [],
            total: 0,
            params: {
                page: 1,
                limit: 10,
                name: '',
            },
            loading: false,
        }
    }

    componentDidMount() {
        this._fetchDepartments()
        this._fetchFields()
    }

    _fetchFields = async () => {
        const {fields} = this.state
        const {params} = fields
        this.setState(({
            fields: {
                ...fields,
                loading: true,
            }
        }))
        const {success, data, message} = await getFields(params)
        if (!success) {
            this.setState({
                fields: {
                    ...fields,
                    loading: false,
                }
            })
            return alert(message)
        }

        this.setState({
            fields: {
                ...fields,
                entity: data.fields,
                total: data.total,
                loading: false,
            }
        })
    }

    _fetchDepartments = async () => {
        const {departments} = this.state
        const {params} = departments
        this.setState({
            departments: {
                ...departments,
                loading: true,
            }
        })
        const {success, data, message} = await getDepartments(params)
        if (!success) {
            this.setState({
                departments: {
                    ...departments,
                    loading: false,
                }
            })
            return alert(message)
        }

        this.setState({
            departments: {
                ...departments,
                entity: data.departments,
                total: data.total,
                loading: false,
            }
        })
    }

    _onChangeSearch = (e) => {
        const {value} = e.target
        const key = this.state.selected
        const field = this.state[key]
        const newField = {
            ...field,
            params: {
                ...field.params,
                name: value
            }
        }

        this.setState({
            [key]: newField
        })
    }

    _selectFilter = (selected) => () => {
        this.setState({
            selected
        })
    }

    _onSubmitSearch = (e) => {
        e.preventDefault()
        const {selected} = this.state
        if (selected === 'departments') return this._fetchDepartments()
        return this._fetchFields()
    }

    render() {
        const {departments, fields, selected} = this.state
        const suggestions = selected === 'departments' ? departments.entity : fields.entity
        const value = selected === 'departments' ? departments.params.name : fields.params.name
        const loading = departments.loading || fields.loading

        return (
            <div>
                <div className="FilterWrapper">
                        <span
                            onClick={this._selectFilter('departments')}
                            className={classnames({'Selected': selected === 'departments'})}>Đơn vị công tác</span>
                    <span
                        onClick={this._selectFilter('fields')}
                        className={classnames({'Selected': selected === 'fields'})}
                    >Lĩnh vực quan tâm</span>
                </div>
                <div className="Filter">
                    <form onSubmit={this._onSubmitSearch}>
                        <input className="FilterInput" placeholder="Tìm kiếm theo tên" value={value}
                               onChange={this._onChangeSearch}/>
                    </form>
                    <div className="Suggestions">
                        <div className="Suggestion">Tất cả</div>
                        {loading ? <div className="Suggestion LoadingWrapper">
                            <div className="spinner-border AppColor" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : suggestions.map((suggestion) => <div className="Suggestion" key={suggestion._id}>
                            {suggestion.name}
                        </div>)}
                    </div>
                    <div className="SubmitWrapper">
                        <button className="Button">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        )
    }
}

Filter.propTypes = {}

export default Filter
