import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserHomepage extends Component {
    render() {

        return (
            <div className="UserHomepage">
                <div className="Section">
                    <div className="SectionWrapper">
                        <div className="SectionHeader">
                            Giảng viên
                    </div>
                        <div className="SectionBody">
                            <div className="SectionLink">
                                <Link to={'/user/teachers'}>
                                    <i className="ti-arrow-right ArrowIcon" />
                                    <span className="Text">Quản lý giảng viên</span>
                                </Link>
                            </div>
                            <div className="SectionLink">
                                <Link to={'/user/inputExcel'}>
                                    <i className="ti-arrow-right ArrowIcon" />
                                    <span className="Text">Nhập tài khoản giảng viên từ Excel</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionWrapper">
                        <div className="SectionHeader">
                            Đơn vị
                    </div>
                        <div className="SectionBody">
                            <div className="SectionLink">
                                <Link to='/user/departments'>
                                    <i className="ti-arrow-right ArrowIcon" />
                                    <span className="Text">Quản lý đơn vị</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionWrapper">
                        <div className="SectionHeader">
                            Lĩnh vực nghiên cứu
                    </div>
                        <div className="SectionBody">
                            <div className="SectionLink">
                                <Link to={'/user/fields'}>
                                    <i className="ti-arrow-right ArrowIcon" />
                                    <span className="Text">Quản lý lĩnh vực nghiên cứu</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionWrapper">
                        <div className="SectionHeader">
                            Thông tin cá nhân
                    </div>
                        <div className="SectionBody">
                            <div className="SectionLink">
                                <Link to={'/user/changePassword'}>
                                    <i className="ti-arrow-right ArrowIcon" />
                                    <span className="Text">Đổi mật khẩu</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomepage
