import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueWaves from 'common/waves/waves'
import Utils from 'common/utils'

Vue.config.productionTip = false
Vue.use(MintUI, {
  lazyload: {
    preload: 0,
    loading: '~assets/img/base/bilibili_user_logo_bg.svg'
  }
})
Vue.use(vueWaves)
Vue.prototype.$Bus = new Vue()
Vue.prototype.$debounce = Utils.debounce
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
