import React from 'react'
import PropTypes from 'prop-types'

const Modal = function (props) {
    const { title, children } = props

    return (
        <div className="Modal">
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
}

export default Modal