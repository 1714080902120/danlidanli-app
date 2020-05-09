import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const RegisterOrLogin = () => import('views/RegisterOrLogin')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registerOrLogin',
    name: 'RegisterOrLogin',
    component: RegisterOrLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
