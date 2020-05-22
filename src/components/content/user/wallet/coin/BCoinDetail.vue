<template>
  <div id="B-coin-detail">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="nav">
        <div class="head">
          <span class="back" @click="goBack()">‹</span>
          <span class="title">明细</span>
        </div>
        <div class="navbar">
          <mt-navbar class="nav-bar" v-model="selected">
            <mt-tab-item class="nav-bar-item" id="1">消费明细</mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="2">充值明细</mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="3">B币卷</mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <div class="content">
        <mt-tab-container class="container" v-model="selected">
          <mt-tab-container-item class="item-outer" id="1">
            <div class="footer">
              <div class="main-1">
                <div class="main-item-1">
                  <div class="main-item-time-1">{{}}</div>
                  <div class="main-item-content-1">
                    <div class="main-item-content-title-1"><img src="~assets/img/wallet/b_consumer/bilibili_dark.svg" alt="">{{}}<span>›</span></div>
                    <div class="main-item-content-main-1">
                      <div class="main-item-content-main-left-1">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="main-item-content-main-right-1">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="2">
              <div class="main-2">
                <div class="main-item-2">
                  <div class="main-item-time-2">{{}}</div>
                  <div class="main-item-content-2">
                    <div class="main-item-content-main-2">
                      <div class="main-item-content-main-left-2">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="main-item-content-main-right-2">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="footer">
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="3">
              <div class="main-3">
                <div class="main-item-3">
                  <div class="main-item-time-3">{{}}</div>
                  <div class="main-item-content-3">
                    <div class="main-item-content-main-3">
                      <div class="main-item-content-main-left-3">
                        <span></span>
                        <span></span>
                      </div>
                      <div class="main-item-content-main-right-3">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  name: "BCoinDetail",
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
      let timer = setTimeout(() => {
        this.$router.replace({ path: "/wallet/b-coin" });
        clearTimeout(timer);
        timer = null;
      }, 300);
    }
  }
};
</script>

<style lang="less" scoped>
#B-coin-detail {
  .inner {
    overflow-x: hidden;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .nav {
      position: sticky;
      top: 0;
      z-index: 99;
      border-bottom: 0.03rem solid rgb(12, 12, 12, .2);
      .head {
        display: flex;
        align-items: center;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        background-color: var(--base-bg-color-thr);
        .back {
          padding-left: 0.5rem;
        }
        .title {
          flex: auto;
          font-size: 0.45rem;
          text-align: center;
        }
      }
      .navbar {
        .nav-bar {
          .nav-bar-item {
            border-color: #fff !important;
          }
          .is-selected {
            color: #fff !important;
          }
          background-color: var(--base-bg-color-thr);
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
            .main-1, .main-2, .main-3 {
              .main-item-1, .main-item-2, .main-item-3 {
                .main-item-time-1, .main-item-time-2, .main-item-time-3 {}

                .main-item-content-1, .main-item-content-2, .main-item-content-3 {
                  .main-item-content-title-1 {}
                  .main-item-content-main-1, .main-item-content-main-2, .main-item-content-main-3 {
                    .main-item-content-main-left-1, .main-item-content-main-left-2, .main-item-content-main-left-3 {}
                    .main-item-content-main-right-1, .main-item-content-main-right-2, .main-item-content-main-right-3 {}
                  }
                }
              }
            }
            img {
              position: relative;
              margin: 1rem;
              width: 2rem;
              height: 0.5rem;
            }
          }
          .item {
            height: 1.6rem !important;
            padding-top: .2rem;
            background-color: var(--base-bg-color-thr) !important;
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