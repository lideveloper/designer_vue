// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import * as axios from 'axios';
import SessionUtil from '@/utils/sessionUtil.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

/**
 * 设置默认属性
 */
Vue.prototype.$axios = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  withCredentials: true
});

//添加响应拦截器
Vue.prototype.$axios.interceptors.response.use(function (response) {
  if (response.data.code == '1') {
    response.data = response.data.data;
    return response;
  }/* else if (response.data.code == '403') {
    router.replace({name: 'home'})
  } */ else {

    throw {response: response};
  }

}, function (error) {
  if (error.response && error.response.data.code) {
    if (parseInt(error.response.data.code) >= 0) {

    } else {
      return Promise.reject(error);
    }
  }

});

Vue.prototype.$getUser = function () {
  return SessionUtil.getUser();
}


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
