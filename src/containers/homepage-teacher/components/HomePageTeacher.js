import React, { useState, useEffect } from 'react'
import { getTeacherInfo } from '../../../services/api/TeachersServices';

export default function (props) {
    const [_teacher, _setTeacher] = useState({})

    useEffect(() => {
        _fetchTeacher()
    }, [])

    const _fetchTeacher = async () => {
        const { id } = props.match.params
        const { success, data, message } = await getTeacherInfo(id)
        console.log("TCL: _fetchTeacher -> data", data)
        if (success) return _setTeacher(data)
        alert(message)
    }

    return (
        <div className="HomepageTeacher container">
            <div className="Card">
                <div className="CardHeader">
                    Thông tin giảng viên
                </div>
                <div className="CardBody">
                    <div className="row">
                        <div className="col-6">
                            <div className="InfoWrapper">
                                <div className="Info">
                                    <div className="Title text-muted">
                                        Tên giảng viên:
                                </div>
                                    <div className="Value">
                                        {_teacher.name}
                                    </div>
                                </div>
                                <div className="Info">
                                    <div className="Title">
                                        Khoa:
                                </div>
                                    <div className="Value">
                                        {!!_teacher.department && _teacher.department.name}
                                    </div>
                                </div>
                                <div className="Info">
                                    <div className="Title">
                                        Địa chỉ:
                                </div>
                                    <div className="Value">
                                        {_teacher.address}
                                    </div>
                                </div>

                                <div className="Info">
                                    <div className="Title">
                                        Email:
                                </div>
                                    <div className="Value">
                                        {_teacher.email}
                                    </div>
                                </div>

                                <div className="Info">
                                    <div className="Title">
                                        VNU Email:
                                </div>
                                    <div className="Value">
                                        {_teacher.vnuEmail}
                                    </div>
                                </div>
                                <div className="Info">
                                    <div className="Title">
                                        Điện thoại:
                                </div>
                                    <div className="Value">
                                        {_teacher.phone}
                                    </div>
                                </div>
                                <div className="Info">
                                    <div className="Title">
                                        Website:
                                </div>
                                    <div className="Value">
                                        {_teacher.website}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="InfoWrapper">
                                <div className="Info">
                                    <div className="Title">
                                        Lĩnh vực:
                                    </div>
                                    <div className="Value">
                                        {_teacher.fields && _teacher.fields.length ? _teacher.fields.map((item) => item.name).join(', ') : <div className="text-muted">
                                            Không có lĩnh vực quan tâm
                                        </div>}
                                    </div>
                                </div>
                                <div className="Info">
                                    <div className="Title">
                                        Chủ đề quan tâm:
                                    </div>
                                    <div className="Value">
                                        {_teacher.topics && _teacher.topics.length ? _teacher.topics.map((item) => item.name).join(', ') : <div className="text-muted">
                                            Không có lĩnh vực quan tâm
                                        </div>}
                                    </div>
                                </div>
                                <div className="Image">
                                    <img src={_teacher.avatar || 'https://justice.org.au/wp-content/uploads/2017/08/avatar-icon.png'} alt="avatar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}