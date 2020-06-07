# danlidanli-app

1. 目前使用的插件：

- mint-ui
- axios 获取数据
- crypto 加密
- vue-cropper 图片裁剪
- vue-qr 二维码生成
- clipboard 移动端粘贴复制
- vue-touch 移动端点击等事件
- amfe-flexible 移动端自适应
- better-scroll 支持滚动

2. 已完成模块：

- 登陆注册
- 个人钱包模块
- 个人粉丝/关注模块
- 主要框架及首页推荐
- 扫一扫
- 侧边栏
- 设置（开发中）

3. 存在的问题：

- 支付功能提供了微信支付和支付宝支付，但是本人没有 appid，后台也没实现该功能，因此该功能为开发完。
- 扫描对应的 uuid 二维码会跳转相应的个人空间（二维码下载后台没有实现，前台用 base64 有问题，因此不支持二维码下载，我给替换成个人头像了）。
- 首页顶部滑动消失出现特效使用的是 transform：translate，但这破坏了 overflow：hidden，目前还没有办法，或者有想法但是要改很多地方。
- mint-ui的lazy-load无效果
## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
