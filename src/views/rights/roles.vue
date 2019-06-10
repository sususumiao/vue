<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色区域 -->
    <el-button type="success" plain style="margin-left:10px" @click="addDialogFormVisible=true">添加用户</el-button>
    <!-- 表格内容区域 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id" style="margin-bottom:15px">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag :key="first.id" closable @close="deleteFirstId(scope.row,first.id)">{{first.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple-light">
                <el-row
                  v-for="second in first.children"
                  :key="second.id"
                  style="margin-bottom:15px"
                  
                >
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-tag :key="second.id" closable :type="'warning'" @close="deleteSecondId(scope.row,second.id)">{{second.authName}}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                      <el-tag
                        v-for="third in second.children"
                        :key="third.id"
                        closable
                        :type="'danger'"
                        style="margin-right:5px;margin-bottom:15px"
                        @close="deleteThirdId(scope.row,third.id)"
                      >{{third.authName}}</el-tag>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <span>还没有设置权限，请设置</span>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
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
    <!-- 添加用户角色对话框 -->
    <el-dialog title="收货地址" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="'120px'">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubimet">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, setRolesUser, delRolesById } from "@/api/roles_index.js";
export default {
  data() {
    return {
      // 添加用户对话框是否显示
      addDialogFormVisible: false,
      // 角色列表
      roleList: [],
      // 添加角色双向绑定
      addForm: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    // 添加用户角色
    async addSubimet() {
      let result = await setRolesUser(this.addForm);
      if (result.data.meta.status === 201) {
        this.$message({
          message: result.data.meta.msg,
          type: "success"
        });
        this.addDialogFormVisible = false;
        this.init();
      } else {
        this.$message.error(result.data.meta.msg);
      }
      // console.log(result);
    },
    // 删除一级权限
    async deleteFirstId(row, rightId) {
      let result = await delRolesById(row.id, rightId);
      if (result.data.meta.status === 200) {
        this.$message({ message: result.data.meta.msg, type: "success" });
        row.children = result.data.data;
      } else {
        this.$message.error(result.data.meta.msg);
      }
    },
    // 删除二级权限
    async deleteSecondId(row, rightId) {
      let result = await delRolesById(row.id, rightId);
      if (result.data.meta.status === 200) {
        this.$message({ message: result.data.meta.msg, type: "success" });
        row.children = result.data.data;
      } else {
        this.$message.error(result.data.meta.msg);
      }
    },
    //删除三级权限
    async deleteThirdId(row, rightId) {
      let result = await delRolesById(row.id, rightId);
      if (result.data.meta.status === 200) {
        this.$message({ message: result.data.meta.msg, type: "success" });
        row.children = result.data.data;
      } else {
        this.$message.error(result.data.meta.msg);
      }
    },

    // 动态加载数据
    init() {
      getRoleList().then(result => {
        this.roleList = result.data.data;
        // console.log(result.data.data);
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
</style>


