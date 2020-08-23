<template>
  <div id="member-shop">
    <BaseOuter>
      <div slot="center">
        <span>会员购</span>
      </div>
      <div slot="right">
        <span
          class="nav-right-item"
          v-for="item in navRightList"
          :key="item.imgUrl"
          :style="{ 'backgroundImage': `url(https:${item.imgUrl})` }"
        ></span>
      </div>
    </BaseOuter>
    <div class="content" @scroll="scroll($event)">
      <Top :typeList="typeList" :searchData="searchData" :blocksData="blocksList" />
      <Swipe :swipeData="swipeList" />
      <List ref="list" :feedTabs="feedTabs" :feeds="list" :num="pageNum" />
      <div class="loading">
        <div class="loading-inner">
          <div class="left">
            <div class="text">
              <span>刷到底了哟~从头再来吧~</span>
              <span>刷新看新内容</span>
            </div>
            <div class="btn">
              <img src="~assets/img/recommend_list/pull_up_pink.svg" alt />刷新
            </div>
          </div>
          <img src="~assets/img/recommend_list/danlidanli_girl.png" alt />
        </div>
      </div>
    </div>
    <Toast :obj="toastObj" />
  </div>
</template>

<script>
import {
  BaseOuter,
  Top,
  Swipe,
  List,
  Toast
} from "./index";
import { memberShopAll } from "network/membershop";
import { COOKIE } from 'common/const.js'

export default {
  name: "MemberShop",
  data() {
    return {
      navRightList: [],
      searchData: {},
      swipeList: [],
      blocksList: [],
      toastObj: {},
      feedTabs: [],
      list: [],
      typeList: [],
      pageNum: 0,
      funcForAll: null,
      funcForMagic: null,
      funcForBeauty: null,
      funcForNew: null
    };
  },
  created() {
    this.toGetmemberShopAll();
    this.bus();
    this.funcForAll = this.$debounce(this.getAll, 500, true);
    this.funcForMagic = this.$debounce(this.tellTheMagicToAddData, 500, true);
    this.funcForBeauty = this.$debounce(this.tellTheBeautyToAddData, 500, true);
    this.funcForNew = this.$debounce(this.tellTheNewToAddData, 500, true);
  },
  activated() {
    this.bus();
  },
  components: {
    BaseOuter,
    Top,
    Swipe,
    Toast,
    List
  },
  methods: {
    toGetmemberShopAll() {
      memberShopAll(COOKIE).then(res => {
        if (res.data !== -1) {
          let data = res.data.vo;
          this.list = [...data.feeds.list];
          this.navRightList.push(...data.entryList);
          this.swipeList.push(...data.banners);
          this.searchData = { ...data.searchUrl };
          this.blocksList.push(...data.blocks);
          this.typeList.push(...data.tabs);
          this.feedTabs.push(...data.feedTabs);
          this.toastObj = { ...data.marketingList[0], floating: data.floating };
        }
      });
    },
    getAll() {
      this.pageNum += 1;
      memberShopAll(COOKIE, this.pageNum).then(res => {
        if (res.data !== -1) {
          let data = res.data.vo;
          this.list.push(...data.feeds.list);
        }
      });
    },
    scroll(e) {
      if (
        e.srcElement.scrollTop >=
        e.srcElement.scrollHeight - window.innerHeight - 300
      ) {
        this.$nextTick(() => {
          switch (this.$refs.list.activeNavItem) {
            case 0:
              this.funcForAll();
              break;
            case 1:
              this.funcForMagic();
              break;
            case 2:
              this.funcForBeauty();
              break;
            case 3:
              this.funcForNew();
              break;
          }
        });
      }
    },
    tellTheMagicToAddData() {
      this.$Bus.$emit("magicAddData");
    },
    tellTheBeautyToAddData() {
      this.$Bus.$emit("beautyAddData");
    },
    tellTheNewToAddData() {
      this.$Bus.$emit("newAddData");
    },
    bus() {
      this.$Bus.$emit("isInActive", 3);
    }
  }
};
</script>

<style lang="less" scoped>
#member-shop {
  /deep/ .center {
    font-size: 0.5rem;
    span {
      position: relative;
      width: 3rem;
      left: 0.5rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /deep/ .right {
    div {
      width: 3rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav-right-item {
        width: 0.6rem;
        height: 0.6rem;
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .content {
    height: calc(100vh - 1.2rem);
    overflow: hidden;
    overflow-y: scroll;
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