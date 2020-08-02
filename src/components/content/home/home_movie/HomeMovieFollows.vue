<template>
  <div id="home-movie-follows">
    <div class="head">
      <span>我的追剧</span>
      <span>查看全部</span>
    </div>
    <div class="content">
      <div class="item" v-for="item in list" :key="item.title">
        <div class="cover" v-waves>
          <img v-lazy="item.src" alt="">
          <span class="label">{{ item.label }}</span>
          <span class="state">{{ item.state }}</span>
        </div>
        <div class="title">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMovieFollows",
  data() {
    return {
      list: [
        {
          src:
            "https://i0.hdslb.com/bfs/bangumi/image/48fdbee6cd5ea2bef11863efcaa8b65498991fb7.png@220w_280h.webp",
          title: "中国通史",
          state: "已看完第52集",
          label: "会员专享"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/bangumi/image/6248b0a3d586c9e620385b6c3f2c0f22bc9f9918.jpg@220w_280h.webp",
          title: "从克格勃到俄罗斯偶像——普京",
          state: "已看完第2集",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/bangumi/7e65c966b1fd7cf8cd49da89d394546fee18d9ed.jpg@220w_280h.webp",
          title: "逃避虽可耻但有用",
          state: "看到第11回 55:11",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/archive/71ea240f20a226702aadc96284121bddfc497a98.jpg@87w_54h.webp",
          title: "我的青春恋爱物语果然有问题。完",
          state: "更新至第3话",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/bangumi/image/6560f6dd72f2f544820c69badf6be8a521797319.jpg@220w_280h.webp",
          title: "海绵宝宝",
          state: "尚未观看",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/bangumi/486279f1e8d4d93866747d68341fd3ce0c614af6.jpg@220w_280h.webp",
          title: "教父",
          state: "看到 2:53:07",
          label: "会员抢先"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#home-movie-follows {
  overflow: hidden;
  padding: 0 .3rem;
  width: 10rem;
  font-size: 0.25rem;
  border-bottom: 0.02rem solid rgba(100, 100, 100, 0.3);
  margin-bottom: .3rem;
  .head {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    justify-content: space-between;
    margin: .3rem 0;
    span {
      
      &:last-child {
        opacity: 0.6;
        margin-right: 0.4rem;
        &::after {
          content: "";
          position: absolute;
          width: 0.3rem;
          height: 0.3rem;
          transform: rotateZ(180deg);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("~assets/img/video/back_white.svg");
        }
      }
    }
  }
  .content {
    display: flex;
    align-items: center;
    width: 10rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow-x: auto;
    display: flex;
    align-items: center;
    margin-bottom: .3rem;
    .item {
      margin-right: .1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: .2rem;
      .cover {
        position: relative;
        height: 2rem;
        border-radius: 0.1rem;
        width: 3rem;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 60% 60%;
        background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
        img {
          width: 3rem;
          border-radius: .1rem;
        }
        .label, .state {
          z-index: 2;
          position: absolute;
          color: #fff;
        }
        .label {
          border-radius: .05rem;
          top: .1rem;
          width: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          right: .1rem;
          background-color: var(--color-tint);
        }
        .state {
            background-color: transparent;
            bottom: 0.1rem;
            left: 0.1rem;
        }
      }
      .title {
        
        font-size: 0.35rem;
        width: 2rem;
        height: .5rem;
        line-height: .5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
</style>