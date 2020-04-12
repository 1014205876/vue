import request from './request';
export default {
    login() {
        return request({
            url: '/admin/login',
            method: 'post',
            data: {
                username,
                password
            }
        });
    }
}