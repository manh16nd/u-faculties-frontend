import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { getCookie } from '../../../services/cookies'
import { getTeacherTopics } from '../../../services/api/TeachersServices'
import { getAllTopics } from '../../../services/api/TopicsServices'
import AllTopicsTable from './AllTopicsTable'
import TeacherTopicsTable from './TeacherTopicsTable'

const TeacherTopics = function (props) {
    const [tab, changeTab] = useState(0)
    const [topics, changeTopics] = useState({
        teacherTopics: [],
        allTopics: [],
    })

    useEffect(() => {
        _fetchTopics()
    }, [])

    const _fetchTopics = async () => {
        const teacherId = getCookie('teacher')
        if (!teacherId) return null

        const getTeacherTopicsRequest = getTeacherTopics({ teacherId })
        const getAllTopicsRequest = getAllTopics({ limit: 0 })

        const [teacherTopicsResp, topicsResp] = await Promise.all([getTeacherTopicsRequest, getAllTopicsRequest])
        if (teacherTopicsResp.message || topicsResp.message) return alert(teacherTopicsResp.message || topicsResp.message)

        changeTopics({
            ...topics,
            teacherTopics: teacherTopicsResp.data.topics,
            allTopics: topicsResp.data.topics,
        })
    }

    const _changeTab = (value) => () => {
        changeTab(value)
    }

    return (
        <div className="TeacherTopics container">
            <div className="Card">
                <div className="CardHeader">
                    <div className="TeacherTopicsHeader">
                        Quản lý chủ đề nghiên cứu
                        <button className="UserButton">Thêm chủ đề mới</button>
                    </div>
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

                    {!!tab && <div className="TabContent">
                        <AllTopicsTable topics={topics.allTopics} />
                    </div>}
                </div>

                {!tab && <TeacherTopicsTable topics={topics.teacherTopics} />}
            </div>
        </div>
    )
}

export default TeacherTopics