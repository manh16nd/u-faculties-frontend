import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class UserHomepage extends Component {
    render() {

        return (
            <div className="UserHomepage">
                <div className="Section">
                    <div className="SectionHeader">
                        Giảng viên
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <Link to={'/user/teachers'}>
                                <i className="ti-arrow-right ArrowIcon"/>
                                <span className="Text">Quản lý giảng viên</span>
                            </Link>
                        </div>
                        <div className="SectionLink">
                            <i className="ti-arrow-right ArrowIcon"/>
                            <span className="Text">Nhập tài khoản giảng viên từ Excel</span>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionHeader">
                        Bộ môn
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <i className="ti-arrow-right ArrowIcon"/>
                            <span className="Text">Quản lý bộ môn</span>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionHeader">
                        Lĩnh vực nghiên cứu
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <i className="ti-arrow-right ArrowIcon"/>
                            <span className="Text">Quản lý lĩnh vực nghiên cứu</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomepage
