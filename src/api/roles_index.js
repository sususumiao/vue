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
// 获取角色列表
export const getRoleList=()=>{
    return axios({
        url:'roles'
    })
}
// 提交添加角色用户
export const setRolesUser=(obj)=>{
    return axios({
        method:'post',
        url:'roles',
        data:obj
    })
}
// 删除角色的指定id权限
export const delRolesById=(roleId,rightId)=>{
    return axios({
        method:'delete',
        url:`roles/${roleId}/rights/${rightId}`
    })
}
