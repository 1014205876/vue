import axios from "axios";
// 创建axios实例
const server = axios.create({
    // baseURL: '/api', // api的base_url
    // timeout: 15000 // 请求超时时间
});

// request拦截器
server.interceptors.request.use(//发送时的拦截
    (config) => {
        return config;
    }, (error) => {
        Promise.reject(error);
    }
);

// respone拦截器
server.interceptors.response.use(//返回时的拦截
    (response) => {
        return response.data;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default {
    header: {
        'Content-Type': 'application/json'
    },
    // data={url, body, header}
    get(data) {
        return server({
            method: "get",
            header: data.header || this.header,
            url: data.url,
            params: data.body
        });
    },
    post(data) {
        return server({
            method: "post",
            header: data.header || this.header,
            url: data.url,
            data: data.body
        });
    },
    put(data) {
        return server({
            method: "put",
            header: data.header || this.header,
            url: data.url,
            data: data.body
        });
    },
    patch(data) {
        return server({
            method: "patch",
            header: data.header || this.header,
            url: data.url,
            data: data.body
        });
    },
    delete(data) {
        return server({
            method: "delete",
            header: data.header || this.header,
            url: data.url,
            data: data.body
        });
    },
}
