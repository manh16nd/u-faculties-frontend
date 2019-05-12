import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class FieldTable extends Component {
    render() {
        const {fields} = this.props

        return (
            <div className="FieldsTable">
                <table className="Table">
                    <thead>
                    <tr>
                        <th>Tên đề tài</th>
                        <th>Bộ môn</th>
                        <th>Giáo viên hướng dẫn</th>
                        <th>Miêu tả ngắn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.entity.map((field) => <tr key={field._id}>
                        <td><Link to={`/fields/${field._id}`}>{field.name}</Link></td>
                        <td>{field.email}</td>
                        <td>{field.vnuEmail}</td>
                        <td>{field.phone}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

FieldTable.propTypes = {
    fields: PropTypes.object.isRequired,
}

export default FieldTable
