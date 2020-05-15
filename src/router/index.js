import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace = function replace(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const HomeRecommend = () => import('components/content/home/HomeRecommend')
const Home = () => import('views/home/Home')
const RegisterOrLogin = () => import('views/RegisterOrLogin')
const HomeLive = () => import('components/content/home/HomeLive')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeRecommend
      },
      { path: "live", name: 'Live', component: HomeLive },
      { path: "hot", name: 'Hot' },
      { path: "animate", name: 'Animate' },
      { path: "movie", name: 'Movie' },
      { path: "new-date", name: 'NewDate' },
      { path: "study", name: 'Study' }
    ]
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
