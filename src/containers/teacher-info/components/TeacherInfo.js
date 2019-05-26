import React, { useState, useEffect } from 'react'
import Input from '../../../components/input/components/Input';
import { getCurrentTeacherInfo } from '../../../services/api/AuthServices';

const TeacherInfo = function (props) {
    const [state, changeState] = useState({ user: {} })

    useEffect(() => {
        getCurrentTeacher()
    }, [])

    const getCurrentTeacher = async () => {
        const { success, data, message } = await getCurrentTeacherInfo()
        console.log(data)
    }

    const onChangeInput = (key) => (v) => {
        const { user } = state
        changeState({
            user: { ...user, [key]: v }
        })
    }

    const { user } = state

    return (
        <div className="TeacherInfo">
            <div className="PageHeader">Cập nhật thông tin cá nhân</div>
            <div className="PageContent">
                <div className="row">
                    <div className="col-6">
                        <Input onChange={onChangeInput('name')} label='Tên' id='name' value={user.name || ''} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherInfo