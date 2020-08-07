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
    <div class="content">
      <Top />
      <UsualView />
    </div>
  </div>
</template>

<script>
import { BaseOuter, Top, UsualView } from "./index";

export default {
  name: "Category",
  data() {
    return {
      isActive: 0
    };
  },
  created() {
    this.bus();
  },
  activated() {
    this.bus();
  },
  components: {
    BaseOuter,
    Top,
    UsualView
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
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
</style>