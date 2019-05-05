import {createApiService} from './index'

export const getTeachers = (args) => {
    return createApiService({
        url: '/teachers',
        params: args,
        method: 'get',
    })
}
