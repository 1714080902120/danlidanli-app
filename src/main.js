import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueWaves from 'common/waves/waves'


Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(vueWaves)
Vue.prototype.$Bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
