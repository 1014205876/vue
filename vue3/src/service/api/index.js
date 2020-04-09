
import http from "./http";

export default {
    data() {
        return {

        };
    },
    async getCookie() {//查询登录状态
        let url = '/node/cookie';
        let promise = new Promise((resolve, reject) => {
            http.get({ url: url, body: { id: 123 } });
        });
        console.log(promise)
        return promise
    }

};
