<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div>
      <el-input
        placeholder="请输入内容"
        v-model="pa.query"
        class="input-with-select"
        style="width:300px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain style="margin-left:10px" @click="showAddDialog">添加用户</el-button>
    </div>
    <!-- 表单区域 -->
    <div class="table">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="create_time" label="电话"></el-table-column>
        <el-table-column label="状态" width="140">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="showAddDialog"></el-button>
            <el-button size="mini" type="primary" plain icon="el-icon-delete"></el-button>
            <el-button size="mini" type="primary" plain icon="el-icon-check"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加用户区域 -->
     <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" :rules="rules" label-width="100px" ref="addform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户区域 -->
    <el-dialog title="添加用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" label-width="100px" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList,addUser } from "@/api/index.js";
export default {
  data() {
    return {
      // 设置距离
      formLabelWidth: '120px',
      // 添加用户对话框是否显示
      addDialogFormVisible:false,
      // 编辑用户对话框是否显示
      editDialogFormVisible:false,
      // 添加用户时数据的双向数据绑定
      addform:{
        username:"",
        password:"",
        email:"",
        mobile:""
      },
      // 编辑用户时数据的双向绑定
      editForm:{
        username:"",
        email:"",
        mobile:""
      },
      // 验证
      rules:{
        username:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      value: true,
      userList: [],
      pa: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods:{
    // 显示添加用户对话框
    showAddDialog(){
      this.addDialogFormVisible = true
    },
    // 实现了添加用户
    addUserSubmit(){
     this.$refs.addform.validate((vaild)=>{
        if(vaild){
          addUser(this.addform)
          .then((result)=>{
            if(result.meta.status === 201){
               this.$message({ message: result.meta.msg, type: "success" })
               this.init()
               this.addform = {username:"", password:"", email:"", mobile:""}
               this.addDialogFormVisible = false
            }else{
              this.$message.error(result.meta.msg)
            }
          })
        }
      })
    },
    // 显示编辑用户对话框

    // 动态加载页面数据
    init(){
      getUserList(this.pa).then(result => {
      if (result.meta.status === 200) {
        this.userList = result.data.users;
      }
      // console.log(result)
    });
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style lang="less" scoped>
.table {
  margin-top: 10px;
}
</style>


