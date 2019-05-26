import React from 'react'
import PropTypes from 'prop-types'

const Input = function (props) {
    const change = (e) => {
        const { value } = e.target
        props.onChange(value)
    }

    const { value, label, id } = props

    return (
        <div className="Input">
            <label htmlFor={id}>{label}</label>
            <input onChange={change} id={id} value={value} />
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Input