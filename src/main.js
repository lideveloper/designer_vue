// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import * as axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
/*Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.transformRequest.push(function (data) {
  return data;
})*/
Vue.prototype.$axios = axios.create({
  baseURL: '/api/', timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});
Vue.prototype.$axios.interceptors.request.use(
  function (config) {
    //在发送请求之前做某事
    return config;
  },
  function (error) {
    //请求错误时做些事
    return Promise.reject(error);
  }
);

//添加响应拦截器
Vue.prototype.$axios.interceptors.response.use(function (response) {
  if (response.data.code == '1') {
    response.data = response.data.data;
    return response;
  } else {
    throw {response: response};
  }

}, function (error) {
  if (error.response && error.response.data.code) {
    if (parseInt(error.response.data.code) > 0) {

    } else {
      return Promise.reject(error);
    }
  }

});


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
