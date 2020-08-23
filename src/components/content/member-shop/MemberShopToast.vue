<template>
  <div id="member-shop-toast" v-if="Object.keys(obj).length > 0">
    <div class="toast" v-if="type === 'show'">
      <img @click="goTo(obj.jumpUrl)" v-lazy="'https:' + obj.imageUrl" alt />
      <span class="close">{{ btn }}</span>
    </div>
    <div class="floating" v-if="obj.floating">
      <img v-lazy="'https:' + obj.floating.imageUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberShopToast",
  props: {
    obj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      i: 3,
      type: "show",
      btn: "3s"
    };
  },
  mounted() {
    this.changeClose();
  },
  methods: {
    goTo(url) {
      window.location.href = url;
    },
    changeClose() {
      var timer = setInterval(() => {
        if (this.i <= 1) {
          clearInterval(timer);
          timer = null;
          this.type = "close";
          return false;
        }
        this.i -= 1;
        this.btn = this.i + "s 关闭";
      }, 1000);
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
* {
  display: flex;
  align-items: center;
}
#member-shop-toast {
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: 0.3s;
    flex-direction: column;
    justify-content: center;
    img {
      width: 8rem;
    }
    .close {
      justify-content: center;
      width: 2rem;
      height: 0.6rem;
      margin-top: -0.3rem;
      font-size: 0.35rem;
      border: 0.03rem solid var(--color-text);
      border-radius: 0.5rem;
    }
  }
  .floating {
    position: fixed;
    top: 76%;
    left: 3vw;
    img {
      width: 1.8rem;
    }
  }
}
</style>