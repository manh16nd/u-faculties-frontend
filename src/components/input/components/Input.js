import React from 'react'
import PropTypes from 'prop-types'

const Input = function (props) {
    const change = (e) => {
        const { value } = e.target
        props.onChange(value)
    }

    const { value, label, id, type, required } = props

    const _onKeyDown = (e) => {

    }

    return (
        <div className="Input">
            {!!label && <label htmlFor={id}>{label}</label>}
            <input onChange={change} id={id} value={value} autoComplete="off" type={type} required={required} onKeyDown={_onKeyDown} />
        </div>
    )
}

Input.defaultProps = {
    required: false,
    type: 'text',
    label: '',
    onKeyDown: () => { },
    ref: (e) => { },
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    onKeyDown: PropTypes.func
}

export default Input