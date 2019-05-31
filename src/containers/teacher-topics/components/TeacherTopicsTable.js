import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/input/components/Input'
import Modal from '../../../components/modal/components/Modal'

const TeacherTopicsTable = function (props) {
    const [edit, changeEdit] = useState({})

    const { topics, onRemove, onUnsubcribe } = props

    const onClickChange = (topic) => () => {
        const editTopic = { ...topic }
        changeEdit(editTopic)
    }

    const _onClickTrash = (topic) => () => {
        if (!topic || !topic._id) return null
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn vị: ' + topic.name)) onRemove(topic._id)
    }

    const _onClickRemoveTeacherTopic = (topic) => () => {
        if (!topic || !topic._id) return null
        if (window.confirm('Bạn có chắc chắn muốn ngừng tham gia: ' + topic.name)) onUnsubcribe(topic._id)
    }

    const _changeInput = (key) => (value) => changeEdit({
        ...edit,
        [key]: value,
    })

    const _onSubmit = (e) => {
        e.preventDefault()
        if (props.onEdit(edit)) changeEdit({})
    }

    const _toggle = () => changeEdit({})

    return (
        <div className="TeacherTopicsTable">
            {!!edit._id && <Modal title="Sửa chủ đề" onToggle={_toggle}>
                <form onSubmit={_onSubmit}>
                    <Input value={edit.name} label="Tên chủ đề" onChange={_changeInput('name')} required />
                    <Input value={edit.description} label="Tên chủ đề" onChange={_changeInput('description')} />
                    <button className="UserButton" type="submit">
                        Sửa chủ đề
                    </button>
                </form>
            </Modal>}
            <div className="TableWrapper">
                <table className="Table">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {topics.map((topic) => <tr key={topic._id} className="">
                            <td>
                                {topic.name}
                            </td>
                            <td>
                                {topic.description}
                            </td>
                            <td>
                                <div className="ActionsWrapper"> <div>
                                    <button className="UserButton" onClick={onClickChange(topic)}>
                                        <i className="ti-pencil" />
                                    </button>
                                    <button className="UserButton" onClick={_onClickTrash(topic)}>
                                        <i className="ti-trash" />
                                    </button>
                                    <button className="UserButton" onClick={_onClickRemoveTeacherTopic(topic)}>
                                        Không tham gia
                                    </button>
                                </div>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

TeacherTopicsTable.propTypes = {
    topics: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onUnsubcribe: PropTypes.func.isRequired,
}

export default TeacherTopicsTable