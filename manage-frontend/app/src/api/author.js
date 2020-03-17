import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/v1/china/listAll',
        method: 'get',
        params: params
    })
}
export function switchStatus(id, params) {
    return request({
        url: '/v1/china/' + id,
        method: 'patch',
        data: params
    })
}
export function deleteAuthor(id) {
    return request({
        url: '/v1/china/' + id,
        method: 'delete'
    })
}
export function getSingleAuthor(id) {
    return request({
        url: '/v1/china/' + id,
        method: 'get'
    })
}
export function addAuthor(params) {
    return request({
        url: '/v1/china/',
        method: 'post',
        data: params
    })
}
export function putAuthorInfo(params) {
    return request({
        url: '/v1/china/'+params.id,
        method: 'put',
        data: params
    })
}