<template>
  <div id="recommend-list" v-if="data.length > 0">
    <div
      class="recommend-item"
      v-for="(item, index) in data"
      :key="item._id"
      v-waves
    >
      <div class="cover">
        <img
          :class="{ 'is-tip': isTip.indexOf(index) !== -1 }"
          v-lazy="`${item.img.src}${item.img.name}`"
          alt
        />
        <img
          class="is-tip-bg"
          v-if="isTip.indexOf(index) !== -1"
          src="~assets/img/recommend_list/no_like_dark.svg"
          alt
        />
        <div class="info" v-if="isTip.indexOf(index) === -1">
          <span>
            <img src="~assets/img/recommend_list/play_dark.svg" alt />
            {{ item.plays }}
          </span>
          <span>
            <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
            {{ item.danmaku }}
          </span>
          <span>{{ item.video.long }}</span>
        </div>
        <!-- 被举报的信息 -->
        <div class="is-tip-info" v-if="isTip.indexOf(index) !== -1">
          <span class="main">{{ tipTextList[isTip.indexOf(index)] }}</span>
          <span class="sub">将优化首页此类内容</span>
        </div>
      </div>
      <div class="is-tip-reset" v-if="isTip.indexOf(index) !== -1" @click="reset(index)">
        <img src="~assets/img/recommend_list/reset_dark.svg" alt />
        撤回
      </div>
      <div class="title" v-if="isTip.indexOf(index) === -1">{{ item.title }}</div>
      <div class="label" v-if="isTip.indexOf(index) === -1">
        <p v-if="item.video.label">{{ item.video.label }}</p>
        <p v-else-if="!item.video.label">&nbsp;</p>
        <img @click="actions(index)" src="~assets/img/recommend_list/three_points_dark.svg" alt />
      </div>
    </div>
    <div class="loading">
      <div class="left">
        <div class="text">
        <span>刷到底了哟~从头再来吧~</span>
        <span>刷新看新内容</span>
        </div>
        <div class="btn">
          <img src="~assets/img/recommend_list/pull_up_pink.svg" alt @click="backToTop()" />刷新
        </div>
        
      </div>
      <img src="~assets/img/recommend_list/danlidanli_girl.png" alt />
    </div>
    <div class="bottm"></div>
  </div>
</template>

<script>
export default {
  name: "RecommendList",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isShowPopup: false,
      isTip: [],
      isSelected: -1,
      tipTextList: []
    };
  },
  created() {
    this.whenTipd();
  },
  methods: {
    // 点击弹出举报
    actions(i) {
      this.$Bus.$emit("popupVisible", this.data[i].video.info.up);
      this.isSelected = i;
    },
    // 被通知举报了
    whenTipd() {
      this.$Bus.$on("tip", text => {
        this.isTip.push(this.isSelected);
        this.tipTextList.push(text);
      });
    },
    // 取消举报
    reset(i) {
      let index = this.isTip.indexOf(i);
      let value = this.tipTextList[index];
      this.tipTextList.splice(this.tipTextList.indexOf(value), 1);
      this.isTip.splice(index, 1);
    },
    // 返回顶部
    backToTop() {
      this.$Bus.$emit("backToTop");
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
#recommend-list {
  position: relative;
  padding: 15px;
  padding-right: 0;
  padding-top: 0;
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    flex: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 350px;
    margin-right: 15px;
    background-color: rgb(60, 60, 60);
    border-radius: 10px;
    .cover {
      position: relative;
      margin-bottom: -20px;
      .is-tip {
        filter: blur(15px);
      }
      .is-tip-bg {
        position: absolute;
        top: 20px;
        left: 120px;
        width: 100px;
        height: 100px;
      }
      .is-tip-info {
        position: relative;
        font-size: 30px;
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        bottom: 100px;
        .main {
          font-size: 35px;
        }
        .sub {
        }
      }
      img {
        width: 350px;
        border-radius: 10px;
      }
      .info {
        position: relative;
        display: flex;
        justify-content: space-between;
        font-size: .3rem;
        bottom: 45px;
        margin-left: 10px;
        color: rgb(238, 235, 235);
        span {
          display: flex;
          align-items: center;
          flex: auto;
          &:nth-child(2) {
            margin: 0 20px 0 0;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .is-tip-reset {
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: lighter;
      margin-bottom: 50px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        margin-bottom: 6px;
      }
    }
    .title {
      font-size: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: rgb(185, 185, 185);
      padding-left: 10px;
    }
    .label {
      display: flex;
      margin: 30px 0px 10px 10px;
      font-size: 30px;
      color: rgb(124, 121, 121);
      border-radius: 6px;
      align-items: center;
      justify-content: space-between;
      p {
        margin-left: 10px;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .loading {
    position: relative;
    height: 300px;
    font-size: 30px;
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
  .bottom {
    position: relative;
    height: 80px;
  }
}

@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(180deg);
  }
}
</style>