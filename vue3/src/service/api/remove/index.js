
import http from "./http";

export default {
    data() {
        return {

        };
    },
    async getCookie() {//查询登录状态
        let url = '/node/cookie';
       let res= http.get({ url: url, body: { id: 123 } })
    console.log(res);
    }

};
