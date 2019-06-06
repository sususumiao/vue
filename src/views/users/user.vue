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
        @keydown.native.enter="searchUserList"
        clearable
        @clear="searchUserList"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchUserList"></el-button>
      </el-input>
      <el-button type="success" plain style="margin-left:10px" @click="showAddDialog">添加用户</el-button>
    </div>
    <!-- 表单区域 -->
    <div class="table">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="状态" width="140">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeUserState(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <el-button
                size="mini"
                type="primary"
                plain
                icon="el-icon-edit"
                @click="showEidtDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <el-button
                size="mini"
                type="primary"
                plain
                icon="el-icon-delete"
                @click="showDelDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="授权" placement="bottom">
              <el-button
                size="mini"
                type="primary"
                plain
                icon="el-icon-check"
                @click="showGrantRoleDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器区域 -->
    <div>
      <el-pagination
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pa.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pa.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" label-width="100px" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
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
    <!-- 授权用户区域 -->
    <el-dialog title="用户授权" :visible.sync="grantRoleDialogFormVisible">
      <el-form :model="grantRoleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="grantRoleForm.name" autocomplete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
         <el-select v-model="grantRoleForm.rid" placeholder="请选择" @change="selectRole">
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option> </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRoleUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, addUser, eidtUser, delUser,getAllRoleList,changeStatu,changeuserstate } from "@/api/index.js";
export default {
  data() {
    return {
      total:0,
       roleList: [],
      // 设置距离
      formLabelWidth: "120px",
      // 添加用户对话框是否显示
      addDialogFormVisible: false,
      // 编辑用户对话框是否显示
      editDialogFormVisible: false,
      // 授权用户对话框是否显示
      grantRoleDialogFormVisible:false,
      // 添加用户时数据的双向数据绑定
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑用户时数据的双向绑定
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      // 授权角色
      grantRoleForm:{
        name:"",
        rid:"",
        id:""
      },
      // 验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      value:'',
      userList: [],
      pa: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        total:0
      }
    };
  },
  methods: {
    // 显示添加用户对话框
    showAddDialog() {
      this.addDialogFormVisible = true;
    },
    // 实现了添加用户
    addUserSubmit() {
      this.$refs.addform.validate(vaild => {
        if (vaild) {
          addUser(this.addform).then(result => {
            if (result.meta.status === 201) {
              this.$message({ message: result.meta.msg, type: "success" });
              this.init();
              this.addform = {
                username: "",
                password: "",
                email: "",
                mobile: ""
              };
              this.addDialogFormVisible = false;
            } else {
              this.$message.error(result.meta.msg);
            }
          });
        }
      });
    },
    // 显示编辑用户对话框
    showEidtDialog(data) {
      this.editDialogFormVisible = true;
      // console.log(data)
      this.editForm.username = data.username
      this.editForm.email = data.email
      this.editForm.mobile = data.mobile
    },
    // 实现编辑用户信息
    editUserSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          eidtUser(this.editForm).then(result => {
            if (result.meta.status === 200) {
              this.$message({ message: result.meta.msg, type: "success" });
              this.init();
              this.editDialogFormVisible = false;
            } else {
              this.$message.error(result.meta.msg);
            }
            // console.log(result)
          });
        } else {
          this.$message.error("请输入正确的信息");
          return false;
        }
      });
    },
    // 实现删除操作
    showDelDialog(data) {
      this.$confirm(`此操作将永久删除id为${data.id}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser(data).then(result => {
            if (result.meta.status === 200) {
              this.$message({ type: "success", message: result.meta.msg });
              this.init();
            } else {
              this.$message.error(result.meta.msg);
            }
            // console.log(result)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 授权时显示对话框
    showGrantRoleDialog(data) {
      this.grantRoleDialogFormVisible = true
      this.grantRoleForm.name=data.username
      this.grantRoleForm.id = data.id
      this.grantRoleForm.rid = data.rid
      // console.log(data)
    },
    // 选择权限时
    selectRole(data){
      this.grantRoleForm.rid = data
    },
    // 实现设置权限
    grantRoleUserSubmit(){
      // console.log(this.grantRoleForm)
      changeStatu(this.grantRoleForm)
      .then((result)=>{
        // console.log(result)
        if(result.meta.status === 200){
           this.$message({ message: result.meta.msg, type: "success" });
           this.grantRoleDialogFormVisible  = false
           this.init()
        }else{
           this.$message.error(result.meta.msg);
        }
      })
    },
    // 实现操作开关
    changeUserState(data){
      // console.log(data)
      changeuserstate(data)
      .then((result)=>{
        if(result.meta.status === 200){
          this.$message({ message: result.meta.msg, type: "success" });
        }else{
          this.$message.error(result.meta.msg);
        }
        // console.log(result)
      })
    },
    // 实现搜索功能
    searchUserList(){
      this.init()
    },
    // 分页
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pa.pagesize = val
        this.init()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pa.pagenum = val
        this.init()
      },
    // 动态加载页面数据
    init() {
      getUserList(this.pa).then(result => {
        if (result.meta.status === 200) {
          // console.log(result)
          this.userList = result.data.users
          this.total = result.data.total
        }
        // console.log(result)
      });
    }
  },
  mounted() {
    this.init();
    // 加载角色列表
    getAllRoleList()
    .then((result)=>{
      this.roleList = result.data
      // console.log(result)
    })
  }
};
</script>
<style lang="less" scoped>
.table {
  margin-top: 10px;
}
</style>


