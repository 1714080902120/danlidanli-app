<template>
  <div id="popup">
    <mt-popup class="pop" v-model="popupVisible" position="middle" popup-transition="popup-fade">
      <div class="inner">
        <div class="header" @click="addToBackLook()">添加至稍后再看</div>
        <div class="content">
          <div class="give-back">
            <div class="title">反馈（选择后将优化首页此类内容）</div>
            <div class="sub-inner">
              <span class="item" @click="tip($event)" v-waves>恐怖血腥</span>
              <span class="item" @click="tip($event)" v-waves>色情低俗</span>
              <span class="item" @click="tip($event)" v-waves>封面恶心</span>
              <span class="item" @click="tip($event)" v-waves>标题党/封面党</span>
            </div>
          </div>
          <div class="no-like">
            <div class="title">不感兴趣（选择后将减少相似内容推荐）</div>
            <div class="sub-inner">
              <span class="item" @click="tip($event)" v-waves>UP：{{ up }}</span>
              <span class="item" @click="tip($event)" v-waves>分区：日常</span>
              <span class="item" @click="tip($event)" v-waves>频道：首页</span>
              <span class="item" @click="tip($event)" v-waves>不感兴趣</span>
            </div>
          </div>
        </div>
        <div class="footer" @click="colla()">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {},
  data() {
    return {
      popupVisible: false,
      up: ""
    };
  },
  created() {
    this.ListenPopupVisible();
  },
  methods: {
    colla() {
      this.popupVisible = false;
    },
    // 获取Up名字
    ListenPopupVisible() {
      this.$Bus.$on("popupVisible", res => {
        this.popupVisible = true;
        this.up = res;
      });
    },
    // 发送举报信息
    tip(e) {
      this.$Bus.$emit("tip", e.target.innerText);
      this.popupVisible = false;
    }
  },
  watch: {
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#popup {
  .pop {
    border-radius: .2rem !important;
    .inner {
      width: 9rem;
      height: 800px;
      display: flex;
      flex-direction: column;
      font-size: 30px;
      font-family: "FangSong_GB2312";
      font-weight: lighter;
      color: rgb(197, 192, 192);
      background-color: #353434;
      .header {
        position: relative;
        height: 100px;
        line-height: 100px;
        margin-left: 40px;
        border-bottom: 2px solid rgba(90, 90, 90, 0.8);
      }
      .content {
        flex: auto;
        margin: 20px 0 20px 40px;
        .give-back,
        .no-like {
          display: flex;
          flex-direction: column;
          .title {
            margin: 20px 0;
          }
          border-bottom: 2px solid rgba(90, 90, 90, 0.8);
          .sub-inner {
            flex: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-left: -40px;
            margin-bottom: 20px;
            .item {
              width: 40%;
              height: 70px;
              line-height: 70px;
              text-align: center;
              border: 2px solid rgba(80, 80, 80, 0.8);
              border-radius: 7px;
              margin: 10px 0;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .no-like {
          border-bottom: 0;
        }
      }
      .footer {
        text-align: center;
        height: 90px;
        line-height: 90px;
        border-top: 10px solid rgba(80, 80, 80, 0.8);
        margin-bottom: 50px;
      }
    }
  }
}
</style>