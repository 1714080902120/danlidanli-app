<template>
  <div id="member-shop-list">
    <div class="nav">
      <div
        class="nav-item"
        :class="{ 'is-active': index === activeNavItem }"
        v-for="(item, index) in feedTabs"
        @click="isActiveNavItem(index)"
        :key="item.name"
        v-waves
      >{{ item.name }}</div>
      <span :style="{ 'left': `${.75 + 2.5 * activeNavItem}rem` }"></span>
    </div>
    <transition name="slide-fade">
      <keep-alive>
        <router-view class="Router" :feeds="feeds" :num="num" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MemberShopList",
  props: {
    feedTabs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    feeds: {
      type: Array,
      default: () => {
        return []
      }
    },
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeNavItem: 0
    };
  },
  methods: {
    isActiveNavItem(i) {
      this.activeNavItem = i;
      switch (i) {
        case 0:
        this.$router.replace({ path: '/member-shop' })
        break;
        case 1:
        this.$router.replace({ path: '/member-shop/magic' })
        break;
        case 2:
        this.$router.replace({ path: '/member-shop/beauty' })
        break;
        case 3:
        this.$router.replace({ path: '/member-shop/new' })
        break;
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
#member-shop-list {
  width: 10rem;
  background-color: rgb(54, 54, 54);
  font-size: 0.3rem;
  flex-direction: column;
  .nav {
    position: sticky;
    top: 0;
    justify-content: space-around;
    height: 1rem;
    width: 10rem;
    background-color: rgb(54, 54, 54);
    // box-shadow: 0 .4rem .6rem rgba(54, 54, 54, 1);
    z-index: 2;
    .nav-item {
      width: 2rem;
      height: 1rem;
      justify-content: center;
      font-size: 0.35rem;
    }
    .is-active {
      color: var(--color-tint);
    }
    span {
      transition: 0.3s;
      position: absolute;
      bottom: 0.1rem;
      width: 1rem;
      height: 0.06rem;
      background-color: var(--color-tint);
      border-radius: 0.03rem;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.01s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>