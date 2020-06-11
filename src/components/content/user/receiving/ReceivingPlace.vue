<template>
  <div id="receiving-place">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">地址管理</span>
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
            <div class="item">
              <span>{{ item.address.province }}</span>
              <span>{{ item.address.city }}</span>
              <span>{{ item.address.area }}</span>
              <span>{{ item.address.detail }}</span>
            </div>
          </div>
          <div class="right">
            <img @click="edit(index)" src="~assets/img/user/set/edit_pink.svg" alt />
          </div>
        </div>
      </div>
      <div class="when-empty" v-if="list.length <= 0">
        <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
        <div class="when-empty-title">还未添加地址</div>
        <div class="when-empty-sub">没有收货地址怎能愉快买买买~</div>
      </div>
    </div>
    <div class="footer">
      <span @click="openPop()">添加新地址</span>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <span @click="remove()" class="head-right" v-if="activeItem === '编辑收货地址'">
            <img src="~assets/img/user/set/rabbi_dark.svg" alt />
          </span>
        </div>
        <div class="pop-content">
          <ul>
            <li class="input">
              <input type="text" placeholder="请输入收货人姓名" v-model="info.name" />
            </li>
            <li class="input">
              <input type="text" placeholder="请输入手机号" v-model="info.phone" />
            </li>
            <li class="province-city-area" @click="showPicker()">
              <span>{{ info.address.province }}</span>
              <span>{{ info.address.city }}</span>
              <span>{{ info.address.area }}</span>
            </li>
            <li class="input">
              <input type="text" placeholder="请输入详细地址" v-model="info.address.detail" />
            </li>
          </ul>
          <div class="set-default">
            <input type="checkbox" v-model="info.default" name id />
            <span>设为默认地址</span>
          </div>
        </div>
        <div class="footer">
          <span @click="sure()">确定</span>
        </div>
      </mt-popup>
    </div>
    <mt-picker
      class="picker"
      :showToolbar="true"
      v-if="pickertVisible"
      :slots="myAddressSlots"
      @change="onMyAddressChange"
    >
      <div class="tools">
        <span @click="cancelPicker()">取消</span>
        <span @click="finishPicker()">确认</span>
      </div>
    </mt-picker>
    <div class="modal" v-if="pickertVisible"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import myaddress from "./index.json";

export default {
  name: "ReceivingPerson",
  data() {
    return {
      popupVisible: false,
      list: [
        {
          name: "坏蛋Dan丶",
          phone: "13798510901",
          address: {
            province: "广东省",
            city: "深圳市",
            area: "宝安区",
            detail: "福永街道聚福园xxxxxxxxxxxxx"
          },
          default: true
        }
      ],
      info: {
        name: "",
        phone: "",
        address: {
          province: "请选择所在区域",
          city: "",
          area: "",
          detail: ""
        },
        default: false
      },
      activeItem: "",
      selected: 0,
      isEdit: false,
      pickertVisible: false,
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数   （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  },
  components: {},
  methods: {
    close() {
      this.$Bus.$emit("closePop");
    },
    closePop() {
      this.popupVisible = false;
    },
    openPop() {
      this.activeItem = "添加收货地址";
      this.info = {
        name: "",
        phone: "",
        address: {
          province: "请选择所在区域",
          city: "",
          area: "",
          detail: ""
        },
        default: false
      };
      this.popupVisible = true;
    },
    async sure() {
      if (this.info.name === "") {
        Toast({
          message: "姓名不能为空",
          duration: 3000,
          position: "middle"
        });
        return false;
      }
      if (!this.isEdit) {
        this.list.push(this.info);
      } else {
        this.isEdit = false;
      }

      this.popupVisible = false;
    },
    edit(x) {
      this.isEdit = true;
      this.selected = x;
      this.activeItem = "编辑收货地址";
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
    },
    cancelPicker() {
      this.province = "请选择所在区域";
      this.city = "";
      this.area = "";
      this.pickertVisible = false;
    },
    finishPicker() {
      this.pickertVisible = false;
    },
    showPicker() {
      this.pickertVisible = true;
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); //  Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); //  区/县数据就是一个数组
        this.info.address.province = values[0];
        this.info.address.city = values[1];
        this.info.address.area = values[2];
      }
    }
  }
};
</script>

<style lang="less" scoped>
#receiving-place {
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
        .province-city-area {
          display: flex;
          align-items: center;
          opacity: 0.4;
          border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
          height: 1.2rem;
        }
      }
      .set-default {
        margin: 0.5rem 0.3rem;
        display: flex;
        align-items: center;
        span {
          color: #fff;
        }
      }
    }
  }
  .picker {
    position: absolute;
    bottom: 0rem;
    z-index: 9999;
    background-color: #fff;
    width: 10rem;
    height: 6rem;
    .tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.9rem;
      padding-top: 0.3rem;
      font-size: 0.5rem;
      span {
        color: #000;
        text-align: center;
        width: 1.5rem;
        &:last-child {
          color: var(--color-tint);
        }
      }
    }
  }
  .modal {
    position: absolute;

    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>