<template>
  <div id="receiving-person">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">购买人信息</span>
    </div>
    <div class="content">
      <div class="main" v-if="list.length > 0">
        <div class="items" v-for="(item, index) in list" :key="index">
          <div class="left">
            <div class="item">
              {{ item.name }}
              <span v-if="item.default">默认</span>
            </div>
            <div class="item">{{ item.phone }}</div>
            <div class="item">{{ item.indenty }}</div>
          </div>
          <div class="right">
            <img @click="edit(index)" src="~assets/img/user/set/edit_pink.svg" alt />
          </div>
        </div>
      </div>
      <div class="when-empty" v-if="list.length <= 0">
        <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
        <div class="when-empty-title">还未添加购买人</div>
        <div class="when-empty-sub">不想抢购完美错过，记得主动添加~~</div>
      </div>
    </div>
    <div class="footer">
      <span @click="openPop()">添加购买人</span>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <span @click="remove()" class="head-right" v-if="activeItem === '编辑购买人信息'">
            <img src="~assets/img/user/set/rabbi_dark.svg" alt />
          </span>
        </div>
        <div class="pop-content">
          <ul>
            <li class="input">
              <input type="text" placeholder="请输入真实姓名(必填)" v-model="info.name" />
            </li>
            <li class="input">
              <input type="text" placeholder="请输入手机号" v-model="info.phone" />
            </li>
            <li class="input">
              <input type="text" placeholder="请输入身份证" v-model="info.indenty" />
            </li>
          </ul>
          <div class="upload-img">
            <div class="upload-img-title">为了保障顺利清关，请上传清晰且真是有效的身份证照片</div>
            <div class="img">
              <div class="frontend">
                <span :class="{ disappear: info.imgList[0].img !== '' }">+</span>
                <span :class="{ disappear: info.imgList[0].img !== '' }">上传身份证头像页</span>
                <img v-if="info.imgList[0].img  !== ''" :src="info.imgList[0].img" alt />
              </div>
              <input
                type="file"
                accept="image/gif, image/jpg, image/png"
                @change="showImg($event, 0)"
                multiple
              />
              <div class="backend">
                <span :class="{ disappear: info.imgList[1].img  !== '' }">+</span>
                <span :class="{ disappear: info.imgList[1].img  !== '' }">上传身份证国徽页</span>
                <img v-if="info.imgList[1].img  !== ''" :src="info.imgList[1].img" alt />
              </div>
              <input
                type="file"
                accept="image/gif, image/jpg, image/png"
                @change="showImg($event, 1)"
                multiple
              />
            </div>
          </div>
          <div class="set-default">
            <input type="checkbox" v-model="info.default" name id />
            <span>设为默认购买人</span>
          </div>
        </div>
        <div class="footer">
          <span @click="sure()">确定</span>
        </div>
      </mt-popup>
    </div>
    <Cropper :options="option" />
  </div>
</template>

<script>
import Cropper from "components/common/cropper/VueCropper";
import { Toast } from "mint-ui";

