<template>
  <div id="clear-storage">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">清理存储空间</span>
    </div>
    <div class="content">
      <ul class="outer">
        <li @click="clearImg()" v-waves>清理本地图片缓存</li>
        <li @click="clearCommunicate()" v-waves>清空本地聊天记录</li>
      </ul>
    </div>
    <div class="popup">
      <mt-popup
        class="pop"
        v-model="popupVisible"
        popup-transition="popup-fade"
        position="middle"
        :modal="false"
      >
        <div class="pop-content">
          <div class="pop-title">确定要清空本地所有聊天记录吗？</div>
          <div class="pop-btn">
            <span @click="cancel()">取消</span>
            <span @click="sure()">确认</span>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="modal" v-if="popupVisible === true"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "ClearStorage",
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    clearImg() {
      Toast({
        message: "清理完毕",
        position: "middle",
        duration: 3000
      });
    },
    clearCommunicate() {
      this.popupVisible = true;
    },
    cancel() {
      this.popupVisible = false;
    },
    sure() {
      this.popupVisible = false;
      Toast({
        message: "清空完毕",
        position: "middle",
        duration: 3000
      });
    }
  }
};
</script>

<style lang="less" scoped>
#clear-storage {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head {
    position: relative;
    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      margin: 0 0.5rem;
      img {
        width: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
    }
  }
  .content {
    margin-top: 0.4rem;
    font-size: 0.38rem;
    .outer {
      display: flex;
      flex-direction: column;
      background-color: var(--base-set-item-color);
      li {
        padding: 0 0.3rem;
        list-style: none;
        height: 1.4rem;
        line-height: 1.4rem;
        border: 0.01rem solid rgba(100, 100, 100, 0.1);
      }
    }
  }
  .popup {
    z-index: 2001;
    .pop {
      z-index: 2001 !important;
      background-color: var(--base-set-item-color);
      width: 9rem;
      height: 2.6rem;
      .pop-content {
        padding: 0.5rem 0.7rem;
        .pop-title {
          font-size: 0.4rem;
          color: rgb(216, 213, 213);
        }
        .pop-btn {
          position: relative;
          margin-top: 0.7rem;
          color: var(--color-tint);
          text-align: center;
          left: 2.5rem;
          span {
            &:first-child {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
  .modal {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>