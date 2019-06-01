import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { removeCookie } from '../../../services/cookies/index'
import UserMenuContainer from '../../user-menu/components/UserMenuContainer'

class Header extends Component {
    _onClickLogin = () => {
        const { user } = this.props.app

        if (!user || !user.token) return this.props.changeState({
            loginModal: true,
        })

        removeCookie('token')
        removeCookie('type')
        removeCookie('username')
        removeCookie('teacher')
        window.location.href = '/'
    }

    render() {
        const { user } = this.props.app

        return (
            <div className={classnames("Header", { 'AdminHeader': user.type && user.type !== 'teacher' })}>
                <div className="LeftHeader">
                    <Link to={'/'}>
                        <img className="Logo" src="images/uet.jpg" alt="UET-LOGO" />
                    </Link>
                    <span className="Title">Trường Đại học Công nghệ</span>
                    {user.type && user.type !== 'teacher' && <span className="Title">- Quản lý</span>}
                </div>
                <div className="RightHeader">
                    <div className="ButtonWrapper">
                        {!!user.token && <Link to={'/user'}>
                            <button className="Button mr-2">Quản lý
                            </button>
                        </Link>}
                        <button className={classnames("Button", {
                            'UserHeaderButton': user && user.token
                        })}
                            onClick={this._onClickLogin}>
                            <span>
                                {user && user.token ? user.username || 'Đăng nhập' : 'Đăng nhập'}
                            </span>
                        </button>
                    </div>
                    <UserMenuContainer />
                </div>
            </div>
        )
    }
}

export default Header
