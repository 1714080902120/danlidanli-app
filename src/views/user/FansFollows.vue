<template>
  <div id="fans-follows">
    <div class="top" :class="{ 'is-focus': isFocus === true }">
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
    </div>

    <v-touch class="follows-fans" @swipeleft="swipeLeft()" @swiperight="swipeRight()">
      <v-touch class="follows" :class="{ 'to-left': active === 1, 'back-to': active === 0 }">
        <div class="search">
          <img src="~assets/img/home/search_dark.svg" alt />
          <input
            type="text"
            placeholder="搜索我的关注"
            @blur="whenBlur($event)"
            @focus="whenFocus()"
            v-model="searchValue"
          />
        </div>
        <div class="special-follows" :class="{ 'is-focus': isFocus === true }">
          <div class="head" @click="toRotate(0, $event)">
            <img
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              :class="{ 'to-rotate': ifRotate === true, 'to-rotate-back': ifRotate === false }"
              alt
            />
            特别关注
            <sup>{{specialFollows.length}}</sup>
          </div>
          <ul ref="specialUl">
            <li ref="specialLi" v-for="item in specialFollows" :key="item.name">
              <a href="javascript:;" @click="toPersonalDetail(item.name, item.href)">
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
        <div class="default-follows" :class="{ 'is-focus': isFocus === true }">
          <div class="head" @click="toRotate(1)">
            <img
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              :class="{ 'to-rotate': ifRotate2 === true, 'to-rotate-back': ifRotate2 === false }"
              alt
            />
            默认分组
            <sup>{{follows.length}}</sup>
          </div>
          <ul ref="defaultUl">
            <li ref="defaultLi" v-for="item in follows" :key="item.name">
              <a href="javascript:;" @click="toPersonalDetail(item.name, item.href)">
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
        <div class="search-result" v-if="isFocus === true">
          <ul>
            <li v-for="item in searchResult" :key="item.name">
              <a href="javascript:;" @click="toPersonalDetail(item.name, item.href)">
                <img :src="item.img" alt />
                <div class="name-desc">
                  <span class="name">{{ item.name }}</span>
                  <span class="desc">{{ item.desc }}</span>
                </div>
              </a>
            </li>
          </ul>
          <div class="message" v-if="searchValue !== '' && searchResult.length <= 0">
            <img src="~assets/img/recommend_list/danlidanli_girl.png" alt />
            <span>没有搜到相关内容，请尝试别的搜索词</span>
          </div>
        </div>
      </v-touch>
      <v-touch class="fans" :class="{ 'to-right': active === 0, 'back-to': active === 1 }">
        <div class="head">共{{ fans.length }}个粉丝</div>
        <ul>
          <li v-for="(item, index) in fans" :key="index">
            <a href="javascript:;" @click="toPersonalDetail(item.name, item.href)">
              <img :src="item.img" alt />
              <div class="name-desc">
                <span class="name">{{ item.name }}</span>
                <span class="desc">{{ item.desc }}</span>
              </div>
              <span class="follows-state">
                <img src="~assets/img/fans_follows/get_dark.svg" alt />关注
              </span>
            </a>
          </li>
        </ul>
      </v-touch>
    </v-touch>
    <div class="popup">
        <mt-popup class="pop" v-model="popupVisible" position="right">
          <div class="pop-content-head">
            <span class="back" @click="closePop()">‹</span>
            <span class="title" @click="closeSe()">
              {{ activePerson.name }}的个人空间
            </span>
          </div>
          <div class="pop-content-main">
            <iframe class="frame" :src="activePerson.href">
              <a :href="activePerson.href">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
            </iframe>
          </div>
        </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "FansFollows",
  data() {
    return {
      popupVisible: false,
      activePerson: {
        name: '',
        href: ''
      },
      list: ["我的关注", "我的粉丝"],
      active: 0,
      ifRotate: false,
      ifRotate2: false,
      specialFollows: [],
      follows: [],
      fans: [],
      isFocus: false,
      searchResult: [],
      searchValue: "",
      send: () => {}
    };
  },
  created() {
    this.getData();
    // 防抖
    this.send = this.$debounce(this.search, 1000);
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
      this.fans = await this.$store.state.userInfo.fans_follows.fans;
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
      this.active = 1;
    },
    swipeRight() {
      this.active = 0;
    },
    toRotate(index) {
      if (index === 0) {
        this.ifRotate = !this.ifRotate;
        this.$nextTick(() => {
          let ul = this.$refs.specialUl.style;
          if (this.ifRotate) {
            ul.height = "0rem";
            ul.display = "none";
          } else {
            ul.display = "";
            ul.height = `${this.specialFollows.length * 1.5}rem`;
          }
        });
      } else {
        this.ifRotate2 = !this.ifRotate2;
        this.$nextTick(() => {
          let ul = this.$refs.defaultUl.style;
          if (this.ifRotate2) {
            ul.height = "0rem";
            ul.display = "none";
          } else {
            ul.display = "";
            ul.height = `${this.follows.length * 1.5}rem`;
          }
        });
      }
    },
    whenFocus() {
      this.isFocus = true;
    },
    whenBlur() {
      if (this.searchResult.length > 0) return false;
      this.isFocus = false;
      this.searchValue = "";
    },
    // 模糊查询
    search() {
      let reg = new RegExp(this.searchValue, "gi");
      this.searchResult = this.$store.state.userInfo.fans_follows.follows.filter(
        e => {
          return reg.test(e.name);
        }
      );
    },
    toPersonalDetail(name, href) {
      this.activePerson = {
        name,
        href
      }
      this.popupVisible = true
    },
    closePop () {
      this.popupVisible = false
    }
  },
  components: {},
  watch: {
    "$store.state.userInfo"() {
      this.getData();
    },
    searchValue() {
      this.send();
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#fans-follows {
  overflow-x: hidden;
  height: 100vh;
  .is-focus {
    display: none;
  }
  .top {
    position: sticky;
    top: 0;
    background-color: var(--base-bg-color);
    z-index: 99;
    transition: 0.1s ease-in-out;
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
  }
  .follows-fans {
    position: relative;

    .follows,
    .fans {
      overflow: hidden;
      overflow-y: scroll;
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
              border-radius: 0.1rem;
              height: 0.7rem;
              line-height: 0.7rem;
              width: 2rem;
              font-size: 0.3rem;
              background-color: rgb(110, 110, 110);
              img {
                width: 0.5rem;
                height: 0.5rem;
                margin-left: 0.25rem;
                margin-right: 0.02rem;
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
      .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 5rem;
          height: 5rem;
          margin: 1rem auto;
        }
        span {
          font-size: 0.5rem;
        }
      }
      .search {
        height: 1rem;
        line-height: 1rem;
        margin: 0.4rem 0.4rem;
        display: flex;
        align-items: center;
        background-color: rgba(30, 30, 30, 0.6);
        border-radius: 1rem;
        transition: 0.3s linear;
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
      .special-follows,
      .default-follows {
        margin-top: 0.5rem;
        font-size: 0.5rem;
        transition: 0.3s linear;
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
      ul {
        li {
          a {
            .follows-state {
              color: var(--color-tint);
              border: 0.04rem solid var(--color-tint);
              background-color: transparent;
            }
          }
        }
      }
    }
    .fans::-webkit-scrollbar {
      display: none;
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

  .popup {
    .pop {
      width: 10rem;
      height: 18rem;
      .pop-content-head {
        position: relative;
        height: 1.6rem;
        background-color: var(--base-bg-color-thr);
        display: flex;
        align-items: center;
        .back {
          padding-bottom: 0.1rem;
          margin: 0 0.5rem;
        }
        .title {
          display: flex;
          align-items: center;
          font-size: 0.45rem;
          img {
            width: 0.35rem;
            height: 0.35rem;
            margin-right: 0.2rem;
            padding-bottom: 0.05rem;
          }
        }
      }
      .pop-content-main {
        .frame {
          overflow: hidden;
          width: 10rem;
          height: 16.3rem;
        }
        .frame::-webkit-scrollbar {
          width: 0 !important;
        }
      }
    }
  }
}
#fans-follows::-webkit-scrollbar {
  display: none;
}
</style>