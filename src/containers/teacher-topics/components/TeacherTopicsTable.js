import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/input/components/Input'

const TeacherTopicsTable = function (props) {
    const [edit, changeEdit] = useState({})

    const { topics } = props

    const onClickChange = (topic) => () => {
        const editTopic = { ...topic }
        changeEdit(editTopic)
    }

    const onChangeEdit = (key) => (value) => {
        changeEdit({
            ...edit,
            [key]: value,
        })
    }

    return (
        <div className="TeacherTopicsTable">
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
                                {edit._id ? <Input value={edit.name} onChange={onChangeEdit('name')} /> : topic.name}
                            </td>
                            <td>
                                {edit._id ? topic.description : topic.description}
                            </td>
                            <td>
                                <div className="ActionsWrapper">
                                    {edit._id ? <div>
                                        <button className="UserButton">
                                            <i className="ti-save" />
                                        </button>
                                        <button className="UserButton" onClick={onClickChange({})}>
                                            <i className="ti-close" />
                                        </button>
                                    </div> : <div>
                                            <button className="UserButton" onClick={onClickChange(topic)}>
                                                <i className="ti-pencil" />
                                            </button>
                                            <button className="UserButton">
                                                <i className="ti-trash" />
                                            </button>
                                        </div>}
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
}

export default TeacherTopicsTable