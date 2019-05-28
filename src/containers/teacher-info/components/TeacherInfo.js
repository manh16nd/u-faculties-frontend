import React, { useState, useEffect, createRef } from 'react'
import Input from '../../../components/input/components/Input';
import { getCurrentTeacherInfo } from '../../../services/api/AuthServices'
import { uploadTeacherAvatar, editTeacherInfo } from '../../../services/api/TeachersServices'

const TeacherInfo = function (props) {
    const [state, changeState] = useState({ user: {} })
    const [avatarFile, changeAvatar] = useState(null)
    const [avatarLoading, changeAvatarLoading] = useState(false)

    let avatarInput = createRef()

    useEffect(() => {
        getCurrentTeacher()
    }, [])

    useEffect(() => {
        if (avatarFile) uploadAvatar()
    }, [avatarFile])

    const getCurrentTeacher = async () => {
        const { data, message } = await getCurrentTeacherInfo()
        if (message) return alert(message)

        changeState({
            user: data,
        })
    }

    const onChangeInput = (key) => (v) => {
        const { user } = state
        changeState({
            user: { ...user, [key]: v }
        })
    }

    const onClickAvatar = () => {
        avatarInput.click()
    }

    const onChangeFile = (e) => {
        const { files } = e.target
        changeAvatar(files[0])
    }

    const uploadAvatar = async () => {
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        changeAvatarLoading(true)
        const { success, message } = await uploadTeacherAvatar({ teacherId: user._id, avatar: formData })

        if (success) getCurrentTeacher()
        changeAvatarLoading(false)
        if (message) alert(message)
    }

    const onSubmitSave = async () => {
        const { _id, ...info } = user
        const { success, data, message } = await editTeacherInfo({ teacherId: _id, data: info })
        console.log(success, data, message)
    }

    const { user } = state

    const url = `url(${user.avatar || 'https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png'})`

    return (
        <div className="TeacherInfo">
            <div className="PageHeader">Cập nhật thông tin cá nhân</div>
            <div className="PageContent">
                <div className="row">
                    <div className="col-6">
                        <Input onChange={onChangeInput('name')} label='Tên' id='name' value={user.name || ''} />
                        <Input onChange={onChangeInput('email')} label='Email' id='email' value={user.email || ''} />
                        <Input onChange={onChangeInput('vnuEmail')} label='VNU Email' id='vnuEmail' value={user.vnuEmail || ''} />
                        <Input onChange={onChangeInput('phone')} label='Số điện thoại' id='phone' value={user.phone || ''} />
                        <Input onChange={onChangeInput('address')} label='Địa chỉ' id='address' value={user.address || ''} />
                        <Input onChange={onChangeInput('website')} label='Website' id='website' value={user.website || ''} />
                    </div>
                    <div className="col-6">
                        <div className="TeacherAvatar">
                            {avatarLoading ? <div className="lds-hourglass" /> : <div className="Avatar" style={{ backgroundImage: url }} onClick={onClickAvatar} />}
                            <input type="file" ref={input => avatarInput = input} className="HiddenInput" onChange={onChangeFile} />
                        </div>
                        <div className="SaveWrapper">
                            <button className="UserButton" onClick={onSubmitSave}>Save</button>
                        </div>

                        <Input onChange={onChangeInput('degree')} label='Bằng cấp' id='degree' value={user.degree || ''} />
                        <Input onChange={onChangeInput('position')} label='Vị trí' id='position' value={user.position || ''} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherInfo