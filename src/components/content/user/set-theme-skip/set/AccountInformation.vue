<template>
  <div id="account-information" v-if="Object.keys($store.state.userInfo).length > 0">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">账号资料</span>
    </div>
    <div class="content">
      <ul v-for="(outer, index) in list" :key="index">
        <div class="outer-title">{{ outer.title }}</div>
        <li
          v-for="(item, indey) in outer.content"
          :key="indey"
          @click="detail(index, indey)"
          v-waves
          :data-clipboard-text="JSON.stringify(item.more)"
          :class="{ 'bold': index === 0 && indey === 0, 'copy': index === 2 && indey === 0 }"
        >
          <div class="left">
            <span>{{ item.title }}</span>
            <span>{{ item.sub }}</span>
          </div>

          <div class="right">
            <img
              v-if="index === 0 && indey === 0"
              :src="`${$store.state.userInfo.baseInfo.logo.src}${$store.state.userInfo.baseInfo.logo.name}`"
              alt
            />
            <img
              v-if="index === 2 && indey === 1"
              src="~assets/img/user/set/qrcode_dark.svg"
              :class="{ 'square': true }"
              alt
            />
            {{ item.more }}
          </div>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <span
            class="save"
            v-if="activeItem === '修改昵称' || activeItem === '修改个性签名'"
            @click="save()"
          >保存</span>
          <span class="share-downlaod" v-if="activeItem === '二维码'">
            <img @click="share()" src="~assets/img/user/set/share_dark.svg" alt />
            <img @click="download()" src="~assets/img/user/set/download_dark.svg" alt />
          </span>
        </div>
        <div class="pop-content">
          <div class="qrcode" v-if="activeItem === '二维码'">
            <img @click="look()" src="~assets/img/user/set/qrcode_dan.png" alt />
          </div>
          <div class="logo" v-if="activeItem === '头像选择'">
            <div class="logo-content">
              <!-- <span>♂</span>
              <span>?</span>
              <span>♀</span>-->
              <span>
                <img src="~assets/img/user/set/take_photo.svg" alt />
              </span>
              <span>
                <img src="~assets/img/user/set/take_photo.svg" alt />
              </span>
              <span>
                <img src="~assets/img/user/set/take_photo.svg" alt />
              </span>
            </div>
          </div>
          <div class="reName" v-if="activeItem === '修改昵称'">
            <div class="get-text">
              <input type="text" v-model="info.name" placeholder="请输入新昵称" />
              <span @click="reset()">x</span>
            </div>
            <div class="text-msg">
              <span>修改昵称需要消耗6枚硬币</span>
              <span @click="callService()">如何获取硬币？</span>
            </div>
          </div>
          <div class="reDesc" v-if="activeItem === '修改个性签名'">
            <textarea class="text-area" cols="46" rows="5" v-model="info.desc"></textarea>
            <div class="count">{{ counted() }}</div>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="pop-2">
      <mt-popup class="pop" v-model="popupVisible2" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop2()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <div class="head-right" @click="openSheet()">
            <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
          </div>
        </div>
        <div class="pop-content-2">
          <iframe class="frame" :src="innerHtml">
            <a :href="innerHtml">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
    <div class="pop-4">
      <mt-popup
        class="pop"
        v-model="popupVisible3"
        position="middle"
        popup-transition="popup-fade"
        :modal="false"
        :class="{ 'when-calendar': activeItem === '生日选择' }"
      >
        <div
          class="logo"
          :class="{ 'when-calendar': activeItem === '生日选择' }"
          v-if="activeItem === '头像选择' || activeItem === '性别选择' || activeItem === '生日选择'"
        >
          <div class="logo-head">{{ activeItem }}</div>
          <div class="logo-content" v-if="activeItem === '头像选择'">
            <span @click="getCamera()" v-waves>
              <img src="~assets/img/user/set/take_photo.svg" alt />拍照
            </span>
            <span @click="getGallery()" v-waves>
              <img src="~assets/img/user/set/photograph.svg" alt /> 图片库
            </span>
            <span @click="getRandom()" v-waves>
              <img src="~assets/img/user/set/random.svg" alt /> 随机
            </span>
          </div>
          <div class="gender-content" v-if="activeItem === '性别选择'">
            <div
              class="male"
              @click="changeSelect(0, '男')"
              :class="{ 'male-active': genderIsSelected === 0 }"
              v-waves
            >
              <span>♂</span>
              <span>男</span>
            </div>
            <div
              class="unknown"
              @click="changeSelect(1, '保密')"
              :class="{ 'unknown-active': genderIsSelected === 1 }"
              v-waves
            >
              <span>?</span>
              <span>保密</span>
            </div>
            <div
              class="female"
              @click="changeSelect(2, '女')"
              :class="{ 'female-active': genderIsSelected === 2 }"
              v-waves
            >
              <span>♀</span>
              <span>女</span>
            </div>
          </div>
          <div class="calendar-content" v-if="activeItem === '生日选择'">
            <div class="calendar-header">
              <div class="year">{{ date.year }}年</div>
              <div class="month-day-weekday"><span>{{date.month}}月</span>{{ date.day }}日<span>{{ date.weekday }}</span><span></span></div>
            </div>
            <Calendar class="calendar" v-on:choseDay="clickDay" v-on:changeMonth="clickDay"></Calendar>
          </div>
          <div class="logo-footer" v-if="activeItem === '头像选择'" @click="closePop3()" v-waves>取消</div>
          <div
            class="logo-footer"
            v-if="activeItem === '性别选择' || activeItem === '生日选择'"
            @click="closePop3()"
            v-waves
          >确定</div>
        </div>
      </mt-popup>
    </div>
    <div class="action-sheet">
      <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
    </div>
    <div class="modal" v-if="sheetVisible || popupVisible3"></div>
    <Cropper :options="option" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { Toast } from "mint-ui";
