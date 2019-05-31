import { createApiService, createAuthApiService } from './index'

export const getFields = (args) => {
    return createApiService({
        method: 'get',
        url: '/fields',
        params: args,
    })
}

export const getFieldChild = (fieldId) => {
    return createApiService({
        method: 'get',
        url: `/fields/${fieldId}/children`,
    })
}

export const editField = (field) => {
    const { _id } = field

    return createApiService({
        method: 'patch',
        url: `/fields/${_id}`,
        data: field,
    })
}

export const createNewField = (field) => {
    return createAuthApiService({
        method: 'post',
        url: '/fields',
        data: field,
    })
}

export const removeField = (field) => {
    const { _id } = field

    return createAuthApiService({
        method: 'delete',
        url: `/fields/${_id}`,
    })
}