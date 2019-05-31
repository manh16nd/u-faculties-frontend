import React from 'react'
import PropTypes from 'prop-types'

const AllTopicsTable = function (props) {
    const { topics, onAdd, onRemove } = props

    const _onClickAddToMyTopics = (topic) => () => {
        onAdd(topic)
    }

    const _onRemoveTopic = (topic) => () => {
        if (window.confirm(`Bạn muốn xóa chủ đề ${topic.name}?`)) return onRemove(topic._id)
    }

    return (
        <div className="AllTopicsTable">
            {topics.map((item) => <div key={item._id} className="row Topic">
                <div className="col-3">
                    <button className="UserButton mb-2" onClick={_onClickAddToMyTopics(item._id)}>
                        Thêm vào chủ đề của bạn
                    </button>
                    <button className="UserButton" onClick={_onRemoveTopic(item)}>
                        Xoá chủ đề
                    </button>
                </div>

                <div className="col-9 Info">
                    <div className="Text row">
                        <label className="col-2 text-muted font-italic">Tên: </label>
                        <span className="Title">{item.name}</span>
                    </div>
                    <div className="Text row">
                        <label className="col-2 text-muted font-italic">Mô tả: </label>
                        {item.description}
                    </div>
                </div>
            </div>)
            }
        </div >
    )
}

AllTopicsTable.propTypes = {
    topics: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default AllTopicsTable