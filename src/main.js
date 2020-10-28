import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {Button,Form,FormItem,Input,Message} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
Vue.prototype.$message = Message;
import './css/base.less'
Vue.config.productionTip = false
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$axios=axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
