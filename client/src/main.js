// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueHighcharts from 'vue-highcharts'
import store from '../vuex/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-default/index.css'
import './style/css/bootstrap/css/bootstrap.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
