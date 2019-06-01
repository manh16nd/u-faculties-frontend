import React, { Component } from 'react'
import { getTeachers } from '../../../services/api/TeachersServices'
import TeachersTable from './TeachersTable'
import DepartmentsTable from './DepartmentsTable'
import FieldsTable from './FieldsTable'
import Filter from './Filter'
import { getDepartments } from '../../../services/api/DepartmentsServices'
import { getAllFields } from '../../../services/api/FieldsServices'

class HomePage extends Component {
    state = {
        teachers: {
            entity: [],
            total: 0,
            params: {
                page: 1,
                limit: 10,
                name: '',
            },
        },
        departments: {
            entity: [],
            total: 0,
            params: {
                page: 1,
                limit: 10,
                name: '',
            },
        },
        fields: {
            entity: [],
            total: 0,
            params: {
                page: 1,
                limit: 10,
                name: '',
            },
        },
        loading: {
            fetchTeachers: false,
            fetchDepartments: false,
            fetchFields: false,
        }
    }

    componentDidMount() {
        this._fetchTeachers()
        this._fetchDepartments()
        this._fetchFields()
    }

    _fetchTeachers = async () => {
        const { params } = this.state.teachers
        this.setState({
            loading: {
                fetchTeachers: true,
            }
        })

        const { success, data, message } = await getTeachers(params)

        const teachersEntity = data ? {
            entity: data.teachers,
            total: data.total,
        } : {}
        this.setState(({ teachers, loading }) => ({
            loading: {
                ...loading,
                fetchTeachers: false,
            },
            teachers: {
                ...teachers,
                ...teachersEntity,
            }
        }))

        if (!success) return alert(message)
    }

    _fetchDepartments = async () => {
        const { params } = this.state.departments
        this.setState({
            loading: {
                fetchDepartments: true,
            }
        });

        const { success, data, message } = await getDepartments(params)

        const departmentsEntity = data ? {
            entity: data.departments,
            total: data.total,
        } : {}
        this.setState(({ departments, loading }) => ({
            loading: {
                ...loading,
                fetchDepartments: false,
            },
            departments: {
                ...departments,
                ...departmentsEntity,
            },
        }))

        if (!success) return alert(message)
    }

    _fetchFields = async () => {
        const { params } = this.state.fields
        this.setState({
            loading: {
                fetchFields: true,
            }
        });

        const { success, data, message } = await getAllFields(params)

        const fieldsEntity = data ? {
            entity: data.fields,
            total: data.total,
        } : {}
        this.setState(({ fields, loading }) => ({
            loading: {
                ...loading,
                fetchFields: false,
            },
            fields: {
                ...fields,
                ...fieldsEntity,
            },
        }), () => {
            console.log(this.state.fields)
        })

        if (!success) return alert(message)
    }

    _onChangeFilterName = (e) => {
        const { value } = e.target
        this.setState(({ teachers }) => ({
            teachers: {
                ...teachers,
                params: {
                    ...teachers.params,
                    name: value,
                }
            },
        }))
    }

    select = (key, value) => {
        this.setState(({ teachers }) => ({
            teachers: {
                ...teachers,
                params: {
                    ...teachers.params,
                    [key]: value,
                }
            },
        }), () => this._fetchTeachers())
    }

    _onChangeFilterNameDepartment = (e) => {
        const { value } = e.target
        this.setState(({ departments }) => ({
            departments: {
                ...departments,
                params: {
                    ...departments.params,
                    name: value,
                }
            }
        }))
    }

    _onChangeFilterNameField = (e) => {
        const { value } = e.target
        this.setState(({ fields }) => ({
            fields: {
                ...fields,
                params: {
                    ...fields.params,
                    name: value,
                }
            }
        }))
    }

    _submitFilter = (e) => {
        e.preventDefault()
        this._fetchTeachers()
        this._fetchDepartments()
        this._fetchFields()
    }

    render() {
        const { teachers, departments, fields } = this.state

        return (
            <div className="HomePage">
                <div className="Greeting">
                    <div className="TitleGreeting">
                        Hệ thống thông tin giảng viên - uFaculties
                    </div>
                </div>

                <div className="row">
                    <div className='col-8 LeftWrapper'>
                        <div className="TopTable">
                            <p>Tổng cộng có: {teachers.total} giảng viên</p>
                            <form onSubmit={this._submitFilter}>
                                <input
                                    value={teachers.params.name}
                                    onChange={this._onChangeFilterName}
                                    placeholder="Tìm kiếm giảng viên theo tên"
                                />
                            </form>
                        </div>
                        <div className="TableWrapper">
                            <TeachersTable
                                teachers={teachers}
                            />
                        </div>
                    </div>

                    <div className="col-4 RightWrapper">
                        <Filter
                            select={this.select} />
                    </div>
                </div>

                <div className="row">
                    <div className='col-6 LeftWrapper'>
                        <div className="TopTable">
                            <p>Tổng cộng có: {departments.total} khoa</p>
                            <form onSubmit={this._submitFilter}>
                                <input
                                    value={departments.params.name}
                                    onChange={this._onChangeFilterNameDepartment}
                                    placeholder="Tìm kiếm khoa theo tên"
                                />
                            </form>
                        </div>
                        <div className="TableWrapper">
                            <DepartmentsTable
                                departments={departments}
                            />
                        </div>
                    </div>

                    <div className='col-6 LeftWrapper'>
                        <div className="TopTable">
                            <p>Tổng cộng có: {fields.total} đề tài nghiên cứu</p>
                            <form onSubmit={this._submitFilter}>
                                <input
                                    value={fields.params.name}
                                    onChange={this._onChangeFilterNameField}
                                    placeholder="Tìm kiếm đề tài theo tên"
                                />
                            </form>
                        </div>
                        <div className="TableWrapper">
                            <FieldsTable
                                fields={fields}
                            />
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default HomePage
