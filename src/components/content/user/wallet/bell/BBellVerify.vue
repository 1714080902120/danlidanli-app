<template>
  <div id="B-bell-verify">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">申请验证</span>
      </div>
      <div class="content">
        <div class="name">
          <span class="words">真实姓名</span>
          <input type="text" name id="name" placeholder="未填写" />
        </div>
        <div class="phone-verify">
          <div class="phone">
            <span class="words">手机号</span>
            <input type="text" name id="phone" placeholder="未填写" />
          </div>
          <div class="verify">
            <div class="words">
              <span class="word">验证码</span>
              <span class="get-verify" @click="getVerify()">获取</span>
            </div>
            <input type="text" name id="verify" placeholder="未填写" />
          </div>
        </div>
        <div class="type-num">
          <div class="type">
            <span class="words">证件类型</span>
            <span class="select-type" @click="select()">{{type}}</span>
          </div>
          <div class="num">
            <span class="words">证件号码</span>
            <input type="text" name id="num" placeholder="未填写" />
          </div>
        </div>
        <div class="upload">
          <div class="upload-title">上传证件照</div>
          <div class="main">
            <div class="item" v-for="item in list" :key="item.left.title">
              <div class="left">
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
        <span class="btn">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BBellVerify",
  data() {
    return {
      isActive: false,
      popupTitle: "规则说明",
      isSelected: 0,
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
      type: "身份证▼"
    };
  },
  created() {
    this.isActive = true;
  },
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      let timer = setTimeout(() => {
        this.$router.replace({ path: "/wallet/b-bell" });
        clearTimeout(timer);
        timer = null;
      }, 300);
    }
  }
};
</script>

<style lang="less" scoped>
#B-bell-verify {
  .inner {
    font-size: 0.45rem;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
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
      .back {
        padding-left: 0.5rem;
        margin-right: 1rem;
      }
      .title {
        font-size: 0.45rem;
        display: flex;
        text-align: center;
        align-items: center;
      }
    }
    .content {
      .name,
      .phone,
      .verify,
      .type,
      .num {
        background-color: var(--base-bg-color-thr);
        display: flex;
        justify-content: space-between;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 .5rem;
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
      .name, .phone-verify, .type-num {
        margin-bottom: .4rem;
      }
      .phone-verify {
        .verify {
          display: flex;
          justify-content: space-between;
          .get-verify {
            position: relative;
            font-size: .4rem;
            background-color: var(--color-tint);
            color: #fff;
            width: 3rem;
            height: 1rem;
            line-height: 1rem;
            border-radius: .4rem;
          }
        }
      }
      .type-num {
      }
      .upload {
        padding: 0 .5rem;
        background-color: var(--base-bg-color-thr);
        .upload-title {
        }
        .main {
          display: flex;
          flex-direction: column;
          .item {
            display: flex;
            justify-content: space-between;
            img {
              // width: 1rem;
              height: 1rem;
            }
            .left,
            .right {
              display: flex;
              flex-direction: column;
            }
            .left {
            }
            .right {
            }
          }
        }
        .care {
          .care-item {
            .care-title {
              img {
                width: 0.5rem;
                height: 0.5rem;
              }
            }
          }
        }
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
}
</style>