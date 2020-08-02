<template>
  <div id="home-animate-follows">
    <div class="head">
      <span>我的追番</span>
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
  name: "HomeAnimateFollows",
  data() {
    return {
      list: [
        {
          src:
            "https://i0.hdslb.com/bfs/archive/2c47de2ad7eff04d6445b1667a84c9c8357bd9a0.jpg@87w_54h.webp",
          title: "水果篮子 第二季",
          state: "更新至第17话",
          label: "会员专享"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/archive/95d2b8cfe906e1efea6fb79f0e1168668bfa799d.jpg@87w_54h.webp",
          title: "刀剑神域 爱丽丝篇 异界战争 -终章-",
          state: "更新至第15话",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/archive/409d1a8f2a1740659e9caab662e8116d0c11d907.jpg@87w_54h.webp",
          title: "某科学的超电磁炮T",
          state: "更新至第16话",
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
            "https://i0.hdslb.com/bfs/archive/73f7a28a765fe1536295c2e6311b285743f54d9a.jpg@87w_54h.webp",
          title: "Re：从零开始的异世界生活 第二季",
          state: "看到第2话 0:01",
          label: "会员抢先"
        },
        {
          src:
            "https://i0.hdslb.com/bfs/archive/89c839e9be005ed074a8efb2afeb1e0fb53c7850.jpg@87w_54h.webp",
          title: "关于我转生变成史莱姆这档事",
          state: "全28话",
          label: "会员抢先"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#home-animate-follows {
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