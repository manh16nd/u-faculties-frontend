import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class DepartmentsTable extends Component {
    render() {
        const {departments} = this.props

        return (
            <div className="DepartmentsTable">
                <table className="Table">
                    <thead>
                    <tr>
                        <th>Tên Khoa</th>
                        <th>Thể loại</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Website</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.entity.map((department) => <tr key={department._id}>
                        <td><Link to={`/departments/${department._id}`}>{department.name}</Link></td>
                        <td>{department.type}</td>
                        <td>{department.phone}</td>
                        <td>{department.address}</td>
                        <td><a href={department.website} rel="noopener noreferrer" target="_blank">{department.website}</a>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

DepartmentsTable.propTypes = {
    departments: PropTypes.object.isRequired,
}

export default DepartmentsTable
