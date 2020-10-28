import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
const routes = [
  {path:'/',redirect:'/login'},
  {path :'/login',component:Login},
  {path :'/home',component:Home},
]

const router = new VueRouter({
  routes
})

//导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    return next()
  }
  const token = localStorage.getItem('token')
  if(!token){
    return next('/login')
  }
  next()
})
export default router
