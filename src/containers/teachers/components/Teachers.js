import React, { Component } from 'react'
import TeacherModal from './TeacherModal'

import { getTeachers } from '../../../services/api/TeachersServices'

class Teachers extends Component {
    state = {
        teachers: {
            teachers: [],
            total: 0,
            limit: 0,
            page: 1,
            loading: false,
        },
        current: {
            open: false,
            teacher: {},
        }
    }

    componentDidMount() {
        this._fetchTeachers()
    }

    _fetchTeachers = async () => {
        const { teachers } = this.state
        const { limit, page } = teachers
        const { data, message } = await getTeachers({ limit, page })
        if (message) return alert(message)
        this.setState({
            teachers: {
                ...teachers,
                total: data.total,
                teachers: data.teachers,
            }
        })
    }

    _onClickNewTeacher = () => {
        this.setState({
            current: {
                open: false,
                teacher: {},
            }
        })
    }

    render() {
        const { teachers } = this.state

        return (
            <div className="Teachers">
                <TeacherModal />
                <div className="TopButtons">
                    <button className="UserButton" onClick={this._onClickNewTeacher}>Thêm giảng viên</button>
                </div>

                <div className="TableWrapper">
                    <table className="Table">
                        <thead>
                            <tr>
                                <th className="FixedColumn">Tên giảng viên</th>
                                <th>Email</th>
                                <th>VNU Email</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Website</th>
                                <th>Bằng cấp</th>
                                <th>Vị trí</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.teachers.map((teacher) => <tr key={teacher._id}>
                                <td className="FixedColumn">{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.vnuEmail}</td>
                                <td>{teacher.phone}</td>
                                <td>{teacher.address}</td>
                                <td><a href={teacher.website} rel="noopener noreferrer"
                                    target="_blank">{teacher.website}</a>
                                </td>
                                <td>{teacher.degree}</td>
                                <td>{teacher.position}</td>
                                <td></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Teachers
