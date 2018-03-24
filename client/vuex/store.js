import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const state = {
//   count: 1
// };
//
// const mutations = {
//   add(state, n = 1){
//     state.count += n;
//   },
//   reduce(state){
//     state.count--;
//   }
// };

// const getters = {
//   count: function (state) {
//     return state.count += 100;
//   }
// };

// const actions = {
//   addAction(context){
//     context.commit('add', 10);
//   },
//   reduceAction({commit}){
//     commit('reduce');
//   }
// };

// const moduleA = {
//   state, mutations, getters, actions
// };

// export default new Vuex.Store({
//   modules: {a: moduleA}
// });
/**
 * Vuex解决了组件之间共享同一状态的问题。
 * Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的酥油组件的状态。
 * state: 放置状态
 * mutations: 会引发状态改变的所有方法，参数有state,为目前的state
 * actions: 去commit mutations 会自动获得一个默认参数context，它是一个store实例的属性和方法。
 *          context.state可以获得state属性，context.commit就会执行commit命令
 */

export const USER_LOGIN = 'USER_LOGIN';

export default new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: {
      email: null,
      userName: null,
      timeStamp: null
    }
  },
  mutations: {
    LOGIN(state, userInfo){
      window.sessionStorage.userInfo = JSON.stringify(userInfo);
      state.hasLogin = true;
      state.userInfo = userInfo;
    },
    LOGOUT(state){
      state.hasLogin = false;
      state.userInfo = null;
    }
  },
  actions: {
    login(context, userInfo){
      context.commit('LOGIN', userInfo);
    },
    logout(context){
      context.commit('LOGOUT');
      window.sessionStorage.removeItem('userInfo');
      window.location.href = '//' + window.location.hostname;
    }
  }
});
