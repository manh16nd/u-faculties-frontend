import { createApiService } from './index'

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
