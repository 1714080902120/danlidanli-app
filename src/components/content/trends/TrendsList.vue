<template>
  <div id="trends-list" v-if="cardsList.length > 0">
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in activeList"
        :key="item.desc.dynamic_id + item.desc.rid + index"
        v-waves
      >
        <div class="head">
          <div class="left">
            <img
              class="pendant"
              v-if="item.desc.user_profile && item.desc.user_profile.pendant"
              :src="item.desc.user_profile.pendant.image"
              alt
            />
            <img
              v-if="item.desc.user_profile"
              class="face"
              v-lazy="item.desc.user_profile.info.face"
              alt
            />
            <img v-else-if="!item.desc.user_profile" v-lazy="item.cards.apiSeasonInfo.cover" alt />
            <div class="title-publish">
              <span
                v-if="item.desc.user_profile"
                :class="{ 'is-vip': item.desc.user_profile.vip.vipType > 1 }"
              >{{ item.desc.user_profile.info.uname }}</span>
              <span v-if="!item.desc.user_profile">{{ item.cards.apiSeasonInfo.title }}</span>
              <span>
                {{ time(item.timestamp * 1000)}}
                <span
                  class="publish-type"
                  v-if="item.display && item.display.usr_action_txt"
                >{{ item.display.usr_action_txt }}</span>
              </span>
            </div>
          </div>
          <div class="right">
            <div
              class="label"
              v-if="item.desc.user_profile && item.desc.user_profile.decorate_card"
            >
              <img :src="item.desc.user_profile.decorate_card.card_url" alt />
              <span
                class="words-desc"
                :style="{ 'color': item.desc.user_profile.decorate_card.fan.color }"
                v-if="item.desc.user_profile.decorate_card.fan.color !== ''"
              >{{ item.desc.user_profile.decorate_card.fan.num_desc }}</span>
            </div>
            <div class="select"></div>
          </div>
        </div>
        <div class="content">
          <div
            class="tab"
            v-if="item.extension || (item.display && item.display.topic_info && item.display.topic_info.topic_details.length > 0)"
          >
            <div class="lottery" v-if="item.extension && item.extension.lott">互动抽奖</div>
            <div
              class="display"
              v-if="item.display.topic_info && item.display.topic_info.topic_details.length > 0"
            >
              <span
                v-for="(tab, indey) in topicDetails(item.display.topic_info.topic_details)"
                :key="indey"
              >{{ topicName(tab.topic_name) }}</span>
            </div>
          </div>
          <div class="dynamic" v-if="item.cards.item && !item.cards.ori">
            <div class="desc" v-html="indexOfEmoji(item.cards.item.description, index)"></div>
            <div
              class="dynamic-content"
              v-if="item.cards.item.content && item.cards.item.content !== ''"
            >{{ item.cards.item.content }}</div>
            <div class="picture">
              <div
                class="img-outer"
                v-for="(img, indez) in item.cards.item.pictures"
                :key="img.img_src + indez"
                :style="dynamicImgStyle(img, item.cards.item.pictures.length, 'dynamic')"
              >
                <img v-image-preview :src="img.img_src" alt />
              </div>
            </div>
            <div class="dynamic-title">{{ item.cards.item.title }}</div>
          </div>
          <div class="video" v-if="item.cards.attribute">
            <div class="video-desc" v-html="indexOfEmoji(item.cards.dynamic, index)"></div>
            <div class="video-content">
              <div class="video-outer">
                <img :src="item.cards.pic" alt />
                <div class="duration-watch-danmaku">
                  <span class="duration">{{ duration(item.cards.duration) }}</span>
                  <span class="watch">{{ watch(item.cards.stat.view) }}</span>
                  <span class="danmaku">{{ danmaku(item.cards.stat.danmaku) }}</span>
                </div>
              </div>
            </div>
            <div class="animate-title">{{ item.cards.title }}</div>
          </div>
          <div class="animate" v-if="item.cards.apiSeasonInfo">
            <div class="video-content">
              <div class="video-outer">
                <img v-if="item.cards.cover" :src="item.cards.cover" alt />
                <div class="duration-watch-danmaku">
                  <span class="duration">{{ duration(item.cards.episode_id) }}</span>
                  <span class="watch">{{ watch(item.cards.play_count) }}</span>
                  <span class="danmaku">{{ danmaku(item.cards.bullet_count) }}</span>
                </div>
              </div>
            </div>
            <div class="animate-title">{{ item.cards.new_desc }}</div>
          </div>
          <div class="article" v-if="item.cards.summary">
            <div class="article-title">{{ item.cards.title }}</div>
            <div class="picture">
              <div
                class="img-outer"
                v-for="(img, indea) in item.cards.image_urls"
                :key="img + indea"
                :style="dynamicImgStyle(img, item.cards.image_urls.length, 'article')"
              >
                <img :src="img" alt />
              </div>
            </div>
            <div class="article-summary">{{ item.cards.summary }}</div>
            <div class="article-view">{{ view(item.cards.stats.view) }}阅读</div>
          </div>
          <div class="live" v-if="item.cards.roomid">
            <div class="live-content">
              <img :src="item.cards.user_cover" alt />
              <div class="title">{{ item.cards.title }}</div>
              <div class="sub">
                <span v-if="item.cards.area_v2_name">{{ item.cards.area_v2_name }}</span>
                <span v-if="item.cards.online">{{ liveOnlineCount(item.cards.online) }}</span>
              </div>
            </div>
          </div>
          <div class="miss" v-if="item.cards.item && item.cards.item.miss">
            <div class="miss-desc">{{ item.cards.item.content }}</div>
            <div class="miss-content">
              <span>{{ item.cards.item.tips }}</span>
            </div>
          </div>
          <div class="share" v-if="item.cards.ori">
            <div class="share-desc">
              <TrendsListShare :card="item.cards" />
            </div>
          </div>
        </div>
        <div class="footer">
          <span>
            <img src="~assets/img/user/set/share_dark.svg" alt />
            {{ share(item.desc.repost) }}
          </span>
          <span>
            <img src="~assets/img/user/space/discuss_dark.svg" alt />
            {{ assess(JSON.parse(item.card)) }}
          </span>
          <span>
            <img src="~assets/img/user/space/likes_dark.svg" alt />
            {{ likes(item.desc.like) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DynamicNew, DynamicHistory } from "network/trends";
import timeDifference from "common/number_time/timeDifference";
import TrendsListShare from "components/content/trends/trends-list/TrendsListShare";
import { secondsFormat } from "common/number_time/numberTime.js";

export default {
  name: "TrendsList",
  props: {
    activeType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      cardsList: [],
      func: null,
      history_offset: 0
    };
  },
  created() {
    this.bus();
    this.toGetDynamicNewData();
  },
  mounted() {
    this.$nextTick(() => {
      this.$Bus.$emit("finishRender");
    });
  },
  components: {
    TrendsListShare
  },
  methods: {
    bus() {
      this.$Bus.$on("trendsNeedToAddData", () => {
        this.toGetDynamicHistoryData();
      });
    },
    toGetDynamicNewData() {
      DynamicNew("81583053").then(res => {
        this.history_offset = res.data.history_offset;
        this.changeJsonData([...JSON.parse(JSON.stringify(res.data.cards))]);
      });
    },
    toGetDynamicHistoryData() {
      DynamicHistory("81583053", this.history_offset).then(res => {
        this.history_offset = res.data.next_offset;
        let arr = [...JSON.parse(JSON.stringify(res.data.cards))];
        arr.shift();
        this.changeJsonData(arr);
      });
    },
    changeJsonData(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cards = JSON.parse(arr[i].card);
        if (arr[i].cards.origin) {
          arr[i].cards.ori = JSON.parse(arr[i].cards.origin);
          arr[i].cards.origin_extend_jsons = JSON.parse(
            arr[i].cards.origin_extend_json
          );
        }
        arr[i].extend_jsons = JSON.parse(arr[i].extend_json);
      }
      this.cardsList = this.cardsList.concat(arr);
    }
  },
  computed: {
    share() {
      return repost => {
        if (repost === 0) {
          return "转发";
        }
        return repost >= 10000 ? `${(repost / 10000).toFixed(1)}万` : repost;
      };
    },
    likes() {
      return likes => {
        if (likes === 0) {
          return "点赞";
        }
        return likes >= 10000 ? `${(likes / 10000).toFixed(1)}万` : likes;
      };
    },
    assess() {
      return card => {
        let reply = "";
        if (card.stat) {
          reply = card.stat.reply;
        } else if (card.item) {
          reply = card.item.reply;
        } else if (card.reply_count) {
          reply = card.reply_count;
        }
        if (reply == 0) {
          return "评论";
        }
        return reply >= 10000 ? `${(reply / 10000).toFixed(1)}万` : reply;
      };
    },
    time() {
      return time => {
        return timeDifference(time);
      };
    },
    view() {
      return v => {
        return v >= 10000 ? `${(v / 10000).toFixed(1)}万阅读` : `${v}阅读`;
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
          if (type === "article") {
            return {
              "max-width": `3rem`,
              "max-height": `3rem`,
              "margin-right": ".1rem",
              width: `${width}rem`,
              height: `${width}rem`
            };
          }
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
    },
    duration() {
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
    activeList() {
      if (this.activeType === 1) {
        return this.cardsList;
      } else {
        return this.cardsList.filter(n => {
          return n.cards.videos;
        });
      }
    },
    topicDetails () {
      return (details) => {
        return details.filter(n => {
          return n
        })
      }
    },
    indexOfEmoji() {
      return (content, index) => {
        // console.log(this.cardsList[i].display);
        if (
          !this.cardsList[index].display.topic_info ||
          this.cardsList[index].display.topic_info.topic_details.length <= 0 ||
          content === ""
        ) {
          // console.log(content);
          return content;
        } else {
          let reg1 = /#.*?#/gi;
          let matchWords = content.match(reg1);
          // console.log(matchWords);
          if (matchWords && matchWords.length > 0) {
            matchWords = Array.from(new Set(matchWords))
            // console.log(this.cardsList[i].display.topic_info.topic_details);
            for (
              let i = 0;
              i < this.cardsList[index].display.topic_info.topic_details.length;
              i++
            ) {
              let element = this.cardsList[index].display.topic_info.topic_details[i].topic_name;
              if (matchWords.indexOf(`#${element}#`) !== -1) {
                // 删掉这个
                let arr = content.split(`#${element}#`);
                for (let j = 0; j < arr.length - 1; j++) {
                  arr[j] += `<span style="display: inline; color: rgb(56, 114, 158);">#${element}#</span>`
                  
                }
                content = arr.join('')
                // this.cardsList[index].display.topic_info.topic_details[i].topic_name = ''
              }
            }
            // let a = this.cardsList[index].display.topic_info.topic_details.filter(n => {
            //   return matchWords.indexOf(`#${n.topic_name}#`) === -1
            // })
            // this.cardsList[index].display.topic_info.topic_details = a
            return content;
          }
        }

      };

      // let reg = /\[.*?\]/gi;
      // if (content.match(reg)) {
      //   let data = content.match(reg);
      //   for (let t = 0; t < data.length; t++) {
      //     let e = data[t];
      //     let arr = content.split(e);
      //     let img = "";
      //     let j = 0;
      //     if (e.indexOf("热词系列_") !== -1) {
      //       j = 1;
      //     } else if (e.indexOf("tv_") !== -1) {
      //       j = 2;
      //     } else {
      //       j = 0;
      //     }
      //     for (let i = 0; i < this.emo[j].length; i++) {
      //       if (e == this.emo[j][i].name) {
      //         img = `<img src="${this.emo[j][i].url}" style="width: .7rem; height: .7rem; display: inline; margin-bottom: -.2rem; margin-left: .1rem; margin-right: .1rem;" />`;
      //         for (let j = 0; j < arr.length - 1; j++) {
      //           arr[j] += img;
      //         }
      //         content = arr.join("");
      //         break;
      //       }
      //     }
      //   }
      // }
      // return content;
    },
    topicName () {
      return (name) => {
        if (name) {
          return `#${name}#`
        }
      }
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
#trends-list {
  width: 10rem;
  margin-top: 0.3rem;
  font-size: 0.3rem;
  .items {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    .item {
      width: 100%;
      margin-bottom: 0.3rem;
      background-color: rgb(54, 54, 54);
      flex-direction: column;
      padding: 0 0.2rem;
      padding-top: 0.2rem;
      .head {
        width: 100%;
        height: 1.6rem;
        padding-left: 0.3rem;
        justify-content: space-between;
        .left {
          position: relative;
          img {
            margin: 0.1rem;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
          }
          .pendant {
            z-index: 2;
            width: 1.7rem;
            height: 1.7rem;
            position: absolute;
            margin: 0;
            margin-left: -0.25rem;
          }
          .title-publish {
            height: 0.8rem;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            span {
              &:first-child {
                font-size: 0.35rem;
                font-weight: bold;
              }
              &:last-child {
                font-size: 0.3rem;
                opacity: 0.5;
                span {
                  &::before {
                    content: "·";
                  }
                }
                .publish-type {
                  font-weight: initial;
                  opacity: 1;
                }
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
            border-radius: 0.1rem;
            img {
              width: 200%;
            }
            &:nth-child(3n) {
              margin-right: 0 !important;
            }
          }
        }
        .duration-watch-danmaku {
          width: 100%;
          padding: 0 0.2rem;
          height: 1rem;
          position: absolute;
          bottom: 0;
          font-size: 0.32rem;
          color: #fff;
          opacity: 0.8;
          .duration {
            margin-right: 0.2rem;
            background-color: rgba(1, 1, 1, 0.5);
            border-radius: 0.1rem;
            height: 0.5rem;
            width: 1rem;
            justify-content: center;
          }
          .watch {
            margin-right: 0.2rem;
          }
          .danmaku {
          }
        }
        .tab {
          // flex-wrap: wrap;
          width: 100%;
          color: rgb(56, 114, 158);
          margin: 0.2rem 0;
          padding: 0 0.3rem;
          display: inline-block;
          .lottery {
            margin-right: 0.1rem;
            display: inline-block;
            &:before {
              content: "";
              display: inline-block;
              align-items: center;
              width: 0.45rem;
              height: 0.45rem;
              justify-content: center;
              background-image: url("~assets/img/trends/gift.svg");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              background-position: center center;
            }
          }
          .display {
            display: inline;
            span {
              display: inline;
              margin-right: 0.15rem;
            }
          }
        }
        .dynamic {
          flex-direction: column;
          padding: 0 0.3rem;
          .desc {
            display: inline-block;
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
            color: #fff;
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
        .video,
        .animate {
          width: 10rem;
          padding: 0 0.3rem;
          flex-direction: column;
          justify-content: center;
          .video-desc {
            display: inline-block;
            width: 100%;
            margin: 0.2rem 0;
            line-height: 0.6rem;
          }
          .video-content {
            width: 100%;
            .video-outer {
              width: 100%;
              position: relative;
              flex-direction: column;
              img {
                width: 100%;
              }
            }
          }
          .animate-title {
            width: 100%;
            height: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
  }
}
</style>