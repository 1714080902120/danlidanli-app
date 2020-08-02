<template>
  <div id="tabbar">
    <div class="tab-bar-outer">
      <div class="tab-bar-item" v-for="item in items" :key="item.name" @click="goTo(item.path, item.name)" v-waves>
        <span class="icon">
          <img v-show="selected !== item.name" :src="item.icon" alt="">
          <img v-show="selected === item.name" :src="item.iconActive" alt="">
        </span>
        <span class="text" :class="{ 'active': selected === item.name }">{{ item.name }}</span>
      </div>
    </div>
    <Popup />
  </div>
</template>

<script>
import { Popup } from 'views/home/index.js'

export default {
  name: "Tabbar",
  data() {
    return {
      selected: "首页",
      items: [
        {
          name: "首页",
          icon: require("assets/img/base/home_02_default.svg"),
          iconActive: require("assets/img/base/home_02_active.svg"),
          path: "/home"
        },
        {
          name: "频道",
          icon: require("assets/img/base/channel_default.svg"),
          iconActive: require("assets/img/base/channel_active.svg"),
          path: "/category"
        },
        {
          name: "动态",
          icon: require("assets/img/base/trends_default.svg"),
          iconActive: require("assets/img/base/trends_active.svg"),
          path: "/trends"
        },
        {
          name: "会员购",
          icon: require("assets/img/base/member-shop_default.svg"),
          iconActive: require("assets/img/base/member-shop_active.svg"),
          path: "/member-shop"
        }
      ]
    };
  },
  created() {
    // if (this.$route.query.beforePath === "/wallet/b-discount") {
    //   this.selected = "会员购";
    // }
    this.bus()
  },
  methods: {
    goTo(path, name) {
      if (this.selected === name) {
        1
      } else {
        this.selected = name
      }
      this.$router.replace({ path });
    },
    bus () {
      this.$Bus.$on('isInActive', (i) => {
        this.selected = this.items[i].name
      })
    }
  },
  components: {
    Popup
  },
  watch: {
    // '$route' (newVal) {
    //   this.items.forEach(e => {
    //     if (newVal.path.indexOf(e.path) !== -1) {
    //       this.selected = e.name
    //     }
    //   })
    // }
  }
};
</script>

<style lang="less" scoped>
#tabbar {
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 998;
  .tab-bar-outer {
    height: 1.2rem;
    width: 10rem;
    display: flex;
    align-items: center;
    background-color: rgba(56, 55, 55, 0.96);
    .tab-bar-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 2.5rem;
      height: 1.2rem;
      span {
        font-size: .3rem !important;
        &:first-child {
          img {
            opacity: .6;
            width: .5rem;
            height: .5rem;
          }
        }
        &:last-child {
          opacity: .6;
          font-size: .3rem !important;
        }
      }
            .active {
        color: var(--color-tint);
      }
      
    }
  }
  // .is-fixed {
  //   background-color: rgba(56, 55, 55, 0.96) !important;
  //   display: flex;
  //   align-items: center;
  //   height: 1.2rem;
  //   text-align: center;
  //   background-image: none !important;
  //   // padding-top: 0 !important;
  //   .tabbar-item {
  //     flex: auto;
  //     .inner {
  //       border: 0;
  //       color: var(--color-txt);
  //       display: flex;
  //       flex-direction: column;
  //       /deep/ .mint-tab-item-label {
  //         height: .26rem !important;
  //         font-size: .26rem !important;
  //       }
  //       /deep/ .mint-tab-item-icon {
  //         margin: auto;
  //         img {
  //           height: 0.5rem;
  //         }
  //       }
  //     }

    // }
  // }
}
</style>