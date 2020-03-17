import request from "@/utils/request";
import axios from "axios";
import { getToken } from "@/utils/auth";

export function fetchList(params) {
    return request({
        url: "/omsRefund/list",
        method: "get",
        params: params
    });
}
export function getSingleData(params) {
    return request({
        url: "/omsRefund/select/" + params,
        method: "get"
    });
}
export function downLoad(params) {
    return axios({
        methods: 'get',
        url: '/api/omsRefund/downLoad',
        headers: {
            Authorization: getToken()
        },
        data: params,
        responseType: 'blob'
    })
}
export function lookBackingMoney(params) {
    return request({
        method: 'patch',
        url: '/omsRefund/updateOrderStatus/',
        data: params
    })
}