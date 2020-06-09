<template>
  <div id="home-recommend-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">首页推荐设置</span>
    </div>
    <div class="content">
      <div class="content-title">首页视图</div>
      <ul>
        <li @click="select()" v-waves>
          <div class="one-line">
            <img src="~assets/img/user/set/one_line_dark.svg" alt />
            <span>单列</span>
          </div>
          <img v-if="selected" src="~assets/img/user/set/yes_pink.svg" alt />
        </li>
        <li @click="select()" v-waves>
          <div class="double-line">
            <img src="~assets/img/user/set/double_line_dark.svg" alt />
            <span>双列</span>
          </div>
          <img v-if="!selected" src="~assets/img/user/set/yes_pink.svg" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendSettings",
  data() {
    return {
      selected: false
    };
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    select () {
      this.selected = !this.selected
    }
  }
};
</script>

<style lang="less" scoped>
#home-recommend-settings {
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
    .content-title {
      font-size: 0.4rem;
      opacity: 0.6;
      height: 1.2rem;
      line-height: 1.2rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      background-color: var(--base-set-item-color);
      li {
        transition: .3s;
        height: 1.2rem;
        line-height: 1.2rem;
        list-style: none;
        display: flex;
        padding: 0 0.4rem;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
        .one-line,
        .double-line {
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 0.45rem;
          img {
            margin-right: 0.3rem;
          }
        }
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
}
</style>