/* eslint-disable no-undef */
import { Toast } from 'mint-ui'

document.addEventListener('plusready', () => {
  var webview = plus.webview.currentWebview()
  var first = null
  // plus会报错,因为普通浏览器里没有plus环境，
  // 只有HBuilder真机运行、打包后、或流应用环境下才能运行plus api。
  // 这里使用注释忽略报错信息 
  plus.navigator.updateSplashscreen({ image: '_www/splash.png', delay: 3000 })
  plus.nativeUI.setUIStyle('dark')
  var main = plus.android.runtimeMainActivity();
  var windowMe = main.getWindow();
  plus.android.importClass(windowMe);
  var Color = plus.android.importClass("android.graphics.Color");
  //如parseColor("#ffffff")设置为白色
  plus.android.invoke(windowMe, "setNavigationBarColor", Color.parseColor("#000000"));
  plus.key.addEventListener('backbutton', () => {
    webview.canBack((e) => {
      if (e.canBack) {
          webview.back(-1)
      } else {
        // 首页返回键处理
        // 处理逻辑：3秒内，连续两次按返回键，则退出应用；
        // 首次按键，提示‘再按一次退出应用’
        if (new Date().getTime() - first < 1500) {
          // console.log("关闭程序")
          plus.runtime.quit()
        } else {
          // 自定义的弹窗
          Toast({
            message: '再按一次退出应用',
            position: 'middle',
            duration: 1500
          })
          first = new Date().getTime()
        }
      }
    })
  })
})