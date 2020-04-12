import http from './http.js';

export default {
    apiUrl: '/api',
    juheUrl: '/juhe',
    apishopUrl: '/apishop',
    nodeUrl: '/node',
    getCookie() {//查询登录状态
        let url = this.nodeUrl + '/cookie';
        return http.get({
            url: url,
        })
    },
    getOtherProject() {//其他平台跳转链接
        let url = this.nodeUrl + '/other/project';
        return http.get({
            url: url,
        })
    },
    postLogOut() {//退出登录
        let url = this.nodeUrl + '/loginOut';
        return http.post({
            url: url,
        })
    },
    getComments() {//jsonplaceholder查询分页
        let url = this.apiUrl + '/comments';
        return http.get({
            url: url,
        })
    },
    getJapiToh(body) {//历史上的今天查询分页
        let url = this.juheUrl + '/japi/toh';
        return http.get({
            url: url,
            body:body
        })
    },
    getCommonJokeGetJokes(body) {//笑话查询分页
        let url = this.apishopUrl + '/common/joke/getJokes';
        return http.get({
            url: url,
            body:body
        })
    }
}