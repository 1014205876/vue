import request from './request.js';

export default {
    nodeUrl: '/node',
    login() {
        let url = this.nodeUrl + '/cookie';
        return request.get({
            url: url
        })
    }
}