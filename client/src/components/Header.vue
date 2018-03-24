<template>
  <div class="header">
    <div class="logo">{{AppName}}</div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{currentUser}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown"  >
          <template v-for="item in operations">
            <el-dropdown-item :key="item.id">{{item.title}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        AppName: 'EMS-Eason Manage System',
        currentUser: 'eason.li',
        operations: [
          {
            id: 'introduce',
            title: '个人简介'
          },
          {
            id: 'account',
            title: '账号管理'
          },
          {
            id: 'theme',
            title: '主题切换'
          },
          {
            id: 'cancellation',
            title: '注销'
          }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 40px;
    padding-top: 10px;
    color: #fff;
    background-color: #324157;
    opacity: 0.8;
  }
  .header .logo{
    float: left;
    width: 25%;
    text-align: center;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 14px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:15px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
</style>
