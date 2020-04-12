import axios from "axios";

let header
export default {
    header: { 'Content-Type': 'application/json' },
    data() {
        return {
            header: { 'Content-Type': 'application/json' },
        }
    },
    // data={url, body, header}
    // get(data) {
    //     axios({
    //         method: "get",
    //         header: data.header,
    //         url: data.url+this.toQueryString(data.body)
    //     }).then((res) => {
    //         httpSuccess(res);
    //     }).catch((err) => {
    //         this.httpErr(err);
    //     });
    // },
    //   axios.get('/api/survey/list/', {
    //     params: data
    //   }).then((res) => {
    //     console.log(res)
    //     this.tableData = res.data.result
    //     this.totalData = res.data.count
    //   }).catch((err) => {
    //     console.log(err)
    //     alert('请求出错！')
    //   })
    get(data) {

        // let promise = new Promise((resolve, reject) => {
            axios({
                method: "get",
                header: data.header || this.header,
                url: data.url,
                params: data.body
            // })
        // });
        // return promise
        }).then((res) =>
            this.httpSuccess(res)
        ).catch((err) => {
            this.httpErr(err);
        });
    },
    post(data) {
        axios({
            method: "post",
            header: data.header || this.header,
            url: data.url,
            data: body,
        }).then((res) => {
            this.httpSuccess(res);
        }).catch((err) => {
            this.httpErr(err);
        });
    },
    put(data) {
        axios({
            method: "put",
            header: data.header || this.header,
            url: data.url,
            data: body,
        }).then((res) => {
            this.httpSuccess(res);
        }).catch((err) => {
            this.httpErr(err);
        });
    },
    patch(data) {
        axios({
            method: "patch",
            header: data.header || this.header,
            url: data.url,
            data: body,
        }).then((res) => {
            this.httpSuccess(res);
        }).catch((err) => {
            this.httpErr(err);
        });
    },
    delete(data) {
        axios({
            method: "delete",
            header: data.header || this.header,
            url: data.url,
            data: body,
        }).then((res) => {
            this.httpSuccess(res);
        }).catch((err) => {
            this.httpErr(err);
        });
    },
    toQueryString(obj) {
        let ret = [];
        for (let key of obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor === Array) {
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.length > 0 ? '?' + ret.join('&') : '';
    },
    toQueryPair(key, value) {
        if (typeof value === 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    },
    httpSuccess(res) {
        console.log(res);
        return res
    },
    httpErr(err) {
        console.log(err);
        return err
    }

}