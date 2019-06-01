import { createApiService, createAuthApiService } from './index'

export const uploadExcel = ( data ) => {
    return createAuthApiService({
        url: `/teachers/excel`,
        method: 'post',
        data,
    })
}