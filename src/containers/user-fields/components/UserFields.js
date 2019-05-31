import React, { useState, useEffect } from 'react'
import Input from '../../../components/input/components/Input'
import { getFields, editField, createNewField } from '../../../services/api/FieldsServices'
import Modal from '../../../components/modal/components/Modal';

const UserFields = function (props) {
    const [_fields, setFields] = useState({
        entity: [],
        total: 0,
        flatEntity: [],
        current: null,
        newField: null,
        addingNew: false,
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
        if (success) {
            const { fields, total } = data
            const flatEntity = _flatten([...fields])
            const flatMap = [...flatEntity].reduce((object, item) => {
                return { ...object, [item]: false }
            }, {})

            const entity = [...fields]

            return setFields({
                ..._fields,
                entity,
                total,
                flatEntity: { ...flatMap, ..._fields.flatEntity },
                current: null,
                newField: null,
            })
        }

        alert(message)
    }

    const _expand = (id) => () => {
        const { flatEntity } = _fields
        const value = !flatEntity[id]

        setFields({
            ..._fields,
            flatEntity: { ...flatEntity, [id]: value }
        })
    }

    const _onClickAddChild = (field) => () => {
        const { flatEntity } = _fields
        const { _id: id } = field

        setFields({
            ..._fields,
            flatEntity: { ...flatEntity, [id]: true },
            newField: {
                parent: id,
                name: '',
            },
        })
    }

    const _onChangeNewField = (value) => {
        setFields({
            ..._fields,
            newField: {
                ..._fields.newField,
                name: value,
            },
        })
    }

    const _submitNewField = async (e) => {
        e.preventDefault()
        setFields({
            ..._fields,
            addingNew: true,
        })

        const { newField } = _fields
        const { success, message } = await createNewField(newField)

        setFields({
            ..._fields,
            addingNew: false,
        })
        if (success) return _fetchFields()
        alert(message)
    }

    const _onClickChange = (field) => () => {
        setFields({
            ..._fields,
            current: { ...field },
        })
    }

    const _onChangeInput = (value) => {
        const { current } = _fields

        setFields({
            ..._fields,
            current: { ...current, name: value }
        })
    }

    const _onSubmit = async (e) => {
        e.preventDefault()

        const { current } = _fields
        const { success, message } = await editField(current)

        if (success) { return _fetchFields() }
        alert(message)
    }

    const _renderChildren = (field) => {
        const { flatEntity, current } = _fields
        const isThereSubField = field.children && field.children.length
        const isEditting = current && current._id === field._id

        return (
            <div className="FieldChildren">
                <div className="FieldTitle">
                    {isEditting ? <form onSubmit={_onSubmit}>
                        <Input id={current._id} value={current.name} onChange={_onChangeInput} />
                    </form> : <span onClick={_expand(field._id)}>{field.name}</span>}
                    <div className="Buttons">
                        <button className="UserButton" onClick={_onClickChange(field)}>Change</button>
                        <button className="UserButton" onClick={_onClickAddChild(field)}>Add sub</button>
                        <button className="UserButton">Remove</button>
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
        const { flatEntity, current } = _fields
        const isThereSubField = field.children && field.children.length
        const isEditting = current && current._id === field._id

        return <div className="FieldWrapper" key={field._id}>
            <div className="Card">
                <div className="CardHeader">
                    <div className="FieldHeader">
                        {isEditting ? <form onSubmit={_onSubmit}>
                            <Input id={current._id} value={current.name} onChange={_onChangeInput} />
                        </form> : <span>{field.name}</span>}

                        <div className="FieldButtons">
                            <div className="Buttons">
                                <button className="UserButton" onClick={_onClickChange(field)}>Change</button>
                                <button className="UserButton" onClick={_onClickAddChild(field)}>Add sub</button>
                                <button className="UserButton">Remove</button>
                            </div>
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
                    Quản lý lĩnh vực nghiên cứu
                </div>
            </div>

            <div className="FieldsWrapper container">
                {_fields.entity.map((field) => _renderField(field))}
            </div>
            {!!_fields.newField && <Modal title="Thêm mới lĩnh vực">
                <form onSubmit={_submitNewField}>
                    <div className="NewFieldWrapper">
                        <Input label="Tên lĩnh vực" value={_fields.newField.name} onChange={_onChangeNewField} />
                        <button disabled={_fields.addingNew} className="UserButton">{_fields.addingNew ? 'Đang thêm' : 'Thêm mới'}</button>
                    </div>
                </form>
            </Modal>}
        </div>
    )
}

export default UserFields