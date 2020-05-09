<template>
  <div
    id="sidebar"
    :class="{ appear: isAppear === true && isDisappear === false, disappear: isDisappear = true && isAppear === false }"
    @click="goDisappear($event)"
  >
    <BetterScroll ref="scroll" :bounce="false" screenWidth="80%" :screenHeight="height()">
      <div class="inner">
        <SidebarHead :info="userInfo" />
        <li
          class="cell"
          v-for="(item, index) in items"
          :title="item.title"
          :key="index"
          :class="{ active: index === isActive }"
          v-waves
          @touchstart="touchStart($event)"
        >
          <img
            slot="icon"
            v-if="item.icon"
            :src="item.icon"
            width="20px"
            height="20px"
            :style="{ margin: '0 24px 0 5px' }"
          />
          <div class="title">{{item.title}}</div>
        </li>
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

import SidebarHead from "./SidebarHead";
import BetterScroll from "components/common/better_scroll/BetterScroll";

export default {
  name: "Sidebar",
  data() {
    return {
      isAppear: false,
      isDisappear: false,
      isActive: 0,
      items: [
        {
          title: "首页",
          path: "/home",
          icon: require("assets/img/base/home_active.svg"),
          iconActive: require("assets/img/base/home_active.svg")
        },
        {
          title: "历史记录",
          path: "/history",
          icon: require("assets/img/base/history_dark.svg"),
          iconActive: require("assets/img/base/history_active.svg")
        },
        {
          title: "下载管理",
          path: "/download",
          icon: require("assets/img/base/download_dark.svg"),
          iconActive: require("assets/img/base/download_active.svg")
        },
        {
          title: "我的收藏",
          path: "/collect",
          icon: require("assets/img/base/collect_dark.svg"),
          iconActive: require("assets/img/base/collect_active.svg")
        },
        {
          title: "稍后再看",
          path: "/back-look",
          icon: require("assets/img/base/back_look_dark.svg"),
          iconActive: require("assets/img/base/back_look_active.svg")
        },
        {
          title: "个性装扮",
          path: "/cloth",
          icon: require("assets/img/base/cloth_dark.svg"),
          iconActive: require("assets/img/base/cloth_active.svg")
        },
        {
          title: ""
        },
        {
          title: "发布",
          path: "/upload",
          icon: require("assets/img/base/upload_dark.svg"),
          iconActive: require("assets/img/base/upload_active.svg")
        },
        {
          title: "创作中心",
          path: "/idea",
          icon: require("assets/img/base/idea_dark.svg"),
          iconActive: require("assets/img/base/idea_active.svg")
        },
        {
          title: "热门活动",
          path: "/hot",
          icon: require("assets/img/base/flag_dark.svg"),
          iconActive: require("assets/img/base/flag_active.svg")
        },
        {
          title: ""
        },
        {
          title: "直播中心",
          path: "/live",
          icon: require("assets/img/base/live_dark.svg"),
          iconActive: require("assets/img/base/live_active.svg")
        },
        {
          title: "我的课程",
          path: "/class",
          icon: require("assets/img/base/class_dark.svg"),
          iconActive: require("assets/img/base/class_active.svg")
        },
        {
          title: "免流量服务",
          path: "/free",
          icon: require("assets/img/base/free_dark.svg"),
          iconActive: require("assets/img/base/free_active.svg")
        },
        {
          title: "我的订单",
          path: "/order",
          icon: require("assets/img/base/order_dark.svg"),
          iconActive: require("assets/img/base/order_active.svg")
        },
        {
          title: "会员购中心",
          path: "/member-shop",
          icon: require("assets/img/base/member-shop_default.svg"),
          iconActive: require("assets/img/base/member-shop_active.svg")
        },
        {
          title: "联系客服",
          path: "/ask",
          icon: require("assets/img/base/ask_dark.svg"),
          iconActive: require("assets/img/base/ask_active.svg")
        },
        {
          title: "课堂模式",
          path: "/classess",
          icon: require("assets/img/base/classess_dark.svg"),
          iconActive: require("assets/img/base/classess_active.svg")
        },
        {
          title: "青少年模式",
          path: "/teen",
          icon: require("assets/img/base/teen_dark.svg"),
          iconActive: require("assets/img/base/teen_active.svg")
        }
      ],
      userInfo: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData();
      this.bus()
    });
  },
  components: {
    BetterScroll,
    SidebarHead
  },
  methods: {
    getData() {
      if (window.localStorage.getItem("haveToken")) {
        getUserData().then(res => {
          this.userInfo = res;

          delete this.userInfo._id;
          delete this.userInfo.username;
        });
      }
    },
    bus() {
      this.$Bus.$on("goAppear", () => {
        this.isAppear = true;
      });
      this.$Bus.$on("sidebarDisappear", () => {
        this.isAppear = false;
        this.isDisappear = true;
      });
    },
    goDisappear(e) {
      let X = window.innerWidth;
      if (e.x > X * 0.8) {
        this.isAppear = false;
      }
    },
    touchStart() {
      // console.log(e);
    }
  },
  computed: {
    height() {
      return () => {
        const height = window.innerHeight;

        return `${height - 55}px`;
      };
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  overflow: hidden;
  transition: 0.6s;
  transform: translate(-100%, 0);
  background-color: var(--base-bg-color);
  list-style: none;
  .inner {
    background-color: var(--base-bg-color);
    width: 90%;
    .cell {
      font-size: 30px;
      background-color: transparent;
      margin: 10px 0;
      height: 80px;
      line-height: 80px;
      color: var(--color-text);
      display: flex;
      align-items: center;
    }
    .active {
      background-color: rgb(110, 110, 110);
      color: var(--color-tint);
    }
  }
  .tabbar-outer {
    position: absolute;
    display: flex;
    bottom: 0;
    background-color: var(--base-bg-color);
    justify-content: space-around;
    align-items: center;
    font-size: 25px;
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
        margin-right: 8px;
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