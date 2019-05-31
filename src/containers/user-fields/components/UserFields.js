import React, { useState, useEffect } from 'react'
import { getFields, getFieldChild } from '../../../services/api/FieldsServices'

const UserFields = function (props) {
    const [_fields, setFields] = useState({
        entity: [],
        total: 0,
        flatEntity: [],
    })

    useEffect(() => {
        _fetchFields()
    }, [])

    const _fetchFields = async () => {
        const { success, data, message } = await getFields()
        if (success) {
            const { fields, total } = data
            const flatEntity = fields.reduce((result, item) => ({
                ...result,
                [item._id]: {
                    level: 0,
                    parent: null,
                    data: { ...item },
                }
            }), {})
            const entity = fields.map((item) => ({
                ...item,
                children: [],
            }))

            return setFields({
                ..._fields,
                entity,
                total,
                flatEntity,
            })
        }

        alert(message)
    }

    const _fetchChildrenFields = (fieldId) => async () => {
        console.log(fieldId)
        const { success, data, message } = await getFieldChild(fieldId)
        if (!success) return alert(message)

        const entity = _fields.entity.map((field) => {
            if (field._id !== fieldId) return field
            return {
                ...field,
                children: [...data],
            }
        })

        return setFields({
            ..._fields,
            entity,
        })
    }

    const _renderField = (field) => {
        return <div className="FieldWrapper" key={field._id}>
            <div className="Card">
                <div className="CardHeader">
                    <div className="FieldHeader">
                        <span>{field.name}</span>
                        <span className="ExpandButton" onClick={_fetchChildrenFields(field._id)}><i className="ti-angle-down" /></span>
                    </div>
                </div>
                {!!field.children.length &&
                    <div className="CardBody">
                        <div className="FieldBody">
                            {field.children.map((child) => <div key={child._id}>
                                {child.name}
                            </div>)}
                        </div>
                    </div>
                }
            </div>
        </div>
    }

    return (
        <div className="UserFields">
            <div className="Card">
                <div className="CardHeader">
                    Quản lý lĩnh vực nghiên cứu
                </div>
            </div>

            <div className="FieldsWrapper container">
                {_fields.entity.map((field) => _renderField(field))}
            </div>

        </div>
    )
}

export default UserFields