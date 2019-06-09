<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
    ref="rightList"
    :data="rightList"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="authName"
      label="权限"
      width="120">
    </el-table-column>
    <el-table-column
      property="path"
      label="路径"
      width="120">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
          <span>{{scope.row.level|tier}}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {getRightList} from '@/api/right_index.js'
export default {
    data () {
        return {
            rightList:[]
        }
    },
    methods:{
        // 加载权限数据
        async init(){
            let result = await getRightList('list')
            this.rightList = result.data.data
            // console.log(result.data.data)
        }
    },
    // 过滤器
    filters:{
        // 层级过滤器
        tier(data){
            if(data === '0'){
                return '一级'
            }else if(data === '1'){
                return '二级'
            }else if(data === '2'){
                return '三级'
            }
        }
    },
    mounted(){
        this.init()
    }
};
</script>
<style lang="less" scoped>
</style>

