<template>
  <div
    id="cropper"
    style="text-align:center"
    v-if="Object.keys(options).length > 0 && options.img !== ''"
  >
    <div class="cropper">
      <vueCropper
        ref="cropper"
        :img="options.img"
        :outputSize="options.outputSize"
        :outputType="options.outputType"
        :info="true"
        :full="options.full"
        :canMove="true"
        :canMoveBox="options.canMoveBox"
        :original="options.original"
        :autoCrop="options.autoCrop"
        :fixed="options.fixed"
        :fixedNumber="options.fixedNumber"
        :centerBox="options.centerBox"
        :infoTrue="options.infoTrue"
        :fixedBox="options.fixedBox"
      ></vueCropper>
      <div class="btn">
        <span class="btn-crop" @click="startCrop()" v-waves>裁剪</span>
        <span class="btn-reset" @click="cancelCrop()" v-waves>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cropper",
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      cropper: null,
    };
  },
  created() {
    this.Bus();
  },
  methods: {
    async startCrop() {
      await this.cropper.getCropData(res => {
        this.$Bus.$emit("finishCrop", {data: res, id: this.options.id});
      });
    },
    cancelCrop() {
      this.$Bus.$emit("cancelCrop");
      this.cropper.clearCrop();
    },
    goAutoCrop() {
      this.cropper.goAutoCrop();
    },
    Bus() {}
  },
  computed: {},
  watch: {
    "options.img"(newVal) {
      if (newVal !== "") {
        this.$nextTick(() => {
          this.cropper = this.$refs.cropper;
        });
      }
    },
    deep: true,
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#cropper {
  position: absolute;
  top: 0;
  width: 10rem;
  height: 100vh;
  background-color: rgba(8, 8, 8, 0.6);
  z-index: 10000;
  .cropper {
    position: absolute;
    top: 4rem;
    width: 10rem;
    height: 8rem;
    .btn {
      margin: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        margin-top: 1rem;
        width: 2.4rem;
        text-align: center;
        height: 1.2rem;
        line-height: 1.2rem;
        border-radius: 0.2rem;
        font-size: 0.5rem;
        background-color: rgba(255, 1, 107, 0.5);
      }
    }
  }
}
</style>