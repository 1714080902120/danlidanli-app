<template>
  <div
    id="sidebar"
    :class="{ appear: isAppear === true && isDisappear === false, disappear: isDisappear = true && isAppear === false }"
    @click="goDisappear($event)"
  >
    <BetterScroll ref="scroll" :bounce="false" screenWidth="80%" screenHeight="100vh">
      <div class="inner">
        <div class="user-info">
          <div class="header">
            <div class="logo-lebel">
              <span class="logo"></span>
              <span class></span>
            </div>
            <div class="wallet-scan"></div>
          </div>
        </div>
        <mt-cell
          :style="{ 'background-color': 'transparent', margin: '-2px 0' }"
          v-for="(item, index) in items"
          :title="item.title"
          :key="index"
          :to="item.path"
        >
          <img
            slot="icon"
            v-if="item.icon"
            :src="item.icon"
            width="20"
            height="20"
            :style="{ margin: '0 24px 0 5px' }"
          />
        </mt-cell>
      </div>
    </BetterScroll>
    <div class="tabbar-outer">
      <span class="set">
        <img slot="icon" src="~assets/img/base/set_dark.svg" />设置
      </span>
      <span class="theme">
        <img slot="icon" src="~assets/img/base/theme_dark.svg" />主题
      </span>
      <span class="skip">
        <img slot="icon" src="~assets/img/base/sun.svg" />夜间
      </span>
    </div>
  </div>
</template>

<script>
import {
  getUserData
  // getToken
} from "network/user";

import BetterScroll from "components/common/better_scroll/BetterScroll";

export default {
  name: "Sidebar",
  data() {
    return {
      isAppear: false,
      isDisappear: false,
      items: [
        {
          title: "首页",
          path: "/home",
          icon: require("assets/img/base/home_dark.svg")
        },
        {
          title: "历史记录",
          path: "/history",
          icon: require("assets/img/base/history_dark.svg")
        },
        {
          title: "下载管理",
          path: "/download",
          icon: require("assets/img/base/download_dark.svg")
        },
        {
          title: "我的收藏",
          path: "/collect",
          icon: require("assets/img/base/collect_dark.svg")
        },
        {
          title: "稍后再看",
          path: "/back-look",
          icon: require("assets/img/base/back_look_dark.svg")
        },
        {
          title: "个性装扮",
          path: "/cloth",
          icon: require("assets/img/base/cloth_dark.svg")
        },
        {
          title: ""
        },
        {
          title: "发布",
          path: "/upload",
          icon: require("assets/img/base/upload_dark.svg")
        },
        {
          title: "创作中心",
          path: "/idea",
          icon: require("assets/img/base/idea_dark.svg")
        },
        {
          title: "热门活动",
          path: "/hot",
          icon: require("assets/img/base/flag_dark.svg")
        },
        {
          title: ""
        },
        {
          title: "直播中心",
          path: "/live",
          icon: require("assets/img/base/live_dark.svg")
        },
        {
          title: "我的课程",
          path: "/class",
          icon: require("assets/img/base/class_dark.svg")
        },
        {
          title: "免流量服务",
          path: "/free",
          icon: require("assets/img/base/free_dark.svg")
        },
        {
          title: "我的订单",
          path: "/order",
          icon: require("assets/img/base/order_dark.svg")
        },
        {
          title: "会员购中心",
          path: "/member-shop",
          icon: require("assets/img/base/member-shop_default.svg")
        },
        {
          title: "联系客服",
          path: "/ask",
          icon: require("assets/img/base/ask_dark.svg")
        },
        {
          title: "课堂模式",
          path: "/classess",
          icon: require("assets/img/base/classess_dark.svg")
        },
        {
          title: "青少年模式",
          path: "/teen",
          icon: require("assets/img/base/teen_dark.svg")
        },
        {
          title: ""
        }
      ],
      baseInfo: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.$Bus.$on("goAppear", () => {
        this.isAppear = true;
      });
    });
  },
  components: {
    BetterScroll
  },
  methods: {
    getData() {
      getUserData({
        url: "/user/base-info",
        method: "get"
      }).then(res => {
        console.log(res);
      });
    },
    goDisappear(e) {
      let X = window.innerWidth;
      if (e.x > X * 0.8) {
        this.isAppear = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  transition: 0.6s;
  transform: translate(-100%, 0);
  .inner {
    background-color: var(--base-bg-color);
    width: 90%;
  }
  .tabbar-outer {
    position: absolute;
    display: flex;
    bottom: 0;
    background-color: var(--base-bg-color);
    justify-content: space-around;
    align-items: center;
    font-size: 35px;
    width: 72%;
    padding-left: 20px;
    span {
      height: 110px;
      line-height: 110px;
      flex: auto;
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
.appear {
  animation: appear 0.16s linear forwards;
}
.disappear {
  animation: disappear 0.1s linear forwards;
}

@keyframes appear {
  from {
    transform: translate(-100%, 0);
  }
  to {
    transform: translate(0, 0);
    background-color: rgba(0, 0, 0, 0.1);
  }
}
@keyframes disappear {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}
</style>