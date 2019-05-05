import axios from 'axios'

const baseUrl = 'https://u-faculties-backend.herokuapp.com'

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
