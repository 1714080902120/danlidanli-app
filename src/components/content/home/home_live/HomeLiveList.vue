<template>
  <div id="home-live-list" v-if="list.length > 0">
    <div class="list">
      <div class="items" v-for="items in list" :key="items.module_info.id">
        <div class="items-title">
          <div class="title-left">{{ items.module_info.title }}</div>
          <div class="title-right" @click="forMore(items.module_info.link)">查看更多</div>
        </div>
        <div class="items-content">
          <div
            class="item"
            v-for="item in items.list"
            :key="item.roomid"
            @click="goToLive(item.link)"
          >
            <div class="cover" v-waves>
              <img v-lazy="item.cover" alt />
              <div class="detail">
                <div class="up">{{item.uname}}</div>
                <div class="watches">
                  <span></span>
                  <span>{{item.online}}</span>
                </div>
              </div>
            </div>
            <div class="item-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeLiveList",
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
#home-live-list {
  width: 10rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #fff;
  .list {
    display: flex;
    flex-direction: column;
    .items {
      margin-bottom: .3rem;
      border-bottom: .02rem solid rgba(100, 100, 100, .3);
      &:last-child {
        border-bottom: none;
      }
      .items-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .4rem;
        height: 1rem;
        .title-right {
          position: relative;
          margin-right: .4rem;
          &::after {
            content: '';
            position: absolute;
            width: .4rem;
            height: .4rem;
            transform: rotateZ(180deg);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url('~assets/img/video/back_white.svg');
          }
        }
      }
      .items-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        // align-items: center;
        .item {
          position: relative;
          .cover {
            position: relative;
            width: 4.5rem;
            height: 2.9rem;
            border-radius: .1rem .1rem;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 2rem 2rem;
            background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
            img {
              border-radius: .1rem .1rem;
              width: 4.5rem;
              height: 2.8rem;
            }
            .detail {
              padding: 0 .1rem;
              width: 4.5rem;
              position: absolute;
              bottom: .1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .watches {
                display: flex;
                align-items: center;
                height: .4rem;
                
                span {
                  &:first-child {
                    width: .35rem;
                    height: .35rem;
                    margin-right: .01rem;
                    margin-bottom: .05rem;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: .35rem .35rem;
                    background-image: url("~assets/img/home/home_live/watches.svg");
                  }
                  &:last-child {
                    display: flex;
                    align-items: center;
                  }
                }
              }
            }
          }
          .item-title {
            width: 4.5rem;
            height: .8rem;
            line-height: .8rem;
            font-size: .35rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>