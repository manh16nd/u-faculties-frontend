import {createApiService, createAuthApiService} from './index'

export const login = ({username, password}) => {
    return createApiService({
        method: 'post',
        url: `/auth/login`,
        data: {username, password}
    })
}

export const verifyUser = () => {
    return createAuthApiService({
        method: 'get',
        url: '/auth/verify',
    })
}

export const getCurrentTeacherInfo = () => {
    return createAuthApiService({
        method: 'get',
        url: '/auth/teacherInfo'
    })
}