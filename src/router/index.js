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
// ???????????????,??????beforeEach????????????
router.beforeEach((to, from, next) => {
  // ??????????????????????????????,????????????
  if (to.path === '/login') return next()
  // ???sessionStorage?????????????????????token???
  const tokenStr = window.sessionStorage.getItem('token')
  // ????????????token,????????????????????????
  if (!tokenStr) return next('/login')
  next()
})
export default router
