import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './css/fonts/iconfont.css'
import './css/base.css'
Vue.config.productionTip = false
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$axios=axios

axios.interceptors.request.use(config=>{
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = localStorage.getItem("token")
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
