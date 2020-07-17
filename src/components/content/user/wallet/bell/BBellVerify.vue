<template>
  <div id="B-bell-verify">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">申请验证</span>
      </div>
      <div class="content">
        <div class="name">
          <span class="words">真实姓名</span>
          <input type="text" name id="name" placeholder="未填写" v-model="name" />
        </div>
        <div class="phone-verify">
          <div class="phone">
            <span class="words">手机号</span>
            <input type="text" name id="phone" placeholder="未填写" v-model="phone" />
          </div>
          <div class="verify">
            <div class="words">
              <span class="word">验证码</span>
              <span
                class="get-verify"
                ref="verify"
                @click="sendVerification()"
                v-waves
              >{{verifyState}}</span>
            </div>
            <input type="text" name id="verify" placeholder="未填写" v-model="verify" />
          </div>
        </div>
        <div class="type-nation-num">
          <div class="type">
            <span class="words">证件类型</span>
            <span class="select-type" @click="select()">{{type()}}</span>
          </div>
          <div class="nation" v-if="IDType === 5">
            <span class="words">国家或地区</span>
            <span class="select-nation" @click="selectNation()">{{nationType()}}</span>            
          </div>
          <div class="num">
            <span class="words">证件号码</span>
            <input type="text" name id="num" placeholder="未填写" v-model="ID" />
          </div>
        </div>
        <div class="upload">
          <div class="upload-title">上传证件照</div>
          <div class="main">
            <div class="item" v-for="(item, index) in list" :key="item.left.title">
              <div class="left">
                <input
                  type="file"
                  :id="item.left.title"
                  accept="image/gif, image/jpg, image/png"
                  @change="showImg($event, index)"
                  multiple
                />
                <span>{{item.left.title}}</span>
                <span>
                  <img :src="item.left.img" alt />
                </span>
              </div>
              <div class="right">
                <span>{{item.right.title}}</span>
                <span>
                  <img :src="item.right.img" alt />
                </span>
              </div>
            </div>
          </div>
          <div class="care">
            <div class="care-item" v-for="item in careList" :key="item.title">
              <div class="care-title">
                <img :src="item.img" alt />
                {{ item.title }}
              </div>
              <p v-for="p in item.content" :key="p">{{ p }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span class="footer-title">提交表示以了解并同意bilibili实名认证注意事项</span>
        <span class="btn" @click="goTo()" v-waves>提交</span>
      </div>
    </div>
    <Cropper :options="option" />
    <div class="popup">
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <ul>
          <li v-for="(item, index) in liActive" :key="item" @click="selectType(index)">{{item}}</li>
        </ul>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Send } from "network/user";
import { Toast } from "mint-ui";
import Utils from "common/utils";
import Cropper from "components/common/cropper/VueCropper";

