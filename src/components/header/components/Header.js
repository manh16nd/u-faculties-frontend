import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import UserMenuContainer from '../../user-menu/components/UserMenuContainer'

class Header extends Component {
    _onClickLogin = () => {
        const {user} = this.props.app

        if (!user || !user.username) return this.props.changeState({
            loginModal: true,
        })

        return this.props.changeState({
            userMenu: true,
        })
    }

    render() {
        const {user} = this.props.app

        return (
            <div className="Header">
                <div className="LeftHeader">
                    <Link to={'/'}>
                        <img className="Logo" src="images/uet.jpg" alt="UET-LOGO"/>
                    </Link>
                    <span className="Title">Trường Đại học Công nghệ uFaculties</span>
                </div>
                <div className="RightHeader">
                    <div className="ButtonWrapper">
                        {!!user.token && <Link to={'/user'}>
                            <button className="Button mr-2">Quản lý
                            </button>
                        </Link>}
                        <button className="Button"
                                onClick={this._onClickLogin}>{user ? user.username || 'Đăng nhập' : 'Đăng nhập'}</button>
                    </div>
                    <UserMenuContainer/>
                </div>
            </div>
        )
    }
}

export default Header
