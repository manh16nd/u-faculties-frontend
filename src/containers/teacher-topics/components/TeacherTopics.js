import React, { useState } from 'react'
import classnames from 'classnames'

const TeacherTopics = function (props) {
    const [tab, changeTab] = useState(0)

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