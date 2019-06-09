import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('itcastpro_token')
    if(token){
        config.headers['Authorization'] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//   动态获取权限列表数据
export const getRightList=(type)=>{
    return axios({
        url:`rights/${type}`,
    })
}