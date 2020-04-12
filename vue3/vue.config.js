module.exports = {
    // 基本路径
    publicPath: '/',
    outputDir: '../server/dist',
    devServer: {
        open:true,
        proxy: {
            '/api': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/juhe': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/juhe': '/juhe'
                }
            },
            '/apishop': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/apishop': '/apishop'
                }
            },
            '/upload': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/upload': '/upload'
                }
            },
            '/node': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/node': '/node'
                }
            },
            '/ws': {
                target: 'http://localhost:3200',
                ws: true,//是否代理websockets
                changeOrigin: true,   // 设置同源
                pathRewrite: {
                    '^/ws': '/ws'
                }
            },
        },

    }
}