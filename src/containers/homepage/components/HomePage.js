import React, {Component} from 'react'
import {getTeachers} from '../../../services/api/TeachersServices'
import TeachersTable from './TeachersTable'
import Filter from './Filter'

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
        loading: {
            fetchTeachers: false,
        }
    }

    componentDidMount() {
        this._fetchTeachers()
    }

    _fetchTeachers = async () => {
        const {params} = this.state.teachers
        this.setState({
            loading: {
                fetchTeachers: true,
            }
        })

        const {success, data, message} = await getTeachers(params)

        const teachersEntity = data ? {
            entity: data.teachers,
            total: data.total,
        } : {}
        this.setState(({teachers, loading}) => ({
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

    _onChangeFilterName = (e) => {
        const {value} = e.target
        this.setState(({teachers}) => ({
            teachers: {
                ...teachers,
                params: {
                    ...teachers.params,
                    name: value,
                }
            }
        }))
    }

    _submitFilter = (e) => {
        e.preventDefault()
        this._fetchTeachers()
    }

    render() {
        const {teachers} = this.state

        return (
            <div className="HomePage row">
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
                    <Filter/>
                </div>
            </div>
        )
    }
}

export default HomePage
