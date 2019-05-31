import React, { useState, useEffect } from 'react'
import { getFields } from '../../../services/api/FieldsServices'
import { getTeacherFields, addTeacherToFields, removeTeacherFromFields } from '../../../services/api/TeachersServices'

const TeacherFields = function (props) {
    const [_fields, setFields] = useState({
        entity: [],
        total: 0,
        flatEntity: [],
        current: null,
        newField: null,
        addingNew: false,
        teacherFields: [],
    })

    useEffect(() => {
        _fetchFields()
    }, [])

    const _flatten = (fields) => {
        let result = []
        fields.forEach((field) => {
            result.push(field._id)
            const children = field.children ? _flatten(field.children) : []
            result = [...result, ...children]
        })

        return result
    }

    const _fetchFields = async () => {
        const { success, data, message } = await getFields()
        const teacherFields = await getTeacherFields()

        if (success && teacherFields.success) {
            const { fields, total } = data
            const flatEntity = _flatten([...fields])
            const flatMap = [...flatEntity].reduce((object, item) => {
                return { ...object, [item]: false }
            }, {})

            const entity = [...fields]
            const teacherFieldsMap = teacherFields.data.reduce((result, item) => ({ ...result, [item._id]: true }), {})

            return setFields({
                ..._fields,
                entity,
                total,
                teacherFields: teacherFieldsMap,
                flatEntity: { ...flatMap, ..._fields.flatEntity },
                current: null,
                newField: null,
            })
        }

        alert(message || teacherFields.message)
    }

    const _expand = (id) => () => {
        const { flatEntity } = _fields
        const value = !flatEntity[id]

        setFields({
            ..._fields,
            flatEntity: { ...flatEntity, [id]: value }
        })
    }

    const _onChangeCheckbox = (id) => (e) => {
        const { checked } = e.target

        return _submitChangeCheckbox(id, checked)
    }

    const _submitChangeCheckbox = async (fieldId, checked) => {
        const { teacherFields } = _fields
        const request = checked ? addTeacherToFields([fieldId]) : removeTeacherFromFields([fieldId])
        const { success, message } = await request
        if (!success) return alert(message)

        setFields({
            ..._fields,
            teacherFields: { ...teacherFields, [fieldId]: checked }
        })
    }

    const _renderChildren = (field) => {
        const { flatEntity, teacherFields } = _fields
        const isThereSubField = field.children && field.children.length

        return (
            <div className="FieldChildren">
                <div className="FieldTitle">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={!!teacherFields[field._id]}
                            onChange={_onChangeCheckbox(field._id)} id={`teacher_field-${field._id}`} />
                        <label className="custom-control-label" htmlFor={`teacher_field-${field._id}`} >{field.name}</label>
                    </div>


                    <div className="FieldButtons">
                        <span onClick={_expand(field._id)} className="ExpandButton"><i className="ti-angle-down" /></span>
                    </div>
                </div>
                {!!flatEntity[field._id] &&
                    <div className="FieldBody">
                        {isThereSubField ? field.children.map((child) => <div key={child._id}>
                            {_renderChildren(child)}
                        </div>) : <div className="text-muted font-italic">
                                Không có lĩnh vực con
                            </div>}
                    </div>}
            </div>
        )
    }

    const _renderField = (field) => {
        const { flatEntity, teacherFields } = _fields
        const isThereSubField = field.children && field.children.length

        return <div className="FieldWrapper" key={field._id}>
            <div className="Card">
                <div className="CardHeader">
                    <div className="FieldHeader">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked={!!teacherFields[field._id]}
                                onChange={_onChangeCheckbox(field._id)} id={`teacher_field-${field._id}`} />
                            <label htmlFor={`teacher_field-${field._id}`} className="custom-control-label">{field.name}</label>
                        </div>

                        <div className="FieldButtons">
                            <span onClick={_expand(field._id)} className="ExpandButton"><i className="ti-angle-down" /></span>
                        </div>
                    </div>
                </div>
                {!!flatEntity[field._id] &&
                    <div className="CardBody">
                        <div className="FieldBody">
                            {isThereSubField ? field.children.map((child) => <div key={child._id}>
                                {_renderChildren(child)}
                            </div>) : <div className="text-muted font-italic">
                                    Không có lĩnh vực con
                            </div>}
                        </div>
                    </div>}
            </div>
        </div>
    }

    return (
        <div className="UserFields">
            <div className="Card">
                <div className="CardHeader">
                    <span>Quản lý lĩnh vực nghiên cứu</span>
                </div>
            </div>

            <div className="FieldsWrapper container">
                {_fields.entity.map((field) => _renderField(field))}
            </div>
        </div>
    )
}

export default TeacherFields