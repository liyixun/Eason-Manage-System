<template>
  <div class="SlideMenu">
    <el-menu defaultActive="2" class="el-menu-vertical-demo" unique-opened router theme="dark">
      <template v-for="item in menuItems">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i> <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i> <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'SlideMenu',
    data () {
      return {
        menuItems: [
          {
            icon: 'fa fa-bar-chart-o menu-icon',
            index: 'dashboard',
            title: '掌上罗盘'
          },
          {
            icon: 'fa fa-building menu-icon',
            index: 'warehouse',
            title: '物流仓管理'
          },
          {
            icon: 'fa fa-bank menu-icon',
            index: 'site',
            title: '网点管理'
          },
          {
            icon: 'fa fa-ticket menu-icon',
            index: 'order',
            title: '订单管理'
          },
          {
            icon: 'fa fa-truck menu-icon',
            index: 'express',
            title: '快递服务'
          },
          {
            icon: 'fa fa-th-large menu-icon',
            index: 'log',
            title: '日志管理',
            subs: [
              {
                index: 'logList',
                title: '日志列表'
              },
              {
                index: 'logOperate',
                title: '日志操作'
              }
            ]
          },
          {
            icon: 'fa fa-th-large menu-icon',
            index: 'project',
            title: '项目管理'
          },
          {
            icon: 'fa fa-user menu-icon',
            index: 'personal',
            title: '个人中心'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .SlideMenu {
    display: block;
    position: absolute;
    width: 150px;
    height: 1000px;
    left: 0;
    top: 40px;
    bottom: 0;
    background: #2E363F;
    menu-icon {
      margin-right: 15px;
      font-size: 17px;
    }
    ul {
      height: 100%;
    }
  }
</style>
