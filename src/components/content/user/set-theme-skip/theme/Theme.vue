<template>
  <div id="home-recommend-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">主题颜色</span>
    </div>
    <div class="content">
      <ul v-for="(items, index) in list" :key="items.title">
        <div class="content-title">{{ items.title }}</div>
        <li
          v-for="(item, indey) in items.content"
          :key="indey"
          @click="select(index, indey)"
          v-waves
        >
          <div class="left">
            <img v-if="index === 0" :src="item.type" alt />
            <span
              class="color"
              v-else-if="index !== 0"
              :style="{ 'background-color': `${item.type}` }"
            ></span>
            <div class="title-sub">
              <span>{{ item.title }}</span>
              <span>{{ item.sub }}</span>
            </div>
          </div>
          <div class="right">
            <span
              :class="{ active: item.more === '退订' }"
              v-if="index === 1 && indey >= 3"
              @click="follows(indey)"
            >{{ item.more }}</span>
            <img
              :class="{appear: items.selected === indey }"
              src="~assets/img/user/set/yes_pink.svg"
              alt
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup
        class="popup"
        v-model="popupVisible"
        position="middle"
        popup-transition="popup-fade"
        :modal="false"
      >
        <div class="pop-title">{{ list[1].content[selectY].more }}{{ selectColor }}主题？</div>
        <div class="pop-content">
          <span>{{ content[0] }}</span>
          <span>{{ content[1] }}</span>
        </div>
        <div class="pop-footer">
          <span @click="closePop()" v-waves>手滑了</span>
          <span @click="sure()" v-waves>{{ list[1].content[selectY].more }}</span>
        </div>
      </mt-popup>
    </div>
    <div class="modal" v-if="popupVisible"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "HomeRecommendSettings",
  data() {
    return {
      list: [
        {
          title: "首页视图",
          content: [
            {
              title: "单列",
              sub: "",
              type: require("assets/img/user/set/one_line_dark.svg"),
              more: ""
            },
            {
              title: "双列",
              sub: "",
              type: require("assets/img/user/set/double_line_dark.svg"),
              more: ""
            }
          ],
          selected: 1
        },
        {
          title: "主题颜色",
          content: [
            {
              title: "简洁白",
              type: "rgb(230,230,230)",
              sub: "",
              more: ""
            },
            {
              title: "少女粉",
              type: "rgb(237,119,153)",
              sub: "",
              more: ""
            },
            {
              title: "夜间模式",
              type: "rgb(59,59,59)",
              sub: "",
              more: ""
            },
            {
              title: "姨妈红",
              type: "rgb(228,78,69)",
              sub: "5硬币/月",
              more: "订购"
            },
            {
              title: "咸蛋黄",
              type: "rgb(241,187,27)",
              sub: "5硬币/月",
              more: "订购"
            },
            {
              title: "早苗绿",
              type: "rgb(139,189,84)",
              sub: "5硬币/月",
              more: "订购"
            },
            {
              title: "胖次蓝",
              type: "rgb(50,148,232)",
              sub: "5硬币/月",
              more: "订购"
            },
            {
              title: "基佬紫",
              type: "rgb(155,54,174)",
              sub: "5硬币/月",
              more: "订购"
            }
          ],
          selected: 2
        }
      ],
      popupVisible: false,
      selectColor: "",
      selectY: 0,
      content: ["订购后，每月将自动扣除5枚硬币,", "退订后将不再自动扣除硬币。"]
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    select(x, y) {
      if (x === 1 && this.list[1].content[y].more === '订购') {
        return false;
      }
      this.list[x].selected = y;
    },
    follows(y) {
      if (this.list[1].content[y].more === "订购") {
        this.content = [
          "订购后，每月将自动扣除5枚硬币,",
          "退订后将不再自动扣除硬币。"
        ];
      } else {
        this.content = ["退订后将不再自动扣除硬币。"];
      }
      this.selectY = y;
      this.popupVisible = true;
      this.selectColor = this.list[1].content[y].title;
      this.list[1].content[y].sub = "已订购";
    },
    closePop() {
      this.popupVisible = false;
    },
    sure() {
      if (this.list[1].content[this.selectY].more === "订购") {
        if (parseInt(this.$store.state.userInfo.coin.coins) < 5) {
          Toast({
            message: "您的硬币不足哦~~",
            duration: 3000,
            position: "middle"
          });
        } else {
          this.$store.state.userInfo.coin.coins =
            parseInt(this.$store.state.userInfo.coin.coins) - 5;
          Toast({
            message: "订阅成功~~",
            duration: 3000,
            position: "middle"
          });
          this.list[1].content[this.selectY].more = "退订";
        }
      } else {
        Toast({
          message: "退订成功~~",
          duration: 3000,
          position: "middle"
        });
        this.list[1].selected = 2
        this.list[1].content[this.selectY].more = "订购";
      }

      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#home-recommend-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head {
    position: relative;
    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      margin: 0 0.5rem;
      img {
        width: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
    }
  }
  .content {
    ul {
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      .content-title {
        font-size: 0.35rem;
        height: 0.8rem;
        line-height: 0.8rem;
        margin-left: 0.4rem;
      }
      li {
        background-color: var(--base-set-item-color);
        transition: 0.3s;
        height: 1.2rem;
        list-style: none;
        display: flex;
        padding: 0 0.4rem;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
        .left {
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 0.4rem;
          img {
            margin-right: 0.3rem;
          }
          .color {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.1rem;
            margin-right: 0.3rem;
          }
          .title-sub {
            display: flex;
            flex-direction: column;
            span {
              &:last-child {
                font-size: 0.1rem;
                opacity: 0.6;
                margin-top: 0.05rem;
              }
            }
          }
        }
        .right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-around;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 1.5rem;
            height: 0.8rem;
            border-radius: 0.1rem;
            border: 0.02rem solid var(--color-tint);
            color: var(--color-tint);
            font-size: 0.4rem;
            margin-right: 0.6rem;
          }
          .active {
            color: var(--color-text);
            background-color: var(--base-set-bg-color);
            border: 0;
            opacity: 0.4;
          }
          img {
            opacity: 0;
          }
          .appear {
            transition: 0.3s;
            opacity: 1;
          }
        }
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
  }
  .pop {
    .popup {
      width: 9rem;
      height: 4rem;
      z-index: 9999 !important;
      background-color: var(--base-set-bg-color);
      font-size: 0.45rem;
      padding: 0.5rem;
      .pop-title {
        margin-bottom: 0.3rem;
      }
      .pop-content {
        display: flex;
        flex-direction: column;

        span {
          margin: 0.05rem 0;
        }
      }
      .pop-footer {
        display: flex;
        flex-direction: row;
        span {
          position: relative;
          left: 4.2rem;
          top: 0.2rem;
          height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2rem;
          color: var(--color-tint);
        }
      }
    }
  }
  .modal {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>