import Cropper from "components/common/cropper/VueCropper";
import { changeMessage } from "network/user.js";
import Calendar from "vue-calendar-component";
import Clipboard from "clipboard";

export default {
  name: "AccountInformation",
  data() {
    return {
      popupVisible: false,
      popupVisible2: false,
      sheetVisible: false,
      popupVisible3: false,
      calendar: false,
      innerHtml: "",
      actions: [{ name: "浏览器打开", method: this.goToNavigator }],
      activeItem: "",
      list: [
        {
          title: "",
          content: [
            {
              title: "头像",
              sub: "",
              more: ""
            },
            {
              title: "昵称",
              sub: "",
              more: `${this.$store.state.userInfo.baseInfo.name}`
            },
            {
              title: "性别",
              sub: "",
              more: "男"
            },
            {
              title: "出生年月",
              sub: "",
              more: "1911-11-11"
            },
            {
              title: "个性签名",
              sub: "",
              more: `${this.$store.state.userInfo.baseInfo.desc}`
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "头像挂件",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "UID",
              sub: "",
              more: `${this.$store.state.userInfo.identy.uuid}`
            },
            {
              title: "二维码名片",
              sub: "",
              more: ""
            },
            {
              title: "购买邀请码",
              sub: "",
              more: "本月剩余1个"
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "哔哩哔哩认证",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      qrcode: {},
      camera: null,
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 150, // 默认生成截图框宽度
        // autoCropHeight: 100, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        id: 0
      },
      file: null,
      img: "",
      randomFile: null,
      randomList: [],
      info: {
        name: this.$store.state.userInfo.baseInfo.name,
        desc: this.$store.state.userInfo.baseInfo.desc
      },
      genderIsSelected: 0,
      date: {
        year: '',
        month: '',
        day: '',
        weekday: ''
      }
    };
  },
  created() {
    
        let date = new Date()
              let weekday = ''
      switch (date.getDay()) {
        case 0:
        weekday = '周日'
        break;
         case 1:
         weekday = '周一'
        break;
         case 2:
         weekday = '周二'
        break;
         case 3:
         weekday = '周三'
        break;
         case 4:
         weekday = '周四'
        break;
         case 5:
         weekday = '周五'
        break;
         case 6:
         weekday = '周六'
        break;
      }
        this.date = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          weekday
        }
    // console.log(this.$store.state.userInfo);
    this.getQrCode();
    for (let i = 0; i < 42; i++) {
      this.randomList.push(
        require(`assets/img/user/set/random/random_${i}.jpg`)
      );
    }

    
    this.activeItem = "修改昵称";
    this.popupVisible = true;
  },
  components: {
    Cropper,
    Calendar
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    Bus() {
      this.$Bus.$on("cancelCrop", () => {
        this.option.img = "";
      });
    },
    changeSelect(i, gender) {
      this.genderIsSelected = i;
      this.list[0].content[2].more = gender;
      
    },
    clickDay(data) {
      let d = new Date(data).getDay() //选中某天
      let date = data.split('/')
      let weekday = ''
      switch (d) {
        case 0:
        weekday = '周日'
        break;
         case 1:
         weekday = '周一'
        break;
         case 2:
         weekday = '周二'
        break;
         case 3:
         weekday = '周三'
        break;
         case 4:
         weekday = '周四'
        break;
         case 5:
         weekday = '周五'
        break;
         case 6:
         weekday = '周六'
        break;
      }
      this.date = {
        year: date[0],
        month: date[1],
        day: date[2],
        weekday
      }
      this.list[0].content[3].more = `${date[0]}-${date[1]}-${date[2]}`
    },
    changeDate(data) {
            let d = new Date(data).getDay() //选中某天
      let date = data.split('/')
      let weekday = ''
      switch (d) {
        case 0:
        weekday = '周日'
        break;
         case 1:
         weekday = '周一'
        break;
         case 2:
         weekday = '周二'
        break;
         case 3:
         weekday = '周三'
        break;
         case 4:
         weekday = '周四'
        break;
         case 5:
         weekday = '周五'
        break;
         case 6:
         weekday = '周六'
        break;
      }
      this.date = {
        year: date[0],
        month: date[1],
        day: date[2],
        weekday
      } //左右点击切换月份
    },
    clickToday(data) {
            let d = new Date(data).getDay() //选中某天
      let date = data.split('/')
      let weekday = ''
      switch (d) {
        case 0:
        weekday = '周日'
        break;
         case 1:
         weekday = '周一'
        break;
         case 2:
         weekday = '周二'
        break;
         case 3:
         weekday = '周三'
        break;
         case 4:
         weekday = '周四'
        break;
         case 5:
         weekday = '周五'
        break;
         case 6:
         weekday = '周六'
        break;
      }
      this.date = {
        year: date[0],
        month: date[1],
        day: date[2],
        weekday
      }
    },

    detail(x, y) {
      this.activeItem = this.list[x].content[y].title;
      let clipboard = new Clipboard(".copy");
      switch (x) {
        case 0:
          switch (y) {
            case 0:
              this.activeItem = "头像选择";
              this.popupVisible3 = true;
              break;
            case 1:
              this.activeItem = "修改昵称";
              this.popupVisible = true;
              break;
            case 2:
              this.activeItem = "性别选择";
              this.popupVisible3 = true;
              break;
            case 3:
              this.activeItem = "生日选择";
              this.popupVisible3 = true;
              break;
            case 4:
              this.activeItem = "修改个性签名";
              this.popupVisible = true;
              break;
          }
          break;
        case 1:
          break;
        case 2:
          switch (y) {
            case 0:
      
      clipboard.on("success", () => {
        Toast({
          message: "已复制至剪切板",
          position: "middle",
          duration: 3000
        });
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        Toast({
          message: "复制失败",
          position: "middle",
          duration: 3000
        });
        clipboard.destroy();
      });
              break;
            case 1:
              this.activeItem = "二维码";
              this.popupVisible = true;
              break;
            case 2:
              this.innerHtml =
                "https://passport.bilibili.com/login?gourl=https%3A%2F%2Faccount.bilibili.com%2Fmobile%2Faccount%2Finvitation";
              this.popupVisible2 = true;
              break;
          }
          break;
        case 3:
          this.innerHtml =
            "https://passport.bilibili.com/login?gourl=https%3A%2F%2Faccount.bilibili.com%2Fofficial%2Fmobile%2Fhome";
          this.popupVisible2 = true;
          break;
      }
    },
    reset() {
      this.info.name = "";
    },
    callService() {
      this.innerHtml = "https://www.bilibili.com/v/customer-service";
      this.popupVisible2 = true;
    },
    save() {
      if (this.info.name !== this.$store.state.userInfo.baseInfo.name) {
        if (parseInt(this.$store.state.userInfo.coin.coins) < 6) {
          Toast({
            message: "硬币数量不足哦∑(°Д°;)",
            duration: 3000,
            position: "middle"
          });
          return false;
        }
        if (this.info.name === "") {
          Toast({
            message: "名字不能为空",
            duration: 3000,
            position: "middle"
          });
          return false;
        }
        this.$store.state.userInfo.name = this.info.name;
        this.$store.state.userInfo.coin.coins =
          parseInt(this.$store.state.userInfo.coin.coins) - 6;
      }
      this.popupVisible = false;
      this.toChangeMsg();
    },
    toChangeMsg() {
      changeMessage({
        username: this.$store.state.userInfo.username,
        name: this.info.name,
        desc: this.info.desc
      }).then(() => {
        Toast({
          message: "修改成功！",
          duration: 3000,
          position: "middle"
        });
        this.$store.state.userInfo.baseInfo.name = this.info.name;
        this.$store.state.userInfo.baseInfo.desc = this.info.desc;
        this.list[0].content[1].more = this.$store.state.userInfo.baseInfo.name;
        this.list[0].content[4].more = this.$store.state.userInfo.baseInfo.desc;
      });
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    closePop() {
      this.popupVisible = false;
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      window.location.href = this.innerHtml;
      this.sheetVisible = false;
    },
    getQrCode() {
      let reg = /qrcode_dan/gi;
      plus.io.requestFileSystem(
        plus.io.PRIVATE_WWW,
        fs => {
          let directoryReader = fs.root.createReader();
          directoryReader.readEntries(
            entries => {
              let en = entries[2];
              for (let j = 0; j < entries.length; j++) {
                if (entries[j].name.toString() == "img") {
                  en = entries[j];
                  break;
                }
              }
              let directoryReader = en.createReader();
              directoryReader.readEntries(
                entriess => {
                  for (let i = 0; i < entriess.length; i++) {
                    if (reg.test(entriess[i].name)) {
                      let obj = {};
                      for (const key in entriess[i]) {
                        const element = entriess[i][key];
                        obj[key] = element;
                      }
                      this.qrcode = obj;
                    }
                  }
                },
                e => {
                  alert("Read entries failed: " + e.message);
                }
              );
            },
            () => {
              alert("读取文件失败");
            }
          );
        },
        () => {
          alert("读取失败");
        }
      );
    },
    share() {
      let msg = {
        type: "image",
        pictures: ["file://" + this.qrcode.fullPath]
      };
      plus.share.sendWithSystem(
        msg,
        () => {
          plus.nativeUI.toast("请选择分享对象！", {
            duration: 3000
          });
        },
        e => {
          alert(JSON.stringify(e));
          plus.nativeUI.alert("使用系统分享失败", () => {}, "错误", "确定");
        }
      );
    },
    look() {
      plus.nativeUI.previewImage([
        require("assets/img/user/set/qrcode_dan.png")
      ]);
    },
    copyTo(en) {
      this.qrcode.copyTo(
        en,
        new Date().getTime().toString() + this.qrcode.name.toString(),
        entry => {
          let name = "_downloads/" + entry.name.toString();
          plus.gallery.save(
            name,
            () => {
              Toast({
                message: "下载成功",
                duration: 3000,
                position: "middle"
              });
            },
            () => {
              Toast({
                message: "下载失败1",
                duration: 3000,
                position: "middle"
              });
            }
          );
        },
        e => {
          alert(`${e.message}`);
        }
      );
    },
    async download() {
      if (window.localStorage.getItem("DOWNLOAD_PATH")) {
        let path = window.localStorage.getItem("DOWNLOAD_PATH");
        await this.qrcode.getParent(
          entry => {
            entry.getDirectory(
              path.toString(),
              { create: false, exclusive: false },
              entrys => {
                this.copyTo(entrys);
              },
              e => {
                alert(JSON.stringify(e));
              }
            );
          },
          e => {
            alert(JSON.stringify(e));
          }
        );
      } else {
        await plus.io.requestFileSystem(
          plus.io.PUBLIC_DOWNLOADS,
          async fs => {
            this.copyTo(fs.root);
          },
          () => {
            alert("获取下载路径失败");
          }
        );
      }
    },
    closePop3() {
      this.popupVisible3 = false;
    },
    getCamera() {
      this.camera = plus.camera.getCamera();
      // 打开摄像头
      let _this = this;
      this.camera.captureImage(
        url => {
          this.file = url.toString();
          plus.io.resolveLocalFileSystemURL(
            url.toString(),
            entry => {
              // 可通过entry对象操作图片文件
              entry.file(file => {
                let fileReader = new plus.io.FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = e => {
                  _this.option.id = 0;
                  _this.option.img = e.target.result;
                  _this.finishCrop(0);
                };
              });
            },
            e => {
              alert("Resolve file URL failed: " + e.message);
            }
          );
        },
        e => {
          alert(`${e.message}`);
        },
        {}
      );
    },
    // 从图库中查找
    getGallery() {
      plus.gallery.pick(
        path => {
          this.file = path;
          plus.io.resolveLocalFileSystemURL(
            path.toString(),
            entry => {
              // 可通过entry对象操作图片文件
              entry.file(file => {
                let fileReader = new plus.io.FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = e => {
                  this.option.id = 0;
                  this.option.img = e.target.result;
                  this.finishCrop(0);
                };
              });
            },
            e => {
              alert("Resolve file URL failed: " + e.message);
            }
          );
        },
        err => {
          plus.nativeUI.alert("Failed:" + err.message);
        }
      );
    },
    upload() {
      let task = plus.uploader.createUpload(
        "http://:4000/user/upload",
        {
          method: "POST",
          //《注意》这里不能像ajax一样把token放在这里。
          //beforeSend: function(request) {
          //  request.setRequestHeader(tokenHeader, appToken);
          //},
          //《请求类型》
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        (data, status) => {
          // 上传完成
          if (status == 200) {
            this.$store.commit("changeLogo", this.img);
            this.popupVisible3 = false;
            plus.gallery.save(
              this.file,
              () => {
                Toast({
                  message: "修改成功！ 切记不可连续换头像！",
                  duration: 3000,
                  position: "middle"
                });
              },
              () => {
                Toast({
                  message: "保存至图库失败！ 切记不可连续换头像！",
                  duration: 3000,
                  position: "middle"
                });
              }
            );
          } else {
            alert(
              "Upload failed: " + status + " 切记不可连续换头像！后台撑不住"
            );
          }
        }
      );
      //《注意》带token上传附件时要把toke写在setRequestHeader中。
      task.setRequestHeader(
        "authorization",
        window.localStorage.getItem("token")
      );
      //images为图片的src，多张上传的话就写个for
      task.addFile(this.file, {
        key: "file" //这里为需要上传图片的key名称。
      });
      task.addData("src", this.$store.state.userInfo.baseInfo.logo.src);
      task.addData("name", this.$store.state.userInfo.baseInfo.logo.name);
      /*
              //多张图片上传(看后台需要用什么方式)    files为图片url数组   
              //多张图片对应多个key上传
               for (var i = 0; i < files.length; i++) { 
                  var imgPath = files[i]; 
                  // console.log("准备上传的图片路径："+ imgPath); 
                  task.addFile(imgPath, { 
                      key: file    // file 为图片的key
                  }); 
                } 

                //多张图片对应单个key上传
                task.addFile(files, {
                    key: "file"  //这里为需要上传图片的key名称。
                });
    */
      //开始上传
      task.start();
    },
    finishCrop(i) {
      this.$Bus.$on("finishCrop", re => {
        this.img = re.data;
        this.option.img = "";
        if (re.id === i) {
          this.upload();
        }
      });
    },
    getRandom() {
      let reg = new RegExp(`random_${Math.round(Math.random() * 41)}`, "gi");

      plus.io.requestFileSystem(
        plus.io.PRIVATE_WWW,
        fs => {
          let directoryReader = fs.root.createReader();
          directoryReader.readEntries(
            entries => {
              let en = entries[2];
              for (let j = 0; j < entries.length; j++) {
                if (entries[j].name.toString() == "img") {
                  en = entries[j];
                  break;
                }
              }
              let directoryReader = en.createReader();
              directoryReader.readEntries(
                entriess => {
                  for (let i = 0; i < entriess.length; i++) {
                    if (reg.test(entriess[i].name)) {
                      this.img = "file://" + entriess[i].fullPath;
                      this.file = entriess[i].fullPath;
                      this.upload();
                    }
                  }
                },
                e => {
                  alert("Read entries failed: " + e.message);
                }
              );
            },
            () => {
              alert("读取文件失败");
            }
          );
        },
        () => {
          alert("读取失败");
        }
      );
    }
  },
  computed: {
    counted() {
      let length = this.info.desc.length;
      return () => {
        return 70 - length;
      };
    }
  },
  watch: {
    "$store.state.userInfo"(newVal) {
      this.$store.state.userInfo = newVal;
    },
    deep: true,
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#account-information {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head,
  .pop-head {
    position: relative;
    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      margin: 0 0.5rem;
      img {
        width: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    .outer-title {
      font-size: 0.27rem;
      margin-bottom: 0.2rem;
      padding: 0 0.3rem;
      opacity: 0.9;
    }
    li {
      padding: 0 0.3rem;
      height: 1.2rem;
      list-style: none;
      background-color: var(--base-set-item-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.15);
      .left {
        display: flex;
        flex-direction: column;
        width: 4rem;
        span {
          &:last-child {
            font-size: 0.3rem;
            opacity: 0.9;
            margin-top: 0.1rem;
          }
        }
      }
      .right {
        font-size: 0.4rem;
        opacity: 1;
        display: flex;
        align-items: center;
        img {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 100%;
        }
        &::after {
          content: "〉";
          margin-left: 0.2rem;
          opacity: 0.3;
        }
        .square {
          border-radius: 0;
          width: 0.7rem;
          height: 0.7rem;
        }
      }
      .content-switch {
        margin-right: 0.3rem;
        /deep/ .mint-switch-core {
          height: 0.4rem;
          width: 0.8rem;
          background-color: var(--color-tint);
          border-color: var(--color-tint);
          opacity: 0.7;
          &::before {
            width: 0.8rem;
            height: 0.4rem;
            background-color: #fff !important;
            border-color: #fff !important;
            top: -0.02rem;
          }
          &::after {
            width: 0.55rem;
            height: 0.55rem;
            background-color: var(--color-tint);
            left: -0.2rem;
            top: -0.1rem;
          }
        }
      }
    }
    .bold {
      height: 2rem;
      line-height: 2rem;
    }
  }
  .pop,
  .pop-2 {
    width: 10rem;
    height: 100vh;
    background-color: var(--base-set-bg-color);
    .pop-head {
      .title {
        font-size: 0.4rem;
        width: 7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .head-right {
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
      }
      .save {
        opacity: 0.6;
      }
      .share-downlaod {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 0.7rem;
          height: 0.7rem;
          opacity: 0.5;
          &:last-child {
            margin: 0 0.3rem 0 0.5rem;
          }
        }
      }
    }
    .pop-content {
      .qrcode {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 8rem;
        }
      }
      .reName {
        margin: 0 0.5rem;
        margin-top: 0.3rem;
        .get-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          input {
            height: 1rem;
            width: 8.5rem;
            background-color: transparent;
            border: 0;
            outline: none;
            border-bottom: 0.03rem solid var(--color-tint);
            border-radius: 0.05rem;
            color: var(--color-tint);
            opacity: 0.9;
            font-size: 0.35rem;
            padding-top: 0.3rem;
          }
          span {
            margin-top: 0.3rem;
            opacity: 0.6;
          }
        }
        .text-msg {
          font-size: 0.35rem;
          margin-top: 0.4rem;
          opacity: 0.9;
          display: flex;
          justify-content: space-between;
        }
      }
      .reDesc {
        display: flex;
        flex-direction: column;

        .text-area {
          background-color: transparent;
          border: 0;
          color: var(--color-text);
          padding: 0.3rem;
          border-bottom: 0.01rem solid var(--color-tint);
          outline: none;
        }
        .count {
          position: relative;
          display: flex;
          justify-content: flex-end;
          margin: 0.3rem;
          font-size: 0.35rem;
        }
      }
    }
    .pop-content-2 {
      .frame {
        overflow: hidden;
        width: 10rem;
        height: 16.5rem;
      }
      .frame::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
  .pop-4 {
    .pop {
      width: 8.6rem;
      height: 6rem;
      background-color: var(--base-set-bg-color);
      z-index: 9999 !important;
      .logo {
        width: 8.6rem;
        height: 6rem;
        display: flex;
        flex-direction: column;
        color: var(--color-text);
        .logo-head {
          text-align: center;
          font-size: 0.5rem;
          height: 1.4rem;
          line-height: 1.4rem;
          border: 0.02rem solid rgba(100, 100, 100, 0.1);
        }
        .logo-content,
        .gender-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          span {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 1rem;
              height: 1rem;
              margin-bottom: 0.2rem;
            }
          }
        }
        .gender-content {
          flex: 0;
          .male,
          .unknown,
          .female {
            width: 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 2rem;
            border-radius: 100%;
            color: rgb(99, 169, 255);
            margin: 0.5rem 0.3rem;
            span {
              width: 3rem;
              height: 1rem;
              line-height: 1rem;
              font-size: 0.5rem;
              &:first-child {
                font-weight: bold;
                font-size: 1rem;
                margin-top: 0.2rem;
                margin-bottom: -0.1rem;
              }
            }
          }
          .unknown {
            color: var(--color-text);
            opacity: 0.7;
            font-size: 0.6rem;
          }
          .female {
            color: var(--color-tint);
          }
          .male-active,
          .unknown-active,
          .female-active {
            color: #fff;

            transition: 0.3s;
            background-color: rgb(99, 169, 255);
          }
          .unknown-active {
            color: #000;
            background-color: var(--color-text);
          }
          .female-active {
            background-color: var(--color-tint);
          }
        }
        .logo-footer {
          text-align: center;
          height: 1.4rem;
          line-height: 1.4rem;
          border-top: .02rem solid rgba(100, 100, 100, 0.15);
        }
        .calendar-content {
          // flex: 1;
          height: 11rem;
          /deep/ .calendar {
            position: absolute;

            width: 8.6rem;
            left: 0;
            right: 0;

            /deep/ .wh_content_all {
              font-size: .3rem !important;
              background-color: transparent !important;
              /deep/ .wh_top_changge {
                font-size: .2rem !important;
              }
              .wh_content {
                .wh_content_item {
                  transition: .3s;
                  .wh_chose_day {
                    color: #000;
                    transition: .3s;
                    background-color: var(--color-tint);
                  }
                  .wh_isToday {
     
                    color: #000;
                  }
                }
              }
            }
          }
                      .calendar-header {
              display: flex;
              flex-direction: column;
              background-color: var(--base-bg-color-thr);
              height: 2.4rem;
              padding: .3rem .6rem;
              .year {
                margin-bottom: .1rem;
              }
              .month-day-weekday {
                font-size: .8rem;
                span {
                  margin: 0 .1rem;
                }
              }
            }
        }
      }
      .when-calendar {
        height: 14rem;
      }
    }
    .when-calendar {
      height: 14rem;
    }
  }
  .action-sheet {
    /deep/ .sheet {
      z-index: 9999 !important;
      background-color: var(--base-set-bg-color);
      /deep/ .mint-actionsheet-list {
        .mint-actionsheet-listitem {
          border-color: var(--base-set-bg-color);
          background-color: var(--base-set-item-color);
          &:last-child {
            height: 2.4rem;
            background-repeat: no-repeat;
            background-image: url("~assets/img/user/set/navigator_dark.svg");
            background-size: 1.2rem 1.2rem;
            background-position: 0.7rem 0.2rem;
            color: var(--color-text);
            font-size: 0.4rem;
            font-weight: lighter;
            text-align: left;
            padding-top: 1.2rem;
            padding-left: 0.4rem;
          }
        }
      }
      /deep/ .mint-actionsheet-button {
        border-color: var(--base-set-bg-color);
        font-weight: lighter;
        color: var(--color-text);
        background-color: var(--base-set-item-color);
      }
    }
  }
  .modal {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>