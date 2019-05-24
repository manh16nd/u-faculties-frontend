import {createApiService} from './index'

export const getAuthLogin = (args) => {
    return createApiService({
        url: '/auth/login',
        params: args,
        method: 'get',
    })
}
