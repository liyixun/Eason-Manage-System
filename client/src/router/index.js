import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/Dashboard.vue'], resolve)
        },
        {
          path: '/warehouse',
          component: resolve => require(['../components/LogisticsWarehouse.vue'], resolve)
        },
        {
          path: '/site',
          component: resolve => require(['../components/Site.vue'], resolve)
        },
        {
          path: '/order',
          component: resolve => require(['../components/Order.vue'], resolve)
        },
        {
          path: '/express',
          component: resolve => require(['../components/Express.vue'], resolve)
        },
        {
          path: '/logList',
          component: resolve => require(['../components/LogList.vue'], resolve)
        },
        {
          path: '/logOperate',
          component: resolve => require(['../components/LogOperate.vue'], resolve)
        },
        {
          path: '/project',
          component: resolve => require(['../components/Project.vue'], resolve)
        },
        {
          path: '/personal',
          component: resolve => require(['../components/Personal.vue'], resolve)
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['../components/Error.vue'], resolve),
      beforeEnter: (to, from, next) => {
        console.log('进入了一个错误的路由');
        console.log(to);
        console.log(from);
        next();
      }
    }
  ]
})
