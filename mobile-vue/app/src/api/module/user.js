import { get,post } from '../../utils/httpRequest'

function login(params) {
    return post('/api/login', params)
}

export {
    login
}