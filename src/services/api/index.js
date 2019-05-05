import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND

export const createApiService = async ({url, method, data, params}) => {
    try {
        const resp = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
        })

        return resp.data
    } catch (e) {
        return {
            success: false,
            message: e.message || e,
        }
    }
}
