import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import Input from '../../../components/input/components/Input'
import Select from '../../../components/select/components/Select'
import { uploadTeacherAvatar } from '../../../services/api/TeachersServices'

const TeacherModal = (props) => {
    const { teacher, departments, onSave, onToggle } = props
    const [_teacher, _setTeacher] = useState({})
    const [avatarFile, changeAvatar] = useState(null)
    const [avatarLoading, changeAvatarLoading] = useState(false)

    let avatarInput = createRef()

    useEffect(() => {
        if (avatarFile) uploadAvatar()
    }, [avatarFile])

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

    const onChangeFile = (e) => {
        const { files } = e.target
        changeAvatar(files[0])
    }

    const uploadAvatar = async () => {
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        changeAvatarLoading(true)
        const { success, message } = await uploadTeacherAvatar({ teacherId: teacher._id, avatar: formData })

        if (success) alert(true)
        changeAvatarLoading(false)
        if (message) alert(message)
    }

    const _onChangeInput = (key) => (value) => {
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
                    <button className="UserButton mt-3" type="submit">Lưu</button>
                </div>
                {!!teacher._id &&
                    <div className="col-6">
                        <img src={avatarFile || teacher.avatar} alt="teacher-avatar" />
                        <input type="file" ref={input => avatarInput = input} className="HiddenInput" onChange={onChangeFile} />
                    </div>}
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