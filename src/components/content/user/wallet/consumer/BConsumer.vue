<template>
  <div id="B-consumer">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">交易记录</span>
      </div>
      <div class="content">
        <div class="outer" v-for="(list, index) in items" :key="list.time">
          <div class="time">{{ list.time }}</div>
          <div
            class="item"
            v-for="(item, indey) in list.list"
            :key="item.time"
            @click="goTo(index, indey)"
          >
            <div class="img">
              <img :src="item.img" alt />
            </div>
            <div class="title-time">
              <span class="title">{{ item.title }}</span>
              <span class="t">{{ item.time }}</span>
            </div>
            <div class="consumer">{{ item.spent }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BCoin",
  data() {
    return {
      isActive: false,
      items: [
        {
          time: "2020年05月",
          list: [
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2020-05-01 09:02:17",
              spent: "-5B币"
            }
          ]
        },
        {
          time: "2019年09月",
          list: [
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "漫币充值",
              time: "2019-09-28 16:11:04",
              spent: "-￥1"
            },
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-09-10 07:54:16",
              spent: "-￥1"
            }
          ]
        },
        {
          time: "2019年08月",
          list: [
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-08-30 01:22:56",
              spent: "-5B币"
            },
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-08-01 17:44:13",
              spent: "-5B币"
            }
          ]
        },
        {
          time: "2019年07月",
          list: [
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-07-02 22:22:37",
              spent: "-5B币"
            }
          ]
        },
        {
          time: "2019年05月",
          list: [
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-20 22:22:37",
              spent: "-5B币"
            },
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-10 22:22:37",
              spent: "-5B币"
            },
            {
              img: require("assets/img/wallet/b_consumer/bilibili_dark.svg"),
              title: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-02 22:22:37",
              spent: "-5B币"
            }
          ]
        }
      ]
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
        this.$router.replace({ path: '/wallet/' });
        clearTimeout(timer);
        timer = null;
      }, 300);
    },
    async goTo(x, y) {
      let data = await this.items[x].list[y];
      this.$router.push({
        path: "/wallet/consumer-detail",
        query: {
          beforePath: '/wallet/b-consumer',
          data
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#B-consumer {
  color: rgb(72, 72, 72);
  overflow-x: hidden;
  .inner {
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
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
      margin-bottom: 0.2rem;
      z-index: 99;
      .back {
        padding-left: 0.5rem;
      }
      .title {
        flex: auto;
        font-size: 0.45rem;
        padding-right: 1rem;
      }
    }
    .content {
      overflow-y: scroll;
      .outer {
        .time {
          font-size: 0.4rem;
          color: #000;
          padding-left: 0.2rem;
          margin: 0.3rem 0;
        }
        .item {
          font-size: 0.3rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: var(--base-item-color-white);
          height: 2rem;
          padding-left: 0.2rem;
          border-bottom: 0.01rem solid rgb(230, 230, 230);
          .img {
            position: relative;
            width: 1.2rem;
            height: 1.2rem;
            background-color: rgb(233, 232, 232);
            border-radius: 100%;
            img {
              position: relative;
              display: flex;
              align-items: center;
              width: 0.8rem;
              height: 0.8rem;
              margin: auto;
              top: 0.2rem;
            }
          }
          .title-time {
            flex: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 0.2rem;
            span {
              margin: 0.1rem 0;
            }
            .title {
              font-size: 0.37rem;
              color: #000;
            }
            .t {
              color: var(--color-text);
            }
          }
          .consumer {
            font-size: 0.5rem;
            margin-top: -0.6rem;
            margin-right: 0.14rem;
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