import axios from "axios";
// 创建axios实例
const server = axios.create({
    // baseURL: '/api', // api的base_url
    // timeout: 15000 // 请求超时时间
});

// request拦截器
server.interceptors.request.use(
    (config) => {
        console.log(config);
        return config;
    }, (error) => {
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
server.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    }, (error) => {
        console.log(error); // for debug
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
