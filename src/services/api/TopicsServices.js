import { createApiService, createAuthApiService } from './index'

export const getAllTopics = (args) => {
    return createApiService({
        url: '/topics',
        params: args,
        method: 'get',
    })
}

export const removeTopic = (topicId) => {
    return createAuthApiService({
        url: `/topics/${topicId}`,
        method: 'delete',
    })
}