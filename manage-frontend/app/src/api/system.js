import request from "@/utils/request";
export function fetchList(params) {
    return request({
        url: "/systemSetting/list",
        method: "get",
        params: params
    });
}
export function addSetting(params) {
    return request({
        url: "/systemSetting/insert",
        method: "post",
        data: params
    });
}
export function patchSetting(params) {
    return request({
        url: "/systemSetting/patch/"+params.id,
        method: "patch",
        data: params
    });
}
export function deleteSetting(params) {
    return request({
        url: "/systemSetting/delete/"+params,
        method: "delete"
    });
}
// 帮助管理
//分页查询帮助列表
export function getHelpGrid(params) {
    return request({
        url: "/v1/helpGrid",
        method: "get",
        params: params
    });
}
//添加帮助
export function postHelp(params) {
    return request({
        url: "/v1/help",
        method: "post",
        data: params
    });
}
//修改帮助
export function putHelpModifyId(params) {
    return request({
        url: "/v1/help/"+params.id,
        method: "put",
        data: params
    });
}
//删除帮助
export function deleteHelp(id) {
    return request({
        url: "/v1/help/"+id,
        method: "delete"
    });
}