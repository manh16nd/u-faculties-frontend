import { createApiService, createAuthApiService } from './index'
import { getCookie } from '../cookies'

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

export const createNewTeacher = (data) => {
    return createAuthApiService({
        url: `/teachers`,
        method: 'post',
        data
    })
}

export const getTeacherTopics = ({ teacherId, params }) => {
    return createAuthApiService({
        url: `/teachers/${teacherId}/topics`,
        method: 'get',
        params,
    })
}

export const addTeacherToTopics = (topics) => {
    const teacherId = getCookie('teacher')

    return createAuthApiService({
        url: `/teachers/${teacherId}/topics`,
        method: 'post',
        data: { topics }
    })
}

export const removeTeacherFromTopics = (topics) => {
    const teacherId = getCookie('teacher')

    return createAuthApiService({
        url: `/teachers/${teacherId}/topics`,
        method: 'delete',
        data: { topics }
    })
}

export const getTeacherFields = () => {
    const teacherId = getCookie('teacher')

    return createAuthApiService({
        url: `/teachers/${teacherId}/fields`,
        method: 'get',
    })
}

export const addTeacherToFields = (fields) => {
    const teacherId = getCookie('teacher')

    return createAuthApiService({
        url: `/teachers/${teacherId}/fields`,
        method: 'post',
        data: { fields }
    })
}

export const removeTeacherFromFields = (fields) => {
    const teacherId = getCookie('teacher')

    return createAuthApiService({
        url: `/teachers/${teacherId}/fields`,
        method: 'delete',
        data: { fields }
    })
}