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
// 登录请求验证
export const login = (obj) => {
    return axios.post('login',obj)
    .then((result) => {
        return result.data
    })
}
// 获取用户列表数据
export const getUserList = (pa)=>{
    return axios.get('users',{params:pa})
    .then((result)=>{
       return result.data
    })
}
// 添加用户
export const addUser=(pa)=>{
    return axios.post('users',pa)
    .then((result)=>{
        return result.data
    })
}
// 编辑用户
export const eidtUser=(pa)=>{
    return axios.put(`users/${pa.id}`,pa)
    .then((result)=>{
        return result.data
    })
}
// 删除用户
export const delUser=(pa)=>{
    return axios.delete(`users/${pa.id}`)
    .then((result)=>{
        return result.data

    })
}
// 获取角色权限
export const getAllRoleList=()=>{
    return axios.get('roles')
    .then((result)=>{
        return result.data
    })
}
// 设置角色权限
export const changeStatu=(pa)=>{
    return axios.put(`users/${pa.id}/role`,{rid:pa.rid})
    .then((result)=>{
        return result.data
    })
}
// 设置开关操作
export const changeuserstate=(pa)=>{
    return axios.put(`users/${pa.id}/state/${pa.mg_state}`)
    .then((result)=>{
        return result.data
    })
}