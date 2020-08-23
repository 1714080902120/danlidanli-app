<template>
  <div id="trends-list" v-if="cardsList.length > 0">
    <div class="items">
      <div class="item" v-for="item in cardsList" :key="item.desc.dynamic_id">
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
            <img v-else-if="!item.desc.user_profile" v-lazy alt />
            <div class="title-publish">
              <span
                v-if="item.desc.user_profile"
                :class="{ 'is-vip': item.desc.user_profile.vip.vipType > 1 }"
              >{{ item.desc.user_profile.info.uname }}</span>
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
            v-if="item.extension || (item.display.topic_info && item.display.topic_info.topic_details.length > 0)"
          >
            <div class="lottery" v-if="item.extension && item.extension.lott">互动抽奖</div>
            <div
              class="display"
              v-if="item.display.topic_info && item.display.topic_info.topic_details.length > 0"
            >
              <span
                v-for="tab in item.display.topic_info.topic_details"
                :key="tab.topic_id"
              >#{{ tab.topic_name }}#</span>
            </div>
          </div>
          <div class="dynamic" v-if="item.cards.item && !item.cards.ori">
            <div class="desc">{{ item.cards.item.description }}</div>
            <div class="picture">
              <img
                v-for="img in item.cards.item.pictures"
                v-image-preview
                
                :style="dynamicImgStyle(img, item.cards.item.pictures.length)"
                :key="img.img_src"
                :src="img.img_src"
                :z-index="9999"
                alt
              />
            </div>
            <div class="dynamic-title">{{ item.cards.item.title }}</div>
          </div>
          <div class="video" v-if="item.cards.attribute">2</div>
          <div class="article" v-if="item.cards.summary">3</div>
          <div class="share" v-if="item.cards.ori">4</div>
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
import { DynamicNew } from "network/trends";
import timeDifference from "common/number_time/timeDifference";

export default {
  name: "TrendsList",
  data() {
    return {
      cardsList: []
    };
  },
  created() {
    this.toGetDynamicNewData();
  },
  methods: {
    toGetDynamicNewData() {
      DynamicNew().then(res => {
        this.cardsList = [...JSON.parse(JSON.stringify(res.data.cards))];
        for (let i = 0; i < this.cardsList.length; i++) {
          this.cardsList[i].cards = JSON.parse(this.cardsList[i].card);
          if (this.cardsList[i].cards.origin) {
            this.cardsList[i].cards.ori = JSON.parse(
              this.cardsList[i].cards.origin
            );
            this.cardsList[i].cards.origin_extend_jsons = JSON.parse(
              this.cardsList[i].cards.origin_extend_json
            );
          }
          this.cardsList[i].extend_jsons = JSON.parse(
            this.cardsList[i].extend_json
          );
          console.log(this.cardsList[i].cards);
        }
      });
    },
    indexOfEmoji(content) {
      let reg = /\[.*?\]/gi;
      if (content.match(reg)) {
        let data = content.match(reg);
        for (let t = 0; t < data.length; t++) {
          let e = data[t];
          let arr = content.split(e);
          let img = "";
          let j = 0;
          if (e.indexOf("热词系列_") !== -1) {
            j = 1;
          } else if (e.indexOf("tv_") !== -1) {
            j = 2;
          } else {
            j = 0;
          }
          for (let i = 0; i < this.emo[j].length; i++) {
            if (e == this.emo[j][i].name) {
              img = `<img src="${this.emo[j][i].url}" style="width: .7rem; height: .7rem; display: inline; margin-bottom: -.2rem; margin-left: .1rem; margin-right: .1rem;" />`;
              for (let j = 0; j < arr.length - 1; j++) {
                arr[j] += img;
              }
              content = arr.join("");
              break;
            }
          }
        }
      }
      return content;
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
    dynamicImgStyle() {
      let one = window.innerWidth / 5;
      let width = 0
      return (img, length) => {
        console.log(img.img_width / one);
        if (length <= 1) {
          width = img.img_width / one
          return { 'max-width': `${100}%`,  width: `${width}rem` };
        } else {
          width = 9.4 / 3
          return { 'max-width': `${30}%`,  width: `${width}rem`, height: `${width}rem` };
        }
        
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
        width: 100%;
        flex-direction: column;
        font-size: 0.4rem;
        align-items: flex-start;
        padding: 0 0.2rem;
        .tab {
          flex-wrap: wrap;
          width: 100%;
          color: rgb(56, 114, 158);
          margin: .2rem 0;
          .lottery {
            margin-right: 0.1rem;
            &:before {
              content: "";
              display: flex;
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
            flex-wrap: wrap;
            span {
              margin-right: 0.15rem;
            }
          }
        }
        .dynamic {
          flex-direction: column;
          .desc {
            width: 100%;
            line-height: 0.6rem;
            margin-bottom: .1rem;
          }
          .picture {
            margin: .1rem 0;
            width: 100%;
            flex-wrap: wrap;
            img {
              margin-right: .2rem;
              margin-bottom: .2rem;
              max-width: 100%;
              overflow: hidden;
              &:nth-child(3n) {
                margin-right: 0;
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