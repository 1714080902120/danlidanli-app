import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './category/index'
import Home from './home/index'
import MemberShop from './member-shop/index'
import Trends from './trends/index'
import { RorL, ForF, bigMember, set, theme, skip, Scan } from './other/index'
import Wallet from './user/wallet/index'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
VueRouter.prototype.replace = function replace(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
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
  Scan
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
