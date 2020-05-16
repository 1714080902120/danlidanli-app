import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace = function replace(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Trends = () => import('views/trends/Trends')
const MemberShop = () => import('views/member-shop/MemberShop')
const RegisterOrLogin = () => import('views/RegisterOrLogin')

// home子组件
const HomeRecommend = () => import('components/content/home/HomeRecommend')
const HomeLive = () => import('components/content/home/HomeLive')
const HomeHot = () => import('components/content/home/HomeHot')
const HomeAnimate = () => import('components/content/home/HomeAnimate')
const HomeMovie = () => import('components/content/home/HomeMovie')
const HomeNewDate = () => import('components/content/home/HomeNewDate')
const HomeStudy = () => import('components/content/home/HomeStudy')

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
      { path: "hot", name: 'Hot', component: HomeHot },
      { path: "animate", name: 'Animate', component: HomeAnimate },
      { path: "movie", name: 'Movie', component: HomeMovie },
      { path: "new-date", name: 'NewDate', component: HomeNewDate },
      { path: "study", name: 'Study', component: HomeStudy }
    ]
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/trends',
    name: 'Trends',
    component: Trends
  },
  {
    path: '/member-shop',
    name: 'MemberShop',
    component: MemberShop
  },
  {
    path: '/registerOrLogin',
    name: 'RegisterOrLogin',
    component: RegisterOrLogin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
