import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    _onClickLogin = () => {
        this.props.changeState({
            loginModal: true,
        })
    }

    render() {

        return (
            <div className="Header">
                <div className="LeftHeader">
                    <Link to={'/'}>
                        <img className="Logo" src="images/uet.jpg" alt="UET-LOGO"/>
                    </Link>
                    <span className="Title">Trường Đại học Công nghệ uFaculties</span>
                </div>
                <div className="RightHeader">
                    <button className="Button" onClick={this._onClickLogin}>Đăng nhập</button>
                </div>
            </div>
        )
    }
}

export default Header
