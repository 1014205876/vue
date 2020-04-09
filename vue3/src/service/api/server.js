import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到

axios.defaults.baseURL = 'https://book.supercustomer.cn'; //

//封装请求方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}