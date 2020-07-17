<template>
  <div id="B-coin-detail">
    <div class="inner">
      <div class="nav">
        <div class="head">
          <span class="back" @click="goBack()"></span>
          <span class="title">明细</span>
        </div>
        <div class="navbar">
          <mt-navbar class="nav-bar" v-model="selected">
            <mt-tab-item class="nav-bar-item" id="1">
              <span>消费明细</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="2">
              <span>充值明细</span>
            </mt-tab-item>
            <mt-tab-item class="nav-bar-item" id="3">
              <span>B币卷</span>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <div class="content">
        <mt-tab-container class="container" v-model="selected">
          <mt-tab-container-item class="item-outer" id="1">
            <div class="main-1">
              <div class="main-item-1" v-for="list in item1" :key="list.time">
                <div class="main-item-time-1">{{ list.time }}</div>
                <div class="main-item-content-1" v-for="(item, indey) in list.content" :key="indey">
                  <div class="main-item-content-title-1">
                    <img src="~assets/img/wallet/b_consumer/bilibili_dark.svg" alt />
                    哔哩哔哩
                    <span></span>
                  </div>
                  <div class="main-item-content-main-1">
                    <div class="main-item-content-main-left-1">
                      <span>订单号 {{ item.order }}</span>
                      <span>{{ item.name }}</span>
                      <span>{{ item.time }}</span>
                    </div>
                    <div class="main-item-content-main-right-1">
                      <span>
                        <span>{{ item.spent }}</span>B币
                      </span>
                      <span>支付成功</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <img src="~assets/img/wallet/B_bell/B_bell_detail.png" alt />已经到底啦_(:з"∠)_
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="item-outer" id="2">
            <div class="main-2">
              <div class="main-item-2" v-for="list in item2" :key="list.time">
                <div class="main-item-time-2">{{list.time}}</div>
                <div class="main-item-content-2" v-for="(item, indey) in list.content" :key="indey">
                  <div class="main-item-content-main-2">
                    <div class="main-item-content-main-left-2">
                      <span>订单号 {{item.order}}</span>
                      <span>{{ item.spentType }}</span>
                      <span>{{ item.time }}</span>
                    </div>
                    <div class="main-item-content-main-right-2">
                      <span>
                        <span>{{ item.spent }}</span>B币
                      </span>
                      <span>{{ item.spentState }}</span>
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
              <div class="main-item-3" v-for="list in item3" :key="list.time">
                <div class="main-item-time-3">{{ list.time }}</div>
                <div class="main-item-content-3" v-for="(item, indey) in list.content" :key="indey">
                  <div class="main-item-content-main-3">
                    <div class="main-item-content-main-left-3">
                      <span>{{ item.title }}</span>
                      <span>{{ item.time }}</span>
                    </div>
                    <div class="main-item-content-main-right-3">
                      <span><span>{{ item.spent }}</span>B币券</span>
                      <span>已全部使用</span>
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
      selected: "1",
      item1: [
        {
          time: "2020年05月",
          content: [
            {
              order: "125602612069692211213",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2020-05-01 09:02:17",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年09月",
          content: [
            {
              order: "117121024124161638413",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-09-10 07:54:16",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年08月",
          content: [
            {
              order: "116712549303250534413",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-08-30 01:22:56",
              spent: "5.0"
            },
            {
              order: "115686319324347596813",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-08-01 17:44:13",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年07月",
          content: [
            {
              order: "116712239312342534413",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-07-30 01:22:56",
              spent: "5.0"
            },
            {
              order: "113386319324347596813",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-07-01 17:44:13",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年05月",
          content: [
            {
              order: "116713339312342534413",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-30 01:22:56",
              spent: "5.0"
            },
            {
              order: "114486319324347596813",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-02 17:44:13",
              spent: "5.0"
            },
            {
              order: "114486319324347596813",
              name: "承包-《我的妹妹不可能那么可爱 第一季》",
              time: "2019-05-01 17:44:13",
              spent: "5.0"
            }
          ]
        }
      ],
      item2: [
        {
          time: "2018年12月",
          content: [
            {
              order: "125603432069692211213",
              time: "2018-12-31 23:44:20",
              spentType: "未支付",
              spent: "68.0",
              spentState: "未支付"
            }
          ]
        },
        {
          time: "2018年02月",
          content: [
            {
              order: "117431024124161638413",
              time: "2018-02-28 07:54:16",
              spentType: "微信",
              spent: "98.0",
              spentState: "充值成功"
            },
            {
              order: "117121021324161638413",
              time: "2018-02-28 07:54:00",
              spentType: "微信",
              spent: "98.0",
              spentState: "未支付"
            }
          ]
        },
        {
          time: "2017年09月",
          content: [
            {
              order: "1124224124161638413",
              time: "2017-09-22 07:54:16",
              spentType: "微信",
              spent: "10.0",
              spentState: "充值成功"
            },
            {
              order: "11712234124161638413",
              time: "2017-09-13 07:54:16",
              spentType: "支付宝",
              spent: "10.0",
              spentState: "未支付"
            },
            {
              order: "11712234122322638413",
              time: "2017-09-04 07:54:16",
              spentType: "支付宝",
              spent: "10.0",
              spentState: "未支付"
            }
          ]
        },
        {
          time: "2017年07月",
          content: [
            {
              order: "11722234124161638413",
              time: "2017-07-08 07:54:16",
              spentType: "支付宝",
              spent: "10.0",
              spentState: "未支付"
            },
            {
              order: "11715234124161638413",
              time: "2017-07-01 07:54:16",
              spentType: "微信",
              spent: "100.0",
              spentState: "未支付"
            }
          ]
        },
        {
          time: "2017年05月",
          content: [
            {
              order: "11112234124161638413",
              time: "2017-05-28 07:54:16",
              spentType: "微信",
              spent: "20.0",
              spentState: "未支付"
            },
            {
              order: "11212234124161638413",
              time: "2017-05-18 07:54:16",
              spentType: "支付宝",
              spent: "10.0",
              spentState: "未支付"
            },
            {
              order: "11412234124161638413",
              time: "2017-05-08 07:54:16",
              spentType: "支付宝",
              spent: "30.0",
              spentState: "充值成功"
            }
          ]
        }
      ],
      item3: [
        {
          time: "2020年05月",
          content: [
            {
              title: "年费大会员返B币",
              time: "2020-05-01 09:02:17",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年09月",
          content: [
            {
              title: "年费大会员返B币",
              time: "2019-09-28 16:11:04",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年08月",
          content: [
            {
              title: "年费大会员返B币",
              time: "2019-08-30 01:22:56",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年07月",
          content: [
            {
              title: "年费大会员返B币",
              time: "2019-07-02 22:22:37",
              spent: "5.0"
            }
          ]
        },
        {
          time: "2019年05月",
          content: [
            {
              title: "年费大会员返B币",
              time: "2019-05-02 22:22:37",
              spent: "5.0"
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
      this.$router.replace({ path: "/wallet/b-coin" });
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
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .nav {
      position: sticky;
      top: 0;
      z-index: 99;
      border-bottom: 0.03rem solid rgba(12, 12, 12, 0.2);
      .head {
        display: flex;
        align-items: center;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        background-color: var(--base-bg-color-thr);
        .back {
          opacity: .6;
          width: 1rem;
          height: 1rem;
          background-size: 50% 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url('~assets/img/video/back_white.svg');
        }
        .title {
          flex: auto;
          font-size: 0.45rem;
          text-align: center;
          margin-right: 1rem;
        }
      }
      .navbar {
        .nav-bar {
          .nav-bar-item {
            border-color: transparent !important;
          }
          .is-selected {
            color: #fff !important;
            span {
              position: relative;
              padding-bottom: 0.3rem;
              border-bottom: 0.05rem solid #fff;
            }
          }
          background-color: var(--base-bg-color-thr);
        }
      }
    }
    .content {
      overflow-y: scroll;
      .container {
        .item-outer {
          .main-1,
          .main-2,
          .main-3 {
            font-size: 0.4rem;
            display: flex;
            flex-direction: column;
            .main-item-1,
            .main-item-2,
            .main-item-3 {
              flex: auto;
              display: flex;
              flex-direction: column;
              .main-item-time-1,
              .main-item-time-2,
              .main-item-time-3 {
                margin: 0.4rem 0;
                margin-left: 0.25rem;
              }
              .main-item-content-1,
              .main-item-content-2,
              .main-item-content-3 {
                background-color: var(--base-bg-color-thr);
                padding: 0 0.25rem;
                display: flex;
                flex-direction: column;
                border-bottom: 0.01rem solid rgba(180, 180, 180, 0.9);
                .main-item-content-title-1 {
                  font-size: 0.35rem;
                  display: flex;
                  align-items: center;
                  height: 1.2rem;
                  border-bottom: 0.01rem solid rgba(180, 180, 180, 0.9);
                  img {
                    width: 0.5rem;
                    height: 0.5rem;
                    margin-right: 0.2rem;
                    margin-bottom: .05rem;
                  }
                  span {
                    width: .5rem;
                    height: .5rem;
                    transform: rotateZ(180deg);
                    background-size: 50% 50%;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-image: url('~assets/img/video/back_white.svg');
                  }
                }
                .main-item-content-main-1,
                .main-item-content-main-2,
                .main-item-content-main-3 {
                  font-size: 0.35rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 0.2rem 0;
                  color: rgba(180, 180, 180, 0.5);
                  .main-item-content-main-left-1,
                  .main-item-content-main-left-2,
                  .main-item-content-main-left-3 {
                    display: flex;
                    flex-direction: column;
                    span {
                      margin: 0.15rem 0;
                      &:nth-child(2) {
                        color: var(--color-text);
                        font-size: 0.4rem;
                      }
                      &:last-child {
                        margin-bottom: 0.3rem;
                      }
                    }
                  }
                  .main-item-content-main-left-3 {
                    span {
                      &:first-child {
                        color: var(--color-text);
                        font-size: .45rem;
                      }
                      &:last-child {
                        font-size: .35rem;
                                         color: rgba(180, 180, 180, 0.5);
                      }
                    }
                  }
                  .main-item-content-main-right-1,
                  .main-item-content-main-right-2,
                  .main-item-content-main-right-3 {
                    display: flex;
                    flex-direction: column;
                    span {
                      text-align: right;
                      span {
                        color: var(--color-text);
                        font-size: 0.55rem;
                      }
                      margin: 0.3rem 0;
                      color: var(--color-text);
                      &:first-child {
                        margin-top: -0.2rem;
                      }
                    }
                  }
                  .main-item-content-main-right-3 {
                    span {
                      span {
                        font-size: .5rem;
                      }
                      margin: .15rem 0;
                    }
                  }
                }
              }
            }
          }
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
            height: 1.6rem !important;
            padding-top: 0.2rem;
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