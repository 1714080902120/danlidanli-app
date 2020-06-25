<template>
  <div id="video-detail" v-if="Object.keys(videoData).length > 0">
    <div class="head">
      <div class="bg">
        <div class="bg-head" ref="bgHead">
          <div class="bg-head-left">
            <span @click="goBack()" :class="{ disappear: disappear }">
              <img src="~assets/img/video/back_white.svg" alt />
            </span>
          </div>
          <div class="bg-head-middle" :class="{ disappear: !disappear }"></div>
          <div class="bg-head-right">
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/small_window_dark.svg" alt />
            </span>
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/TV_dark.svg" alt />
            </span>
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/three_points_white.svg" alt />
            </span>
          </div>
        </div>
        <video
          :src="videoData.video.src + videoData.video.name"
          controls
          :style="{ width: '10rem' }"
        />
        <div class="bg-footer">
          <div class="navbar">
            <div class="navbar-content">
              <div
                class="type"
                v-for="(item, index) in typeList"
                :key="index"
                @click="toActive(index)"
                :class="{ 'active': isActive === index }"
                v-waves
              >
                <span>{{ item.name }}{{item.num}}</span>
              </div>
            </div>
            <span class="navbar-active-footer" :style="{ 'left': `${.5 + 3 * isActive}rem` }"></span>
          </div>
          <div class="close-danmaku">
            <input type="text" :model="danmaku" placeholder="点我发弹幕" />
            <span>
              <img src="~assets/img/video/open_danmaku.svg" alt />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="in-desc" v-if="isActive === 0">
      <div class="desc" v-if="Object.keys(upData).length > 0">
        <div class="desc-up">
          <div class="desc-left">
            <div class="desc-up-left">
              <img v-lazy="upData.baseInfo.logo.src + upData.baseInfo.logo.name" alt />
            </div>
            <div class="desc-up-right">
              <span>{{ upData.baseInfo.name }}</span>
              <span>{{ upData.baseInfo.fans_follows_likes.fans }}粉丝</span>
            </div>
          </div>
          <div class="desc-right" v-waves>
            <span>+</span>
            <span>{{ type }}</span>
          </div>
        </div>
        <div class="desc-video">
          <div class="desc-title">
            <div class="desc-video-title" :class="{ 'show-all': isRotate }">{{ videoData.title }}</div>
            <img
              @click="toRotate()"
              :class="{ 'rotate': isRotate }"
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              alt
            />
          </div>

          <div class="desc-video-sub">
            <span>
              <img src="~assets/img/recommend_list/play_dark.svg" alt />
              {{ videoData.plays }}
            </span>
            <span>
              <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
              {{ videoData.danmaku }}
            </span>
            <span>{{ videoData.video.info.time }}</span>
            <span>{{ videoData.bvid }}</span>
          </div>
        </div>
      </div>
      <LikePayCollect class="like-pay-collect" :dataList="videoData.video.people_feel" />
      <div class="desc-state" v-if="videoData.video.label">
        <span>{{ videoData.video.label }}</span>
      </div>
      <div class="recommend-list">
        <ul>
          <li v-for="(item, index) in videoList" :key="index" @click="alert()" v-waves>
            <div class="item-left">
              <img
                v-if="item.main.content.inner.img.length > 0"
                v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                alt
              />
              <span
                v-if="item.main.content.inner.detail.length > 0"
                class="time"
              >{{ item.main.content.inner.detail[0] }}</span>
            </div>
            <div class="item-right">
              <div
                class="item-right-title"
                v-if="item.main.content.inner.title.length > 0"
              >{{ item.main.content.inner.title[0] }}</div>
              <div class="publish-time">
                <img src="~assets/img/video/UP_dark.svg" alt />
                {{ upData.baseInfo.name }}
              </div>
              <div class="message" v-if="item.main.content.inner.detail.length > 0">
                <span>
                  <img src="~assets/img/recommend_list/play_dark.svg" alt />
                  {{ parseInt(item.main.content.inner.detail[1]) }}
                </span>
                <span>
                  <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
                  {{ parseInt(item.main.content.inner.detail[2]) }}
                </span>
                <span>
                  <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="in-assess" v-if="isActive === 1">
      <div class="assess">
        <div class="assess-head">
          <span>热门评论</span>
          <span>
            <img src="~assets/img/base/munu_white.svg" alt />
            {{ assessType }}
          </span>
        </div>
        <div class="assess-content">
          <ul>
            <li v-for="(item, index) in videoData.assess.detail" :key="index" v-waves>
              <div class="assess-detail-head">
                <div class="assess-detail-head-left" @click="goTo(item.mid)">
                  <div class="assess-detail-head-left-1">
                    <img v-lazy="item.src + item.name" alt />
                  </div>
                  <div class="assess-detail-head-left-2">
                    <div class="name-title">
                      <div class="name" @click="goTo(item.mid)">{{ peopleName }}</div>
                      <div v-if="levelList.length > 0">
                        <div class="level" :style="{ 'background-color': levelList[index].color }">
                          LV
                          <span  :style="{ 'background-color': levelList[index].color }">{{ levelList[index].level }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="publish-time">{{ item.time }}</div>
                  </div>
                </div>
                <div
                  class="assess-detail-head-right"
                >{{ assessPeopleState.before }} {{ assessPeopleState.after }}</div>
              </div>
              <div class="assess-detail-content">
                <div class="assess-detail-content-1">{{ item.content }}</div>
                <div class="assess-detail-content-2">
                  <div class="assess-detail-content-2-left">
                    <span v-for="(src, indey) in srcList" :key="indey">
                      <img :src="src.default" alt />
                    </span>
                  </div>
                  <div class="assess-detail-content-2-right">
                    <span>
                      <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeData } from "network/home.js";
