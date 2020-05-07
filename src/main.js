import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import axios from 'axios'
// let headers

Vue.config.productionTip = false
Vue.use(MintUI)

// if (window.localStorage.getItem('token')) {
//   // 配置请求头信息 
//   headers = {
//     "authorization": window.localStorage.getItem('token'),
//     "Content-Type": 'application/json'
//   }
// } else {
//   headers = {
//     "authorization": '',
//     "Content-Type": 'application/json'
//   }
// }
// Vue.prototype.$axios = axios.create({
//   baseURL: 'http://localhost:4000',
//   timeout: 3000,
//   headers
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
