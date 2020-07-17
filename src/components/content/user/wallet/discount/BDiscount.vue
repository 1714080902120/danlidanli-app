<template>
  <div id="B-discount">
    <div class="inner">
      <div class="nav">
        <div class="head">
          <span class="back" @click="goBack()"></span>
          <span class="title">我的优惠券</span>
          <img src="~assets/img/wallet/B_discount/B_discount_shop.svg" alt @click="goToMemberShop()" />
        </div>
        <div class="navbar">
          <mt-navbar class="nav-bar" v-model="selected">
            <mt-tab-item class="nav-bar-item" id="1">
              <span>可使用</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="2">
              <span>待生效</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="3">
              <span>已使用</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="4">
              <span>已失效</span>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <div class="content">
        <mt-tab-container class="container" v-model="selected">
          <mt-tab-container-item class="item-outer" id="1">
            <div class="item1" v-if="item1.length > 0"></div>
            <div class="no" v-else-if="item1.length <= 0">
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
              暂无优惠券
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="2">
            <div class="item1" v-if="item2.length > 0"></div>
            <div class="no" v-else-if="item2.length <= 0">
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
              暂无优惠券
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="3">
            <div class="item1" v-if="item3.length > 0"></div>
            <div class="no" v-else-if="item3.length <= 0">
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
              暂无优惠券
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="4">
            <div class="item1" v-if="item4.length > 0"></div>
            <div class="no" v-else-if="item4.length <= 0">
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
              暂无优惠券
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BDiscount",
  data() {
    return {
      isActive: false,
      selected: "1",
      item1: [],
      item2: [],
      item3: [],
      item4: []
    };
  },
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.replace({ path: "/wallet/" });
    },
    goToMemberShop () {
      this.$router.replace({ path: '/member-shop', query: {
        beforePath: this.$route.path
      } })
    }
  }
};
</script>

<style lang="less" scoped>
#B-discount {
  .inner {
    color: #000;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-white);
    height: 100vh;
    .nav {
      position: sticky;
      top: 0;
      z-index: 99;
      .head {
        display: flex;
        align-items: center;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        background-color: var(--base-item-color-white);
        border-bottom: 0.03rem solid rgba(131, 131, 131, 0.2);
        .back {
          width: 1rem;
          height: 1rem;
          background-size: 50% 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url('~assets/img/video/back_black.svg');
        }
        .title {
          flex: auto;
          font-size: 0.45rem;
          text-align: center;
          
        }
        img {
          width: 0.8rem;
          height: 0.8rem;
          padding-right: 0.1rem;
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
        .no {
          display: flex;
          margin-top: 2.5rem;
          flex-direction: column;
          align-items: center;
          img {
            width: 6rem;

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