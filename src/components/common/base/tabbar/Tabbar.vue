<template>
  <div id="tabbar">
    <mt-tabbar class="outer" fixed v-model="selected">
      <div class="tabbar-item" v-for="item in items" :key="item.name" v-waves>
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
          path: ""
        },
        {
          name: "频道",
          icon: require("assets/img/base/channel_default.svg"),
          iconActive: require("assets/img/base/channel_active.svg"),
          path: ""
        },
        {
          name: "动态",
          icon: require("assets/img/base/trends_default.svg"),
          iconActive: require("assets/img/base/trends_active.svg"),
          path: ""
        },
        {
          name: "会员购",
          icon: require("assets/img/base/member-shop_default.svg"),
          iconActive: require("assets/img/base/member-shop_active.svg"),
          path: ""
        }
      ]
    };
  },
  methods: {
    select(name) {
      this.selected = name;
    }
  },
  watch: {
    selected(newVal) {
      this.selected = newVal;
    }
  }
};
</script>

<style lang="less">
#tabbar {
  position: relative;
  display: flex;
  .outer {
    background-color: var(--base-bg-color-sec);
    display: flex;
    flex: auto;
    .tabbar-item {
      flex: auto;
      .inner {
        color: var(--color-txt);
      }
      .active {
        color: var(--color-tint);
      }
    }
  }
}
</style>