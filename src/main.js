// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/*import './assets/icon/iconfont.css'*/
import './assets/custom.css'
import * as axios from 'axios';
import SessionUtil from '@/utils/sessionUtil.js'
import MeSelect from '@/components/MeSelect'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component("me-select", MeSelect)

/**
 * 设置默认属性
 */
Vue.prototype.$axios = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  withCredentials: true
});
Vue.prototype.$axios.interceptors.request.use(
  function (config) {
    //在发送请求之前做某事:清除空的字符
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

Vue.prototype.$format = function (date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

Vue.filter('date', function (value, format) {
  if (!format) {
    format = "YYYY-MM-DD HH:mm:ss";
  }
  return moment(value).format(format);
});


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
