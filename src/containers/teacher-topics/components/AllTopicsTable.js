import React from 'react'
import PropTypes from 'prop-types'

const AllTopicsTable = function (props) {
    const { topics } = props

    return (
        <div className="AllTopicsTable">
            {topics.map((item) => <div key={item._id} className="row Topic">
                <div className="col-3">
                    <button className="UserButton">
                        Thêm vào chủ đề của bạn
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
}

export default AllTopicsTable