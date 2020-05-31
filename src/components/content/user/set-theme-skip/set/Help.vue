<template>
  <div id="help">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">帮助</span>
    </div>
    <div class="content">
      <ul class="outer">
        <li class="inner" v-for="(item, index) in list" :key="index" @click="detail(index)" v-waves>
          <div class="name-sub">
            <span>{{ item.name }}</span>
            <span>{{ item.sub }}</span>
          </div>
          <div class="more" v-if="judge(index)">〉</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { City } from 'network/user'
import * as sysTool from "common/systemTool";

export default {
  name: "Help",
  data() {
    return {
      list: [
        {
          name: "版本更新",
          sub: "当前版本： 5.57.3 （release-b3513885）"
        },
        {
          name: "CPU信息"
        },
        {
          name: "网络诊断"
        },
        {
          name: "恢复初始设置"
        },
        {
          name: "开放源代码许可"
        },
        {
          name: "加入我们",
          sub: "遵从中二力量的召唤，和我签订契约吧！少年"
        }
      ]
    };
  },
  created() {
    City().then(res => {
      console.log(res);
      
    })
    this.brower = sysTool.GetCurrentBrowser();
      this.os = sysTool.GetOs();
      console.log(
        "浏览器，操作系统，：",
        this.brower,
        this.os
      );
  },
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(i) {
      switch (i) {
        case 0:
          break;
        case 1:
          Toast({
            message: "自己不会看手机配置？跑这来看啥",
            position: "middle",
            duration: 3000
          });
          break;
        case 2:
          break;
        case 3:
          Toast({
            message: "想重置？没门！",
            position: "middle",
            duration: 3000
          });
          break;
        case 4:
          break;
        case 5:
          break;
      }
    }
  },
  computed: {
    judge() {
      let reg = /0|3/;
      return i => {
        return !reg.test(i);
      };
    }
  }
};
</script>

<style lang="less" scoped>
#help {
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
    overflow-y: scroll;
    .outer {
      flex: auto;
      display: flex;
      flex-direction: column;
      margin-top: 0.4rem;
      background-color: rgb(50, 50, 50);
      .inner {
        margin: 0 0.2rem;
        height: 1.4rem;
        list-style: none;
        border-bottom: 0.01rem solid rgba(104, 104, 104, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .more {
          opacity: 0.2;
        }
        .name-sub {
          display: flex;
          flex-direction: column;
          span {
            &:last-child {
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>