import { getUpDetail } from "network/up.js";
import LikePayCollect from "components/common/like_pay_collect/LikePayCollect";
import { Toast } from "mint-ui";
import { assess } from "network/video.js";

export default {
  name: "VideoDetail",
  data() {
    return {
      isActive: 1,
      disappear: false,
      videoData: {},
      upData: {},
      typeList: [{ name: "简介" }, { name: "评论", num: 0 }],
      type: "关注",
      isRotate: false,
      videoList: [],
      danmaku: "",
      assessType: "按热度",
      assessPeopleState: {
        before: "+",
        after: "关注"
      },
      peopleName: "名字忘记爬了~",
      srcList: [
        {
          default: require("assets/img/user/space/likes_dark.svg"),
          active: require("assets/img/user/space/likes_pink.svg")
        },
        {
          default: require("assets/img/video/dislike_empty_dark.svg"),
          active: require("assets/img/video/dislike_empty_pink.svg")
        },
        { default: require("assets/img/user/set/share_dark.svg") },
        { default: require("assets/img/user/space/discuss_dark.svg") }
      ],
      levelList: [],
      colorList: [
        '#e6e6e6', '#e6e6e6', '#95DDB2', '#92D1E5', '#FFB37C', '#FF7A18', '#FF0000'
      ]
    };
  },
  async created() {
    await getHomeData({ skip: 0 }).then(res => {
      this.videoData = res[1];
      this.typeList[1].num = res[1].assess.detail.length;
    });
    await getUpDetail(this.videoData.up.mid).then(res => {
      this.upData = res;
      res.cardList.forEach(e => {
        if (e.type === "wings") {
          this.videoList.push(e);
        }
      });
    });
    await assess(this.videoData.bvid, 0).then(res => {
      console.log(res);
    });
    for (let i = 0; i <= 4; i++) {
      let level = Math.round(Math.random() * 6)
      let color = this.colorList[level]
      let obj = {
        level,
        color
      }
      this.levelList.push(obj)
    }
  },
  components: {
    LikePayCollect
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toActive(i) {
      if (i === this.isActive) {
        return false;
      }
      this.isActive = i;
    },
    toRotate() {
      this.isRotate = !this.isRotate;
    },
    alert() {
      Toast({
        message: "不要再点啦~忘了爬链接，嘤嘤嘤",
        duration: 3000,
        position: "middle"
      });
    },
    goTo(mid) {
      this.$store.commit('getUuid', mid)
      this.$router.replace({ path: '/personal-space' })
    }
  }
};
</script>

