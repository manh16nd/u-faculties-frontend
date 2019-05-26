import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { getCookie } from '../../../services/cookies'
import { getTeacherTopics } from '../../../services/api/TeachersServices';

const TeacherTopics = function (props) {
    const [tab, changeTab] = useState(0)
    const [topics, changeTopics] = useState({
        page: 1,
        limit: 0,
        data: [],
        total: 0,
    })

    useEffect(() => {
        _fetchTopics()
    }, [])

    const _fetchTopics = async () => {
        const teacherId = getCookie('teacher')
        if (!teacherId) return null

        const { page, limit } = topics
        const { success, data, message } = await getTeacherTopics({ teacherId, params: { page, limit } })
        console.log(success, data, message)
    }

    const _changeTab = (value) => () => {
        changeTab(value)
    }

    return (
        <div className="TeacherTopics container">
            <div className="Card">
                <div className="CardHeader">
                    Quản lý chủ đề nghiên cứu
                </div>
            </div>

            <div className="FieldsWrapper">
                <div className="Tabs">
                    <div className={classnames("Tab", { 'Focus': !tab })} onClick={_changeTab(0)}>
                        Các chủ đề đang tham gia
                    </div>
                    <div className={classnames("Tab", { 'Focus': !!tab })} onClick={_changeTab(1)}>
                        Tất cả chủ đề
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherTopics