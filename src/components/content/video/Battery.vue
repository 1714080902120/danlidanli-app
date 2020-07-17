<template>
  <div id="battery" v-if="battery">
    <div class="container" :class="{ 'is-danger': batteryLength !== 0 && batteryLength <= .2 }">
      <div class="img" v-show="charging"></div>
      <span class="inner" v-show="!charging" :style="{ 'width': battery.level * .44 + 'rem' }"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Battery",
  data() {
    return {
      battery: null,
      charging: false,
      batteryLength: 0
    };
  },
  created() {
    navigator.getBattery().then(battery => {
      // 是否正在充电，yes-充电
      this.battery = battery;
      // 当前剩余电量
      this.batteryLength = battery.level;
      this.charging = battery.charging;
      battery.addEventListener("chargingchange", () => {
        this.charging = battery.charging;
      });
      battery.addEventListener("levelchange", () => {
        this.batteryLength = battery.level;
      });
    });
  }
};
</script>

<style lang="less" scoped>
#battery {
  position: relative;
  .container {
    width: 0.5rem;
    height: 0.25rem;
    padding: 0.03rem;
    background-color: transparent;
    border: 0.04rem solid #fff;
    border-radius: 0.06rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .img {
      position: absolute;
      top: -0.14rem;
      left: 0.1rem;
      z-index: 0;
      width: 0.3rem;
      height: .5rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("~assets/img/video/thunder_white.svg");
      background-size: 0.32rem .5rem;
      transform: rotateZ(90deg);
    }
    &::after {
      content: "";
      position: absolute;
      background-color: #fff;
      width: 0.05rem;
      right: -0.08rem;
      top: 0.0625rem;
      height: 0.125rem;
      border-radius: 0 0.05rem 0.05rem 0;
    }
    .inner {
      height: 0.125rem;
      background-color: #fff;
      z-index: 1;
      border-radius: 0.02rem;
    }
  }
  .is-danger {
    border-color: rgba(253, 0, 0, .6);
    &::after {
      background-color: rgba(253, 0, 0, .6);

    }
    .inner {
        background-color: rgba(253, 0, 0, .6);
      }
  }
}
</style>