import React, {Component} from 'react'
import classnames from 'classnames'

class LoginModal extends Component {
    _close = () => {
        console.log('close')
        this.props.changeState({
            loginModal: false,
        })
    }

    render() {
        const {app} = this.props

        return (
            <div className="LoginModal">
                {app.loginModal && <div className="Background" onClick={this._close}/>}
                <div className={classnames('LoginWrapper', {
                    'Off': !app.loginModal,
                })}>
                    <div className="ModalTitle">
                        <span className="Title">Đăng nhập</span>
                        <span className="CloseButton" onClick={this._close}>
                        <span className="ti-close"/>
                        </span>
                    </div>
                    <div className="ModalBody">
                        <div className="Form">
                            <label htmlFor="username">Tài khoản</label>
                            <input className="ModalInput" id="username" autoComplete="off"/>
                        </div>
                        <div className="Form">
                            <label htmlFor="password">Mật khẩu</label>
                            <input className="ModalInput" id="password" type="password" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="ModalFooter">
                        <button className="Button">Đăng nhập</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal
