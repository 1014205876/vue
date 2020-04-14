module.exports = {
    port: process.env.NODE_PORT,
    cas: {
        servicePrefix: process.env.NODE_SERVER,
        serverPath: process.env.CAS_SERVER,
        switch: true
    },
    proxy: {
        target: process.env.API_SERVER,
        AUTH_ID: process.env.AUTH_ID
    },
    hyperlink:{
        H5_URL: process.env.H5_URL,
        instHost:process.env.INST_HOST,
        instPort:process.env.INST_PORT,
    }
}