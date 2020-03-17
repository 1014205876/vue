import request from "@/utils/request";
export function fetchList(params) {
    return request({
        url: "v1/news/listAll",
        method: "get",
        params: params
    });
}
export function getSingleInfo(params) {
    return request({
        url: "v1/news/" + params,
        method: "get"
    });
}
export function addInfo(params) {
    return request({
        url: "v1/news/",
        method: "post",
        data: params
    });
}
export function putInfo(params) {
    return request({
        url: "v1/news/" + params.id,
        method: "put",
        data: params
    });
}
export function deleteInfo(params) {
    return request({
        url: "v1/news/" + params,
        method: "delete"
    });
}
export function switchStatus(params) {
    return request({
        url: "v1/news/" + params.id,
        method: "patch",
        data: { publishStatus: params.publishStatus }
    });
}