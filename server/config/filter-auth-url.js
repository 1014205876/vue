module.exports = {
    authUrl: '/peak-resource/api/resource/user/permission',
    urls: [
        { url: '/api/peak-resource/v1/resource/user', type: 'GET' },
        { url: '/api/peak-resource/v1/resource/region', type: 'GET' },
        // { url: '/api/peak-resource/v1/resource/region', type: 'GET' },
        { url: '/api/peak-resource/v1/resource/user', type: 'PATCH' }
    ]
}