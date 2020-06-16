<template>
  <div id="user-space" v-if="userData">
    <div class="head">
      <div class="bg">
        <div class="bg-head">
          <div class="bg-head-left">
            <span>
              <img src="~assets/img/user/space/back_dark.svg" alt />
            </span>
          </div>
          <div class="bg-head-right">
            <span>
              <img src="~assets/img/home/search_dark.svg" alt />
            </span>
            <span>
              <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
            </span>
          </div>
        </div>
        <img src="~assets/img/user/space/bg.jpg" alt />
      </div>
      <div class="head-content">
        <div class="line-1">
          <div class="img">
            <img :src="userData.baseInfo.logo.src + userData.baseInfo.logo.name" alt />
          </div>
          <div class="fans-follows-praise-btn">
            <div class="fans-follows-praise">
              <div class="fans">
                <span>{{ userData.fans_follows.fans.length }}</span>
                <span>粉丝</span>
              </div>
              <div class="follows">
                <span>{{ userData.fans_follows.follows.length }}</span>
                <span>关注</span>
              </div>
              <div class="praise">
                <span>{{ userData.baseInfo.fans_follows_likes.likes }}</span>
                <span>获赞</span>
              </div>
            </div>
            <div class="btn" v-waves>编辑资料</div>
          </div>
        </div>
        <div class="line-2">
          <span>{{ userData.baseInfo.name }}</span>
          <span>
            <img src="~assets/img/user/space/male.svg" alt />
          </span>
          <span>{{ userData.baseInfo.vip }}</span>
          <span>
            <img src="~assets/img/user/space/medal.svg" alt /> 勋章
          </span>
        </div>
        <div class="line-3">
          <div class="level-experience">
            <div class="level">
              LV
              <span>{{ userData.baseInfo.level }}</span>
            </div>
            <div class="experience">{{ experience.now }}/{{ experience.max }}</div>
          </div>
          <div class="experience-line">
            <span
              class="experience-now"
              :style="{ 'width': `${(experience.now / experience.max) * 3}rem`   }"
            ></span>
            <span class="experience-max"></span>
          </div>
        </div>
        <div class="line-4">
          <div class="line-4-left" :class="{ 'show-desc': descType === '收起' }">
            {{ userData.baseInfo.desc }}
            <br />
            <span :class="{ 'appear': descType === '收起' }">UID: {{ userData.identy.uuid }}</span>
          </div>
          <div class="line-4-right" @click="showDesc()">{{ descType }}</div>
        </div>
        <div class="line-5">
          <div class="line-5-left">
            <img src="~assets/img/user/space/battery.svg" alt />
            <span>更多电量，更多灵感</span>
          </div>
          <div class="line-5-right">充电</div>
        </div>
      </div>
      <div class="head-footer">
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
              <span>{{ item.name }}</span>
            </div>
          </div>
          <span class="navbar-active-footer" :style="{ 'left': `${.45 + 2 * isActive}rem` }"></span>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "UserSpace",
  data() {
    return {
      userData: null,
      experience: {
        now: 19394,
        max: 28800
      },
      typeList: [
        { name: "主页" },
        { name: "动态" },
        { name: "投稿" },
        { name: "收藏" },
        { name: "追番" }
      ],
      descType: "详情",
      isActive: 0
    };
  },
  created() {},
  methods: {
    showDesc() {
      if (this.descType === "收起") {
        this.descType = "详情";
      } else {
        this.descType = "收起";
      }
    },
    select(i) {
      if (this.isSelected === i) {
        return false;
      }
    },
    toActive(i) {
      if (i === this.isActive) {
        return false;
      }
      this.isActive = i;
    }
  },
  watch: {
    "$store.state.userInfo"(newVal) {
      console.log(newVal);

      this.userData = newVal;
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#user-space {
  width: 10rem;
  height: 100vh;
  overflow: hidden;
  background-color: var(--base-set-bg-color);
  font-size: 0.4rem;
  .head {
    .bg {
      img {
        z-index: 3;
        width: 10rem;
      }
      .bg-head {
        position: fixed;
        top: 1rem;
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
            width: 2rem;
            height: 2rem;

            background-color: var(--base-bg-color-sec);
            opacity: 0.8;
            img {
              position: relative;
              width: 0.6rem;
              height: 0.6rem;
            }
          }
        }
        .bg-head-right {
          span {
            img {
              width: 0.9rem;
              height: 0.9rem;
            }
            &:last-child {
              img {
                width: 1rem;
                height: 1rem;
              }
            }
          }
        }
        span {
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
          &:last-child {
          }
        }
      }
    }
    .head-content {
      padding: 0 0.3rem;
      position: relative;
      background-color: var(--base-set-item-color);
      z-index: 3;
      margin-top: -3rem;
      display: flex;
      flex-direction: column;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
      .line-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -0.2rem;
        .img {
          background-color: var(--base-set-item-color);
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 100%;
          }
        }
        .fans-follows-praise-btn {
          width: 5.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .fans-follows-praise {
            width: 5.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fans,
            .follows,
            .praise {
              display: flex;
              flex-direction: column;
              align-items: center;
              span {
                &:last-child {
                  margin-top: 0.05rem;
                  font-size: 0.35rem;
                  opacity: 0.6;
                }
              }
            }
          }
          .btn {
            margin-top: 0.1rem;
            width: 5.8rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-tint);
            border: 0.02rem solid var(--color-tint);
            border-radius: 0.1rem;
          }
        }
      }
      .line-2 {
        display: flex;
        align-items: center;
        margin-top: 0.3rem;
        span {
          margin: 0 0.1rem;
          &:first-child {
            font-size: 0.5rem;
            margin-left: 0rem;
          }
          &:nth-child(2) {
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
          &:nth-child(3) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 0.5rem;
            font-size: 0.35rem;
            color: var(--color-tint);
            border-radius: 0.2rem;
            background-color: var(--base-bg-color-sec);
          }
          &:last-child {
            opacity: 0.6;
            display: flex;
            align-items: center;
            &::after {
              content: "﹚";
            }
            img {
              margin-right: 0.2rem;
              width: 0.5rem;
              height: 0.5rem;
            }
          }
        }
      }
      .line-3 {
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
        display: flex;
        flex-direction: column;
        margin-top: 0.3rem;
        .level-experience {
          display: flex;
          align-items: center;
          .level {
            display: flex;
            align-items: center;
            height: 0.3rem;
            line-height: 0.3rem;
            background-color: rgb(246, 122, 24);
            color: var(--base-set-item-color);
            z-index: 3;
            font-weight: bold;
            font-family: "Black";
            span {
              z-index: 2;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              background-color: rgb(246, 122, 24);
              font-size: 0.32rem;
              top: -0.03rem;
              width: 0.25rem;
              height: 0.32rem;
            }
          }
          .experience {
            opacity: 0.6;
            margin-left: 0.2rem;
          }
        }
        .experience-line {
          margin-top: 0.08rem;
          display: flex;
          .experience-max {
            border-radius: 0.2rem;
            width: 3rem;
            height: 0.07rem;
            background-color: rgb(125, 125, 125);
          }
          .experience-now {
            border-radius: 0.2rem;
            position: absolute;
            height: 0.07rem;
            background-color: rgb(246, 122, 24);
          }
        }
      }
      .line-4 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
        .line-4-left {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0.6;
          span {
            margin-top: 0.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.25rem;
            height: 0.5rem;
            width: 2.3rem;
            border-radius: 0.1rem;
            opacity: 0;
            background-color: rgb(29, 28, 28);
            margin-bottom: 0.1rem;
          }
          .appear {
            opacity: 1;
          }
        }
        .line-4-right {
          display: flex;
          width: 2rem;
          height: 0.6rem;
          justify-content: flex-end;
          color: rgb(75, 134, 179);
        }
        .show-desc {
          transition: 0.3s;
          white-space: initial;
          overflow: initial;
          text-overflow: initial;
        }
      }
      .line-5 {
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        height: 0.4rem;
        .line-5-left {
          display: flex;
          align-items: center;
          img {
            width: 0.7rem;
            height: 0.7rem;
            margin-right: 0.3rem;
          }
          span {
            opacity: 0.6;
          }
        }
        .line-5-right {
          font-size: 0.4rem;
          width: 1.6rem;
          height: 0.64rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-tint);
          border: 0.02rem solid var(--color-tint);
          border-radius: 0.1rem;
        }
      }
    }
    img {
      width: 10rem;
    }
    .head-footer {
      background-color: var(--base-set-item-color);
      .navbar {
        font-size: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: -0.4rem;
        .navbar-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .type {
            text-align: center;
            width: 2rem;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span {
            }
          }
          .active {
            color: var(--color-tint);
          }
        }
        .navbar-active-footer {
          transition: 0.3s;
          position: relative;
          width: 1.2rem;
          height: 0.05rem;
          background-color: var(--color-tint);
          border-radius: 0.2rem;
        }
      }
    }
  }
  .content {
  }
}
</style>