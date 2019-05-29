import { createApiService, createAuthApiService } from './index'

export const getDepartments = (args) => {
    return createApiService({
        url: '/departments',
        params: args,
        method: 'get',
    })
}

export const getDepartmentTypes = () => {
    return createApiService({
        url: '/departments/types',
        method: 'get',
    })
}

export const editDepartment = (department) => {
    const { _id } = department

    return createAuthApiService({
        url: `/departments/${_id}`,
        method: 'patch',
        data: department,
    })
}

export const addDepartment = (department) => {
    return createAuthApiService({
        url: '/departments',
        method: 'post',
        data: department
    })
}

export const removeDepartment = (departmentId) => {
    return createAuthApiService({
        url: `/departments/${departmentId}`,
        method: 'delete',
    })
}