import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginRegister.vue'
import Not from '../views/404.vue'
import Schedul from '../views/schedul.vue'
import cloudSchedul from '../views/cloud-schedul.vue'
import LoginRegister from '@/views/LoginRegister.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/auto',
    name: 'Schedul',
    //components: () => import('../views/index.vue')
    component: Schedul,
    meta: {
      requiresAuth: true, // 设置需要验证登录
    },
  },
  {
    path: '/cloud',
    name: 'cloudSchedul',
    //components: () => import('../views/index.vue')
    component: cloudSchedul,
    meta: {
      requiresAuth: true, // 设置需要验证登录
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: '404',
    component: Not,
    meta: {
      requiresAuth: true, // 设置需要验证登录
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true, // 设置需要验证登录
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth,isAuthenticated())
  if (to.meta.requiresAuth && !isAuthenticated()) { // 如果需要验证登录，并且没有登录，则跳转到登录页
    console.log('----------');
    next("/login");
  } else {
    console.log('---');
    next(); // 否则，允许跳转
  }
});

// 判断用户是否已经登录
function isAuthenticated() {
 // setTimeout(() => {window.sessionStorage.getItem('userInfo')}, 3 * 60 * 1000)
  const userInfo = window.sessionStorage.getItem('userInfo')
  console.log(userInfo);
   if(userInfo === 'True') {
    // 用户信息存在，直接跳转到目标路由
     return true;
   }
  // // 在这里添加您的验证逻辑，例如检查是否有登录凭据等
   return false; // 这里返回false，表示用户没有登录
}

export default router
