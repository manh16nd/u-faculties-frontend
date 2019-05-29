import React from 'react'
import PropTypes from 'prop-types'
import TeacherInput from './TeacherInput'

const TeacherModal = (props) => {

    const _onChangeInput = (key) => (value) => {

    }

    const { open } = props

    if (!open) return null

    const _onClickToggle = () => {
        props.toggle()
    }

    return (
        <div className="TeacherModal" onClick={_onClickToggle}>
            <div className="ModalWrapper">
                <div className="ModalHeader">
                    <div className="ModelTitle">
                        Title
                    </div>
                    <div className="CloseButton">
                        <i className="ti-close" />
                    </div>
                </div>
                <div className="ModalBody">
                    <form className="TeacherForm">
                        <TeacherInput label="Tên giảng viên" id="teacher" value={''} onChange={_onChangeInput('name')} />
                    </form>
                </div>
            </div>
        </div>
    )
}

TeacherModal.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
}

export default TeacherModal