export default {
  name: "BBellVerify",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      popupTitle: "规则说明",
      isSelected: 0,
      name: "",
      phone: "137*****901",
      verify: "",
      verifyState: "获取",
      ID: "",
      nationID: 0,
      nationList: ['未选择▼', '美国', '加拿大', '比利时', '法国', '澳大利亚', '日本', '新加坡', '韩国', '马来西亚', '英国', '意大利', '德国' ],
      li: ['身份证', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', '护照（中国签发）', '外国人永久居住证', '其他国家或地区身份证'],
      liActive: [],
      careList: [
        {
          title: "注意事项",
          img: require("assets/img/wallet/B_bell/danger.svg"),
          content: [
            "1.每个证件只能绑定一个账号。",
            "2.证件照不清晰或与输入的信息不匹配，将导致实名认证呗驳回。",
            "3.您提供的证件信息将受到严格保护，仅用于身份验证，未经本人许可不会用于其他用途。",
            "4.除原证件无效（如：改名，移民）等特殊情况外，实名认证审核通过后将不能修改。"
          ]
        },
        {
          title: "证件要求",
          img: require("assets/img/wallet/B_bell/careful.svg"),
          content: [
            "1.需上传本人露脸手持二代身份证照片 + 身份证反面照片（不需手持）。",
            "2.证件必须在有效期限内，有效期需在一个月以上。"
          ]
        },
        {
          title: "照片要求",
          img: require("assets/img/wallet/B_bell/careful.svg"),
          content: [
            "1.本人手持证件正面露脸，无关清晰可辨认。",
            "2.证件上信息徐完整且清晰可辨（无反光、遮挡、水印、证件套、logo等）。",
            "3.申请人填写的真实姓名和证件号码需和提交证件照片信息一致。",
            "4.证件必须真实拍摄，不能使用复印件，不能对镜（证件信息反转）拍摄。",
            "5.确保照片完整（不缺边角），证件信息周围不允许加上边角框（如：加上红框等）。"
          ]
        }
      ],
      list: [
        {
          left: {
            title: "手持证件照",
            img: require("assets/img/wallet/B_bell/default_exm.png")
          },
          right: {
            title: "示例",
            img: require("assets/img/wallet/B_bell/B_bell_exm_1.png")
          }
        },
        {
          left: {
            title: "证件正面照",
            img: require("assets/img/wallet/B_bell/default_exm.png")
          },
          right: {
            title: "示例",
            img: require("assets/img/wallet/B_bell/B_bell_exm_2.png")
          }
        },
        {
          left: {
            title: "证件反面照",
            img: require("assets/img/wallet/B_bell/default_exm.png")
          },
          right: {
            title: "示例",
            img: require("assets/img/wallet/B_bell/B_bell_exm_3.png")
          }
        }
      ],
      IDType: 0,
      // 裁剪组件的基础配置option
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
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        id: 0,
      }
    };
  },
  created() {
    this.isActive = true;
    this.Bus();
  },
  activated() {
    this.isActive = true;
  },
  components: {
    Cropper
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.go(-1);
    },
    async sendVerification() {
      if (this.verifyState !== "获取") return false;
      this.$nextTick(() => {
        this.verifyState = 60;
        this.$refs.verify.style.backgroundColor = "rgb(100, 100, 100)";
        let timer = setInterval(() => {
          this.verifyState -= 1;
          if (this.verifyState === 1) {
            this.verifyState = "获取";
            this.$refs.verify.style.backgroundColor = "var(--color-tint)";
            clearInterval(timer);
            timer = null;
          }
        }, 1000);
      });
      await Send({ phoneNumber: this.phone }).then(res => {
        if (res === -1) {
          Toast({
            message: "发送失败，请确认手机号码是否正确",
            position: "middle",
            duration: 5000
          });
        } else {
          window.sessionStorage.setItem("verify", Utils.Encrypt(res));
          Toast({
            message: "发送成功！",
            position: "middle",
            duration: 5000
          });
        }
      });
    },
    goTo() {
      if (
        window.sessionStorage.getItem("verify") && Utils.Decrypt(window.sessionStorage.getItem("verify")) === this.verify
      ) {
        console.log(111);
      }
    },
    showImg(e, i) {
      let _this = this;
      let files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.option.id = i
        _this.option.img = this.result;
        _this.finishCrop(i);
      };
    },
    Bus() {
      this.$Bus.$on("cancelCrop", () => {
        this.option.img = "";
      });
    },
    finishCrop(i) {
      this.$Bus.$on("finishCrop", res => {
        this.option.img = "";
        if (res.id === i) {
          this.list[i].left.img = res.data;
        }

      });
    },
    select () {
      this.liActive = this.li
      this.popupVisible = true
    },
    selectType (i) {
      if (this.liActive.length === this.li.length) {
        this.IDType = i
      } else {
        this.nationID = i
      }

      this.popupVisible = false
    },
    selectNation () {
      this.liActive = this.nationList
      this.popupVisible = true
    }
  },
  computed: {
    type() {
      return () => {
        let type = "";
        type = this.li[this.IDType] + '▼'
        return type;
      };
    },
    nationType() {
      return () => {
        let type = "";
        type = this.nationList[this.nationID]
        return type;
      };
    }
  },
  watch: {
    IDType(newVal) {
      if (newVal === 5) {
        this.list.forEach((e, i) => {
          e.right.img = require(`assets/img/wallet/B_bell/B_bell_exm_special_${i + 1}.png`)
        })
      } else {
        this.list.forEach((e, i) => {
          e.right.img = require(`assets/img/wallet/B_bell/B_bell_exm_${i + 1}.png`)
        })        
      }
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#B-bell-verify {
  position: relative;
  .inner {
    font-size: 0.45rem;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .head {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-bg-color-thr);
      z-index: 99;
      justify-content: space-between;
      .back {
        width: 1rem;
        height: 1rem;
        opacity: .6;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('~assets/img/video/back_white.svg');
      }
      .title {
        font-size: 0.45rem;
        display: flex;
        text-align: center;
        align-items: center;
        margin-right: 4rem;
      }
    }
    .content {
      .name,
      .phone,
      .verify,
      .type,
      .num,
      .nation {
        transition: .4s linear;
        background-color: var(--base-bg-color-thr);
        display: flex;
        justify-content: space-between;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 0.5rem;
        border-top: 0.01rem solid rgb(37, 37, 37);
        input {
          background-color: transparent;
          border: 0;
          width: 5rem;
          text-align: right;
          color: #fff;
          outline: none;
        }
      }
      .name,
      .phone-verify,
      .type-nation-num {
        margin-bottom: 0.4rem;
      }
      .phone-verify {
        .verify {
          display: flex;
          justify-content: space-between;
          .words {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .get-verify {
              position: relative;
              font-size: 0.4rem;
              background-color: var(--color-tint);
              color: #fff;
              width: 1.6rem;
              height: 0.8rem;
              text-align: center;
              line-height: 0.8rem;
              border-radius: 0.4rem;
              margin-left: 0.6rem;
            }
          }
        }
      }
      .type-num {
      }
      .upload {
        padding: 0 0.5rem;
        background-color: var(--base-bg-color-thr);
        padding-top: 0.5rem;
        .upload-title {
          font-size: 0.5rem;
          margin-bottom: 1rem;
        }
        .main {
          display: flex;
          flex-direction: column;
          .item {
            display: flex;
            justify-content: space-between;
            .left,
            .right {
              font-size: 0.35rem;
              display: flex;
              flex-direction: column;
              margin-bottom: 0.4rem;
              img {
                margin-top: 0.1rem;
                height: 2.2rem;
                width: 4rem;
              }
            }
            .left {
              position: relative;
              input {
                position: absolute;
                width: 4rem;
                top: 0.5rem;
                height: 2.2rem;
                opacity: 0;
              }
            }
            .right {
              span {
                &:first-child {
                  margin-left: 0.2rem;
                }
              }
            }
          }
        }
        .care {
          margin-top: 0.5rem;
          .care-item {
            margin-bottom: 1rem;
            padding-bottom: 0.01rem;
            .care-title {
              display: flex;
              align-items: center;
              margin: 0.5rem 0;
              img {
                width: 0.5rem;
                height: 0.5rem;
                margin: 0 0.1rem 0 0;
              }
            }
            p {
              font-size: 0.4rem;
              margin: 0.2rem 0.25rem;
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      align-items: center;
      flex-direction: column;
      .footer-title {
        color: var(--color-tint);
      }
      .btn {
        margin: 1rem 0;
        margin-top: 0.5rem;
        width: 7rem;
        text-align: center;
        border-radius: 0.2rem;
        height: 1.3ren;
        line-height: 1.3rem;
        background-color: var(--base-bg-color-thr);
      }
    }
  }
  .inner::-webkit-scrollbar {
    display: none;
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
  .popup {
    ul {
      display: flex;
      flex-direction: column;
      height: 7.2rem;
      overflow: hidden;
      overflow-y: scroll;
      li {
        text-align: center;
        border-bottom: .01rem solid rgba(100, 100, 100, .3);
        list-style: none;
        width: 7rem;
        height: 1.2rem;
        font-size: .4rem;
        color: #000;
        line-height: 1.2rem;
      }
    }
    ul::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>