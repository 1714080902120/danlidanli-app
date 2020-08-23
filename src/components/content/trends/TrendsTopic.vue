<template>
  <div id="trends-topic">
    <div class="title">话题</div>
    <div class="items">
      <div class="item" v-for="item in need" :key="item.topic_id">
        <div class="left">
          <span :style="{ 'backgroundImage': `url(${item.icon_url})` }"></span>
          <span>{{ item.icon_desc }}</span>
        </div>
        <div class="right">{{ item.topic_name }}</div>
      </div>
      <div class="for-more">查看更多</div>
    </div>
  </div>
</template>

<script>
import { DynamicTopic } from "network/trends";

export default {
  name: "TrendsTopic",
  data() {
    return {
      list: [],
      need: []
    };
  },
  created() {
    this.toGetTopic();
  },
  methods: {
    toGetTopic() {
      DynamicTopic().then(res => {
        if (res.data.list && res.data.list.length > 0) {
          this.list = [...res.data.list];

          this.need = this.list.filter((n, i) => {
            return n && i < 3;
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  display: flex;
  align-items: center;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
#trends-topic {
  width: 10rem;
  background-color: rgb(54, 54, 54);
  justify-content: center;
  font-size: 0.35rem;
  padding: 0 0.3rem;
  flex-direction: column;
  margin-top: 0.3rem;
  .title {
    margin-top: 0.2rem;
    height: 0.6rem;
    width: 100%;
  }
  .items {
    flex-wrap: wrap;
    .item {
      height: 1rem;
      width: 4.7rem;

      .left {
        margin-right: 0.2rem;
        span {
          &:first-child {
            width: 0.4rem;
            height: 0.4rem;
            z-index: 2;
            border-radius: 100%;
          }
          &:last-child {
            font-size: 0.25rem;
            width: 0.9rem;
            height: 0.4rem;
            justify-content: center;
            background-color: rgb(45, 45, 45);
            border-radius: 0.3rem;
            margin-left: -0.2rem;
          }
        }
      }
      .right {
        color: #fff;
        opacity: 0.8;
        width: 3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
      }
    }
    .for-more {
      width: 4.2rem;
      height: 1rem;
      color: rgb(26, 114, 247);
      &::after {
        content: "";
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.25rem;
        height: 0.25rem;
        transform: rotateZ(180deg);
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("~assets/img/trends/back.svg");
      }
    }
  }
}
</style>