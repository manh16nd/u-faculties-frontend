import React from 'react'
import { Link } from 'react-router-dom'

const TeacherHomepage = function (props) {

    return (
        <div className="TeacherHomepage">
            <div className="UserHomepage">
                <div className="Section">
                    <div className="SectionHeader">
                        Thông tin cá nhân
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <Link to={'/info'}>
                                <i className="ti-arrow-right ArrowIcon" />
                                <span className="Text">Cập nhật thông tin cá nhân</span>
                            </Link>
                        </div>
                        <div className="SectionLink">
                            <Link to={'/changePassword'}>
                                <i className="ti-arrow-right ArrowIcon" />
                                <span className="Text">Đổi mật khẩu</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionHeader">
                        Lĩnh vực nghiên cứu
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <Link to='/teacher/fields'>
                                <i className="ti-arrow-right ArrowIcon" />
                                <span className="Text">Cập nhật lĩnh vực nghiên cứu</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="Section">
                    <div className="SectionHeader">
                        Chủ đề nghiên cứu
                    </div>
                    <div className="SectionBody">
                        <div className="SectionLink">
                            <Link to='/teacher/topics'>
                                <i className="ti-arrow-right ArrowIcon" />
                                <span className="Text">Cập nhật chủ đề nghiên cứu</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherHomepage