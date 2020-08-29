import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueWaves from 'common/waves/waves'
import Utils from 'common/utils'
import VueTouch from 'vue-touch'
import VueCropper from 'vue-cropper'
import Back from 'common/h5+/back.js'
import VideoPlayer from 'vue-video-player'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.config.productionTip = false

Vue.use(VueDirectiveImagePreviewer, {
  zIndex: 999,
  animate: {duration: 100, delay: 0, func: "ease-in-out"},
  maxWidth: '100%'
})
Vue.use(VideoPlayer)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(MintUI, {
  lazyload: {
    loading: '~assets/img/base/bilibili_user_logo_bg.svg'
  }
})
Vue.use(vueWaves)
Vue.use(VueCropper)
Vue.prototype.$Bus = new Vue()
Vue.prototype.$debounce = Utils.debounce
new Vue({
  router,
  store,
  Back,
  render: h => h(App)
}).$mount('#app')
