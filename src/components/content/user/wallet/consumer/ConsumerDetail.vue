<template>
  <div id="consumer-detail" v-if="Object.keys($route.query).length > 0 && $route.query.data">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">交易详情</span>
      </div>
      <div class="main-footer">
        <div class="main">
          <div class="img">
            <img :src="$route.query.data.img" alt />
          </div>
          <div class="title">哔哩哔哩</div>
          <div class="spent">{{ $route.query.data.spent }}</div>
        </div>
        <div class="footer" v-if="list.length > 0">
          <div class="list" v-for="item in list" :key="item.title">
            <span>{{ item.title }}</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsumerDetail",
  data() {
    return {
      isActive: false,
      list: []
    };
  },
  created() {
    this.isActive = true;
    this.getListData()
  },
  activated() {
    this.getListData()
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.replace({ path: '/wallet/b-consumer' });
    },
    getListData () {
      let reg = /币/gi
      let way = reg.test(this.$route.query.data.spent) !== false ? 'B币' : '支付宝'
      this.list = [
        { title: '当前状态', value: '支付成功' },
        { title: '消费商品', value: `${this.$route.query.data.title}` },
        { title: '创建时间', value: `${this.$route.query.data.time}` },
        { title: '支付时间', value: `${this.$route.query.data.time}` },
        { title: '支付方式', value: way },
        { title: '支付订单号', value: '123123151345135213523' },
      ]
    }
  }
};
</script>

<style lang="less" scoped>
#consumer-detail {
  .inner {
    color: #000;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-white);
    height: 100vh;
    .head {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-item-color-white);
      z-index: 99;
      border-bottom: 0.01rem solid rgba(160, 159, 159, 0.8);
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
        padding-right: 1rem;
      }
    }
    .main-footer {
      background-color: var(--base-item-color-white);
      .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          position: relative;
          width: 2.6rem;
          height: 2.6rem;
          background-color: rgb(229, 233, 236);
          border-radius: 100%;
          margin: 0.8rem 0;
          img {
            position: relative;
            display: flex;
            align-items: center;
            width: 1.6rem;
            height: 1.6rem;
            margin: auto;
            top: 0.5rem;
          }
        }
        .title {
          font-size: 0.4rem;
          margin-top: -0.3rem;
          margin-bottom: 0.5rem;
        }
        .spent {
          font-size: 1rem;
        }
      }
      .footer {
        margin: 0 .7rem;
        margin-top: 1rem;
        padding-top: .5rem;
        border-top: 0.03rem solid rgba(95, 95, 95, 0.2);
        .list {
          font-size: .4rem;
          display: flex;
          span {
            margin: .3rem 0;
            &:first-child {
              width: 2rem;
              color: var(--color-text);
              margin-right: .8rem;
            }
            &:last-child {
              width: 5rem;
            }
          }
        }
      }
    }
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
}
</style>