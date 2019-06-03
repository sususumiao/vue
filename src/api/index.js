import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 登录请求验证
export const login = (obj) => {
    return axios.post('login',obj)
    .then((result) => {
        return result.data
    })
}