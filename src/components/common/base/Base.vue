<template>
  <div id="base">
    <div class="head">
      <div class="left" @click="goAppear()">
        <i class="btn">
          <img src="~assets/img/base/munu_white.svg" alt />
        </i>
        <i class="logo">
          <img v-if="!isTokenExist()" src="~assets/img/base/user_avatar_init.png" alt />
          <img v-else-if="isTokenExist()" :src="`${$store.state.userInfo.baseInfo.logo.src}${$store.state.userInfo.baseInfo.logo.name}`" alt />
        </i>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "./tabbar/Tabbar";


export default {
  name: "Base",
  data() {
    return {};
  },
  components: {
    Tabbar
  },
  methods: {
    goAppear() {
      this.$Bus.$emit("goAppear");
    }
  },
  computed: {
    isTokenExist() {
      return () => {
        return Object.keys(this.$store.state.userInfo).length > 0;
      };
    }
  }
};
</script>

<style lang="less" scoped>
#base {
  position: relative;
  margin-top: var(--top-margin);
  margin-bottom: 10px;
  .head {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    .left {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      left: -20px;
      .btn {
        flex: auto;
        margin-right: 14px;
        img {
          widows: 50px;
          height: 50px;
        }
      }
      .logo {
        flex: auto;
        img {
          widows: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
    }
    .center {
      flex: auto;
    }
  }
  .bottom {
    position: relative;
    background-color: var(--base-bg-color-sec);
  }
}
</style>