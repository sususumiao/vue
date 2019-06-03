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
      <el-input placeholder="请输入内容" v-model="query" class="input-with-select" style="width:300px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain style="margin-left:10px">添加用户</el-button>
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
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain icon="el-icon-edit" ></el-button>
            <el-button size="mini"  type="primary" plain icon="el-icon-delete"></el-button>
            <el-button size="mini"  type="primary" plain icon="el-icon-check"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {getUserList} from '@/api/index.js'
export default {
  data() {
    return {
      query: "",
      value:true,
      userList: [],
      pa:{
        query:this.query,
        pagenum:1,
        pagesize:10
      }
    };
  },
  mounted(){
    getUserList(this.pa)
    .then((result)=>{
      if(result.meta.status === 200){
        this.userList = result.data.users
      }
      console.log(result)
    })
  }
};
</script>
<style lang="less" scoped>
.table{
    margin-top: 10px;
}
</style>