<style lang="less" scoped>
#video-detail {
  width: 10rem;
  height: 100vh;
  overflow: hidden;
  background-color: var(--base-set-bg-color) !important;
  font-size: 0.4rem;
  overflow-y: scroll;
  .head {
    position: sticky;
    top: 0;
    z-index: 999;
    .bg {
      position: relative;
      video {
        margin-bottom: -0.1rem;
      }
      .bg-head {
        padding: 0.3rem;
        position: fixed;
        top: 0rem;
        z-index: 9;
        width: 10rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bg-head-left {
          position: relative;
          span {
            position: relative;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            img {
              width: 0.6rem;
              height: 0.6rem;
            }
          }
          .disappear {
            transition: 0.1s;
            background-color: transparent;
          }
        }
        .bg-head-middle {
          margin-right: -1rem;
          font-size: 0.5rem;
          transition: 0.3s;
        }
        .bg-head-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          span {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            transition: 0.3s;
            img {
              width: 0.6rem;
              height: 0.6rem;
            }
            &:first-child {
              img {
                width: 0.7rem;
                height: 0.7rem;
              }
            }

            &:last-child {
              img {
                width: 1rem;
                height: 1rem;
              }
            }
          }
          .disappear {
            transition: 0.3s;
            background-color: transparent;
          }
        }
        .disappear {
          transition: 0.3s;
          color: transparent;
        }
      }
      .bg-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
        background-color: var(--base-set-item-color);
        box-shadow: 0rem 0.01rem .5rem rgb(20, 20, 20);
        height: 1rem;
        .navbar {
          font-size: 0.4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .navbar-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 5rem;
            .type {
              text-align: center;
              width: 2rem;
              height: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                text-align: center;
              }
            }
            .active {
              display: flex;
              align-items: center;
              color: var(--color-tint);
            }
          }
          .navbar-active-footer {
            transition: 0.3s;
            position: relative;
            top: -0.05rem;
            width: 1rem;
            height: 0.05rem;
            background-color: var(--color-tint);
            border-radius: 0.2rem;
          }
        }
        .close-danmaku {
          position: relative;
          height: 0.8rem;
          background-color: rgb(20, 20, 20);
          display: flex;
          align-items: center;
          border-radius: 3rem;
          input {
            padding-left: 0.2rem;
            width: 2.4rem;
            background-color: transparent;
            border: none;
            outline: none;
            font-size: 0.4rem;
          }
          span {
            width: 1rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            // background-image: url('~assets/img/video/close_danmaku.svg');
            background-size: 0.7rem 0.7rem;
            background-position: center center;
            background-repeat: no-repeat;
            border-radius: 0 3rem 3rem 0;
            background-color: rgba(50, 50, 50, 0.6);
            img {
              width: 0.7rem;
              height: 0.7rem;
            }
          }
        }
      }
    }
  }
  .desc {
    padding: 0.5rem 0.3rem 0 0.3rem;
    .desc-up {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.4rem;
      .desc-left {
        display: flex;
        align-items: center;
        .desc-up-left {
          width: 1rem;
          height: 1rem;
          border-radius: 100%;
          background-size: 1rem 1rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
          margin-right: 0.3rem;
          img {
            border-radius: 100%;
            width: 1rem;
            height: 1rem;
          }
        }
        .desc-up-right {
          display: flex;
          flex-direction: column;
          display: flex;
          span {
            &:last-child {
              font-size: 0.25rem;
              opacity: 0.6;
              margin-top: 0.15rem;
            }
          }
        }
      }
      .desc-right {
        width: 2.2rem;
        height: 0.7rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.4rem;
        color: #fff;
        border-radius: 0.1rem;
        background-color: var(--color-tint);
        span {
          &:first-child {
            font-size: 0.5rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
    .desc-video {
      display: flex;
      flex-direction: column;
      .desc-title {
        display: flex;
        justify-content: space-between;
        .desc-video-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 9rem;
          opacity: 0.9;
          transition: 0.3s;
        }
        .show-all {
          transition: 0.3s;
          white-space: initial;
          overflow: initial;
          text-overflow: initial;
          height: 1.2rem;
        }
        img {
          transition: 0.3s;
          width: 0.4rem;
          height: 0.4rem;
          opacity: 0.6;
        }
        .rotate {
          transition: 0.3s;
          transform: rotateZ(180deg);
        }
      }
      .desc-video-sub {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        margin-top: 0.3rem;
        span {
          display: flex;
          align-items: center;
          margin-right: 0.3rem;
          opacity: 0.6;
          img {
            width: 0.4rem;
            height: 0.4rem;
            padding-bottom: 0.05rem;
          }
        }
      }
    }
  }
  .like-pay-collect {
    padding: 0.1rem 0;
    border-bottom: 0.02rem solid rgba(50, 50, 50, 0.6);
  }
  .desc-state {
    padding: 0 0.3rem;
    color: var(--color-tint);
    margin: 0.5rem 0 0.3rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      height: 0.8rem;
      width: 2rem;
      background-color: rgb(20, 20, 20);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      &::before {
        content: "";
        position: relative;
        background-image: url("~assets/img/video/hot.svg");
        background-repeat: no-repeat;
        background-size: 0.5rem 0.5rem;
        background-position: center center;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
  .recommend-list {
    
    padding-top: 0;
    transition: 0.3s;
    ul {
      display: flex;
      flex-direction: column;
      li {
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        list-style: none;
        height: 2.6rem;
        border-bottom: 0.01rem solid rgba(100, 100, 100, 0.2);
        .item-left {
          position: relative;
          width: 3rem;
          height: 2rem;
          border-radius: 0.1rem;
          background-size: 3rem 2rem;
          background-position: center center;
          background-repeat: no-repeat;
          background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
          img {
            width: 3rem;
            height: 2rem;
            border-radius: 0.1rem;
          }
          .time {
            font-size: 0.3rem;
            position: absolute;
            bottom: 0.1rem;
            right: 0.15rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(50, 50, 50, 0.6);
          }
        }
        .item-right {
          height: 2rem;
          flex: auto;
          display: flex;
          padding-left: 0.3rem;
          flex-direction: column;
          justify-content: space-between;
          .item-right-title {
            width: 6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .publish-time {
            margin-top: 0.3rem;
            font-size: 0.3rem;
            display: flex;
            align-items: center;
            opacity: .8;
            img {
              opacity: .6;
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.03rem;
              padding-bottom: .05rem;
            }
          }
          .message {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 0.28rem;
              opacity: 0.6;
              display: flex;
              align-items: center;
              margin-top: 0.1rem;
              img {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.1rem;
                padding-bottom: .05rem;
              }
              &:last-child {
                img {
                  width: 0.6rem;
                  height: 0.6rem;
                  margin-right: 0;
                  padding-bottom: 0;
                }
              }
              &:nth-child(2) {
                img {}
              }
            }
          }
        }
      }
    }
  }
  .in-assess {
    border-top: .3rem;
    .assess {
      display: flex;
      flex-direction: column;
      .assess-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem .3rem 0 .3rem;
        span {
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          &:last-child {
            opacity: 0.6;
          }
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.1rem;
          }
        }
      }
      .assess-content {
        ul {
          li {
            padding: .3rem;
            list-style: none;
            border-bottom: .02rem solid rgba(100, 100, 100, 0.2);
            .assess-detail-head {
              display: flex;
              justify-content: space-between;
              margin-bottom: .3rem;
              .assess-detail-head-left {
                display: flex;
                align-items: center;
                justify-content: space-around;
                .assess-detail-head-left-1 {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 1rem;
                  height: 1rem;
                  background-size: 1rem 1rem;
                  background-position: center center;
                  background-repeat: no-repeat;
                  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                  margin-right: .4rem;
                  img {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 100%;
                  }
                }
                .assess-detail-head-left-2 {
                  display: flex;
                  flex-direction: column;
                  .name-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .name {
                      opacity: .9;
                      margin-right: .2rem;
                    }
                    .level {
                      position: relative;
                      font-size: .24rem;
                      display: flex;
                      height: 0.2rem;
                      width: .4rem;
                      background-color: rgb(246, 122, 24);
                      color: var(--base-set-item-color);
                      z-index: 3;
                      font-weight: bold;
                      font-family: "Black";
                      span {
                        z-index: 2;
                        display: flex;
                        align-items: flex-start;
                        text-align: center;
                        justify-content: center;
                        position: absolute;
                        background-color: rgb(246, 122, 24);
                        font-size: 0.28rem;
                        top: -0.05rem;
                        right: 0;
                        width: 0.14rem;
                        height: 0.2rem;
                      }
                    }
                  }
                  .publish-time {
                    opacity: .6;
                    font-size: .25rem;
                    margin-top: .3rem;
                  }
                }
              }
              .assess-detail-head-right {
                color: var(--color-tint);
                text-align: center;
                width: 1.4rem;
              }
            }
            .assess-detail-content {
              display: flex;
              flex-direction: column;
              margin-left: 1.4rem;
              font-size: .35rem;
              .assess-detail-content-1 {
                margin-bottom: .3rem;
                padding-right: .02rem;
              }
              .assess-detail-content-2 {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .assess-detail-content-2-left {
                  
                  span {
                    margin-right: .4rem;
                    img {
                      opacity: 0.6;
                      width: 0.5rem;
                      height: 0.5rem;
                    }
                    &:first-child {
                      img {
                        opacity: 0.5;
                      }
                    }
                    &:nth-child(2) {
                      img {
                        width: 0.4rem;
                        height: 0.4rem;
                        opacity: 0.5;
                      }
                    }
                  }
                }
                .assess-detail-content-2-right {
                  span {
                    img {
                      width: 0.5rem;
                      height: 0.5rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
#video-detail::-webkit-scrollbar {
  display: none;
}
</style>