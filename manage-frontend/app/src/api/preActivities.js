import request from "@/utils/request";
export function fetchList(params) {
    return request({
        url: "/productReserveActivity/list",
        method: "get",
        params: params
    });
}
export function addActivities(params) {
    return request({
        url: "/productReserveActivity/create",
        method: "post",
        data: params
    });
}
export function updateActivities(params) {
    return request({
        url: "/productReserveActivity/update",
        method: "patch",
        data: params
    });
}
export function updateSwitchActivities(params) {
    return request({
        url: "/productReserveActivity/update/" + params.id,
        method: "patch",
        data: { status: params.status }
    });
}

export function idGetActivities(params) {
    return request({
        url: "/productReserveActivity/updateInfo/" + params,
        method: "get"
    });
}
