<template>
  <div id="offline-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">离线设置</span>
    </div>
    <div class="content">
      <ul v-for="(outer, index) in list" :key="index">
        <div class="outer-title">{{ outer.title }}</div>
        <li
          v-for="(item, indey) in outer.content"
          :key="indey"
          @click="detail(index, indey)"
          v-waves
        >
          <div class="left">
            <span>{{ item.title }}</span>
            <span :class="{ 'white-space': index === 0 }">{{ item.sub }}</span>
          </div>
          <div v-if="index === 2" class="right">{{ item.more }}</div>
          <mt-switch class="content-switch" v-if="index === 1" v-model="item.more"></mt-switch>
          <div class="radio-right" v-if="index === 0">
            <span class="fir" :class="{ active: item.more === true }"></span>
            <span class="sec"></span>
            <span class="thr" :class="{ active: item.more === true }"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeTitle }}</span>
        </div>
        <div class="pop-content">
          <div class="test-sd-card" v-if="selected[1]">
            <div class="test-sd-card-title">基本信息</div>
            <div class="test-sd-card-content">未检测到外置SD卡(其实是不知道怎么实现~~)</div>
          </div>
          <div class="offline" v-if="selected[0]">
            <div class="offline-content">
              <ul v-if="downLoad.length > 0">
                <li v-for="item in downLoad" :key="item" @click="look(item)" v-waves>
                  <div class="left">
                    <span>{{ item.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="footer" v-if="downLoad.length <= 0">
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
              <div class="black-msg">(；´д｀)ゞ什么都没有</div>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="file-tree" v-if="read === true">
      <mt-popup class="pop" v-model="read" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closeFiles()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title" @click="goToParent()">返回上级目录</span>
        </div>
        <div class="pop-content">
          <div class="outer-title">{{ filePath }}</div>
          <div class="inner-content">
            <ul>
              <li v-for="item in files" :key="item" @click="look(item)" v-waves>
                <div class="left">
                  <span>{{ item.name }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="nonpackage" v-if="files.length <= 0">
            <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
            <div class="black-msg">(；´д｀)ゞ文件夹是空的~</div>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "OfflineSettings",
  data() {
    return {
      list: [
        {
          title: "",
          content: [
            {
              title: "主存储",
              sub: "",
              more: true
            },
            { title: "自定义目录", sub: "", more: false }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "自动下载",
              sub: "自动开始未完成的下载任务",
              more: true
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "离线诊断",
              sub: "",
              more: ""
            },
            {
              title: "外置存储卡测试",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      popupVisible: false,
      selected: [false, false],
      activeTitle: "离线诊断",
      files: [],
      read: false,
      entry: null,
      filePath: "",
      downLoad: []
    };
  },
  created() {
    plus.io.requestFileSystem(
      plus.io.PUBLIC_DOWNLOADS,
      fs => {
        this.list[0].content[0].sub = fs.root.fullPath;
      },
      e => {
        alert("Request file system failed: " + e.message);
      }
    );
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    closeFiles() {
      this.list[0].content[1].sub = this.filePath;
      window.localStorage.setItem("DOWNLOAD_PATH", this.filePath);
      this.read = false;
    },
    look(item) {
      if (item.isFile) {
        let reg1 = /png|jpg|jpeg|gif/gi;
        let reg2 = /mp4/g;
        if (reg1.test(item.name)) {
          plus.nativeUI.previewImage([item.fullPath]);
        } else if (reg2.test(item.name)) {
          plus.io.getVideoInfo({
            src: item.fullPath,
            success: event => {
              alert(
                event.duration,
                event.resolution,
                event.size,
                event.width,
                event.height
              );
            },
            fail: () => {
              alert("获取失败");
            }
          });
        } else {
          plus.io.getFileInfo({
            src: item.fullPath,
            success: event => {
              alert(event.digest, event.size);
            },
            fail: () => {
              alert("获取失败");
            }
          });
        }
        return false;
      }
      this.filePath = item.fullPath;
      this.files = [];
      this.entry.getDirectory(
        item.name.toString(),
        { create: false, exclusive: false },
        entry => {
          this.entry = entry;
          this.filePath = entry.fullPath;
          let directoryReader = entry.createReader();
          directoryReader.readEntries(
            entries => {
              for (let i = 0; i < entries.length; i++) {
                let obj = {};
                for (const key in entries[i]) {
                  const element = entries[i][key];
                  obj[key] = element;
                }
                this.files.push(obj);
              }
            },
            e => {
              alert("Read entries failed: " + e.message);
            }
          );
        },
        () => {
          alert("路径不对");
        }
      );
    },
    goToParent() {
      this.files = [];
      this.entry.getParent(
        entry => {
          this.entry = entry;
          this.filePath = entry.fullPath;
          let directoryReader = entry.createReader();
          directoryReader.readEntries(
            entries => {
              for (let i = 0; i < entries.length; i++) {
                let obj = {};
                for (const key in entries[i]) {
                  const element = entries[i][key];
                  obj[key] = element;
                }
                this.files.push(obj);
              }
            },
            e => {
              alert("Read entries failed: " + e.message);
            }
          );
        },
        e => {
          alert(e);
        }
      );
    },
    detail(x, y) {
      if (x === 0 && y === 1) {
        this.list[0].content[1].more = true;
        this.list[0].content[0].more = false;
        this.read = true;
        // let arr = this.list[0].content[0].sub.split("/");
        // 自定义下载路径
        plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, fs => {
          // fs.root是根目录操作对象DirectoryEntry
          // 创建读取目录信息对象
          let directoryReader = fs.root.createReader();
          this.entry = fs.root;
          this.filePath = fs.root.fullPath;
          directoryReader.readEntries(
            entries => {
              for (let i = 0; i < entries.length; i++) {
                let obj = {};
                for (const key in entries[i]) {
                  const element = entries[i][key];
                  obj[key] = element;
                }
                this.files.push(obj);
              }
            },
            e => {
              alert("Read entries failed: " + e.message);
            }
          );
        });
      } else if (x === 0 && y === 0) {
        this.list[0].content[1].more = false;
        this.list[0].content[0].more = true;
        window.localStorage.setItem(
          "DOWNLOAD_PATH",
          this.list[0].content[0].sub
        );
      } else if (x === 2) {
        switch (y) {
          case 0:
            this.selected[0] = true;
            this.selected[1] = false;
            this.activeTitle = "离线诊断";
            plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, fs => {
              // fs.root是根目录操作对象DirectoryEntry
              // 创建读取目录信息对象
              let path = window.localStorage.getItem("DOWNLOAD_PATH");
              fs.root.getDirectory(
                path.toString(),
                { create: false, exclusive: false },
                entry => {
                  let directoryReader = entry.createReader();
                  directoryReader.readEntries(
                    entries => {
                      for (let i = 0; i < entries.length; i++) {
                        let obj = {};
                        for (const key in entries[i]) {
                          const element = entries[i][key];
                          obj[key] = element;
                        }
                        this.downLoad.push(obj);
                      }
                    },
                    e => {
                      alert("Read entries failed: " + e.message);
                    }
                  );
                },
                () => {
                  alert("路径不对");
                }
              );
            });
            break;
          case 1:
            this.selected[0] = false;
            this.selected[1] = true;
            this.activeTitle = "哔哩哔哩";
            break;
        }
        this.popupVisible = true;
      }
    },
    closePop() {
      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#offline-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head,
  .pop-head {
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
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    .outer-title {
      font-size: 0.27rem;
      margin-bottom: 0.2rem;
      padding: 0 0.3rem;
      opacity: 0.9;
    }
    li {
      padding: 0 0.3rem;
      height: 1.4rem;
      list-style: none;
      background-color: var(--base-set-item-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.1);
      .left {
        display: flex;
        flex-direction: column;
        span {
          &:last-child {
            font-size: 0.3rem;
            opacity: 0.9;
            margin-top: 0.1rem;
          }
        }
        .white-space {
          width: 8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .right {
        font-size: 0.3rem;
        opacity: 0.5;
        &::after {
          content: "〉";
          margin-left: 0.2rem;
          opacity: 0.5;
        }
      }
      .radio-right {
        position: relative;
        top: 0.2rem;
        left: 0.2rem;
        .thr,
        .sec,
        .fir {
          transition: 0.3s;
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          background-color: var(--color-text);
          left: -1rem;
          top: -0.5rem;
          border-radius: 100%;
        }
        .sec {
          width: 0.5rem;
          height: 0.5rem;
          background-color: var(--base-set-item-color);
          left: -0.95rem;
          top: -0.45rem;
        }
        .thr {
          width: 0.3rem;
          height: 0.3rem;
          left: -0.85rem;
          top: -0.35rem;
          background-color: transparent;
        }
        .active {
          transition: 0.3s;
          background-color: var(--color-tint);
        }
      }
      .content-switch {
        margin-right: 0.3rem;
        /deep/ .mint-switch-core {
          height: 0.4rem;
          width: 0.8rem;
          background-color: var(--color-tint);
          border-color: var(--color-tint);
          opacity: 0.7;
          &::before {
            width: 0.8rem;
            height: 0.4rem;
            background-color: #fff !important;
            border-color: #fff !important;
            top: -0.02rem;
          }
          &::after {
            width: 0.55rem;
            height: 0.55rem;
            background-color: var(--color-tint);
            left: -0.2rem;
            top: -0.1rem;
          }
        }
      }
    }
  }
  .pop {
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
          width: 0.9rem;
          height: 0.9rem;
        }
      }
    }
    .pop-content {
      margin: 0.3rem 0.4rem;
      .test-sd-card {
        .test-sd-card-title {
          font-size: 0.5rem;
          font-weight: bold;
        }
        .test-sd-card-content {
          margin: 0.3rem 0 0 0.6rem;
        }
      }
      .offline {
        overflow-y: scroll;
        height: 15.8rem;
        margin: 0.3rem -0.55rem;
        ul {
          position: relative;
          padding: 0 0.2rem;
          display: flex;
          flex-direction: column;
          li {
            background-color: transparent;
            position: relative;
            .left {
              display: flex;
              flex-direction: row;
              align-items: center;
              &::before {
                content: "完成";
                width: 0.7rem;
                height: 0.5rem;
                font-size: 0.3rem;
                text-align: center;
                line-height: 0.5rem;
                background-color: var(--color-tint);
                color: #fff;
                border-radius: 0.1rem;
              }
              span {
                &:first-child {
                  font-size: 0.4rem;
                }
              }
            }
          }
        }
        .footer {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 5rem;
          left: 0;
          right: 0;
          img {
            width: 5rem;
          }
        }
      }
    }
  }
  .file-tree {
    height: 100vh;
    width: 10rem;
    .pop {
      height: 100vh;
      width: 10rem;
      .pop-content {
        overflow: hidden;
        margin: 0 -0.2rem;
        position: relative;
        height: 17.15rem;
        .outer-title {
          margin-top: 0.3rem;
          width: 9.5rem;
          font-size: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 0.3rem;
          line-height: 0.3rem;
          margin-left: 0.5rem;
        }
        .inner-content {
          overflow-y: scroll;
          height: 16.2rem;
          margin-top: 0.3rem;
          ul {
            position: relative;
            padding: 0 0.2rem;
            display: flex;
            flex-direction: column;
            li {
              position: relative;
              .left {
                span {
                  &:first-child {
                    font-size: 0.4rem;
                  }
                }
              }
            }
          }
        }
        .nonpackage {
          position: absolute;
          top: 4rem;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          flex-direction: column;
          img {
            width: 5rem;
          }
        }
      }
    }
  }
}
</style>