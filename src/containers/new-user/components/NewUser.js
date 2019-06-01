import React, { useState } from 'react'
import Input from '../../../components/input/components/Input'
import { newUser } from '../../../services/api/AuthServices'
import { setCookie } from '../../../services/cookies'

const NewUser = function (props) {
    const [_form, _setForm] = useState({ password: '', repassword: '' })

    const _onChange = (key) => (value) => _setForm({ ..._form, [key]: value })

    const _onSubmit = async (e) => {
        e.preventDefault()
        if ((_form.password !== _form.repassword)) return alert('Mật khẩu nhập lại không khớp')
        const { search } = props.location
        const [tokenAuth, username] = search.replace('?', '').split('&')
        const { success, data, message } = await newUser({
            password: _form.password,
            username: username.split('=')[1],
            token: tokenAuth.split('=')[1]
        })
        if (success) {
            const { token, type, username, teacher } = data
            setCookie('token', token)
            setCookie('type', type)
            setCookie('username', username)
            setCookie('teacher', teacher || '')
            return window.location.href = '/'
        }

        alert(message)
    }

    return (
        <div className="User container">
            <div className="Card">
                <div className="CardHeader">Nhập mật khẩu cho tài khoản mới</div>
                <div className="CardBody">
                    <form onSubmit={_onSubmit}>
                        <Input required id="new-password" type="password" value={_form.password} onChange={_onChange('password')} label="Mật khẩu" />
                        <Input required id="new-repassword" type="password" value={_form.repassword} onChange={_onChange('repassword')} label="Nhập lại mật khẩu" />
                        <button className="Button" type="submit">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUser