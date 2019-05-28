import { createApiService } from './index'

export const getAllTopics = (args) => {
    return createApiService({
        url: '/topics',
        params: args,
        method: 'get',
    })
}