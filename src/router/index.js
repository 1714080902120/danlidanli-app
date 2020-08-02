import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './category/index'
import Home from './home/index'
import MemberShop from './member-shop/index'
import Trends from './trends/index'
import { RorL, ForF, bigMember, set, theme, skip, Scan, Game } from './other/index'
import Wallet from './user/wallet/index'
import { PersonalSpace, Widget, UserSpace } from './user/personal/index'
import { VideoDetail } from './video/index'


const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
VueRouter.prototype.replace = function replace(location) {
  return routerPush.call(this, location).catch(error => error)
}

VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/'
  },
  Home,
  Category,
  Trends,
  MemberShop,
  RorL,
  ForF,
  Wallet,
  bigMember,
  set,
  theme,
  skip,
  Scan,
  PersonalSpace,
  Widget,
  UserSpace,
  VideoDetail,
  Game
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置导航守卫,处理页面刷新、登录退出
// router.beforeEach((to, from, next) => {

//   if (to.matched.length === 0) {

//   }

// })

export default router
