<template>
  <div id="fans-follows">
    <div class="back">
      <div class="go-back" @click="goBack()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </div>
      <div class="close" @click="goBack()" v-waves>
        <img src="~assets/img/fans_follows/close_dark.svg" alt />我的好友
      </div>
    </div>
    <div class="nav">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'is-active': index === active }"
        v-waves
      >
        <span @click="toActive(index)">{{ item }}</span>
      </div>
    </div>
    <v-touch @swipeleft="swipeLeft()" @swiperight="swipeRight()" class="follows-fans">
      <v-touch class="follows" :class="{ 'to-left': active === 1, 'back-to': active === 0 }">
        <div class="search">
          <img src="~assets/img/home/search_dark.svg" alt />
          <input type="text" placeholder="搜索我的关注" />
        </div>
        <div class="special-follows">
          <div class="head" @click="toRotate()">
            <img
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              :class="{ 'to-rotate': ifRotate === true, 'to-rotate-back': ifRotate === false }"
              alt
            />
            特别关注
            <sup>{{specialFollows.length}}</sup>
          </div>
          <ul>
            <li v-for="item in specialFollows" :key="item.name">
              <a :href="item.href">
                <img :src="item.img" alt />
                <div class="name-desc">
                  <span class="name">{{ item.name }}</span>
                  <span class="desc">{{ item.desc }}</span>
                </div>
                <span class="follows-state">
                  <img src="~assets/img/fans_follows/three_rows_dark.svg" alt />已关注
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="default-follows">
          <div class="head" @click="toRotate()">
            <img
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              :class="{ 'to-rotate': ifRotate === true, 'to-rotate-back': ifRotate === false }"
              alt
            />
            特别关注
            <sup>{{follows.length}}</sup>
          </div>
          <ul>
            <li v-for="item in follows" :key="item.name">
              <a :href="item.href">
                <img :src="item.img" alt />
                <div class="name-desc">
                  <span class="name">{{ item.name }}</span>
                  <span class="desc">{{ item.desc }}</span>
                </div>
                <span class="follows-state">
                  <img src="~assets/img/fans_follows/three_rows_dark.svg" alt />已关注
                </span>
              </a>
            </li>
          </ul>
        </div>
      </v-touch>
      <v-touch class="fans" :class="{ 'to-right': active === 0, 'back-to': active === 1 }">123123123</v-touch>
    </v-touch>
  </div>
</template>

<script>
export default {
  name: "FansFollows",
  data() {
    return {
      list: ["我的关注", "我的粉丝"],
      active: 0,
      ifRotate: false,
      specialFollows: [],
      follows: []
    };
  },
  mounted() {},
  activated() {
    this.judegeThePath();
  },
  methods: {
    async getData() {
      let reg = /泠鸢yousa|尚硅谷官方|hanser|崩坏3第一偶像爱酱|李永乐老师官方|旭旭宝宝|哔哩哔哩电影|敖厂长/gi;
      this.specialFollows = await this.$store.state.userInfo.fans_follows.follows.filter(
        n => {
          return reg.test(n.name);
        }
      );
      this.follows = await this.$store.state.userInfo.fans_follows.follows.filter(
        n => {
          return !reg.test(n.name);
        }
      );
    },
    toActive(i) {
      if (this.active === i) return false;
      this.active = i;
    },
    goBack() {
      this.$router.replace({ path: this.$route.params.beforePath });
    },
    judegeThePath() {
      if (this.$route.params.name !== "关注") {
        this.active = 1;
      } else {
        this.active = 0;
      }
    },
    swipeLeft() {
      console.log(11);
    },
    swipeRight() {
      console.log(22);
    },
    toRotate() {
      this.ifRotate = !this.ifRotate;
    }
  },
  components: {},
  watch: {
    "$store.state.userInfo"() {
      this.getData();
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#fans-follows {
  overflow: hidden;
  height: 100vh;
  .back {
    height: 1.8rem;
    line-height: 1.8rem;
    display: flex;
    .go-back {
      margin: 0 0.6rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .close {
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.35rem;
      }
      font-size: 0.5rem;
      display: flex;
      align-items: center;
    }
  }
  .nav {
    height: 1.1rem;
    line-height: 1.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.5rem;
    text-align: center;
    border-top: 0.03rem solid rgba(30, 30, 30, 0.5);
    background-color: rgba(70, 69, 69, 0.9);
    box-shadow: 0 0.03rem 0.03rem rgba(30, 30, 30, 0.5);
    span {
      flex: auto;
    }
  }
  .follows-fans {
    position: relative;
    .follows {
      position: relative;
      overflow-y: scroll;
      .search {
        height: 1rem;
        line-height: 1rem;
        margin: 0.4rem 0.4rem;
        display: flex;
        align-items: center;
        background-color: rgba(30, 30, 30, 0.6);
        border-radius: 1rem;
        img {
          margin: 0 0.3rem;
          width: 0.7rem;
          height: 0.7rem;
        }
        input {
          background-color: transparent;
          outline: none;
          border: 0;
          color: var(--color-text);
          font-size: 0.45rem;
        }
      }
      .special-follows, .default-follows {
        margin-top: 0.5rem;
        font-size: 0.5rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
        ul {
          padding-left: 0.2rem;
          li {
            display: flex;
            align-items: center;
            list-style: none;
            height: 1.5rem;
            border-bottom: 0.03rem solid rgba(128, 128, 128, 0.9);
            a {
              display: flex;
              align-items: center;
              font-size: 0.45rem;
              img {
                width: 1rem;
                height: 1rem;
                border-radius: 100%;
                margin-right: 0.5rem;
              }
              .name-desc {
                display: flex;
                flex-direction: column;
                width: 5rem;
                .name {
                  color: var(--color-tint);
                }
                .desc {
                  font-weight: lighter;
                  font-size: 0.36rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .follows-state {
                display: flex;
                align-items: center;
                margin-left: 1rem;
                border-radius: .1rem;
                height: .7rem;
                line-height: .7rem;
                width: 2rem;
                font-size: .3rem;
                background-color: rgb(110, 110, 110);
                img {
                  width: 0.5rem;
                  height: 0.5rem;
                  margin-left: .25rem;
                  margin-right: .02rem;
                }
              }
            }
          }
        }
        .head {
          display: flex;
          align-items: center;
          height: 1.2rem;
          line-height: 1.2rem;
          font-weight: bold;
          font-size: 0.45rem;
          border-bottom: 0.01rem solid rgba(172, 170, 170, 0.9);
          img {
            margin: 0 0.6rem;
          }
          sup {
            font-weight: lighter;
            margin: 0 0.3rem;
          }
        }
      }
      .to-rotate {
        transition: 0.3s;
        transform: rotateZ(-180deg);
      }
      .to-rotate-back {
        transition: 0.3s;
        transform: rotateZ(0deg);
      }
    }
    .follows::-webkit-scrollbar {
      display: none;
    }
    .fans {
      position: absolute;
      top: 0;
    }
    .to-left {
      transition: 0.12s;
      transform: translateX(-10rem);
    }
    .to-right {
      transition: 0.12s;
      transform: translateX(10rem);
    }
    .back-to {
      transition: 0.25s linear;
      transform: translateX(0rem);
    }
  }

  .is-active {
    color: var(--color-tint);
    border-bottom: 0.06rem solid var(--color-tint);
  }
}
#fans-follows::-webkit-scrollbar {
  display: none;
}
</style>