import {createApiService} from './index'

export const login = ({username, password}) => {
    return createApiService({
        method: 'post',
        url: `/auth/login`,
        data: {username, password}
    })
}
