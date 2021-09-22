import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/users/Users.vue'
import Rights from '@/components/rights/Rights.vue'
import Roles from '@/components/rights/Roles.vue'
import Goods from '@/components/goods/Goods.vue'
import Category from '@/components/goods/Category.vue'
import Params from '@/components/goods/Params.vue'
import Orders from '@/components/orders/Orders.vue'
import Reports from '@/components/reports/Reports.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/goods', component: Goods },
      { path: '/categories', component: Category },
      { path: '/params', component: Params },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Reports }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 为路由对象,添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页,直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果么有token,强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})
export default router
