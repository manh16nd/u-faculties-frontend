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

export const createNewTopics = (topic) => {
    return createAuthApiService({
        url: `/topics`,
        method: 'post',
        data: topic
    })
}

export const editTopics = (topic) => {
    const { _id } = topic

    return createAuthApiService({
        url: `/topics/${_id}`,
        method: 'patch',
        data: topic
    })
}