export default {
  name: "ReceivingPerson",
  data() {
    return {
      popupVisible: false,
      list: [
        {
          name: "坏蛋Dan丶",
          phone: "13798510901",
          indenty: "445281**********3032",
          default: true,
          imgList: [{ img: "" }, { img: "" }]
        }
      ],
      info: {
        name: "",
        phone: "",
        indenty: "",
        default: false,
        imgList: [{ img: "" }, { img: "" }]
      },
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 150, // 默认生成截图框宽度
        // autoCropHeight: 100, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        id: 0
      },
      activeItem: "",
      selected: 0,
      isEdit: false
    };
  },
  components: {
    Cropper
  },
  methods: {
    close() {
      this.$Bus.$emit("closePop");
    },
    closePop() {
      this.popupVisible = false;
    },
    openPop() {
      this.activeItem = "添加购买人信息";
      this.info = {
        name: "",
        phone: "",
        indenty: "",
        default: false,
        imgList: [{ img: "" }, { img: "" }]
      };
      this.popupVisible = true;
    },
    async sure() {
      if (this.info.name === "") {
        Toast({
          message: "真实姓名不能为空!",
          duration: 3000,
          position: "middle"
        });
        return false;
      }
      if (!this.isEdit) {
        if (this.info.indenty) {
          let data = this.info.indenty.split("");
          data.splice(6, 8, "********");
          this.info.indenty = data.join("");
        }
        await this.list.push(this.info);
        this.info = {
          name: "",
          phone: "",
          indenty: "",
          default: false,
          imgList: [{ img: "" }, { img: "" }]
        };
      } else {
        Toast({
          message: "修改成功",
          duration: 3000,
          position: "middle"
        });
        this.isEdit = false;
      }

      this.popupVisible = false;
    },
    showImg(e, i) {
      let _this = this;
      let files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.option.id = i;
        _this.option.img = this.result;
        _this.finishCrop(i);
      };
    },
    finishCrop(i) {
      this.$Bus.$on("finishCrop", res => {
        this.option.img = "";
        if (res.id === i) {
          this.info.imgList[i].img = res.data;
        }
      });
    },
    edit(x) {
      this.isEdit = true;
      this.selected = x;
      this.activeItem = "编辑购买人信息";
      this.info = this.list[x];
      this.popupVisible = true;
    },
    remove() {
      this.list.splice(this.selected, 1);
      Toast({
        message: "删除成功",
        duration: 3000,
        position: "middle"
      });
      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#receiving-person {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head,
  .pop-head {
    color: #fff;
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
    overflow-y: scroll;
    .main {
      display: flex;
      flex-direction: column;
      .items {
        background-color: var(--base-set-item-color);
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        height: 2.2rem;
        align-items: center;
        .left {
          display: flex;
          flex-direction: column;
          font-size: 0.3rem;
          .item {
            margin: 0.1rem 0;
            opacity: 0.6;
            &:first-child {
              position: relative;
              opacity: 1;
              font-size: 0.4rem;
              display: flex;
              align-items: center;
              span {
                position: relative;
                width: 1rem;
                height: 0.5rem;
                line-height: 0.5rem;
                margin-left: 0.15rem;
                text-align: center;
                font-size: 0.3rem;
                color: var(--color-tint);
                border: 0.02rem solid var(--color-tint);
                border-radius: 0.1rem;
                vertical-align: middle;
              }
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
    .when-empty {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 4rem;
      left: 0;
      right: 0;
      img {
        width: 5rem;
      }
      .when-empty-title {
        margin: 0.5rem 0 0.4rem 0;
      }
      .when-empty-sub {
        opacity: 0.5;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 10rem;
    height: 1.8rem;
    background-color: var(--base-set-item-color);
    span {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 9.5rem;
      height: 1.2rem;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: var(--color-tint);
      text-align: center;
      margin: auto;
      color: #fff;
      border-radius: 1rem;
    }
  }
  .pop,
  .pop-2 {
    width: 10rem;
    height: 100vh;
    background-color: var(--base-set-bg-color);
    .pop-head {
      .title {
        font-size: 0.4rem;
        width: 7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .head-right {
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    }
    .pop-content {
      display: flex;
      flex-direction: column;
      background-color: var(--base-set-item-color);
      ul {
        display: flex;
        flex-direction: column;
        padding: 0 0.3rem;
        .input {
          display: flex;
          align-items: center;
          list-style: none;
          border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
          height: 1.2rem;
          &:last-child {
            border-bottom: 0.01rem solid rgb(121, 121, 121);
          }
          input {
            background-color: transparent;
            border: 0;
            outline: none;
            color: #fff;
          }
        }
      }
      .upload-img {
        margin: 0.5rem 0.3rem 0.7rem 0.3rem;
        .upload-img-title {
          opacity: 0.6;
          font-size: 0.3rem;
          margin-bottom: 0.7rem;
        }
        .img {
          display: flex;
          .frontend,
          .backend {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 0.3rem;
            border: 0.02rem solid rgba(100, 100, 100, 1);
            margin-right: 0.3rem;
            width: 3rem;
            height: 2rem;
            border-radius: 0.2rem;
            img {
              position: absolute;
              width: 3rem;
              height: 2rem;
              border-radius: 0.2rem;
            }
            span {
              &:last-child {
                opacity: 0.6;
              }
              &:first-child {
                opacity: 1;
                font-size: 1rem;
                color: var(--color-tint);
              }
            }
            .disappear {
              transition: 0.3s;
              opacity: 0 !important;
            }
          }
          input {
            position: absolute;
            width: 3rem;
            height: 2rem;
            opacity: 0;
            &:last-child {
              left: 3.6rem;
            }
          }
        }
      }
      .set-default {
        margin: 0.5rem 0.3rem;
        display: flex;
        align-items: center;
        input {
        }
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>