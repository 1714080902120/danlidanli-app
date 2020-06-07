<template>
  <div id="tabbar">
    <mt-tabbar class="outer" fixed v-model="selected">
      <div
        class="tabbar-item"
        v-for="item in items"
        :key="item.name"
        @click="goTo(item.path)"
        v-waves
      >
        <mt-tab-item class="inner" :class="{ active: selected === item.name }" :id="item.name">
          <img v-if="item.name !== selected" slot="icon" :src="item.icon" />
          <img v-else-if="item.name === selected" slot="icon" :src="item.iconActive" />
          {{ item.name }}
        </mt-tab-item>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      selected: "首页",
      items: [
        {
          name: "首页",
          icon: require("assets/img/base/home_default.svg"),
          iconActive: require("assets/img/base/home_active.svg"),
          path: "/"
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
    if (this.$route.query.beforePath === "/wallet/b-discount") {
      this.selected = "会员购";
    }
  },
  methods: {
    goTo(path) {
      this.$router.replace({ path });
    }
  },
  watch: {
    selected(newVal) {
      this.selected = newVal;
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#tabbar {
  position: fixed;
  bottom: 0;
  display: flex;
  .is-fixed {
    background-color: rgba(56, 55, 55, 0.96) !important;
    display: flex;
    align-items: center;
    height: 1.2rem;
    text-align: center;
    background-image: none !important;
    // padding-top: 0 !important;
    .tabbar-item {
      flex: auto;
      .inner {
        border: 0;
        color: var(--color-txt);
        display: flex;
        flex-direction: column;
        .mint-tab-item-label {
        }
        /deep/ .mint-tab-item-icon {
          margin: auto;
          img {
            height: 0.5rem;
          }
        }
      }
      .active {
        color: var(--color-tint);
      }
    }
  }
}
</style>