<template>
  <div class="login">
    <div class="container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <img src="@/assets/avatar.jpg" alt class="avatar">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit('loginForm')" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index.js";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules:{
          username:[
              { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
      }
    }},
    methods:{
        loginSubmit(formname){
            // 实现验证
            this.$refs[formname].validate((valid)=>{
                if(valid){
                    login(this.loginForm)
                    .then((result) =>{
                      console.log(result)
                        if(result.meta.status === 200){
                            // this.$message(result.meta.msg)
                            setTimeout(()=>{
                              localStorage.setItem('itcastpro_token',result.data.token)
                                this.$router.push({name:'Home'})
                            },100)
                        }else{
                            this.$message.error(result.meta.msg);
                        }
                    })
                }else{
                    this.$message.error('请输入');
                    return false;
                }
            })
        }
    
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>


