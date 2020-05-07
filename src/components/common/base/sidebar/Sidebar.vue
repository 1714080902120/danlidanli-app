<template>
  <div id="sidebar">
    <div class="inner">
      <div class="user-info">
        <div class="header">
          <div class="logo-lebel">
            <span class="logo">21312312312</span>
            <span class>1231231</span>
          </div>
          <div class="wallet-scan">1231231</div>
        </div>
      </div>
      <mt-cell
        :style="{ 'background-color': 'transparent', margin: '-1px 0' }"
        v-for="(item, index) in items"
        :title="item.title"
        :key="index"
        :to="item.path"
        :class="{ 'small-margin': item.title === '' }"
      >
        <img slot="icon" v-if="item.icon" :src="item.icon" width="20" height="20" :style="{ margin: '0 24px 0 5px' }" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import {
  getUserData,
  // getToken
  } from 'network/user'

export default {
  name: "Sidebar",
  data() {
    return {
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
        }
      ],
      baseInfo: {}
    }
  },
  created() {
    // this.getData();
  },
  methods: {
    getData() {
      // getToken({ username: '13798510901', password: '443529931' })
      getUserData({
        url: '/user/base-info',
        method: 'get'
      }).then(res => {
        console.log(res)
      })
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  position: absolute;
  top: 0;
  width: 75%;
  height: 100vh;
  background-color: var(--base-bg-color);
  z-index: 999;
  // overflow: hidden;
  .small-margin {
    margin: -10px 0;
  }
}
</style>