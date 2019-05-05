import {createApiService} from './index'

export const getFields = (args) => {
    return createApiService({
        method: 'get',
        url: '/fields',
        params: args,
    })
}
