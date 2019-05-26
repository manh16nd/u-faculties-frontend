import { createApiService, createAuthApiService } from './index'

export const getTeachers = (args) => {
    return createApiService({
        url: '/teachers',
        params: args,
        method: 'get',
    })
}


export const uploadTeacherAvatar = ({ teacherId, avatar }) => {
    return createAuthApiService({
        url: `/teachers/${teacherId}/avatar`,
        method: 'post',
        data: avatar,
        contentType: 'multipart/form-data',
    })
}

export const editTeacherInfo = ({ teacherId, data }) => {
    return createAuthApiService({
        url: `/teachers/${teacherId}`,
        method: 'patch',
        data,
    })
}

export const getTeacherTopics = ({ teacherId, params }) => {
    return createAuthApiService({
        url: `/teachers/${teacherId}/topics`,
        method: 'get',
        params,
    })
}