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
  mounted () {
  },
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
  margin-top: var(--top-margin);
  z-index: 99;
  background-color: var(--base-bg-color);
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
    .center,
    .right {
      flex: auto;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .center {
      .outer {
        display: flex;
        align-items: center;
        border-radius: 30px;
        background-color: rgba(58, 58, 58, 1);
        height: .8rem;
        line-height: .8rem;
        padding: 10px;
        margin-bottom: 10px;
        input {
          background-color: transparent;
          border: none;
          outline: none;
          width: 4rem;
          font-size: 30px;
          color: var(--color-text);
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
    .right {
      .home-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .download {
          margin: 0 0 0 -.2rem;
          img {
            width: .7rem;
            height: .7rem;
          }
        }
        .mail {
          margin: 0 0 0 .6rem;
          img {
            width: .7rem;
            height: .7rem;
          }
        }
      }
    }
  }
  .bottom {
    margin-top: 20px;
    background-color: rgba(66, 65, 65, 1);
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>