import request from "@/utils/request";
export function fetchList(params) {
    return request({
        url: "/v1/member/listAll",
        method: "get",
        params: params
    });
}
export function patchStatus(params) {
    return request({
        url: "/v1/member/"+params.id,
        method: "patch",
        data:{
            status:params.status
        }
    });
}
export function getOrderList(params) {
    return request({
        url: "/order/list/"+params.id,
        method: "get"
    });
}
export function getAddressList(params) {
    return request({
        url: "/v1/member/address/"+params.id,
        method: "get"
    });
}
