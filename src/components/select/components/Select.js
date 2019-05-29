import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Select = function (props) {
    const { value, label, id, onChange, options } = props

    useEffect(() => {
        changeDefault()
    }, [])

    const changeDefault = () => {
        if (!options.length) return
        onChange(options[0].value)
    }

    const change = (e) => {
        const { value } = e.target
        onChange(value)
    }

    return (
        <div className="Select">
            {!!label && <label htmlFor={id}>{label}</label>}
            <select value={value} id={id} onChange={change}>
                {options.map((option) => <option key={option.value} value={option.value}>
                    {option.title}
                </option>)}
            </select>
        </div>
    )
}

Select.defaultProps = {
    label: '',
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default Select 