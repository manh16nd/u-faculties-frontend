import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { getCookie } from '../../../services/cookies'
import { getTeacherTopics, addTeacherToTopics, removeTeacherFromTopics } from '../../../services/api/TeachersServices'
import { getAllTopics, removeTopic, createNewTopics, editTopics } from '../../../services/api/TopicsServices'
import AllTopicsTable from './AllTopicsTable'
import TeacherTopicsTable from './TeacherTopicsTable'
import Modal from '../../../components/modal/components/Modal'
import Input from '../../../components/input/components/Input'

const TeacherTopics = function (props) {
    const [tab, changeTab] = useState(0)
    const [topics, changeTopics] = useState({
        teacherTopics: [],
        allTopics: [],
        newTopic: null,
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
            newTopic: null,
        })
    }

    const _changeTab = (value) => () => {
        changeTab(value)
    }

    const _onRemoveTopic = async (TopicId) => {
        if (!TopicId) return null

        const { success, message } = await removeTopic(TopicId)
        if (success)
            return _fetchTopics()
        alert(message)
    }

    const _onEditTopic = async (topic) => {
        const { success, message } = await editTopics(topic)
        if (success) {
            _fetchTopics()
            return true
        }
        alert(message)
        return false
    }

    const _onClickAddTopic = () => {
        changeTopics({
            ...topics,
            newTopic: {
                name: '',
                description: '',
                addToMyTopics: false,
            }
        })
    }

    const _toggleNewTopic = () => changeTopics({
        ...topics,
        newTopic: null,
    })

    const _onChangeNewTopic = (key) => (value) => changeTopics({
        ...topics,
        newTopic: {
            ...topics.newTopic,
            [key]: value,
        },
    })

    const onSubmitTopic = async (e) => {
        e.preventDefault()

        const { newTopic } = topics
        const { success, data, message } = await createNewTopics(newTopic)
        if (!success) return alert(message)

        const addToTopic = (newTopic.addToMyTopics) ? await _addToMyTopics(data._id) : true
        if (addToTopic) return _fetchTopics()
    }

    const _onAddToMyTopics = async (id) => {
        const result = await _addToMyTopics(id)
        if (result) return _fetchTopics()
    }

    const _addToMyTopics = async (id) => {
        const { success, message } = await addTeacherToTopics([id])
        if (!success) alert(message)
        return success
    }

    const _onRemoveTeacherFromTopics = async (id) => {
        const { success, message } = await removeTeacherFromTopics([id])
        if (!success) alert(message)
        _fetchTopics()
        return success
    }

    const _onChangeCheckbox = (key) => (e) => {
        const { checked } = e.target
        changeTopics({
            ...topics,
            newTopic: {
                ...topics.newTopic,
                [key]: checked,
            },
        })
    }

    return (
        <div className="TeacherTopics container">
            <div className="Card">
                <div className="CardHeader">
                    <div className="TeacherTopicsHeader">
                        Quản lý chủ đề nghiên cứu
                        <button className="UserButton" onClick={_onClickAddTopic}>Thêm chủ đề mới</button>
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
                        <AllTopicsTable topics={topics.allTopics} onAdd={_onAddToMyTopics} onRemove={_onRemoveTopic} />
                    </div>}
                </div>

                {!tab && <TeacherTopicsTable topics={topics.teacherTopics} onRemove={_onRemoveTopic} onEdit={_onEditTopic} onUnsubcribe={_onRemoveTeacherFromTopics} />}
            </div>

            {!!topics.newTopic && <Modal title="Thêm chủ đề mới" onToggle={_toggleNewTopic}>
                <form onSubmit={onSubmitTopic}>
                    <Input id="new-topic" required value={topics.newTopic.name} onChange={_onChangeNewTopic('name')} label="Tên" />
                    <Input id="new-topic" value={topics.newTopic.description} onChange={_onChangeNewTopic('description')} label="Giới thiệu" />

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={!!topics.newTopic.addToMyTopics}
                            onChange={_onChangeCheckbox('addToMyTopics')} id={`teacher_topics-new`} />
                        <label className="custom-control-label" htmlFor={`teacher_topics-new`} >Thêm vào chủ đề nghiên cứu của tôi</label>
                    </div>

                    <button className="UserButton mt-2" type="submit">
                        Thêm chủ đề mới
                    </button>
                </form>
            </Modal>}
        </div>
    )
}

export default TeacherTopics