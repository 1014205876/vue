module.exports = {
    port: '3200',
    cas: {
        servicePrefix: 'http://localhost:3200',
        serverPath: 'http://192.168.4.216:8080',
        switch: false
    },
    proxy: {
        target: 'http://jsonplaceholder.typicode.com',
        AUTH_ID: '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8',
        AUTH_USER: 'admin'
    },
    hyperlink:{
        title:'环境变量title',
        instHost: '192.168.4.216',
        instPort: '8300',
        H5_URL: 'http://192.168.4.216:8500',
    }
};