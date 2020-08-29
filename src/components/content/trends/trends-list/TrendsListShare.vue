<template>
  <div id="trends-list-share" v-if="Object.keys(card).length > 0">
    <div class="head" v-if="!card.ori.apiSeasonInfo">
      <div class="left">
        <img
          class="pendant"
          v-if="card.origin_user && card.origin_user.pendant && card.origin_user.pendant.image !== ''"
          :src="card.origin_user.pendant.image"
          alt
        />
        <img v-if="card.origin_user" class="face" v-lazy="card.origin_user.info.face" alt />
        <div class="title-publish">
          <span
            :class="{ 'is-vip': card.origin_user.vip && card.origin_user.vip.vipType && card.origin_user.vip.vipType > 1 }"
          >{{ card.origin_user.info.uname }}</span>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="content">
      <div class="dynamic" v-if="card.ori.item">
        <div class="desc">{{ card.ori.item.content }}</div>
        <div class="picture" v-if="card.ori.item.pictures">
          <div
            class="img-outer"
            v-for="img in card.ori.item.pictures"
            :key="img.img_src"
            :style="dynamicImgStyle(img, card.ori.item.pictures.length, 'dynamic')"
          >
            <img v-image-preview :src="img.img_src" alt />
          </div>
        </div>
        <div class="dynamic-title">{{ card.ori.item.title }}</div>
      </div>
      <div class="video" v-if="card.ori.attribute">
        <div class="video-desc">{{ card.ori.dynamic }}</div>
        <div class="video-content">
          <div class="video-outer">
            <img :src="card.ori.pic" alt />
            <div class="time-watch-danmaku">
              <span class="time">{{ time(card.ori.duration) }}</span>
              <span class="watch">{{ watch(card.ori.stat.view) }}</span>
              <span class="danmaku">{{ danmaku(card.ori.stat.danmaku) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article" v-if="card.ori.summary">
        <div class="article-title">{{ card.ori.title }}</div>
        <div class="picture">
          <div
            class="img-outer"
            v-for="img in card.ori.image_urls"
            :key="img"
            :style="dynamicImgStyle(img, card.ori.image_urls.length, 'article')"
          >
            <img :src="img" alt />
          </div>
        </div>
        <div class="article-summary">{{ card.ori.summary }}</div>
        <div class="article-view">{{ view(card.ori.stats.view) }}阅读</div>
      </div>
      <div class="live" v-if="card.ori.roomid">
        <div class="live-content">
          <img :src="card.ori.user_cover" alt />
          <div class="title">{{ card.ori.title }}</div>
          <div class="sub">
            <span v-if="card.ori.area_v2_name">{{ card.ori.area_v2_name }}</span>
            <span v-if="card.ori.online">{{ liveOnlineCount(card.ori.online) }}</span>
          </div>
        </div>
      </div>
      <div class="season-info" v-if="card.ori.apiSeasonInfo">
        <div class="title" v-if="card.ori.apiSeasonInfo.title">{{ card.ori.apiSeasonInfo.title }}</div>
        <div class="img-contain">
          <img
            v-if="card.ori.apiSeasonInfo.cover && card.ori.apiSeasonInfo.cover !== ''"
            :src="card.ori.apiSeasonInfo.cover"
            alt
          />
          <div class="time-watch-danmaku">
            <span class="time" v-if="card.ori.episode_id">{{ time(card.ori.episode_id) }}</span>
            <span class="watch" v-if="card.ori.play_count">{{ watch(card.ori.play_count) }}</span>
            <span class="danmaku" v-if="card.ori.bullet_count">{{ danmaku(card.ori.bullet_count) }}</span>
          </div>
        </div>
        <div class="sub" v-if="card.ori.new_desc">{{ card.ori.new_desc }}</div>
      </div>
      <div class="miss" v-if="card.ori.item && card.ori.item.miss">
        <div class="miss-desc">{{ card.ori.item.content }}</div>
        <div class="miss-content">
          <span>{{ card.ori.item.tips }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { secondsFormat } from "common/number_time/numberTime.js";

export default {
  name: "TrendsListShare",
  props: {
    card: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    time() {
      return ts => {
        if (ts === 0) {
          return "-:-";
        }
        return secondsFormat(ts);
      };
    },
    danmaku() {
      return bullet => {
        return bullet >= 10000
          ? `${(bullet / 10000).toFixed(1)}万弹幕`
          : `${bullet}弹幕`;
      };
    },
    watch() {
      return v => {
        return v >= 10000 ? `${(v / 10000).toFixed(1)}万观看` : `${v}观看`;
      };
    },
    dynamicImgStyle() {
      let one = window.innerWidth / 2.5;
      let width = 0;
      return (img, length, type) => {
        if (length <= 1) {
          if (type === "dynamic") {
            width = img.img_width / one;
            if (width > 9.4) {
              return { width: `${9.4}rem` };
            }
            return { width: `${6}rem` };
          } else if (type === "article") {
            return { width: "9.4rem", "margin-right": 0 };
          }
        } else {
          width = 9.4 / 3;
          return {
            "max-width": `3rem`,
            "max-height": `3rem`,
            width: `${width}rem`,
            height: `${width}rem`
          };
        }
      };
    },
    liveOnlineCount() {
      return online => {
        return online >= 10000
          ? `${(online / 10000).toFixed(1)}万人气`
          : `${online}万人气`;
      };
    }
  }
};
</script>

<style lang="less" scoped>
* {
  display: flex;
  align-items: center;
}
img {
  border-radius: 0.1rem;
}

#trends-list-share {
  width: 10rem;
  margin-bottom: 0.3rem;
  background-color: rgb(35, 35, 35);
  flex-direction: column;
  padding: 0 0.2rem;
  padding-top: 0.2rem;
  .head {
    width: 100%;
    height: 1rem;
    padding-left: 0.3rem;
    justify-content: space-between;
    .left {
      position: relative;
      img {
        margin: 0.1rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 100%;
      }
      .pendant {
        z-index: 2;
        width: 1.275rem;
        height: 1.275rem;
        position: absolute;
        margin: 0;
        margin-left: -0.125rem;
      }
      .title-publish {
        // height: 0.8rem;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        font-size: 0.4rem;
        span {
          &:first-child {
            font-size: 0.4rem;
            font-weight: bold;
          }
        }
        .is-vip {
          color: var(--color-tint);
        }
      }
    }
    .right {
      .label {
        position: relative;
        margin-right: 0rem;
        img {
          height: 1.2rem;
        }
        .words-desc {
          position: absolute;
          right: 1.1rem;
          font-weight: bold;
        }
      }
      .select {
        height: 0.8rem;
        width: 0.8rem;
        margin-right: -0.05rem;
        margin-left: 0.1rem;
        background-size: 100% 100%;
        background-repeat: repeat;
        background-position: center center;
        background-image: url("~assets/img/recommend_list/three_points_dark.svg");
      }
    }
  }
  .content {
    width: 10rem;
    flex-direction: column;
    font-size: 0.4rem;
    align-items: flex-start;
    .picture {
      margin: 0.1rem 0;
      width: 100%;
      flex-wrap: wrap;
      .img-outer {
        justify-content: center;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        max-height: 6rem;
        overflow: hidden;
        max-width: 100%;
        img {
          width: 200%;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .time-watch-danmaku {
      width: 100%;
      padding: 0 0.2rem;
      height: 1rem;
      position: absolute;
      bottom: 0;
      font-size: 0.32rem;
      color: #fff;
      opacity: 0.8;
      .time {
        margin-right: 0.2rem;
        background-color: rgba(1, 1, 1, 0.5);
        border-radius: 0.01rem;
      }
      .watch {
        margin-right: 0.2rem;
      }
      .danmaku {
      }
    }
    .dynamic {
      flex-direction: column;
      padding: 0 0.3rem;
      .desc {
        width: 100%;
        line-height: 0.6rem;
        margin-bottom: 0.1rem;
      }
    }
    .miss {
      width: 100%;
      flex-direction: column;
      .miss-desc {
        width: 100%;
        padding: 0 0.3rem;
        line-height: 0.6rem;
      }
      .miss-content {
        width: 100%;
        color: #fff;
        background-color: rgb(37, 37, 37);
        height: 1rem;
        margin-top: 0.2rem;
        span {
          margin-left: 0.3rem;
          opacity: 0.6;
          &::before {
            content: "";
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url("~assets/img/trends/miss.svg");
          }
        }
      }
    }
    .article {
      width: 9.4rem;
      margin-left: 0.3rem;
      flex-direction: column;
      justify-content: center;
      border-radius: 0.1rem;
      border: 0.02rem solid rgba(100, 100, 100, 0.3);
      .article-title {
        width: 100%;
        line-height: 0.6rem;
        margin-bottom: 0.2rem;
      }
      .picture {
        justify-content: space-between;
      }
      .article-summary {
        opacity: 0.6;
        line-height: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //多行在这里修改数字即可
        overflow: hidden;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }
      .article-view {
        width: 100%;
        opacity: 0.5;
        height: 0.8rem;
        font-size: 0.3rem;
      }
    }
    .video {
      width: 10rem;
      padding: 0 0.3rem;
      flex-direction: column;
      justify-content: center;
      .video-desc {
        width: 100%;
        margin: 0.2rem 0;
        line-height: 0.6rem;
      }
      .video-content {
        width: 100%;
        margin-bottom: 0.3rem;
        .video-outer {
          width: 100%;
          position: relative;
          flex-direction: column;
          img {
            width: 100%;
          }
        }
      }
    }
    .live {
      width: 100%;
      padding: 0 0.3rem;
      color: #fff;
      .live-content {
        width: 100%;
        img {
          width: 100%;
        }
        .title {
          opacity: 0.6;
          line-height: 0.6rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //多行在这里修改数字即可
          overflow: hidden;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
        }
        .sub {
          opacity: 0.5;
          font-size: 0.3rem;
          // padding: 0 .2rem;
          span {
            height: 1rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
    .season-info {
      width: 100%;
      padding: 0 0.3rem;
      flex-direction: column;
      .title {
        width: 100%;
        height: 1rem;
        line-height: 100%;
        color: rgb(56, 114, 158);
        font-size: 0.35rem;
      }
      .img-contain {
        position: relative;
        width: 100%;
        img {
          width: 100%;
        }
      }
      .sub {
        width: 100%;
        height: 1rem;
        line-height: 100%;
      }
    }
  }
  .footer {
    opacity: 0.6;
    margin: 0.4rem;
    font-size: 0.35rem;
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    span {
      width: 3rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.05rem;
        margin-bottom: 0.1rem;
        &:last-child {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>