import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AdminDepartmentsTable from './AdminDepartmentsTable'
import Modal from '../../../components/modal/components/Modal'
import { getDepartments, getDepartmentTypes, editDepartment, addDepartment, removeDepartment } from '../../../services/api/DepartmentsServices'
import NewDepartment from './NewDepartment';

const AdminDepartments = function (props) {
    const [departments, setDepartments] = useState({
        entity: [],
        total: 0,
        page: 1,
        types: [],
        limit: 10,
    })

    const [_new, _setNew] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const [r1, r2] = await Promise.all([fetchDepartments(), fetchDepartmentTypes()])
        setDepartments({ ...departments, ...r1, ...r2 })
    }

    const fetchDepartments = async () => {
        const { page, limit } = departments
        const { success, data, message } = await getDepartments({ page, limit })

        if (!success) return alert(message)

        return {
            entity: data.departments,
            total: data.total,
        }
    }

    const fetchDepartmentTypes = async () => {
        const { success, data } = await getDepartmentTypes()

        if (success) return { types: data }
    }

    const _onRemoveDepartment = async (departmentId) => {
        if (!departmentId) return null

        const { success, message } = await removeDepartment(departmentId)
        if (success) return fetchData()
        alert(message)
    }

    const onChangeDepartment = async (department) => {
        if (!department._id) return null

        const request = (department._id === 1) ? addDepartment(department) : editDepartment(department)

        const { success, message } = await request
        const [first, ...entity] = departments.entity
        console.log(first)

        setDepartments({
            ...departments,
            entity
        })
        if (success) return fetchData()
        alert(message)
    }

    const _addNewDepartment = () => {
        _setNew(true)
    }

    const _toggleNewDepartment = () => {
        _setNew(null)
    }

    const _submitNewDepartment = async (department) => {
        console.log("TCL: _submitNewDepartment -> department", department)
        const { success, message } = await addDepartment(department)
        if (!success) return alert(message)
        fetchData()
        _setNew(!success)
    }

    return (
        <div className="AdminDepartments">
            <div className="Card">
                <div className="CardHeader">
                    <div className="AdminDepartmentsHeader">
                        <div className="Title">
                            <Link className="BackButton" to="/user"><i className="ti-arrow-left"></i></Link>
                            Quản lý đơn vị
                        </div>
                        <button className="UserButton" onClick={_addNewDepartment}>Thêm đơn vị mới</button>
                    </div>
                </div>
            </div>
            {!!_new && <Modal title="Thêm đơn vị mới" onToggle={_toggleNewDepartment}>
                <NewDepartment onSubmit={_submitNewDepartment} types={departments.types} />
            </Modal>}
            <AdminDepartmentsTable departments={departments.entity || []} types={departments.types} onChange={onChangeDepartment} onRemove={_onRemoveDepartment} />
        </div>
    )
}

export default AdminDepartments