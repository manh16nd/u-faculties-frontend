import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../../../components/input/components/Input'
import Select from '../../../components/select/components/Select';

const TeacherModal = (props) => {
    const { teacher, departments, onSave, onToggle } = props
    const [_teacher, _setTeacher] = useState({})

    useEffect(() => {
        _mapPropToState()
    }, [teacher])

    useEffect(() => {
        console.log(_teacher)
    }, [_teacher])
    
    const _mapPropToState = () => _setTeacher({ ...teacher })

    const _onSubmit = (e) => {
        e.preventDefault()
        if (onSave(_teacher)) onToggle()
    }

    const _onChangeInput = (key) => (value) => {
        console.log("TCL: _onChangeInput -> key", key)
        _setTeacher({
            ..._teacher,
            [key]: value,
        })
    }

    const _departments = departments.map((item) => ({
        value: item._id,
        title: item.name,
    }))

    return (
        <div className="TeacherModal container">
            <form onSubmit={_onSubmit} className="row">
                <div className="col-6">
                    <Input required id='teacher-name' value={_teacher.name || ''} onChange={_onChangeInput('name')} label='Tên giảng viên' />
                </div>
                <div className="col-6">
                    <Input required id='teacher-email' value={_teacher.email || ''} onChange={_onChangeInput('email')} label='Email' />
                </div>
                <div className="col-6">
                    <Input required id='teacher-vnuEmail' value={_teacher.vnuEmail || ''} onChange={_onChangeInput('vnuEmail')} label='VNU Email' />
                </div>
                <div className="col-6">
                    <Input id='teacher-address' value={_teacher.phone || ''} onChange={_onChangeInput('phone')} label='Điện thoại' />
                </div>
                <div className="col-6">
                    <Input id='teacher-address' value={_teacher.address || ''} onChange={_onChangeInput('address')} label='Địa chỉ' />
                </div>
                <div className="col-6">
                    <Input id='teacher-website' value={_teacher.website || ''} onChange={_onChangeInput('website')} label='Website' />
                </div>
                <div className="col-6">
                    <Input id='teacher-degree' value={_teacher.degree || ''} onChange={_onChangeInput('degree')} label='Bằng cấp' />
                </div>
                <div className="col-6">
                    <Input id='teacher-position' value={_teacher.position || ''} onChange={_onChangeInput('position')} label='Vị trí' />
                </div>
                <div className="col-6">
                    <Select id='teacher-department' value={_teacher.department || ''} onChange={_onChangeInput('department')} label='Đơn vị' options={_departments} />
                </div>
                <div className="col-12">
                    <button className="UserButton" type="submit">Lưu</button>
                </div>
            </form>
        </div>
    )
}

TeacherModal.propTypes = {
    teacher: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default TeacherModal