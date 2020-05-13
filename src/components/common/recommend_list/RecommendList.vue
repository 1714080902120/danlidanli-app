<template>
  <div id="recommend-list" v-if="data.length > 0">
    <div
      class="recommend-item"
      v-for="(item, index) in data"
      :key="item._id"
      @click="goTo()"
      @touchstart="touchStart($event)"
      @touchend="touchEnd($event)"
      v-waves
    >
      <div class="cover">
        <img v-lazy="`${item.img.src}${item.img.name}`" alt />
        <div class="info">
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
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="label">
        <p v-if="item.video.label">{{ item.video.label }}</p>
        <p v-else-if="!item.video.label">&nbsp;</p>
        <img @click="actions(index)" src="~assets/img/recommend_list/three_points_dark.svg" alt />
      </div>
    </div>
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
      isShowPopup: false
    };
  },
  created() {

  },
  methods: {
    actions(i) {
      this.$Bus.$emit('popupVisible')
      this.$store.state.popupUp = this.data[i].video.info.up;
    },
    touchStart() {},
    touchEnd() {},
    goTo() {},

  },
  components: {
  }
};
</script>

<style lang="less" scoped>
#recommend-list {
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

      img {
        width: 350px;
        border-radius: 10px;
      }
      .info {
        position: relative;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
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
}
</style>