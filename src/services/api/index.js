import axios from 'axios'
import { getCookie, removeCookie } from '../cookies'

const baseUrl = process.env.REACT_APP_BACKEND || 'http://127.0.0.1:3000'

export const createApiService = async ({ url, method, data, params, authorization }) => {
    const Authorization = `Bearer ${authorization}`
    try {
        const resp = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
            headers: {
                Authorization,
            }
        })

        return resp.data
    } catch (e) {
        return {
            success: false,
            message: e.message || e,
        }
    }
}

export const createAuthApiService = async ({ url, method, data, params, contentType }) => {
    const Authorization = `Bearer ${getCookie('token')}`
    const content = contentType ? {
        'Content-Type': contentType
    } : {}

    try {
        const resp = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
            headers: { Authorization, ...content }
        })

        return resp.data
    } catch (e) {
        const { response } = e
        if (response.status === 403) {
            removeCookie('token')
            removeCookie('username')
            removeCookie('type')
            window.location.reload()
        }

        return {
            success: false,
            message: e.message || e,
        }
    }
}
