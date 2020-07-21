<template>
  <div id="likes_pay_collect">
    <div class="box">
      <div class="outer">
        <div
          class="item"
          :class="{ 'scale': show && index !== 1 && index !== 4 }"
          v-for="(item, index) in list"
           @touchstart="touchStart($event, index)" @touchmove="touchMove($event, index)"  @touchend="touchEnd($event, index)" 
          :key="index"
        >
          <div class="img">
            <img :src="item.src" ref="img" :class="{ shake: show && index === 0 }" alt />
          </div>
          <div class="circle" v-if="index !== 1 && index !== 4 && show">
            <span class="right-circlr"></span>
            <span class="left-circlr"></span>
          </div>
          <div
            class="ring"
            :class="{ 'ring-start': show && index !== 1 && index !== 4 }"
            v-if="index !== 1 && index !== 4"
          ></div>
          <div class="oval-bar-box-little" v-if="index !== 1 && index !== 4 && show">
            <div class="oval-bar-little"></div>
            <div class="oval-bar-little"></div>
            <div class="oval-bar-little"></div>
            <div class="oval-bar-little"></div>
          </div>
          <div class="oval-bar-box-larger" v-if="index !== 1 && index !== 4 && show">
            <div class="oval-bar-larger"></div>
            <div class="oval-bar-larger"></div>
            <div class="oval-bar-larger"></div>
            <div class="oval-bar-larger"></div>
          </div>
        </div>
      </div>
      <div class="outer">
        <div
          class="word"
          v-for="(item, index) in words"
          :class="{ 'to-active': item.state }"
          :key="index"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'


