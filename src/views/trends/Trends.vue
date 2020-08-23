<template>
  <div id="trends">
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
              <span>视频</span>
            </div>
            <div
              class="zone-tab"
              @click="changeActive(1)"
              :class="{ 'active': isActive === 1 }"
              v-waves
            >
              <span>综合</span>
            </div>
          </div>

          <span class="nav-bottom-tab" :style="{ 'left': `${.5 + 2 * isActive}rem` }"></span>
        </div>
      </div>
      <div slot="right">
        <span class="edit"></span>
      </div>
    </BaseOuter>
    <div class="content">
      <Top :title="title" />
      <Topic />
      <List />
    </div>
  </div>
</template>

<script>
import { BaseOuter, Top, Topic, List } from "./index";

export default {
  name: "Trends",
  data() {
    return {
      isActive: 1,
      title: ''
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
    Topic,
    List
  },
  methods: {
    bus() {
      this.$Bus.$emit("isInActive", 2);
    },
    changeActive(i) {
      this.isActive = i;
      switch (i) {
        case 0:
          this.title = '最近访问'
        break;
        case 1:
          this.title = ''
        break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#trends {
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
  /deep/ .right {
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: .3rem;
    .edit {
      width: 0.5rem;
      height: 0.5rem;
      opacity: 0.3;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      background-image: url(~assets/img/trends/edit.svg);
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