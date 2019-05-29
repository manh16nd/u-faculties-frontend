import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/input/components/Input'
import Select from '../../../components/select/components/Select'

const AdminDepartmentsTable = function (props) {
    const { departments, types, onChange, onRemove } = props
    const [edit, setEdit] = useState({})

    useEffect(() => {
        addNewDepartment()
    }, [departments])

    const parsedTypes = types.map((type) => ({
        value: type,
        title: type,
    }))

    const addNewDepartment = () => {
        if (!departments.length) return null
        const firstDepartment = departments[0]
        if (!firstDepartment._id) setEdit({ _id: 1 })
    }

    const onClickChange = (department) => () => {
        setEdit({ ...department })
    }

    const onChangeInput = (key) => (value) => {
        setEdit({ ...edit, [key]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        onChange(edit)
    }

    const _onClickRemove = (department) => () => {
        if (!department || !department._id) return null
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn vị: ' + department.name)) onRemove(department._id)
    }

    const renderDepartment = (department, id) => {
        const isEdit = (id === 0) ? (edit._id && (edit._id === department._id || edit._id === 1)) : (edit._id && edit._id === department._id)

        return (
            <tr key={department._id || 1}>
                <td>{isEdit ? <Input required id="department-name" value={edit.name || ''} onChange={onChangeInput('name')} /> : department.name}</td>
                <td>{isEdit ? <Select required id="department-type" value={edit.department || ''} onChange={onChangeInput('type')} options={parsedTypes} /> : department.type}</td>
                <td>{isEdit ? <Input required id="department-phone" value={edit.phone || ''} onChange={onChangeInput('phone')} /> : department.phone}</td>
                <td>{isEdit ? <Input required id="department-address" value={edit.address || ''} onChange={onChangeInput('address')} /> : department.address}</td>
                <td>{isEdit ? <Input required id="department-website" value={edit.website || ''} onChange={onChangeInput('website')} /> : department.website}</td>
                <td>
                    <div className="ActionsWrapper">
                        {(isEdit) ? <div>
                            <button className="UserButton mr-2" type="submit">
                                <i className="ti-save" />
                            </button>
                            <button className="UserButton" onClick={onClickChange({})}>
                                <i className="ti-close" />
                            </button>
                        </div> : <div>
                                <button className="UserButton mr-2" type="button" onClick={onClickChange(department)}>
                                    <i className="ti-pencil" />
                                </button>
                                <button className="UserButton DangerButton" onClick={_onClickRemove(department)}>
                                    <i className="ti-trash" />
                                </button>
                            </div>}
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className="AdminDepartmentsTable">

            <div className="TableWrapper">
                <form onSubmit={onSubmit}>
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Tên Khoa</th>
                                <th>Loại</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Website</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {departments.map((department, id) => renderDepartment(department, id))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

AdminDepartmentsTable.propTypes = {
    departments: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default AdminDepartmentsTable