export default {
  name: "LikePayCollect",
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      list: [
        {
          src: require("assets/img/video/likes_full_dark.svg"),
          word: this.dataList.like
        },
        {
          src: require("assets/img/video/dislike_dark.svg"),
          word: this.dataList.disLike
        },
        {
          src: require("assets/img/video/coin_dark.svg"),
          word: this.dataList.coins
        },
        {
          src: require("assets/img/video/collect_dark.svg"),
          word: this.dataList.collect
        },
        {
          src: require("assets/img/video/share_full_dark.svg"),
          word: this.dataList.share
        }
      ],
      words: [],
      show: false,
      timer: null,
      count: 0
    };
  },
  created() {
    for (const key in this.dataList) {
      let element = this.dataList[key];
      if (element == 0) {
        element = '不喜欢'
      }
      let obj = {
        name: element,
        state: false
      };
      this.words.push(obj);
    }
  },
  methods: {
    touchStart(e, i) {
      if (i !== 4) {
        if ( i === 0 && !this.words[0].state) {
          ''
        } else {
          this.words[i].state = !this.words[i].state;
        }
        
      }
      switch (i) {
        case 0:

          if (
            this.list[0].src === require("assets/img/video/likes_full_pink.svg")
          ) {
            this.list[0].src = require("assets/img/video/likes_full_dark.svg");
          } else {
            this.timer = setInterval(() => {
              this.count += 1
              if (this.count > 9) {
                clearInterval(this.timer)
                this.timer = null
                if (this.$store.state.userInfo.coin.coins < 2) {
                  Toast({
                    message: '硬币不足哦~~',
                    duration: 3000,
                    position: 'middle'
                  })
                  return false
                }
                this.list[0].src = require("assets/img/video/likes_full_pink.svg");
                this.list[2].src = require("assets/img/video/coin_pink.svg");
                this.list[3].src = require("assets/img/video/collect_pink.svg");
                this.words[0].state = true
                this.words[2].state = true
                this.words[3].state = true
                Toast({
                  message: '感谢一键三连~~',
                  duration: 3000,
                  position: 'middle'
                })
              }
            }, 500);
            this.show = !this.show;
          }
          break;
        case 1:
          if (
            this.list[1].src === require("assets/img/video/dislike_pink.svg")
          ) {
            this.list[1].src = require("assets/img/video/dislike_dark.svg");
            this.words[1].name = '不喜欢'
          } else {
            this.words[1].name = '1'
            this.list[1].src = require("assets/img/video/dislike_pink.svg");
          }
          break;
        case 2:
          if (this.list[2].src === require("assets/img/video/coin_pink.svg")) {
            this.list[2].src = require("assets/img/video/coin_dark.svg");
          } else {
            this.list[2].src = require("assets/img/video/coin_pink.svg");
          }
          break;
        case 3:
          if (
            this.list[3].src === require("assets/img/video/collect_pink.svg")
          ) {
            this.list[3].src = require("assets/img/video/collect_dark.svg");
          } else {
            this.list[3].src = require("assets/img/video/collect_pink.svg");
          }
          break;
        case 4:
          this.$Bus.$emit('goToShare')
          break;
      }
    },
    touchMove () {

    },
    touchEnd () {
      clearInterval(this.timer)
      this.timer = null
      this.count = 0
      this.show = false
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
}
.box {
  position: relative;
  width: 10rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
img {
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  /* animation: shake 5s linear infinite; */
}
.font {
  margin-top: 0.1rem;

  font-weight: lighter;
}
.to-active {
  color: var(--color-tint);
}
.outer {
  position: relative;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
.word {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 0.6rem;
  font-size: 0.3rem;
  opacity: 0.6;
}
.item {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.img {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shake {
  animation: shake 4.2s linear;
}

.circle {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  z-index: 1;
}

.right-circlr {
  width: 0.6rem;
  height: 1.2rem;
  position: absolute;
  right: 0rem;
  top: 0rem;
  padding: 0;
  overflow: hidden;
}

.right-circlr::before {
  content: "";
  width: 1.2rem;
  height: 1.2rem;
  border: 0.05rem solid var(--color-tint);
  border-top-color: transparent;
  border-right-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  transform: rotate(45deg);
  position: absolute;
  right: 0;
  top: 0;
}

.left-circlr {
  width: 0.6rem;
  height: 1.2rem;
  position: absolute;
  left: 0rem;
  top: 0rem;
  padding: 0;
  overflow: hidden;
}

.left-circlr::before {
  content: "";
  width: 1.2rem;
  height: 1.2rem;
  border: 0.05rem solid var(--color-tint);
  border-top-color: transparent;
  border-right-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  transform: rotate(-135deg);
  position: absolute;
  left: 0;
  top: 0;
}

.ring {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  border: 0.05rem solid var(--color-tint);
  position: absolute;
  z-index: 100;
  opacity: 0;
}

.oval-bar-box-little {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  opacity: 0;
  position: absolute;
}

.oval-bar-little {
  width: 1.5rem;
  height: 0.1rem;

  position: absolute;
  top: 50%;
  margin-top: -0.05rem;
  z-index: 100;
}

.oval-bar-little::before {
  content: "";
  height: 0.1rem;
  width: 0.2rem;
  border-radius: 0.1rem;
  background: var(--color-tint);

  position: absolute;
  left: -0.05rem;
  top: 0;
}

.oval-bar-little::after {
  content: "";
  height: 0.1rem;
  width: 0.2rem;
  border-radius: 0.1rem;
  background: var(--color-tint);

  position: absolute;
  right: -0.05rem;
  top: 0;
}

.oval-bar-box-larger {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 100%;
  position: absolute;
  opacity: 0;
}

.oval-bar-larger {
  width: 1.75rem;
  height: 0.2rem;

  position: absolute;
  top: 50%;
  margin-top: -0.1rem;
  z-index: 100;
}

.oval-bar-larger::before {
  content: "";
  height: 0.2rem;
  width: 0.4rem;
  border-radius: 0.2rem;
  background: var(--color-tint);
  position: absolute;
  left: -0.2rem;
  top: 0;
}

.oval-bar-larger::after {
  content: "";
  height: 0.2rem;
  width: 0.4rem;
  border-radius: 0.2rem;
  background: var(--color-tint);

  position: absolute;
  right: -0.2rem;
  top: 0;
}

.oval-bar-little:nth-child(1) {
  transform: rotate(22.5deg);
}

.oval-bar-little:nth-child(2) {
  transform: rotate(67.5deg);
}

.oval-bar-little:nth-child(3) {
  transform: rotate(112.5deg);
}

.oval-bar-little:nth-child(4) {
  transform: rotate(157.5deg);
}

.oval-bar-larger:nth-child(1) {
  transform: rotate(0deg);
}

.oval-bar-larger:nth-child(2) {
  transform: rotate(45deg);
}

.oval-bar-larger:nth-child(3) {
  transform: rotate(90deg);
}

.oval-bar-larger:nth-child(4) {
  transform: rotate(135deg);
}

.half-circle {
  width: 0.35rem;
  height: 0.35rem;
  background: transparent;
  border: 0.05rem solid rgb(253, 253, 253);
  border-radius: 100%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  transform: translate(-50%, 0.375rem) rotate(45deg);
  position: absolute;
  left: 50%;
}

.circle-bar {
  width: 0.45rem;
  height: 0.45rem;
  background: transparent;
  transform: translate(-50%, 0.4rem);

  position: absolute;
  left: 50%;
}

.circle-bar::before {
  content: "";
  width: 0.05rem;
  height: 0.1rem;
  background: rgb(253, 253, 253);
  border-radius: 0.05rem;

  position: absolute;
  top: 0.12rem;
  left: 0.03rem;
}

.circle-bar::after {
  content: "";
  width: 0.05rem;
  height: 0.1rem;
  background: rgb(253, 253, 253);
  border-radius: 0.05rem;

  position: absolute;
  top: 0.12rem;
  right: 0.03rem;
}

.start {
  position: relative;
  top: 5px;
}

.angle {
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  left: 50%;
  top: 50%;
}

.angle::before {
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, rgb(112, 112, 112) 41%);
  border-radius: 10%;
  transform: rotate(-45deg);
  border-radius: 0.15rem;

  position: absolute;
}

.top {
  transform: translate(-50%, -50%) rotate(0) scaleX(0.5);
}

.right {
  transform: translate(-50%, -50%) rotate(72deg) scaleX(0.5);
}

.left {
  transform: translate(-50%, -50%) rotate(-72deg) scaleX(0.5);
}

.right-bottom {
  transform: translate(-50%, -50%) rotate(144deg) scaleX(0.5);
}

.left-bottom {
  transform: translate(-50%, -50%) rotate(-144deg) scaleX(0.5);
}

/* CSS动画控制 */
.scale {
  animation: itemScale 0.8s 4.2s ease-in-out;
}

.start .angle::before {
  animation: startColor 4.9s forwards;
}

.circle .left-circlr::before {
  animation: leftCirclrRotate 2s 2s backwards linear;
}

.circle .right-circlr::before {
  animation: rightCirclrRotate 4s linear backwards;
}

.ring-start {
  animation: ringRotate 0.1s 4.9s linear forwards;
}

.oval-bar-box-little {
  animation: ovalBarBoxRotate 0.5s 4.9s forwards;
}

.oval-bar-little::before,
.oval-bar-little::after {
  animation: littleOvalBarToClicle 1s 4.9s;
}

.oval-bar-box-larger {
  animation: ovalBarBoxRotate 1.2s 4.9s forwards;
}

.oval-bar-larger::before,
.oval-bar-larger::after {
  animation: largerOvalBarToClicle 1.2s 4.9s forwards;
}

/* CSS动画控制 */

@keyframes shake {
  0% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  5% {
    transform: rotateZ(10deg) rotateY(-10deg);
  }
  10% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  15% {
    transform: rotateZ(-10deg) rotateY(10deg);
  }
  20% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  25% {
    transform: rotateZ(10deg) rotateY(-10deg);
  }
  30% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  35% {
    transform: rotateZ(-10deg) rotateY(10deg);
  }
  40% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  45% {
    transform: rotateZ(10deg) rotateY(-10deg);
  }
  50% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  55% {
    transform: rotateZ(-10deg) rotateY(10deg);
  }
  60% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  65% {
    transform: rotateZ(10deg) rotateY(-10deg);
  }
  70% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  75% {
    transform: rotateZ(-10deg) rotateY(10deg);
  }
  80% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  85% {
    transform: rotateZ(10deg) rotateY(-10deg);
  }
  90% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  95% {
    transform: rotateZ(-10deg) rotateY(10deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(0);
  }
}

@keyframes coinColor {
  0% {
    background: var(--color-tint);
  }

  100% {
    background: var(--color-tint);
  }
}

@keyframes startColor {
  0% {
    background: linear-gradient(45deg, transparent 40%, var(--color-tint) 41%);
  }

  100% {
    background: linear-gradient(45deg, transparent 40%, var(--color-tint) 41%);
  }
}

@keyframes itemScale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes leftCirclrRotate {
  0% {
    transform: rotate(-135deg);
  }

  100% {
    transform: rotate(45deg);
  }
}

@keyframes rightCirclrRotate {
  0% {
    transform: rotate(45deg);
  }

  50% {
    transform: rotate(225deg);
  }

  100% {
    transform: rotate(225deg);
  }
}

@keyframes ringRotate {
  0% {
    width: 1.2rem;
    height: 1.2rem;
    opacity: 1;
  }

  100% {
    width: 1.3rem;
    height: 1.3rem;
    opacity: 0;
  }
}

@keyframes littleOvalBarToClicle {
  0% {
    height: 0.1rem;
    width: 0.2rem;
  }

  100% {
    height: 0.1rem;
    width: 0.1rem;
  }
}

@keyframes largerOvalBarToClicle {
  0% {
    height: 0.2rem;
    width: 0.4rem;
  }

  100% {
    height: 0.2rem;
    width: 0.225rem;
  }
}

@keyframes ovalBarBoxRotate {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  10% {
    opacity: 0;
  }

  70% {
    transform: scale(0.9);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>