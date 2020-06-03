<template>
  <div id="privacy-settings">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">隐私权限设置</span>
    </div>
    <div class="content">
      <div class="outer" v-for="(item, index) in setList" :key="index">
        <div class="inner-title" v-waves>
          <span>{{ item.title }}</span>
          <span v-if="index !== 6" class="content-set">去设置</span>
          <mt-switch class="content-switch" v-if="index === 6" v-model="value"></mt-switch>
        </div>
        <div class="inner-sub">{{ item.sub }}</div>
      </div>
    </div>
    <div class="footer" @click="destroy()" v-waves>账号注销</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "PrivacySettings",
  data() {
    return {
      value: true,
      setList: [
        {
          title: "允许哔哩哔哩查看电话信息",
          sub: "查看详细：电话权限使用规则"
        },
        {
          title: "允许哔哩哔哩访问位置信息",
          sub: "查看详细：位置信息使用规则"
        },
        {
          title: "允许哔哩哔哩访问日历信息",
          sub: "查看详细：日历信息使用规则"
        },
        {
          title: "允许哔哩哔哩使用相机功能",
          sub: "查看详细：相机权限使用规则"
        },
        {
          title: "允许哔哩哔哩使用麦克风功能",
          sub: "查看详细：麦克风权限使用规则"
        },
        {
          title: "允许哔哩哔哩使用文件存储和访问功能",
          sub: "查看详细：文件存储和访问权限使用规则"
        },
        {
          title: "允许哔哩哔哩个性化展现广告推荐",
          sub: "详细了解：个性化推荐相关度更高却更有帮助的优质广告"
        }
      ]
    };
  },
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    },
    destroy() {
      Toast({
        message: "毁号有风险！",
        position: "middle",
        duration: 3000
      });
    }
  }
};
</script>

<style lang="less" scoped>
#privacy-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head {
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
  .content {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0 0 0;
    .outer {
      display: flex;
      flex-direction: column;
      .inner-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        background-color: var(--base-set-item-color);
        height: 1.2rem;
        line-height: 1.2rem;
        .content-set {
          font-size: 0.35rem;
          opacity: 0.6;
          &::after {
            margin-left: 0.2rem;
            content: "〉";
          }
        }
        .content-switch {
          margin-right: .3rem;
          /deep/ .mint-switch-core {
            height: 0.4rem;
            width: 0.8rem;
            background-color: var(--color-tint);
            border-color: var(--color-tint);
            opacity: .7;
            &::before {
              width: 0.8rem;
              height: 0.4rem;
              background-color: #fff !important;
              border-color: #fff !important;
              top: -.02rem;
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
      .inner-sub {
        font-size: 0.3rem;
        color: rgba(33, 179, 241, 0.9);
        padding: 0 0.3rem;
        margin: 0.15rem 0 0.3rem 0;
      }
    }
  }
  .footer {
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: var(--base-set-item-color);
    padding-left: 0.3rem;
  }
}
</style>