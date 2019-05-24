import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Teachers from './Teachers'

class TeachersContainer extends Component {
    render() {

        return (
            <div className="TeachersContainer">
                <h3 className="PageTitle">
                    <Link to={'/user'} className="BackButton">
                        <i className="ti-arrow-left"/>
                    </Link>
                    Quản lý giảng viên
                </h3>
                <Teachers/>
            </div>
        )
    }
}

export default TeachersContainer
