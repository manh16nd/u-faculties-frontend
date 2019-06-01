import React, { Component } from 'react'
import Modal from '../../../components/modal/components/Modal'
import TeacherModal from './TeacherModal'
import { getTeachers, createNewTeacher, editTeacherInfo } from '../../../services/api/TeachersServices'
import { getDepartments } from '../../../services/api/DepartmentsServices'

class Teachers extends Component {
    state = {
        teachers: {
            teachers: [],
            total: 0,
            limit: 0,
            page: 1,
            loading: false,
        },
        departments: [],
        current: {
            open: false,
            teacher: {
                address: '',
                degree: '',
                name: '',
                phone: '',
                position: '',
                vnuEmail: '',
                website: ''
            },
        }
    }

    componentDidMount() {
        this._fetchTeachers()
        this._fetchDepartments()
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

    _fetchDepartments = async () => {
        const { success, data, message } = await getDepartments({ limit: 0 })
        if (success) return this.setState({
            departments: data.departments,
        })

        alert(message)
    }

    _onClickNewTeacher = () => {
        this.setState({
            current: {
                open: true,
                teacher: {},
            }
        })
    }

    _onClickEdit = (teacher) => () => {
        this.setState({
            current: {
                open: true,
                teacher: { ...teacher },
            }
        })
    }

    _toggle = () => {
        this.setState({
            current: {
                open: false,
                teacher: {},
            }
        })
    }

    _onSave = async (teacher) => {
        console.log("TCL: Teachers -> _onSave -> teacher", teacher)
        return 
        const request = (teacher._id) ? editTeacherInfo({
            teacherId: teacher._id,
            data: teacher
        }) : createNewTeacher({
            ...teacher,
            username: teacher.email,
        })

        const { success, message } = await request
        if (!success) alert(message)
        this._fetchTeachers()

        return success
    }

    render() {
        const { teachers, current, departments } = this.state

        return (
            <div className="Teachers">
                {current.open && <Modal open={current.open} onToggle={this._toggle} title="Thêm giảng viên">
                    <TeacherModal teacher={current.teacher} departments={departments} onToggle={this._toggle} onSave={this._onSave} />
                </Modal>}
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
                                <th>Đơn vị</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Website</th>
                                <th>Bằng cấp</th>
                                <th>Vị trí</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.teachers.map((teacher) => {
                                const _department = departments.find(item => item._id === teacher.department)

                                return (
                                    <tr key={teacher._id}>
                                        <td className="FixedColumn">{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.vnuEmail}</td>
                                        <td>{!!_department && _department.name}</td>
                                        <td>{teacher.phone}</td>
                                        <td>{teacher.address}</td>
                                        <td><a href={teacher.website} rel="noopener noreferrer"
                                            target="_blank">{teacher.website}</a>
                                        </td>
                                        <td>{teacher.degree}</td>
                                        <td>{teacher.position}</td>
                                        <td>
                                            <button className="UserButton" onClick={this._onClickEdit(teacher)}>Sửa tài khoản</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Teachers
