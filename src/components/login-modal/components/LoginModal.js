import React, { Component } from 'react'
import classnames from 'classnames'
import { login } from '../../../services/api/AuthServices'
import { setCookie } from '../../../services/cookies'

class LoginModal extends Component {
    state = {
        username: '',
        password: '',
        err: '',
        loading: false,
    }

    _close = () => {
        this.props.changeState({
            loginModal: false,
        })
    }

    _submitLogin = async (e) => {
        e.preventDefault()
        const { username, password } = this.state
        this.setState({ loading: true })
        const { success, data, message } = await login({ username, password })
        this.props.changeState({ user: { ...data }, loginModal: !success })
        this.setState({ loading: false, err: message })
        if (success) {
            const { token, type, username, teacher } = data
            setCookie('token', token)
            setCookie('type', type)
            setCookie('username', username)
            setCookie('teacher', teacher || '')
        }
    }

    _onChangeInput = (key) => (e) => {
        const { value } = e.target
        this.setState({
            [key]: value,
        })

    }

    render() {
        const { username, password, err } = this.state
        const { app } = this.props

        return (
            <div className="LoginModal">
                {app.loginModal && <div className="Background" onClick={this._close} />}
                <div className={classnames('LoginWrapper', {
                    'Off': !app.loginModal,
                })}>
                    <form onSubmit={this._submitLogin}>
                        <div className="ModalTitle">
                            <span className="Title">Đăng nhập</span>
                            <span className="CloseButton" onClick={this._close}>
                                <span className="ti-close" />
                            </span>

                        </div>
                        <div className="ModalBody">
                            <div className="text-danger">{err}</div>
                            <div className="Form">
                                <label htmlFor="username">Tài khoản</label>
                                <input className="ModalInput" id="username" autoComplete="off" value={username}
                                    onChange={this._onChangeInput('username')} />
                            </div>
                            <div className="Form">
                                <label htmlFor="password">Mật khẩu</label>
                                <input className="ModalInput" id="password" type="password" autoComplete="off"
                                    value={password} onChange={this._onChangeInput('password')} />
                            </div>
                        </div>
                        <div className="ModalFooter">
                            <button className="Button" type="submit">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginModal
