import React from 'react'
import PropTypes from 'prop-types'

const Modal = function (props) {
    const { title, children, onToggle } = props

    const _onClickToggle = () => {
        typeof onToggle === 'function' && onToggle()
    }

    return (
        <div className="Modal" onClick={_onClickToggle}>
            <div className="ModalWrapper">
                <div className="Card">
                    <div className="CardHeader">
                        {title}
                    </div>
                    <div className="CardBody">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
}

export default Modal