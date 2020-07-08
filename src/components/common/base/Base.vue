<template>
  <div id="base">
    <div class="head">
      <div class="left" @click="goAppear()">
        <i class="btn">
          <img src="~assets/img/base/munu_white.svg" alt />
        </i>
        <i class="logo">
          <img v-if="!isTokenExist()" src="~assets/img/base/user_avatar_init.png" alt />
          <img
            v-else-if="isTokenExist()"
            :src="`${$store.state.userInfo.baseInfo.logo.src}${$store.state.userInfo.baseInfo.logo.name}`"
            alt
          />
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
  </div>
</template>

<script>
export default {
  name: "Base",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  methods: {
    goAppear() {
      this.$store.commit("openSideBar", true);
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
  // margin-top: var(--top-margin);

  z-index: 99;
  background-color: rgb(62, 62, 62);
  .head {
    position: relative;
    height: 1.2rem;
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
      width: 1.8rem;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
        opacity: 0.6;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 100%;
        }
      }
    }
    .center,
    .right {
      flex: auto;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .center {
      width: 4.4rem;
      .outer {
        display: flex;
        align-items: center;
        border-radius: .5rem;
        background-color: rgb(54, 54, 54);
        height: 0.75rem;
        line-height: 0.75rem;
        padding: 10px;
        input {
          background-color: transparent;
          border: none;
          outline: none;
          width: 3.2rem;
          font-size: 0.3rem;
          color: var(--color-text);
        }
        img {
          opacity: .6;
          width: 50px;
          height: 50px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      width: 3rem;
      .home-right {
        width: 2.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          opacity: 0.7;
          display: flex;
          align-items: center;
          img {
            width: 0.55rem;
            height: 0.55rem;
          }
        }
      }
    }
  }
  .bottom {
    // margin-top: 20px;
    // background-color: rgba(66, 65, 65, 1);
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>