<template>
  <div id="B-bell-detail">
    <div class="inner">
      <div class="nav">
        <div class="head">
          <span class="back" @click="goBack()"></span>
          <span class="title">明细</span>
        </div>
        <div class="navbar">
          <mt-navbar class="nav-bar" v-model="selected">
            <mt-tab-item class="nav-bar-item" id="1">
              <span>转出</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="2">
              <span>转入</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="3">
              <span>冻结</span>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <div class="content">
        <mt-tab-container class="container" v-model="selected">
          <mt-tab-container-item class="item-outer" id="1">
            <div class="footer">
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="2">
            <mt-cell class="item" title="活动奖励" label="2019-10-21 16:26:17" value="+4.3 贝壳"></mt-cell>
            <div class="footer">
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="3">
            <div class="footer">
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BBellDetail",
  data() {
    return {
      isActive: false,
      selected: "1"
    };
  },
  created() {
    this.isActive = true;
  },
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.replace({ path: "/wallet/b-bell" });
    }
  }
};
</script>

<style lang="less" scoped>
#B-bell-detail {
  .inner {
    overflow-x: hidden;
    color: #000;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-white);
    height: 100vh;
    .nav {
      position: sticky;
      top: 0;
      z-index: 99;
      border-bottom: 0.03rem solid rgb(228, 228, 228);
      .head {
        display: flex;
        align-items: center;
        height: 1.6rem;
        line-height: 1.6rem;
        justify-content: space-between;
        background-color: var(--base-item-color-white);
        .back {
        width: 1rem;
        height: 1rem;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('~assets/img/video/back_black.svg');
        }
        .title {
          margin-right: 4.65rem;
          font-size: 0.45rem;
        }
      }
      .navbar {
        .nav-bar {
          .nav-bar-item {
            color: #000;
            border-color: transparent !important;
          }
          .is-selected {
            color: var(--color-tint) !important;
            span {
              position: relative;
              padding-bottom: 0.3rem;
              border-bottom: 0.05rem solid var(--color-tint);
            }
          }
          background-color: var(--base-item-color-white);
        }
      }
    }
    .content {
      overflow-y: scroll;
      .container {
        .item-outer {
          .footer {
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            img {
              position: relative;
              margin: 1rem;
              width: 2rem;
              height: 0.5rem;
            }
          }
          .item {
            height: 1.2rem !important;
            background-color: var(--base-item-color-white) !important;
          }
        }
      }
    }
  }
  .inner::-webkit-scrollbar {
    display: none;
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
}
</style>