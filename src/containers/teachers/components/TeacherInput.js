import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TeacherInput = function (props) {
    const { label, id, value } = props

    const [state, setState] = useState({ value })

    const _onChangeInput = (e) => {
        setState({
            value: e.target.value
        })
    }

    return (
        <div className="TeacherInput">
            <div className="Input">
                <label htmlFor={id}>{label}</label>
                <input id={id} value={state.value} onChange={_onChangeInput} />
            </div>
        </div>
    )
}

TeacherInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default TeacherInput