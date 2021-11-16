import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

// import Users from '@/components/users/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/users/Users.vue')
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/rights/Rights.vue')
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/rights/Roles.vue')

const Category = () => import(/* webpackChunkName: "Category_Params" */ '@/components/goods/Category.vue')
const Params = () => import(/* webpackChunkName: "Category_Params" */ '@/components/goods/Params.vue')

const Goods = () => import(/* webpackChunkName: "Goods_Add" */ '@/components/goods/Goods.vue')
const Add = () => import(/* webpackChunkName: "Goods_Add" */ '@/components/goods/Add.vue')

const Orders = () => import(/* webpackChunkName: "Orders_Reports" */ '@/components/orders/Orders.vue')
const Reports = () => import(/* webpackChunkName: "Orders_Reports" */ '@/components/reports/Reports.vue')

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
      { path: '/reports', component: Reports },
      { path: '/goods/add', component: Add }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
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
