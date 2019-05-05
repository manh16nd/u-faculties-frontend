import {createApiService} from './index'

export const getDepartments = (args) => {
    return createApiService({
        url: '/departments',
        params: args,
        method: 'get',
    })
}
