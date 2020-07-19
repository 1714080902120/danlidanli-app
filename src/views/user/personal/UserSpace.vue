<template>
  <div
    id="user-space"
    ref="space"
    v-if="userData !== null"
    @scroll="test($event)"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
  >
    <div class="head">
      <div class="bg">
        <div class="bg-head" ref="bgHead">
          <div class="bg-head-left">
            <span @click="goBack()" :class="{ disappear: disappear }">
              <img src="~assets/img/user/space/back_dark.svg" alt />
            </span>
          </div>
          <div
            class="bg-head-middle"
            :class="{ disappear: !disappear }"
          >{{ userData.baseInfo.name }}</div>
          <div class="bg-head-right">
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/home/search_dark.svg" alt />
            </span>
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
            </span>
          </div>
        </div>
        <img src="~assets/img/user/space/bg.jpg" alt />
      </div>
      <div class="head-content">
        <div class="line-1">
          <div class="img">
            <img :src="userData.baseInfo.logo.src + userData.baseInfo.logo.name" alt />
          </div>
          <div class="fans-follows-praise-btn">
            <div class="fans-follows-praise">
              <div class="fans">
                <span v-if="userData.fans_follows">{{ userData.fans_follows.fans.length }}</span>
                <span
                  v-else-if="!userData.fans_follows"
                >{{ userData.baseInfo.fans_follows_likes.fans }}</span>
                <span>粉丝</span>
              </div>
              <div class="follows">
                <span v-if="userData.fans_follows">{{ userData.fans_follows.follows.length }}</span>
                <span
                  v-else-if="!userData.fans_follows"
                >{{ userData.baseInfo.fans_follows_likes.follows }}</span>
                <span>关注</span>
              </div>
              <div class="praise">
                <span v-if="userData.fans_follows">{{ userData.baseInfo.fans_follows_likes.likes }}</span>
                <span
                  v-else-if="!userData.fans_follows"
                >{{ userData.baseInfo.fans_follows_likes.likes }}</span>
                <span>获赞</span>
              </div>
            </div>
            <div class="btn" @click="goToSet()" v-waves>{{ edit }}</div>
          </div>
        </div>
        <div class="line-2">
          <span>{{ userData.baseInfo.name }}</span>
          <span>
            <img src="~assets/img/user/space/male.svg" alt />
          </span>
          <span v-if="userData.baseInfo.vip != ''">{{ userData.baseInfo.vip }}</span>
          <span v-else-if="userData.baseInfo.vip === ''">正式会员</span>
          <span>
            <img src="~assets/img/user/space/medal.svg" alt /> 勋章
          </span>
        </div>
        <div class="line-3">
          <div class="level-experience">
            <div class="level" :style="{ 'background-color': colorList[userData.baseInfo.level] }">
              LV
              <span
                :style="{ 'background-color': colorList[userData.baseInfo.level] }"
              >{{ userData.baseInfo.level }}</span>
            </div>
            <div class="experience">{{ experience.now }}/{{ experience.max }}</div>
          </div>
          <div class="experience-line">
            <span
              class="experience-now"
              :style="{ 'width': `${(experience.now / experience.max) * 3}rem`, 'background-color': colorList[userData.baseInfo.level] }"
            ></span>
            <span class="experience-max"></span>
          </div>
        </div>
        <div class="line-4">
          <div class="line-4-left" :class="{ 'show-desc': descType === '收起' }">
            {{ userData.baseInfo.desc }}
            <br />
            <span :class="{ 'appear': descType === '收起' }">UID: {{ userData.identy.uuid }}</span>
          </div>
          <div class="line-4-right" @click="showDesc()">{{ descType }}</div>
        </div>
        <div class="line-5">
          <div class="line-5-left">
            <img src="~assets/img/user/space/battery.svg" alt />
            <span>更多电量，更多灵感</span>
          </div>
          <div class="line-5-right">充电</div>
        </div>
      </div>
    </div>
    <div class="head-footer">
      <div class="navbar">
        <div class="navbar-content">
          <div
            class="type"
            v-for="(item, index) in typeList"
            :key="index"
            @click="toActive(index)"
            :class="{ 'active': isActive === index }"
            v-waves
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <span class="navbar-active-footer" :style="{ 'left': `${.5 + 2 * isActive}rem` }"></span>
      </div>
    </div>
    <div class="content">
      <div class="main" v-if="isActive === 0">
        <div class="inner" v-for="(items, index) in showingList" :key="index">
          <div
            class="wings"
            v-if="items.length > 0 && (index === 'showingVideoList' || index === 'showingSmallVideoList')"
          >
            <div class="wings-head">
              <div class="wings-head-left">{{ activeType(index) }}</div>
              <div class="wings-head-right">查看更多</div>
            </div>
            <div class="wings-content">
              <div class="wings-item" v-for="(item, indey) in items" :key="indey" v-waves>
                <div class="wings-cover">
                  <img
                    v-if="item.main.content.inner.img.length > 0"
                    v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                    alt
                  />
                </div>
                <div class="plays-danmaku-time" v-if="item.main.content.inner.detail.length > 0">
                  <span class="plays">
                    <img src="~assets/img/recommend_list/play_dark.svg" alt />
                    {{ parseInt(item.main.content.inner.detail[1]) }}
                    <img
                      src="~assets/img/recommend_list/danmaku_dark.svg"
                      alt
                    />
                    {{ parseInt(item.main.content.inner.detail[2]) }}
                  </span>
                  <span class="danmaku"></span>
                  <span class="time">{{ item.main.content.inner.detail[0] }}</span>
                </div>
                <div class="wings-title">{{item.main.content.inner.title[0]}}</div>
                <div v-if="item.main.content.inner.title.length <= 0">没爬到嘤嘤嘤(╯︵╰)</div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showingList.showingVideoList.length > 0 || showingList.showingSmallVideoList.length > 0"
          class="middle"
          @click="goToLive()"
          v-waves
        >
          <img src="~assets/img/base/live_dark.svg" alt />进入我的直播间
        </div>
        <div class="animate" v-if="showingList3.length > 0">
          <div class="animate-outer" v-for="(items, index) in showingList3" :key="index">
            <div class="wings-head">
              <div class="wings-head-left">
                {{ activeType(index) }}
                <img src="~assets/img/user/space/unsee_dark.svg" />
              </div>
              <div class="wings-head-right">查看更多</div>
            </div>
            <div class="animate-content">
              <div class="animate-item" v-for="(item, indey) in items" :key="indey" v-waves>
                <img v-lazy="item.src" alt />
                <div class="title-sub">
                  <div class="animate-item-title">{{ item.name }}</div>
                  <div class="animate-item-sub">{{ item.set }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inner" v-for="(items, index) in showingList2" :key="index">
          <div class="wings">
            <div class="wings-head">
              <div class="wings-head-left">
                {{ activeType(index) }}
                <img src="~assets/img/user/space/unsee_dark.svg" />
              </div>
              <div class="wings-head-right">查看更多</div>
            </div>
            <div class="wings-content">
              <div class="wings-item" v-for="(item, indey) in items" :key="indey" v-waves>
                <div class="wings-cover">
                  <img v-lazy="item.img.src + item.img.name" :alt="item.img.alt" />
                </div>
                <div class="plays-danmaku-time">
                  <span class="plays">
                    <img src="~assets/img/recommend_list/play_dark.svg" alt />
                    {{ item.plays }}
                    <img
                      src="~assets/img/recommend_list/danmaku_dark.svg"
                      alt
                    />
                    {{ item.danmaku }}
                  </span>
                  <span class="danmaku"></span>
                  <span class="time">{{ item.video.long }}</span>
                </div>
                <div class="wings-title">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-footer">
          <div class="wings-head">
            <div class="wings-head-left">
              我玩过的游戏 1
              <img src="~assets/img/user/space/unsee_dark.svg" />
            </div>
            <div class="wings-head-right">查看更多</div>
          </div>
          <a href="https://www.biligame.com/detail/?id=94">
            <img
              src="https://i0.hdslb.com/bfs/game/ee43a0c2c3e52b8279dd8925ac32d83f7ffe02ac.png@100w_100h.webp"
              alt
            />
            <div class="sub">
              <div class="sub-title">崩坏三rd</div>
              <div class="star">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="actions" v-if="isActive === 1">
        <div
          class="actions-items"
          v-for="(item, index) in userData.cardList"
          :key="index"
          @click="alert()"
          v-waves
        >
          <div class="actions-items-head">
            <div class="head-left">
              <div>
                <img v-lazy="item.header.logo.src + item.header.logo.name" alt />
              </div>
              <div>
                <span>{{ item.header.name }}</span>
                <span>{{ item.header.time }}</span>
              </div>
            </div>
            <div class="head-right">
              <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
            </div>
          </div>
          <div class="actions-main">
            <div
              class="main-outer-ellipsis"
              v-if="item.type === 'forwardingCard' || item.type === 'miss'"
            >{{ item.main.ellipsis }}</div>
            <div
              class="main-content"
              :class="{ 'dark': item.type === 'forwardingCard' || item.type === 'miss' }"
            >
              <div class="content-inner-head">{{ item.main.content.inner.head }}</div>
              <div
                v-if="item.type !== 'miss'"
                class="inner-ellipsis"
                :class="{ 'white': item.type === 'text' || item.main.content.inner.img.length <= 0, 're-position': item.type === 'forwardingCard' }"
              >{{ item.main.content.ellipsis }}</div>
              <div class="content-inner" v-if="item.type !== 'unknown'">
                <div
                  class="content-inner-img"
                  v-if="item.type !== 'text' && item.main.content.inner.img.length > 0 && item.type !== 'imageSet cover-img' && item.type !== 'imageSingle cover-img wings'"
                  :class="{ init: item.type === 'imageSingle cover-img wings' }"
                >
                  <img
                    :class="{ init: item.type === 'imageSingle cover-img wings' }"
                    v-if="item.main.content.inner.img.length > 0 && item.type !== 'imageSet cover-img'"
                    v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                    alt
                  />
                </div>
                <div class="imgsingle-outer" v-if="item.type ==='imageSingle cover-img wings'">
                  <img
                    class="imgsingle"
                    ref="imgSingle"
                    v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                    alt
                  />
                </div>
                <div class="imgset-outer" v-if="item.type ==='imageSet cover-img'">
                  <img
                    class="imgset"
                    v-for="(src, indey) in item.main.content.inner.img"
                    v-lazy="src.src + src.name"
                    alt
                    :key="indey"
                  />
                </div>
                <div
                  class="content-inner-title"
                  v-if="item.main.content.inner.title.length > 0 && item.type !== 'miss' && item.type !== 'wings cover-img'"
                >{{ item.main.content.inner.title[0] }}</div>
                <div
                  class="content-inner-title"
                  v-if="item.type === 'wings cover-img'"
                >{{ item.main.content.inner.detail[0] }}</div>
              </div>
              <div class="unknown" v-if="item.type === 'unknown'">
                <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />发生了什么~
              </div>
            </div>
            <div
              v-if="item.type !== 'miss' && item.type !== 'wings cover-img'"
              class="time-play-danmaku"
              :class="{ 'position': item.type === 'wings cover-img' }"
            >
              <div class="left">
                <span>{{ item.main.content.inner.detail[0] }}</span>
                <span>{{ item.main.content.inner.detail[1] }}</span>
                <span>{{ item.main.content.inner.detail[2] }}</span>
              </div>
              <div class="right"></div>
            </div>
            <div
              class="miss"
              v-else-if="item.type === 'miss'"
              :class="{ 'dark': item.type === 'miss' }"
            >
              {{ item.main.content.inner.detail[0] }}
              <img
                src="~assets/img/recommend_list/danlidanli_girl.png"
                alt
              />
            </div>
          </div>
          <div class="actions-footer" v-if="item.footer">
            <span>
              <img src="~assets/img/user/set/share_dark.svg" alt />
              {{ item.footer.share }}
            </span>
            <span>
              <img src="~assets/img/user/space/discuss_dark.svg" alt />
              {{ item.footer.assess }}
            </span>
            <span>
              <img src="~assets/img/user/space/likes_dark.svg" alt />
              {{ item.footer.likes }}
            </span>
          </div>
        </div>
      </div>
      <div class="post" v-if="isActive === 2">
        <div class="if-have" v-if="videoList.length > 0">
          <div class="type">
            <span @click="changeType(0)" :class="{ 'type-active' : postActive === 0}" v-waves>视频</span>
            <span
              @click="changeType(1)"
              :class="{ 'type-active' : postActive === 1}"
              v-if="smallVideoList.length > 0"
              v-waves
            >小视频</span>
          </div>
          <div class="content-list" v-if="postActive === 0">
            <div class="play">
              <img src="~assets/img/user/space/play_pink.svg" alt />连续播放
            </div>
            <ul>
              <li v-for="(item, index) in videoList" :key="index" @click="alert()" v-waves>
                <div class="item-left">
                  <img
                    v-if="item.main.content.inner.img.length > 0"
                    v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                    alt
                  />
                  <span
                    v-if="item.main.content.inner.detail.length > 0"
                    class="time"
                  >{{ item.main.content.inner.detail[0] }}</span>
                </div>
                <div class="item-right">
                  <div
                    class="item-right-title"
                    v-if="item.main.content.inner.title.length > 0"
                  >{{ item.main.content.inner.title[0] }}</div>
                  <div class="publish-time">{{ item.header.time.split('·')[0] }}</div>
                  <div class="message" v-if="item.main.content.inner.detail.length > 0">
                    <span>
                      <img src="~assets/img/recommend_list/play_dark.svg" alt />
                      {{ parseInt(item.main.content.inner.detail[1]) }}
                    </span>
                    <span>
                      <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
                      {{ parseInt(item.main.content.inner.detail[2]) }}
                    </span>
                    <span>
                      <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="small-video-list" v-if="postActive === 1">
            <ul>
              <li v-for="(item, index) in smallVideoList" :key="index" v-waves>
                <div class="img">
                  <img
                    v-if="item.main.content.inner.img.length > 0"
                    v-lazy="item.main.content.inner.img[0].src + item.main.content.inner.img[0].name"
                    alt
                  />
                  <div
                    v-if="item.main.content.inner.detail.length > 0"
                    class="time"
                  >{{ item.main.content.inner.detail[0] }}</div>
                </div>
                <div
                  class="small-video-title"
                  v-if="item.main.content.inner.title.length > 0"
                >{{ item.main.content.inner.title[0] }}</div>
                <div class="small-video-sub">
                  <span>
                    <img src="~assets/img/recommend_list/play_dark.svg" alt />
                    {{ parseInt(item.main.content.inner.detail[1]) }}
                  </span>
                  <span>
                    <img src="~assets/img/user/space/discuss_dark.svg" alt />
                    {{ parseInt(item.main.content.inner.detail[2]) }}
                  </span>
                  <span>10个月前</span>
                </div>
              </li>
            </ul>
            <div class="small-video-bottom">(￣ェ￣;)，没有更多的内容啦~</div>
          </div>
        </div>
        <div class="if-no-have" v-else-if="videoList.length <= 0">
          <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
          什么都没有~
        </div>
      </div>
      <div class="collect" v-if="isActive === 3">
        <div class="collect-outer" v-for="(items, index) in collectionList" :key="index">
          <div class="collect-title" @click="Rotate(index)">
            <img
              :class="{ rotate: !rotate[index].active }"
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              alt
            />
            {{ items.name }}
            <sup>{{ items.list.length }}</sup>
          </div>
          <ul v-if="items.list.length > 0 && rotate[index].active">
            <li v-for="(item, indey) in items.list" :key="indey" v-waves>
              <div class="collect-left">
                <img v-lazy="item.data[0].img.src + item.data[0].img.name" alt />
                <span>
                  <img src="~assets/img/user/space/collect_dark.svg" alt />
                </span>
              </div>
              <div class="collect-right">
                <span>{{ item.name }}</span>
                <span>{{ item.data.length }}个内容·公开</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pursuit" v-if="isActive === 4">
        <div class="animate">
          <div class="animate-outer">
            <div class="animate-content">
              <div
                class="animate-item"
                v-for="(item, index) in animate[0]"
                :key="index"
                @click="goToLink(item.link)"
                v-waves
              >
                <img v-lazy="item.src" alt />
                <div class="title-sub">
                  <div class="animate-item-title">{{ item.name }}</div>
                  <div class="animate-item-sub">{{ item.set }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop" v-if="popupVisible">
      <mt-popup v-model="popupVisible" position="right">
        <div class="head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title"></span>
          <div class="head-right" @click="openSheet()">
            <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
          </div>
        </div>
        <div class="main">
          <iframe class="frame" :src="animateLink">
            <a :href="animateLink">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
        <div class="action-sheet">
          <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
        </div>
        <div class="modal" v-if="sheetVisible === true"></div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { getHomeData } from "network/home.js";
import Animate from "./animate.json";
import { Toast } from "mint-ui";
import { getUserData } from "network/user.js";
import { getUpDetail } from "network/up.js";

export default {
  name: "UserSpace",
  data() {
    return {
      userData: null,
      edit: "编辑资料",
      postActive: 0,
      experience: {
        now: 19394,
        max: 28800
      },
      typeList: [
        { name: "主页" },
        { name: "动态" },
        { name: "投稿" },
        { name: "收藏" },
        { name: "追番" }
      ],
      descType: "详情",
      isActive: 0,
      showingList: {
        showingVideoList: [],
        showingSmallVideoList: []
      },
      showingList2: {
        showingCollects: [],
        showingPayForList: [],
        showingRecommendList: []
      },
      showingList3: [],
      videoList: [],
      smallVideoList: [],
      collectList: [],
      articleList: [],
      collectionList: [
        {
          name: "我的创建",
          list: []
        },
        {
          name: "我的收藏",
          list: []
        }
      ],
      position: {
        y: 0,
        nowY: 0
      },
      disappear: false,
      animate: Object.values(Animate),
      rotate: [
        {
          index: 0,
          active: true
        },
        {
          index: 1,
          active: true
        }
      ],
      colorList: [
        "#e6e6e6",
        "#e6e6e6",
        "#95DDB2",
        "#92D1E5",
        "#FFB37C",
        "#FF7A18",
        "#FF0000"
      ],
      popupVisible: false,
      sheetVisible: false,
      actions: [{ name: "浏览器打开", method: this.goToNavigator }],
      animateLink: ""
    };
  },
  created() {
    this.bus();
    this.getCollectList();
    this.getShowingList3();
    // getUpDetail(122879).then(res => {
    //   // console.log(res);
    //   res.cardList.forEach(e => {
    //     console.log(e.type)
    //   })
    // })
  },
  mounted() {},
  activated() {
    if (
      this.userData &&
      this.$route.params.uuid !== this.userData.identy.uuid
    ) {
      this.reset();
    }
  },
  methods: {
    showDesc() {
      if (this.descType === "收起") {
        this.descType = "详情";
      } else {
        this.descType = "收起";
      }
    },
    reset() {
      this.userData = null;
      this.showingList = {
        showingVideoList: [],
        showingSmallVideoList: []
      };
      this.showingList2 = {
        showingCollects: [],
        showingPayForList: [],
        showingRecommendList: []
      };
      this.showingList3 = [];
      this.videoList = [];
      this.smallVideoList = [];
      this.collectList = [];
      this.articleList = [];
      this.popupVisible = false;
      this.sheetVisible = false;
      this.disappear = false;
      this.bus();
      this.getCollectList();
      this.getShowingList3();
    },
    select(i) {
      if (this.isSelected === i) {
        return false;
      }
    },
    changeType(i) {
      this.postActive = i;
    },
    goToSet() {
      this.$router.replace({
        path: "/set",
        query: {
          beforePath: this.$route.path
        }
      });
    },
    toActive(i) {
      if (i === this.isActive) {
        return false;
      }
      this.isActive = i;
    },
    goBack() {
      let reg = /set/gi;
      if (
        this.$route.query.beforePath &&
        reg.test(this.$route.query.beforePath)
      ) {
        this.$router.replace({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    goToLink(link) {
      this.animateLink = link;
      this.popupVisible = true;
    },
    Rotate(i) {
      this.rotate[i].active = !this.rotate[i].active;
    },
    async bus() {
      await getUserData().then(async res => {
        let newVal = null;
        delete res._id;
        delete res.username;
        if (res.identy.uuid === this.$route.params.uuid) {
          this.edit = "编辑资料";
          newVal = res;
          this.userData = newVal;
        } else {
          this.edit = "关注";
          await getUpDetail(this.$route.params.uuid).then(res => {
            newVal = res;
            this.userData = res;
          });
        }

        if (newVal.cardList.length <= 0) {
          return false;
        } else {
          await newVal.cardList.forEach(e => {
            let time = [];
            if (e.footer && !e.footer.likes) {
              e.footer = {
                share: `${(Math.random() * 30).toFixed(1)}万`,
                assess: `${(Math.random() * 30).toFixed(1)}万`,
                likes: `${(Math.random() * 30).toFixed(1)}万`
              };
            }
            if (e.main.content.inner.detail.length > 0) {
              time = e.main.content.inner.detail[0].split(":");
            } else {
              if (e.type === "wings") {
                this.smallVideoList.push(e);
              }
            }
            switch (e.type) {
              case "wings":
                this.videoList.push(e);
                if (
                  time.length > 0 &&
                  time[0] === "00" &&
                  parseInt(time[1]) <= 30
                ) {
                  this.smallVideoList.push(e);
                }
                break;
              case "forwardingCard":
                break;
              case "imageSingle cover-img wings":
                break;
              case "text":
                this.articleList.push(e);
                break;
              case "imageSet cover-img":
                break;
              case "wings cover-img":
                break;
            }
          });
          if (this.videoList.length >= 4) {
            this.showingList.showingVideoList = this.videoList.filter(
              (e, i) => {
                return i < 4;
              }
            );
          } else {
            this.showingList.showingVideoList = this.videoList;
          }
          if (this.smallVideoList.length >= 4) {
            this.showingList.showingSmallVideoList = this.smallVideoList.filter(
              (e, i) => {
                return i < 4;
              }
            );
          } else {
            this.showingList.showingSmallVideoList = this.smallVideoList;
          }
        }
        switch (newVal.baseInfo.level) {
          case "0":
            this.experience = {
              now: 19,
              max: 280
            };
            break;
          case "1":
            this.experience = {
              now: 280,
              max: 560
            };
            break;
          case "2":
            this.experience = {
              now: 560,
              max: 1120
            };
            break;
          case "3":
            this.experience = {
              now: 1120,
              max: 2240
            };
            break;
          case "4":
            this.experience = {
              now: 2240,
              max: 10800
            };
            break;
          case "5":
            this.experience = {
              now: 19346,
              max: 28800
            };
            break;
          case "6":
            this.experience = {
              now: 99999,
              max: 99999
            };
            break;
        }
      });
    },
    touchStart() {},
    touchMove() {},
    touchEnd() {},
    test(e) {
      if (this.position.nowY <= e.srcElement.scrollTop) {
        this.position.y += 1;
        if (this.position.y >= 50) {
          this.position.y = 50;
        }
      } else {
        if (this.position.nowY <= 315) {
          this.position.y -= 1;
          if (this.position.y <= 0) {
            this.position.y = 0;
          }
        }
      }
      this.position.nowY = e.srcElement.scrollTop;
      this.$nextTick(() => {
        this.$refs.bgHead.style.backgroundColor = `rgba(${this.position.y}, ${
          this.position.y
        }, ${this.position.y}, ${this.position.y / 50})`;
        if (this.position.nowY <= 1) {
          this.disappear = false;
          this.$refs.bgHead.style.backgroundColor = "transparent";
          this.position.y = 0;
        } else if (this.position.nowY >= 315) {
          this.disappear = true;
          this.$refs.bgHead.style.backgroundColor = "rgba(50, 50, 50, 1)";
          this.position.y = 50;
        }
      });
    },
    goToLive() {
      this.animateLink = "https://live.bilibili.com/6094209";
      this.popupVisible = true;
    },
    async getCollectList() {
      let data = [];
      data = await getHomeData({ skip: 0 }).then(res => {
        return res;
      });
      this.collectList = data;
      let obj = {
        name: "默认文件夹",
        data
      };
      this.collectionList[0].list.push(obj);
      this.showingList2.showingCollects = data.filter((n, i) => {
        return i <= 1;
      });
      this.showingList2.showingRecommendList = data.filter((n, i) => {
        return i < 4 && i >= 2;
      });
      this.showingList2.showingPayForList = data.filter((n, i) => {
        return i < 6 && i >= 4;
      });
    },
    getShowingList3() {
      let arr1 = this.animate[0].filter((n, i) => {
        return i <= 2;
      });
      let arr2 = this.animate[1].filter((n, i) => {
        return i <= 2;
      });
      this.showingList3.push(arr1);
      this.showingList3.push(arr2);
    },
    alert() {
      Toast({
        message: "不要再点啦~忘了爬链接，嘤嘤嘤",
        duration: 3000,
        position: "middle"
      });
    },
    closePop() {
      this.popupVisible = false;
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href = this.animateLink;
    }
  },
  computed: {
    activeType() {
      return index => {
        switch (index) {
          case "showingVideoList":
            return `视频 ${this.videoList.length}`;
          case "showingSmallVideoList":
            return `小视频 ${this.smallVideoList.length}`;
          case "showingCollects":
            return `收藏 ${this.collectList.length}`;
          case "showingRecommendList":
            return `我推荐的视频 ${this.collectList.length}`;
          case "showingPayForList":
            return `最近投币 ${this.collectList.length}`;
          case 0:
            return `追番 ${this.animate[0].length}`;
          case 1:
            return `追剧 ${this.animate[1].length}`;
        }
      };
    },
    imgSingle() {
      return () => {
        // console.log();
      };
    }
  },
  watch: {
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#user-space {
  width: 10rem;
  height: 100vh;
  overflow: hidden;
  background-color: var(--base-set-bg-color) !important;
  font-size: 0.4rem;
  overflow-y: scroll;
  .head {
    .bg {
      position: relative;
      // top: -1rem;
      img {
        z-index: 3;
        width: 10rem;
      }
      .bg-head {
        padding: 0.3rem;
        position: fixed;
        top: 0rem;
        z-index: 9;
        width: 10rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bg-head-left {
          position: relative;
          span {
            position: relative;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(36, 36, 36, 0.3);
            opacity: 0.8;
            transition: 0.3s;
            img {
              width: 0.6rem;
              height: 0.6rem;
            }
          }
          .disappear {
            transition: 0.1s;
            background-color: transparent;
          }
        }
        .bg-head-middle {
          margin-right: -1rem;
          font-size: 0.5rem;
          transition: 0.3s;
        }
        .bg-head-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            background-color: rgba(36, 36, 36, 0.3);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            transition: 0.3s;
            img {
              width: 0.9rem;
              height: 0.9rem;
            }
            &:last-child {
              margin-left: 0.4rem;
              img {
                width: 1rem;
                height: 1rem;
              }
            }
          }
          .disappear {
            transition: 0.3s;
            background-color: transparent;
          }
        }
        .disappear {
          transition: 0.3s;
          color: transparent;
        }
      }
    }
    .head-content {
      padding: 0 0.3rem;
      position: relative;
      background-color: var(--base-set-item-color);
      z-index: 3;
      margin-top: -3.5rem;
      display: flex;
      flex-direction: column;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
      .line-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -0.2rem;
        .img {
          background-color: var(--base-set-item-color);
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 100%;
          }
        }
        .fans-follows-praise-btn {
          width: 5.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .fans-follows-praise {
            width: 5.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fans,
            .follows,
            .praise {
              display: flex;
              flex-direction: column;
              align-items: center;
              span {
                &:last-child {
                  margin-top: 0.05rem;
                  font-size: 0.35rem;
                  opacity: 0.6;
                }
              }
            }
          }
          .btn {
            margin-top: 0.1rem;
            width: 5.8rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-tint);
            border: 0.02rem solid var(--color-tint);
            border-radius: 0.1rem;
          }
        }
      }
      .line-2 {
        display: flex;
        align-items: center;
        margin-top: 0.3rem;
        span {
          margin: 0 0.1rem;
          &:first-child {
            width: 2.8rem;
            font-size: 0.5rem;
            margin-left: 0rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &:nth-child(2) {
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
          &:nth-child(3) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 0.5rem;
            font-size: 0.35rem;
            color: var(--color-tint);
            border-radius: 0.2rem;
            background-color: var(--base-bg-color-sec);
          }
          &:last-child {
            opacity: 0.6;
            display: flex;
            align-items: center;
            &::after {
              content: "〉";
              position: relative;
              margin-left: 0.2rem;
              font-size: 0.3rem;
            }
            img {
              margin-right: 0.2rem;
              width: 0.5rem;
              height: 0.5rem;
            }
          }
        }
      }
      .line-3 {
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
        display: flex;
        flex-direction: column;
        margin-top: 0.3rem;
        .level-experience {
          display: flex;
          align-items: center;
          .level {
            position: relative;
            font-size: 0.24rem;
            display: flex;
            height: 0.2rem;
            width: 0.4rem;
            background-color: rgb(246, 122, 24);
            color: var(--base-set-item-color);
            z-index: 3;
            font-weight: bold;
            font-family: "Black";
            span {
              z-index: 2;
              display: flex;
              align-items: flex-start;
              text-align: center;
              justify-content: center;
              position: absolute;
              background-color: rgb(246, 122, 24);
              font-size: 0.28rem;
              top: -0.05rem;
              right: 0;
              width: 0.14rem;
              height: 0.2rem;
            }
          }
          .experience {
            opacity: 0.6;
            margin-left: 0.2rem;
          }
        }
        .experience-line {
          margin-top: 0.08rem;
          display: flex;
          .experience-max {
            border-radius: 0.2rem;
            width: 3rem;
            height: 0.07rem;
            background-color: rgb(125, 125, 125);
          }
          .experience-now {
            border-radius: 0.2rem;
            position: absolute;
            height: 0.07rem;
            background-color: rgb(246, 122, 24);
          }
        }
      }
      .line-4 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
        .line-4-left {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0.6;
          span {
            margin-top: 0.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.25rem;
            height: 0.5rem;
            width: 2.3rem;
            border-radius: 0.1rem;
            opacity: 0;
            background-color: rgb(29, 28, 28);
            margin-bottom: 0.1rem;
          }
          .appear {
            opacity: 1;
          }
        }
        .line-4-right {
          display: flex;
          width: 2rem;
          height: 0.6rem;
          justify-content: flex-end;
          color: rgb(75, 134, 179);
        }
        .show-desc {
          transition: 0.3s;
          white-space: initial;
          overflow: initial;
          text-overflow: initial;
        }
      }
      .line-5 {
        font-size: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        height: 0.4rem;
        .line-5-left {
          display: flex;
          align-items: center;
          img {
            width: 0.7rem;
            height: 0.7rem;
            margin-right: 0.3rem;
          }
          span {
            opacity: 0.6;
          }
        }
        .line-5-right {
          font-size: 0.4rem;
          width: 1.6rem;
          height: 0.64rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-tint);
          border: 0.02rem solid var(--color-tint);
          border-radius: 0.1rem;
        }
      }
    }
    img {
      width: 10rem;
    }
  }
  .head-footer {
    position: sticky;
    top: 2rem;
    z-index: 99;
    background-color: var(--base-set-item-color);
    border-top: 0.1rem solid var(--base-set-item-color);
    .navbar {
      background-color: var(--base-set-item-color);
      font-size: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .navbar-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .type {
          text-align: center;
          width: 2rem;
          height: 1rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          span {
          }
        }
        .active {
          color: var(--color-tint);
        }
      }
      .navbar-active-footer {
        transition: 0.3s;
        position: relative;
        width: 1rem;
        height: 0.05rem;
        background-color: var(--color-tint);
        border-radius: 0.2rem;
      }
    }
  }
  .content {
    .animate {
      padding: 0 0.3rem;
      margin-top: 0.5rem;
      .animate-outer {
        margin-bottom: 0.3rem;
        .wings-head {
          display: flex;
          align-items: center;
          height: 1.2rem;
          justify-content: space-between;
          .wings-head-left {
            display: flex;
            align-items: center;
            img {
              width: 0.5rem;
              height: 0.5rem;
              margin-left: 0.1rem;
            }
          }
          .wings-head-right {
            display: flex;
            align-items: center;
            opacity: 0.6;
            &::after {
              content: "〉";
              margin-left: 0.2rem;
            }
          }
        }
        .animate-content {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          text-align: center;
          .animate-item {
            position: relative;
            width: 2.9rem;
            height: 3.9rem;
            border-radius: 0.1rem;
            background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 1.5rem 1.5rem;
            img {
              width: 2.9rem;
              border-radius: 0.1rem;
            }
            .title-sub {
              position: absolute;
              text-align: left;
              color: #fff;
              bottom: 0.1rem;
              .animate-item-title {
                font-size: 0.35rem;
                width: 2.9rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 0.1rem;
              }
              .animate-item-sub {
                font-size: 0.3rem;
                padding-left: 0.1rem;
                text-align: left;
              }
            }
          }
        }
      }
    }
    .main {
      .wings-head {
        display: flex;
        align-items: center;
        height: 1.2rem;
        justify-content: space-between;
        .wings-head-left {
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
            margin-left: 0.1rem;
          }
        }
        .wings-head-right {
          display: flex;
          align-items: center;
          opacity: 0.6;
          &::after {
            content: "〉";
            margin-left: 0.2rem;
          }
        }
      }
      .inner {
        margin-bottom: -0.5rem;
        .wings {
          display: flex;
          flex-direction: column;
          padding: 0.3rem;
          .wings-head {
            display: flex;
            align-items: center;
            height: 1.2rem;
            justify-content: space-between;
            .wings-head-left {
              display: flex;
              align-items: center;
              img {
                width: 0.5rem;
                height: 0.5rem;
                margin-left: 0.1rem;
              }
            }
            .wings-head-right {
              display: flex;
              align-items: center;
              opacity: 0.6;
              &::after {
                content: "〉";
                margin-left: 0.2rem;
              }
            }
          }
          .wings-content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            .wings-item {
              border-radius: 0.2rem;
              margin-bottom: 0.4rem;
              width: 4.55rem;
              background-color: var(--base-set-item-color);
              height: 4.2rem;
              .wings-cover {
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 4.55rem 3rem;
                width: 4.55rem;
                height: 3rem;
                img {
                  border-radius: 0.2rem;
                  width: 4.55rem;
                  height: 3rem;
                }
              }
              .plays-danmaku-time {
                position: relative;
                font-size: 0.3rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: -0.4rem;
                margin-bottom: 0.3rem;
                padding: 0 0.1rem;
                span {
                  display: flex;
                  align-items: center;
                  img {
                    width: 0.35rem;
                    height: 0.35rem;
                    margin-bottom: 0.05rem;
                    &:last-child {
                      margin: 0 0.1rem;
                      margin-bottom: 0.05rem;
                    }
                  }
                }
              }
              .wings-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 4.55rem;
                opacity: 0.8;
                padding: 0 0.2rem;
              }
            }
          }
        }
      }
      .middle {
        position: relative;
        width: 9.4rem;
        left: 0;
        right: 0;
        margin: 0.2rem auto;
        height: 1.2rem;
        border-radius: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--base-bg-color-thr);
        img {
          width: 0.7rem;
          height: 0.7rem;
          opacity: 0.5;
          margin-right: 0.2rem;
        }
      }
      .main-footer {
        position: relative;
        padding: 0.3rem;
        a {
          position: relative;
          display: flex;
          background-color: var(--base-set-item-color);
          width: 2.4rem;
          height: 2.4rem;
          flex-direction: column;
          border-radius: 0.1rem;
          margin: 0.7rem 0;
          img {
            top: -0.6rem;
            position: absolute;
            border-radius: 0.1rem;
            width: 1.6rem;
            height: 1.6rem;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
          .sub {
            // color: #fff;
            font-size: 0.4rem;
            width: 2.4rem;
            position: absolute;
            top: 1.2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            .sub-title {
              margin-bottom: 0.1rem;
            }
            .star {
              display: flex;
              justify-content: space-around;
              span {
                position: relative;
                // background-color: #000;
                width: 0.3rem;
                height: 0.3rem;
                background-image: url("~assets/img/user/space/star_yellow.svg");
                background-repeat: no-repeat;
                background-size: 0.3rem 0.3rem;
                background-position: center center;
                &:last-child {
                  background-image: url("~assets/img/user/space/star_dark.svg");
                }
              }
            }
          }
        }
      }
    }
    .actions {
      .actions-items {
        padding: 0.3rem;
        display: flex;
        flex-direction: column;
        background-color: var(--base-set-item-color);
        margin-bottom: 0.3rem;
        .actions-items-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.3rem 0 0.5rem 0;
          .head-left {
            display: flex;
            align-items: center;
            div {
              display: flex;
              align-items: center;
              &:first-child {
                width: 1.2rem;
                height: 1.2rem;
                margin-right: 0.3rem;
                border-radius: 100%;
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                background-position: center center;
                background-size: 1rem 1rem;
                background-repeat: no-repeat;
                img {
                  border-radius: 100%;
                  height: 1.2rem;
                  width: 1.2rem;
                }
              }
              &:last-child {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                span {
                  &:first-child {
                    opacity: 0.9;
                    font-weight: bold;
                    margin-bottom: 0.1rem;
                  }
                  &:last-child {
                    font-size: 0.3rem;
                    opacity: 0.6;
                  }
                }
              }
            }
          }
          .head-right {
            img {
              width: 0.8rem;
              height: 0.8rem;
            }
          }
        }
        .actions-main {
          position: relative;
          display: flex;
          flex-direction: column;
          .main-outer-ellipsis {
            font-size: 0.45rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          .main-content {
            display: flex;
            flex-direction: column;
            .inner-ellipsis {
              font-size: 0.45rem;
              font-weight: bold;
              color: rgb(62, 98, 125);
            }
            .re-position {
              margin-top: 0.5rem;
            }
            .white {
              color: var(--color-text);
              font-weight: initial;
              margin: 0.3rem 0;
            }
            .content-inner {
              position: relative;
              display: flex;
              flex-direction: column;
              .content-inner-head {
                margin: 0.3rem 0;
              }
              .content-inner-img {
                margin: 0.3rem 0;
                border-radius: 0.1rem;
                width: 9.4rem;
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                height: 5rem;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 4rem 4rem;
                img {
                  width: 9.4rem;
                  height: 5rem;
                  border-radius: 0.1rem;
                }
              }
              .imgset-outer {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                border-radius: 0.1rem;
                justify-content: flex-start;
                img {
                  border-radius: 0.1rem;
                  width: 2rem;
                  margin: 0.1rem;
                  &:first-child {
                  }
                }
              }
              .imgsingle-outer {
                margin-top: 0.2rem;
                width: 5rem;
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                background-position: center center;
                background-size: 1rem 1rem;
                background-repeat: no-repeat;
                .imgsingle {
                  width: 5rem;
                }
              }
              .content-inner-title {
                font-weight: bold;
                width: 9.4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.4rem;
                margin-bottom: 0.2rem;
              }
            }
            .unknown {
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                height: 4rem;
              }
            }
          }
          .dark {
            background-color: var(--base-set-bg-color) !important;
            margin: 0 -0.3rem;
            padding: 0 0.3rem;
          }
          .time-play-danmaku {
            position: absolute;
            bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0.1rem 0.2rem;
            .left {
              display: flex;
              align-items: center;
              justify-content: space-between;
              opacity: 0.9;
              span {
                font-size: 0.35rem;
                &:nth-child(2) {
                  margin: 0 0.2rem;
                }
              }
            }
          }
          .miss {
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            justify-content: center;
            img {
              height: 5rem;
            }
          }
        }
        .actions-footer {
          margin: 0.4rem;
          font-size: 0.35rem;
          margin-bottom: 0.1rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          span {
            width: 3rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.6;

            img {
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.05rem;
              margin-bottom: 0.1rem;
            }
          }
        }
      }
    }
    .post {
      .if-have {
        .type {
          display: flex;
          align-items: center;
          padding-left: 0.5rem;
          opacity: 0.6;
          text-align: center;
          transition: 0.3s;
          span {
            width: 1.5rem;
            height: 1.2rem;
            line-height: 1.2rem;
          }
        }
        .type-active {
          transition: 0.3s;
          color: var(--color-tint);
        }
        .content-list {
          padding: 0.3rem;
          transition: 0.3s;
          background-color: var(--base-set-item-color);
          .play {
            display: flex;
            align-items: center;
            font-size: 0.45rem;
            margin: 0.3rem 0;
            img {
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.3rem;
            }
          }
          ul {
            display: flex;
            flex-direction: column;
            li {
              display: flex;
              align-items: center;
              justify-content: space-between;
              list-style: none;
              height: 2.6rem;
              border-bottom: 0.01rem solid rgba(100, 100, 100, 0.2);
              .item-left {
                position: relative;
                width: 3rem;
                height: 2rem;
                border-radius: 0.1rem;
                background-size: 3rem 2rem;
                background-position: center center;
                background-repeat: no-repeat;
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                img {
                  width: 3rem;
                  height: 2rem;
                  border-radius: 0.1rem;
                }
                .time {
                  font-size: 0.3rem;
                  position: absolute;
                  bottom: 0.1rem;
                  right: 0.15rem;
                }
              }
              .item-right {
                height: 2rem;
                flex: auto;
                display: flex;
                padding-left: 0.3rem;
                flex-direction: column;
                justify-content: space-between;
                .item-right-title {
                  width: 6rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .publish-time {
                  opacity: 0.6;
                  margin-top: 0.3rem;
                  font-size: 0.22rem;
                }
                .message {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  span {
                    font-size: 0.35rem;
                    opacity: 0.6;
                    display: flex;
                    align-items: center;
                    margin-top: 0.1rem;
                    img {
                      width: 0.5rem;
                      height: 0.5rem;
                      margin-right: 0.1rem;
                    }
                    &:last-child {
                      img {
                        width: 0.7rem;
                        height: 0.7rem;
                        margin-right: 0;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .small-video-list {
          transition: 0.3s;
          padding: 0.3rem;
          ul {
            display: flex;
            flex-direction: column;
            li {
              display: flex;
              flex-direction: column;
              list-style: none;
              // align-items: center;
              background: var(--base-set-item-color);
              border-radius: 0.1rem;
              margin-bottom: 0.4rem;
              .img {
                position: relative;
                border-radius: 0.1rem;
                width: 9.4rem;
                height: 5.5rem;
                background-size: 5rem 5rem;
                background-position: center center;
                background-repeat: no-repeat;
                background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                img {
                  width: 9.4rem;
                  height: 5.5rem;
                  border-radius: 0.1rem;
                }
                .time {
                  color: #fff;
                  position: absolute;
                  bottom: 0.2rem;
                  right: 0.2rem;
                }
              }
              .small-video-title {
                display: flex;
                justify-content: flex-start;
                margin: 0.3rem;
              }
              .small-video-sub {
                display: flex;
                align-items: center;
                height: 1rem;
                justify-content: space-between;
                margin: 0 0.3rem;
                font-size: 0.35rem;
                opacity: 0.6;
                span {
                  display: flex;
                  align-items: center;
                  img {
                    width: 0.5rem;
                    height: 0.5rem;
                    margin-right: 0.1rem;
                    margin-bottom: 0.05rem;
                  }
                }
              }
            }
          }
          .small-video-bottom {
            font-size: 0.45rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
          }
        }
      }
      .if-no-have {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 5rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .collect {
      padding: 0.3rem;
      .collect-outer {
        display: flex;
        flex-direction: column;
        .collect-title {
          display: flex;
          opacity: 0.6;
          align-items: center;
          height: 1.2rem;
          img {
            position: relative;
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.3rem;
            transition: 0.3s;
          }
          .rotate {
            transition: 0.3s;
            transform: rotateZ(-180deg);
          }
          sup {
            margin-left: 0.3rem;
          }
        }
        ul {
          display: flex;
          flex-direction: column;
          border-top: 0.02rem solid rgba(100, 100, 100, 0.3);
          li {
            transition: 0.3s;
            position: relative;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            align-items: center;
            height: 2.8rem;
            border-bottom: 0.02rem solid rgba(100, 100, 100, 0.1);
            .collect-left {
              position: relative;
              height: 2.2rem;
              width: 3rem;
              border-radius: 0.1rem;
              background-size: 2rem 2rem;
              background-position: center center;
              background-repeat: no-repeat;
              background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
              img {
                width: 3rem;
                height: 2.2rem;
                border-radius: 0.1rem;
              }

              span {
                position: absolute;
                bottom: 0.1rem;
                right: 0.1rem;
                width: 0.7rem;
                height: 0.7rem;
                border-radius: 0.1rem;
                background-color: rgba(26, 26, 26, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 0.5rem;
                  height: 0.5rem;
                }
              }
            }
            .collect-right {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              margin-left: 0.3rem;
              height: 2rem;
              span {
                opacity: 0.8;
                &:first-child {
                  margin-top: 0.2rem;
                }
                &:last-child {
                  font-size: 0.35rem;
                  opacity: 0.6;
                  margin-bottom: 0.2rem;
                }
              }
            }
          }
        }
      }
    }
    .pursuit {
      position: relative;
      .animate {
        margin-top: 0.2rem;
        position: relative;
        .animate-item {
          margin: 0.2rem 0;
        }
      }
    }
  }
  .pop {
    position: absolute;
    top: 0;
    background-color: transparent;
    width: 10rem;
    height: 100vh;
    .head {
      position: fixed;
      height: 1.6rem;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 10rem;
      padding: 0.3rem;
      .back {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(100, 100, 100, 0.1);
        border-radius: 100%;

        img {
          width: 0.5rem;
        }
      }
      .title {
        display: flex;
        align-items: center;
        width: 7rem;
        font-size: 0.45rem;
      }
      .head-right {
        position: relative;
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(100, 100, 100, 0.1);
        border-radius: 100%;
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
      }
    }
    .main {
      .frame {
        overflow: hidden;
        width: 10rem;
        height: 100vh;
      }
      .frame::-webkit-scrollbar {
        width: 0 !important;
      }
    }
    .action-sheet {
      /deep/ .sheet {
        z-index: 9999 !important;
        background-color: var(--base-set-bg-color);
        /deep/ .mint-actionsheet-list {
          .mint-actionsheet-listitem {
            border-color: var(--base-set-bg-color);
            background-color: var(--base-set-item-color);
            &:last-child {
              height: 2.4rem;
              background-repeat: no-repeat;
              background-image: url("~assets/img/user/set/navigator_dark.svg");
              background-size: 1.2rem 1.2rem;
              background-position: 0.7rem 0.2rem;
              color: var(--color-text);
              font-size: 0.4rem;
              font-weight: lighter;
              text-align: left;
              padding-top: 1.2rem;
              padding-left: 0.4rem;
            }
          }
        }
        /deep/ .mint-actionsheet-button {
          border-color: var(--base-set-bg-color);
          font-weight: lighter;
          color: var(--color-text);
          background-color: var(--base-set-item-color);
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
}
#user-space::-webkit-scrollbar {
  display: none;
}
</style>