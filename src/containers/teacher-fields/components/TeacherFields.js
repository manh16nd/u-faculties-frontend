import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { getFields } from '../../../services/api/FieldsServices'

const TeacherFields = function (props) {
    const [fields, changeFields] = useState({
        limit: 0,
        page: 1,
        data: [],
        flatData: [],
    })

    useEffect(() => {
        fetchAllFields()
    }, [])

    const fetchAllFields = async () => {
        const { success, data, message } = await getFields()
        if (success) {
            const flatData = data.fields.map((item) => ({ ...item, level: 0 }))
            return changeFields({
                ...fields,
                data: [...data.fields],
                flatData: flatData,
            })
        }

        return alert(message)
    }

    const formatField = (field) => {
        const { flatData } = fields
        const current = flatData.find((item) => item._id === field._id)
        const level = current ? current.level : 0

        return <div className={classnames("Field", `Level-${level}`)} key={field._id}>
            {field._id}
        </div>
    }

    return (
        <div className="TeacherFields container">
            <div className="Card">
                <div className="CardHeader">Cập nhật lĩnh vực nghiên cứu</div>
                <div className="CardBody">
                    {fields.data.map((field) => formatField(field))}
                </div>
            </div>
        </div>
    )
}

export default TeacherFields