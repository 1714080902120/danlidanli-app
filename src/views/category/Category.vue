<template>
  <div id="category">
    <BaseOuter>
      <div slot="center">
        <div class="categoty-center">
          <div class="nav-inner">
            <div
              class="channel-tab"
              @click="changeActive(0)"
              :class="{ 'active': isActive === 0 }"
              v-waves
            >
              <span>频道</span>
            </div>
            <div
              class="zone-tab"
              @click="changeActive(1)"
              :class="{ 'active': isActive === 1 }"
              v-waves
            >
              <span>分区</span>
            </div>
          </div>

          <span class="nav-bottom-tab" :style="{ 'left': `${.5 + 2 * isActive}rem` }"></span>
        </div>
      </div>
    </BaseOuter>
    <div class="content" v-show="isActive === 0">
      <Top />
      <UsualView />
      <Hot />
      <div class="loading">
        <div class="loading-inner">
          <div class="left">
            <div class="text">
              <span>刷到底了哟~从头再来吧~</span>
              <span>刷新看新内容</span>
            </div>
            <div class="btn">
              <img src="~assets/img/recommend_list/pull_up_pink.svg" alt />刷新
            </div>
          </div>
          <img src="~assets/img/recommend_list/danlidanli_girl.png" alt />
        </div>
      </div>
    </div>
    <div class="content-2" v-show="isActive === 1">
      <Zone />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { BaseOuter, Top, UsualView, Hot, Zone } from "./index";

export default {
  name: "Category",
  data() {
    return {
      isActive: 0
    };
  },
  created() {
    // plus.storage.setItem('isInHome', 'true')
    this.bus();
  },
  activated() {
    this.bus();
    // plus.storage.setItem('isInHome', 'true')
  },
  deactivated () {
    // plus.storage.setItem('isInHome', 'false')
  },
  destroyed () {
    // plus.storage.setItem('isInHome', 'false')
  },
  components: {
    BaseOuter,
    Top,
    UsualView,
    Hot,
    Zone
  },
  methods: {
    bus() {
      this.$Bus.$emit("isInActive", 1);
    },
    changeActive(i) {
      this.isActive = i;
    }
  }
};
</script>

<style lang="less" scoped>
#category {
  width: 10rem;
  height: 100vh;
  /deep/ .center {
    width: 10rem !important;
    height: 100%;
    div {
      height: 100%;
      display: flex;
      align-items: center;
      .categoty-center {
        display: flex;
        align-items: center;
        font-size: 0.4rem;
        width: 4rem;
        height: 100%;
        position: relative;
        .nav-inner {
          display: flex;
          align-items: center;
          font-size: 0.4rem;
          width: 4rem;
          justify-content: space-around;
          .zone-tab,
          .channel-tab {
            transition: 0.3s;
            width: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .active {
            transition: 0.3s;
            color: var(--color-tint);
          }
        }
        .nav-bottom-tab {
          position: absolute;
          transition: 0.3s;
          width: 1rem;
          height: 0.05rem;
          border-radius: 0.03rem;
          background-color: var(--color-tint);
          bottom: 0.1rem;
          left: 0.5rem;
        }
      }
    }
  }
  .content {
    width: 10rem;
    overflow: hidden;
    overflow-y: scroll;
    height: calc(100vh - 1.2rem);
    .loading {
      width: 10rem;
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: space-between;
      .loading-inner {
        position: relative;
        height: 5rem;
        font-size: 0.4rem;
        display: flex;
        margin: auto;
        align-items: center;
        justify-content: space-between;
        color: var(--color-tint);
        margin-bottom: 100px;
        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              margin: 10px 0;
            }
          }
          .btn {
            display: flex;
            align-items: center;
            width: 150px;
            border: 2px solid var(--color-tint);
            border-radius: 25px;
            justify-content: center;
            margin-top: 20px;
            img {
              margin: 0;
              width: 50px;
              height: 50px;
            }
          }
        }
        img {
          width: 180px;
          height: 240px;
          margin: auto;
        }
      }
    }
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
</style>