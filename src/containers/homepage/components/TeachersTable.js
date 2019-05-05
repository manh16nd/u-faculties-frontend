import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class TeachersTable extends Component {
    render() {
        const {teachers} = this.props

        return (
            <div className="TeachersTable">
                <table className="Table">
                    <thead>
                    <tr>
                        <th>Tên giảng viên</th>
                        <th>Email</th>
                        <th>VNU Email</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Website</th>
                        <th>Bằng cấp</th>
                        <th>Vị trí</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.entity.map((teacher) => <tr key={teacher._id}>
                        <td><Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link></td>
                        <td>{teacher.email}</td>
                        <td>{teacher.vnuEmail}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.address}</td>
                        <td><a href={teacher.website} rel="noopener noreferrer" target="_blank">{teacher.website}</a>
                        </td>
                        <td>{teacher.degree}</td>
                        <td>{teacher.position}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

TeachersTable.propTypes = {
    teachers: PropTypes.object.isRequired,
}

export default TeachersTable
