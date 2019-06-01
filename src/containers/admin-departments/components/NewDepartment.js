import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../../../components/input/components/Input';
import Select from '../../../components/select/components/Select'

const NewDepartment = function (props) {
    const { types, onSubmit } = props
    const [_department, _setDepartment] = useState({})

    const _onChangeInput = (key) => (value) => _setDepartment({ ..._department, [key]: value })

    const _submit = (e) => {
        e.preventDefault()
        onSubmit(_department)
    }


    const parsedTypes = types.map((type) => ({
        value: type,
        title: type,
    }))

    return (
        <div className="NewDepartment container">
            <form onSubmit={_submit} className="row">
                <div className="col-6">
                    <Input required id="new-department-name" value={_department.name || ''} onChange={_onChangeInput('name')} label="Tên đơn vị" />
                </div>
                <div className="col-6">
                    <Select required id="new-department-type" value={_department.type || ''} onChange={_onChangeInput('type')} label="Loại đơn vị" options={parsedTypes} />
                </div>
                <div className="col-6">
                    <Input id="new-department-phone" value={_department.phone || ''} onChange={_onChangeInput('phone')} label="Điện thoại" />
                </div>
                <div className="col-6">
                    <Input id="new-department-address" value={_department.address || ''} onChange={_onChangeInput('address')} label="Địa chỉ" />
                </div>
                <div className="col-6">
                    <Input id="new-department-website" value={_department.website || ''} onChange={_onChangeInput('website')} label="Website" />
                </div>
                <div className="col-6">
                    <button className="UserButton" type="submit">Lưu</button>
                </div>
            </form>
        </div>
    )
}

NewDepartment.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default NewDepartment