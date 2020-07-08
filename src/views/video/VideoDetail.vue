<template>
  <div
    id="video-detail"
    :class="{ 'cancel-scroll': lock }"
    @touchstart="touchMove($event)"
    @touchend="videoInlineShow($event)"
    @scroll="scroll($event)"
    :style="light"
    v-if="Object.keys(videoData).length > 0"
  >
    <div class="head">
      <div class="bg">
        <div
          class="bg-head"
          v-if="!$store.state.isFullScreen"
          ref="bgHead"
          :class="{ 'bg-head-disappear': videoBarDisappear }"
        >
          <div class="bg-head-left">
            <span @click="goBack()" :class="{ disappear: disappear }">
              <img src="~assets/img/video/back_white.svg" alt />
            </span>
          </div>
          <div class="bg-head-middle" :class="{ disappear: !disappear }"></div>
          <div class="bg-head-right">
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/small_window_dark.svg" alt />
            </span>
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/TV_dark.svg" alt />
            </span>
            <span :class="{ disappear: disappear }">
              <img src="~assets/img/video/three_points_white.svg" alt />
            </span>
          </div>
        </div>
        <div class="video-outer" @touchmove="changeVolumeAndLight($event)" @touchend="closeVolumeAndLight()">
          <div class="danmaku-outer" :class="{ 'oy': closeTheDanmaku }" :style="danmakuheight">
            <span class="danmaku-item" v-for="(item, index) in showDanmakuList" :style="{ 'font-size': `${item.fonsize - 10}px`, 'color': `#${item.color.toString(16)}`, top: `${item.position}`, 'animation-duration': speed(item.text.length) }"  :class="{ 'mode-scroll-right': item.mode === '滚动', 'mode-scroll-left': item.mode === '逆向', 'mode-fixed-top': item.mode === '顶部', 'mode-fixed-bottom': item.mode === '底部' }" :key="index">
              <span :class="{'sub-line': item.userID !== null && item.userID === $store.state.userInfo.identy.uuid}">{{ item.text }}</span>
            </span>
          </div>
          <div v-if="!isOk" class="poster" :style="posterheight"></div>
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            x5-video-orientation="landscape"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @loadeddata="test($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @statechanged="playerStateChanged($event)"
            @ready="playerReadied($event)"
          ></video-player>
          <div class="sound-light" v-if="volumeAndlight.volume || volumeAndlight.light">
            <img :src="volumeAndlight.active" alt="" :class="{ 'smaller': volumeAndlight.active === require('assets/img/video/close_sound_white.svg') }">
            <div class="line">
              <span v-if="volumeAndlight.volume" :style="{ 'width': `${volumeAndlight.volumeNum * 2}rem` }"></span>
              <span v-if="volumeAndlight.light" :style="{ 'width': `${volumeAndlight.lightNum * 2}rem` }"></span>
              <span></span>
            </div>
          </div>
          <div class="cushion" v-if="isCushioning && !$store.state.isFullScreen">
            <Cushion />
          </div>

          <div
            class="video-bar"
            :class="{ 'bg-head-disappear': videoBarDisappear }"
            v-if="isOk && !$store.state.isFullScreen"
          >
            <div class="play-pause" @click="playPause()">
              <img :src="videoState.active" alt />
            </div>
            <div class="process" @click="processChange($event)">
              <img
                @touchmove="slide($event)"
                @touchend="finishSlide()"
                src="~assets/img/video/process.svg"
                :style="{ 'left': `${timestap.now / timestap.max * 5.5 - .05}rem` }"
                alt
              />
              <span class="now" :style="{ 'width': (timestap.now / timestap.max) * 5.5 + 'rem' }"></span>
              <span class="max"></span>
            </div>
            <div class="timestap">
              <span>{{ timestap.nowFormat }}</span>/
              <span>{{ timestap.formattedTime_ }}</span>
            </div>
            <div class="full-screen" @click="fullScreen()">
              <img src="~assets/img/video/full_white.svg" alt />
            </div>
          </div>
          <span v-if="isOk" class="bottom-now" :class="{ 'video-bar-disappear': !videoBarDisappear }" :style="{ 'width': (timestap.now / timestap.max) * 10 + 'rem' }"></span>
        </div>

        <div class="bg-footer">
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
                <span>
                  {{ item.name }} {{item.num}}
                </span>
              </div>
            </div>
            <span class="navbar-active-footer" :style="{ 'left': `${.75 + 2.5 * isActive}rem` }"></span>
          </div>
          <div class="close-danmaku" >
            <div class="here-danmaku" :class="{ 'enter-bar-disappear': closeTheDanmaku }" @click="makingDanmaku()">{{ isMakingDanmaku }}</div>
            <span :class="{ 'change-bg-color': closeTheDanmaku }" @click="closeDanmaku()">
              <img :src="navbarImg" alt />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="in-desc" v-if="isActive === 0">
      <div class="desc" v-if="Object.keys(upData).length > 0">
        <div class="desc-up">
          <div class="desc-left" @click="watchUp(videoData.up.mid)">
            <div class="desc-up-left">
              <img v-lazy="upData.baseInfo.logo.src + upData.baseInfo.logo.name" alt />
            </div>
            <div class="desc-up-right">
              <span>{{ upData.baseInfo.name }}</span>
              <span>{{ upData.baseInfo.fans_follows_likes.fans }}粉丝</span>
            </div>
          </div>
          <div class="desc-right" v-waves>
            <span>{{ type }}</span>
          </div>
        </div>
        <div class="desc-video">
          <div class="desc-title">
            <div class="desc-video-title" :class="{ 'show-all': isRotate }">{{ videoData.title }}</div>
            <img
              @click="toRotate()"
              :class="{ 'rotate': isRotate }"
              src="~assets/img/fans_follows/up_or_down_dark.svg"
              alt
            />
          </div>

          <div class="desc-video-sub">
            <span>
              <img src="~assets/img/recommend_list/play_dark.svg" alt />
              {{ videoData.plays }}
            </span>
            <span>
              <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
              {{ videoData.danmaku }}
            </span>
            <span>{{ videoData.video.info.time }}</span>
            <span>{{ videoData.bvid }}</span>
          </div>
        </div>
      </div>
      <LikePayCollect class="like-pay-collect" :dataList="videoData.video.people_feel" />
      <div class="desc-state" v-if="videoData.video.label">
        <span>{{ videoData.video.label }}</span>
      </div>
      <div class="recommend-list">
        <ul v-if="videoList.length > 0">
          <li v-for="(item, index) in videoList" :key="index" @click="goToAnotherVideoDetail(item.bvid)" v-waves>
            <div class="inner" v-if="item && item.bvid !== videoData.bvid">
              <div class="item-left">
              <img
                v-if="item.img"
                :src="item.img.src + item.img.name"
                :alt="item.img.alt"
              />
              <span
                class="time"
              >{{ item.video.long }}</span>
            </div>
            <div class="item-right">
              <div
                class="item-right-title"
              >{{ item.title }}</div>
              <div class="publish-time">
                <img src="~assets/img/video/UP_dark.svg" alt />
                {{ item.video.info.up }}
              </div>
              <div class="message">
                <span>
                  <img src="~assets/img/recommend_list/play_dark.svg" alt />
                  {{ item.plays }}
                </span>
                <span>
                  <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
                  {{ item.danmaku }}
                </span>
                <span>
                  <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                </span>
              </div>
            </div>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <div class="in-assess" v-if="isActive === 1">
      <div class="assess">
        <div class="assess-head">
          <span>热门评论</span>
          <span @click="selecType()">
            <img src="~assets/img/base/munu_white.svg" alt />
            {{ assessType }}
          </span>
        </div>

        <div class="assess-content">
          <div v-if="assessList.length > 0">
            <ul v-for="(items, indey) in assessList" :key="indey">
              <li
                v-for="(item, index) in items[assessSelectType]"
                :key="index"
                class="copy"
                :data-clipboard-text="JSON.stringify(item.content.message)"
                v-waves
              >
                <div class="assess-detail-head">
                  <div class="assess-detail-head-left" @click="goTo(item.mid)">
                    <div class="assess-detail-head-left-1">
                      <img v-lazy="item.member.avatar" alt />
                    </div>
                    <div class="assess-detail-head-left-2">
                      <div class="name-title">
                        <div class="name" @click="goTo(item.mid)">{{ item.member.uname }}</div>
                        <div v-if="Object.keys(item.member.level_info).length > 0">
                          <div
                            class="level"
                            :style="{ 'background-color': colorList[item.member.level_info.current_level] }"
                          >
                            LV
                            <span
                              :style="{ 'background-color': colorList[item.member.level_info.current_level] }"
                            >{{ item.member.level_info.current_level }}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        class="publish-time"
                      >{{ new Date(item.ctime * 1000).getMonth() + 1 + '-' + new Date(item.ctime * 1000).getDate() }}</div>
                    </div>
                  </div>
                  <div
                    class="assess-detail-head-right"
                  >{{ assessPeopleState.before }} {{ assessPeopleState.after }}</div>
                </div>
                <div class="assess-detail-content">
                  <div
                    class="assess-detail-content-1"
                    @click="reply(indey, index)"
                    v-html="mainContent(item.content.message)"
                  ></div>
                  <div class="assess-detail-content-2">
                    <div class="assess-detail-content-2-left">
                      <span v-for="(src, indey) in srcList" :key="indey">
                        <img :src="src.default" alt />
                        <!-- <img v-if="indey === 0 && item.like !== 0" :src="src.active" alt /> -->
                        <span v-if="indey === 0 && item.like > 0">{{ item.like }}</span>
                      </span>
                    </div>
                    <div class="assess-detail-content-2-right">
                      <span>
                        <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                      </span>
                    </div>
                  </div>
                  <div class="good" v-if="item.up_action.like">up主觉得很赞</div>
                  <div
                    class="assess-detail-content-3"
                    v-if="item.replies && item.replies.length > 0"
                  >
                    <ul>
                      <li
                        v-for="(i, indez) in notMoreThanTwo(item)"
                        :key="indez"
                        @click="reply2(indey, index, i.member.uname)"
                      >
                        <span v-if="indez <= 2">
                          <span>{{ message2(i.member.uname) }}</span>
                          <span
                            v-if="i.content.message.indexOf('@') !== -1"
                            style="color: var(--color-text)"
                          >回复</span>
                          <span>{{ message3(i.content.message) }}</span>
                        </span>
                        <span v-if="indez <= 2" v-html="message1(i.content.message)"></span>
                      </li>
                    </ul>
                    <div
                      class="short"
                      v-if="item.replies.length >= 3"
                      @click="showDetail(indey, index)"
                    >
                      <span
                        v-if="item.up_action.reply"
                        style="color: var(--color-text); margin-right: .05rem"
                      >up主等人</span>
                      共{{ item.replies.length }}条回复
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <ul v-if="assessList.length <= 0">
            <li v-for="(item, index) in videoData.assess.detail" :key="index" v-waves>
              <div class="assess-detail-head">
                <div class="assess-detail-head-left" @click="goTo(item.mid)">
                  <div class="assess-detail-head-left-1">
                    <img v-lazy="item.src + item.name" alt />
                  </div>
                  <div class="assess-detail-head-left-2">
                    <div class="name-title">
                      <div class="name" @click="goTo(item.mid)">{{ peopleName }}</div>
                      <div v-if="levelList.length > 0">
                        <div class="level" :style="{ 'background-color': levelList[index].color }">
                          LV
                          <span
                            :style="{ 'background-color': levelList[index].color }"
                          >{{ levelList[index].level }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="publish-time">{{ item.time }}</div>
                  </div>
                </div>
                <div
                  class="assess-detail-head-right"
                >{{ assessPeopleState.before }} {{ assessPeopleState.after }}</div>
              </div>
              <div class="assess-detail-content">
                <div
                  class="assess-detail-content-1"
                  @click="reply3(item)"
                  v-html="mainContent(item.content)"
                ></div>
                <div class="assess-detail-content-2">
                  <div class="assess-detail-content-2-left">
                    <span v-for="(src, indey) in srcList" :key="indey">
                      <img :src="src.default" alt />
                    </span>
                  </div>
                  <div class="assess-detail-content-2-right">
                    <span>
                      <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="assess-footer" v-if="!showBottomInput">
          <div class="footer" :class="{ 'on-active': ifFocus }">
            <div class="footer-1">
              <input @focus="isFocus()" type="text" v-model="viewpoints" placeholder="说点什么吧" />
              <div class="is-blur" v-if="!ifFocus">
                <img src="~assets/img/video/add_emoji.svg" alt />
              </div>
              <div class="is-focus" style="color: var(--color-tint);" v-if="ifFocus" @click="publish()">发布</div>
            </div>
            <div class="footer-2" v-if="ifFocus">
              <span>
                <input type="checkbox" />同步到动态
              </span>
              <span @click="showEmoji()">
                <img src="~assets/img/video/add_emoji.svg" alt />
              </span>
              <span>#</span>
              <span>
                <img src="~assets/img/video/search_dark.svg" alt />
              </span>
            </div>
          </div>
          <div class="emoji" v-if="isShowEmoji">
            <div class="emoji-main" :class="{ 'bigger': activeEmoji.active === 4 }">
              <td
                v-for="(item, index) in activeEmoji.list"
                :key="index"
                @click="selectEmoji(item.name)"
              >
                <img :src="item.url" alt v-if="activeEmoji.active !== 4" />
                <span v-if="activeEmoji.active === 4" v-html="item.name"></span>
              </td>
            </div>
            <div class="emoji-tabbar">
              <div class="tabbar-left">
                <span @click="show(0)" v-waves>
                  <img src="~assets/img/video/set_dark.svg" alt />
                </span>
                <span
                  @click="show(1)"
                  :class="{ 'emoji-active': activeEmoji.active === 1 }"
                  v-waves
                >
                  <img
                    src="https://i0.hdslb.com/bfs/emote/81edf17314cea3b48674312b4364df44d5c01f17.png@88w_88h.webp"
                    alt
                  />
                </span>
                <span
                  @click="show(2)"
                  :class="{ 'emoji-active': activeEmoji.active === 2 }"
                  v-waves
                >
                  <img
                    src="https://i0.hdslb.com/bfs/emote/bacd6e17997348873ef89e5f1bcbbda877a1606a.png@88w_88h.webp"
                    alt
                  />
                </span>
                <span
                  @click="show(3)"
                  :class="{ 'emoji-active': activeEmoji.active === 3 }"
                  v-waves
                >
                  <img
                    src="https://i0.hdslb.com/bfs/emote/f3517fc58c71236da5f0355b688ba302ae90c074.png@88w_88h.webp"
                    alt
                  />
                </span>
                <span
                  @click="show(4)"
                  :class="{ 'emoji-active': activeEmoji.active === 4 }"
                  v-waves
                >(〃'▽'〃)</span>
              </div>
              <div class="tabbar-right">
                <span @click="show(5)" v-waves>
                  <img src="~assets/img/video/clear_dark.svg" alt />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="popupVisible">
      <mt-popup
        class="pop"
        :style="{ 'width': '10rem', 'height': popHeight }"
        v-model="popupVisible"
        position="bottom"
        :modal="false"
      >
        <div class="pop-title">
          <span>视频详情</span>
          <span @click="closePop()">
            <img src="~assets/img/video/close_dark.svg" alt />
          </span>
        </div>
        <div class="discuss">
          <div class="discuss-theme">
            <ul>
              <li
                class="copy"
                :data-clipboard-text="JSON.stringify(assessDetail.content.message)"
                v-waves
              >
                <div class="assess-detail-head">
                  <div class="assess-detail-head-left" @click="goTo(assessDetail.mid)">
                    <div class="assess-detail-head-left-1">
                      <img v-lazy="assessDetail.member.avatar" alt />
                    </div>
                    <div class="assess-detail-head-left-2">
                      <div class="name-title">
                        <div
                          class="name"
                          @click="goTo(assessDetail.mid)"
                        >{{ assessDetail.member.uname }}</div>
                        <div v-if="Object.keys(assessDetail.member.level_info).length > 0">
                          <div
                            class="level"
                            :style="{ 'background-color': colorList[assessDetail.member.level_info.current_level] }"
                          >
                            LV
                            <span
                              :style="{ 'background-color': colorList[assessDetail.member.level_info.current_level] }"
                            >{{ assessDetail.member.level_info.current_level }}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        class="publish-time"
                      >{{ new Date(assessDetail.ctime * 1000).getMonth() + 1 + '-' + new Date(assessDetail.ctime * 1000).getDate() }}</div>
                    </div>
                  </div>
                  <div
                    class="assess-detail-head-right"
                  >{{ assessPeopleState.before }} {{ assessPeopleState.after }}</div>
                </div>
                <div class="assess-detail-content">
                  <div
                    class="assess-detail-content-1"
                    @click="reply2(assessDetailPosition.y, assessDetailPosition.x, assessDetail.member.uname)"
                    v-html="mainContent(assessDetail.content.message)"
                  ></div>
                  <div class="assess-detail-content-2">
                    <div class="assess-detail-content-2-left">
                      <span v-for="(src, indey) in srcList" :key="indey">
                        <img :src="src.default" alt />
                        <span v-if="indey === 0 && assessDetail.like > 0">{{ assessDetail.like }}</span>
                      </span>
                    </div>
                    <div class="assess-detail-content-2-right">
                      <span>
                        <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="discuss-sub">
            <ul>
              <li
                v-for="(item, index) in assessDetail.replies"
                :key="index"
                class="copy"
                :data-clipboard-text="JSON.stringify(item.content.message)"
                v-waves
              >
                <div class="assess-detail-head">
                  <div class="assess-detail-head-left" @click="goTo(item.mid)">
                    <div class="assess-detail-head-left-1">
                      <img v-lazy="item.member.avatar" alt />
                    </div>
                    <div class="assess-detail-head-left-2">
                      <div class="name-title">
                        <div class="name" @click="goTo(item.mid)">{{ item.member.uname }}</div>
                        <div v-if="Object.keys(item.member.level_info).length > 0">
                          <div
                            class="level"
                            :style="{ 'background-color': colorList[item.member.level_info.current_level] }"
                          >
                            LV
                            <span
                              :style="{ 'background-color': colorList[item.member.level_info.current_level] }"
                            >{{ item.member.level_info.current_level }}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        class="publish-time"
                      >{{ new Date(item.ctime * 1000).getMonth() + 1 + '-' + new Date(item.ctime * 1000).getDate() }}</div>
                    </div>
                  </div>
                  <div
                    class="assess-detail-head-right"
                  >{{ assessPeopleState.before }} {{ assessPeopleState.after }}</div>
                </div>
                <div class="assess-detail-content">
                  <div
                    v-if="item.content.message.indexOf('@') !== -1"
                    class="spec-detail-content"
                    @click="reply2(assessDetailPosition.y, assessDetailPosition.x, item.member.uname)"
                    :class="{ 'sepc-2': item.content.message.indexOf('@') !== -1 }"
                  >
                    <span v-if="item.content.message.indexOf('@') !== -1">
                      <span
                        v-if="item.content.message.indexOf('@') !== -1"
                        style="color: var(--color-text)"
                      >回复</span>
                      <span>{{ message3(item.content.message) }}</span>
                    </span>
                    <span v-html="message1(item.content.message)"></span>
                  </div>
                  <div
                    v-else-if="item.content.message.indexOf('@') === -1"
                    class="assess-detail-content-1"
                    @click="reply2(assessDetailPosition.y, assessDetailPosition.x, item.member.uname)"
                    v-html="mainContent(item.content.message)"
                  ></div>
                  <div class="assess-detail-content-2">
                    <div class="assess-detail-content-2-left">
                      <span v-for="(src, indey) in srcList" :key="indey">
                        <img :src="src.default" alt />
                        <span v-if="indey === 0 && item.like > 0">{{ item.like }}</span>
                      </span>
                    </div>
                    <div class="assess-detail-content-2-right">
                      <span>
                        <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="making-danmaku" v-if="showBottomInput">
      <input @focus="bottomFocus()" @blur="bottomBlur()" type="text" v-model="danmaku" placeholder="发个友善的弹幕见证当下">
      <img @click="sendDanmaku()" src="~assets/img/video/send_pink.svg" alt="">
    </div>
    <div @click="isBlur()" class="modal" v-if="sheetVisible"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { getHomeData } from "network/home.js";
import { getUpDetail } from "network/up.js";
import LikePayCollect from "components/common/like_pay_collect/LikePayCollect";
import { Toast } from "mint-ui";
import { assess, allDanmakuData } from "network/video.js";
import Clipboard from "clipboard";
import emoji from "common/emoji/emoji.json";
import { secondsFormat } from "common/number_time/numberTime.js";
import Cushion from "components/common/cushion/Cushion";

export default {
  name: "VideoDetail",
  data() {
    return {
      playerOptions: {
        controls: false,
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src:
              "http://:4000/bilibili_data/home/recommend_2/BV17z411b7AL/BV17z411b7AL.mp4" //url地址
          }
        ],
        // poster: "~assets/img/video/2233.gif", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      isActive: 0,
      disappear: false,
      videoData: {},
      upData: {},
      navbarImg: require('assets/img/video/open_danmaku.svg'),
      typeList: [{ name: "简介" }, { name: "评论", num: 0 }],
      type: "关注",
      isRotate: false,
      videoList: [],
      isMakingDanmaku: '点我发弹幕',
      danmaku: "",
      assessType: "按时间",
      assessPeopleState: {
        before: "+",
        after: "关注"
      },
      peopleName: "名字忘记爬了~",
      srcList: [
        {
          default: require("assets/img/user/space/likes_dark.svg"),
          active: require("assets/img/user/space/likes_pink.svg")
        },
        {
          default: require("assets/img/video/dislike_empty_dark.svg"),
          active: require("assets/img/video/dislike_empty_pink.svg")
        },
        { default: require("assets/img/user/set/share_dark.svg") },
        { default: require("assets/img/user/space/discuss_dark.svg") }
      ],
      levelList: [],
      colorList: [
        "#e6e6e6",
        "#e6e6e6",
        "#95DDB2",
        "#92D1E5",
        "#FFB37C",
        "#FF7A18",
        "#FF0000"
      ],
      assessList: [],
      assessPage: 1,
      position: {
        nowY: 0,
        lastY: 0
      },
      func: null,
      timer: null,
      count: 0,
      emo: Object.values(emoji),
      assessSelectType: "replies",
      ifFocus: false,
      sheetVisible: false,
      isShowEmoji: false,
      activeEmoji: {
        active: 1,
        list: Object.values(emoji)[0]
      },
      viewpoints: "",
      clipboard: null,
      isReply: {
        state: false,
        y: 0,
        x: 0
      },
      isReply2: {
        state: false,
        y: 0,
        x: 0,
        name: ""
      },
      videoDetail: null,
      popupVisible: false,
      assessDetail: null,
      popHeight: 0,
      assessDetailPosition: {
        y: 0,
        x: 0
      },
      isOk: false,
      videoState: {
        play: require("assets/img/video/play.svg"),
        pause: require("assets/img/video/pause.svg"),
        active: require("assets/img/video/play.svg")
      },
      timestap: {
        max: 0,
        formattedTime_: "",
        now: 0,
        nowFormat: "00:00"
      },
      video: null,
      lock: false,
      isCushioning: false,
      isTimeToShow: 0,
      videoBarDisappear: false,
      disappearFunc: null,
      lastTap: 0,
      isFullScreen: false,
      Self: null,
      posterHeight: 0,
      volumeAndlight: {
        lastY: 0,
        volume: false,
        light: false,
        active: require('assets/img/video/light_white.svg'),
        lightNum: .9,
        volumeNum: .5,
        state: false
      },
      sliding: false,
      videoListPage: 0,
      showBottomInput: false,
      closeTheDanmaku: false,
      func2: null,
      danmakuData: [],
      currentTime: 0,
      lastTime: 0,
      allDanmaku: [],
      showDanmakuList: [],
      danmakuItemHeight: 0
    };
  },
  async created() {
    this.bus();
    this.func2 = this.$debounce(this.getRecommendLst, 1000, true)
    this.func = this.$debounce(this.requireAssessData, 1000, true);
    this.disappearFunc = this.$debounce(this.videoVarDisappear, 5000);
    await getHomeData({ skip: 0 }).then(res => {
      this.videoData = res[1];
      this.typeList[1].num = res[1].assess.detail.length;
    });
    await getUpDetail(this.videoData.up.mid).then(res => {
      this.upData = res;
    });
    await getHomeData({ skip: this.videoListPage }).then(res => {
        this.videoList.push(...res)
      }).catch(err => {
        console.log(err)
      })
    // await this.requireAssessData(this.assessPage);
    this.playerOptions.sources[0].src =
      this.videoData.video.src + this.videoData.video.name;
    for (let i = 0; i <= 4; i++) {
      let level = Math.round(Math.random() * 6);
      let color = this.colorList[level];
      let obj = {
        level,
        color
      };
      this.levelList.push(obj);
    }

    // await assess(this.videoData.bvid, this.assessPage)
    //     .then(res => {
    //       if (res && res.page && Object.keys(res.page).length > 0) {
    //         this.assessList.push(res);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    if (this.assessList.length > 0) {
      if (this.assessList[0].page.acount > 10000) {
        this.typeList[1].num =
          (this.assessList[0].page.acount / 10000).toFixed(1) + "万";
      } else {
        this.typeList[1].num = this.assessList[0].page.acount;
      }
    }
    await allDanmakuData(this.videoData.bvid).then(res => {
      console.log(res[0]);
      this.danmakuData = res.sort((a, b) => {
        return a.time - b.time
      })
    })
  },
  mounted() {
    this.clipboard = new Clipboard(".copy");
    this.Self = plus.webview.currentWebview()
  },
  components: {
    LikePayCollect,
    Cushion
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toActive(i) {
      if (i === this.isActive) {
        return false;
      }
      this.isActive = i;
    },
    toRotate() {
      this.isRotate = !this.isRotate;
    },
    alert() {
      Toast({
        message: "不要再点啦~忘了爬链接，嘤嘤嘤",
        duration: 3000,
        position: "middle"
      });
    },
    goTo(mid) {
      this.$store.commit("getUuid", mid);
      this.$router.replace({ path: "/personal-space" });
    },
    async getRecommendLst () {
      this.videoListPage += 1
      await getHomeData({ skip: this.videoListPage }).then(res => {
        this.videoList.push(...res)
      }).catch(err => {
        console.log(err)
      })
    },
    goToAnotherVideoDetail(bvid) {
      this.$router.push('/video-detail/' + bvid)
    },
    async requireAssessData() {
      this.assessPage += 1
      await assess(this.videoData.bvid, this.assessPage)
        .then(res => {
          if (res && res.page && Object.keys(res.page).length > 0) {
            this.assessList.push(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    scroll(e) {
      if (this.lock) e.preventDefault();
      if (
        e.srcElement.scrollTop >=
          e.srcElement.scrollHeight - window.innerHeight - 300
      ) {
        if (this.isActive === 1) {
        this.func();
        } else {
        this.func2()
        }

      }
    },
    message1(msg) {
      let content = "";
      let reg = /\[.*?\]/gi;
      if (msg.indexOf("回复") !== -1) {
        content = msg.split(":")[1];
      } else {
        content = msg;
      }
      if (content.match(reg)) {
        let data = content.match(reg);
        for (let t = 0; t < data.length; t++) {
          let e = data[t];
          let arr = content.split(e);
          let front = arr[0];
          let back = arr[1];
          let img = "";
          let j = 0;
          if (e.indexOf("热词系列_") !== -1) {
            j = 1;
          } else if (e.indexOf("tv_") !== -1) {
            j = 2;
          } else {
            j = 0;
          }

          for (let i = 0; i < this.emo[j].length; i++) {
            if (e == this.emo[j][i].name) {
              img = `<img src="${this.emo[j][i].url}" style="width: .7rem; height: .7rem; display: inline; margin-bottom: -.2rem; margin-left: .1rem" />`;

              if (front && back) {
                content = front + img + back;
              } else if (!front) {
                content = img + back;
              } else if (!back) {
                content = front + img;
              } else if (!back && !front) {
                content = `<img src="${this.emo[j][i].url}" style="width: 1rem; height: 1rem; display: inline" />`;
              }
              break;
            }
          }
        }
      }
      return content;
    },
    message2(name) {
      return name;
    },
    message3(msg) {
      let reg = /@.*?:/g;
      if (msg.indexOf("@") !== -1) {
        return reg.exec(msg)[0];
      } else {
        return ":";
      }
    },
    mainContent(content) {
      let reg = /\[.*?\]/gi;
      if (content.match(reg)) {
        let data = content.match(reg);
        for (let t = 0; t < data.length; t++) {
          let e = data[t];
          let arr = content.split(e);
          let img = "";
          let j = 0;
          if (e.indexOf("热词系列_") !== -1) {
            j = 1;
          } else if (e.indexOf("tv_") !== -1) {
            j = 2;
          } else {
            j = 0;
          }
          for (let i = 0; i < this.emo[j].length; i++) {
            if (e == this.emo[j][i].name) {
              img = `<img src="${this.emo[j][i].url}" style="width: .7rem; height: .7rem; display: inline; margin-bottom: -.2rem; margin-left: .1rem; margin-right: .1rem;" />`;
              for (let j = 0; j < arr.length - 1; j++) {
                arr[j] += img;
              }
              content = arr.join("");
              break;
            }
          }
        }
      }
      return content;
    },
    copy() {
      clearInterval(this.timer);
      this.count = 0;
      this.timer = null;
      this.timer = setInterval(() => {
        this.count += 1;
        if (this.count >= 2) {
          this.clipboard.on("success", () => {
            Toast({
              message: "已复制至剪切板",
              position: "middle",
              duration: 3000
            });
            this.clipboard.destroy();
          });
          this.clipboard.on("error", () => {
            Toast({
              message: "复制失败",
              position: "middle",
              duration: 3000
            });
            this.clipboard.destroy();
          });
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    touchEnd() {
      if (this.count >= 2) {
        clearInterval(this.timer);
        this.timer = null;
        this.count = 0;
      }
    },
    selecType() {
      this.assessSelectType =
        this.assessSelectType === "replies" ? "hots" : "replies";
      this.assessType = this.assessType === "按热度" ? "按时间" : "按热度";
    },
    isFocus() {
      this.lock = true
      this.ifFocus = true;
      this.sheetVisible = true;
      this.isShowEmoji = false;
    },
    watchUp (mid) {
      this.$router.push("/user-space/" + mid)
    },
    isBlur() {
      this.ifFocus = false;
      this.sheetVisible = false;
    },
    showEmoji() {
      this.isShowEmoji = !this.isShowEmoji;
    },
    show(i) {
      switch (i) {
        case 0:
          break;
        case 1:
          this.activeEmoji.active = 1;
          this.activeEmoji.list = this.emo[0];
          break;
        case 2:
          this.activeEmoji.active = 2;
          this.activeEmoji.list = this.emo[1];
          break;
        case 3:
          this.activeEmoji.active = 3;
          this.activeEmoji.list = this.emo[2];
          break;
        case 4:
          this.activeEmoji.active = 4;
          this.activeEmoji.list = this.emo[3];
          break;
        case 5:
          break;
      }
    },
    selectEmoji(name) {
      this.viewpoints += name;
    },
    publish() {
      if (this.viewpoints.indexOf("<script>") !== -1) {
        Toast({
          message: "拒绝接受脚本！你已被拉入黑名单~~",
          duration: 3000,
          position: "middle"
        });
        return false;
      }
      if (this.assessList.length > 0) {
        let data = {
          mid: this.$store.state.userInfo.identy.uuid,
          ctime: new Date().getTime() / 1000,
          like: 0,
          member: {
            mid: this.$store.state.userInfo.identy.uuid,
            uname: this.$store.state.userInfo.baseInfo.name,
            avatar:
              this.$store.state.userInfo.baseInfo.logo.src +
              this.$store.state.userInfo.baseInfo.logo.name,
            level_info: {
              current_level: this.$store.state.userInfo.baseInfo.level
            }
          },
          content: {
            message: this.viewpoints
          },
          replies: null,
          up_action: {
            like: false,
            reply: false
          }
        };
        if (!this.isReply.state && !this.isReply2.state) {
          if (this.popupVisible) {
            this.assessDetail.replies.push(data);
          } else {
            this.assessList[0].replies.unshift(data);
            this.assessList[0].hots.unshift(data);
          }
        } else if (this.isReply.state && !this.isReply2.state) {
          if (
            !this.assessList[this.isReply.y][this.assessSelectType][
              this.isReply.x
            ].replies
          ) {
            this.assessList[this.isReply.y][this.assessSelectType][
              this.isReply.x
            ].replies = [];
          }
          this.assessList[this.isReply.y][this.assessSelectType][
            this.isReply.x
          ].replies.push(data);
        } else if (!this.isReply.state && this.isReply2.state) {
          data.content.message = this.isReply2.name + this.viewpoints;
          this.assessList[this.isReply2.y][this.assessSelectType][
            this.isReply2.x
          ].replies.push(data);
        }
        this.isReply = {
          state: false,
          y: 0,
          x: 0
        };
        this.isReply2 = {
          state: false,
          y: 0,
          x: 0,
          name: ""
        };
      } else {
        let data = {
          name: this.$store.state.userInfo.baseInfo.logo.name,
          mid: this.$store.state.userInfo.identy.uuid,
          logo: this.$store.state.userInfo.baseInfo.logo.originSrc,
          time: `${new Date().getMonth() + 1}-${new Date().getDay()}`,
          content: this.viewpoints,
          src: this.$store.state.userInfo.baseInfo.logo.src
        };
        let level = Math.round(Math.random() * 6);
        let color = this.colorList[level];
        let obj = {
          level,
          color
        };
        this.levelList.unshift(obj);
        this.videoData.assess.detail.unshift(data);
      }
      this.sheetVisible = false;
      this.isShowEmoji = false;
      this.ifFocus = false;
      this.viewpoints = "";
      Toast({
        message: "评论成功",
        duration: 3000,
        position: "middle"
      });
    },
    reply(y, x) {
      this.isReply = {
        state: true,
        y,
        x
      };
      this.isReply2.state = false;
      this.isFocus();
    },
    reply2(y, x, name) {
      this.isReply.state = false;
      this.isReply2 = {
        state: true,
        y,
        x,
        name: `回复 @${name} :`
      };
      this.isFocus();
    },
    showDetail(y, x) {
      this.lock = true
      this.assessDetailPosition = {
        y,
        x
      };
      this.assessDetail = this.assessList[y][this.assessSelectType][x];
      this.popupVisible = true;
    },
    closeDanmaku() {
      this.closeTheDanmaku = !this.closeTheDanmaku
    },
    test(e) {
      this.video = e;
      this.timestap.max = e.controlBar.durationDisplay.duration_;
      this.timestap.formattedTime_ =
        e.controlBar.durationDisplay.formattedTime_;
      this.videoDetail = e.el_;
      this.isOk = true;
      this.video.playbackRate(1);
    },
    onPlayerPlay() {},
    onPlayerPause() {},
    onPlayerWaiting() {
      this.isCushioning = true;
    },
    onPlayerPlaying() {
      this.isCushioning = false;
    },
    onPlayerTimeupdate() {
      if (Math.floor(this.video.currentTime()) === this.timestap.now) {
        return false;
      } else {
        this.currentTime = this.video.currentTime()
        this.timestap.now = Math.floor(this.video.currentTime());
        this.timestap.nowFormat = secondsFormat(this.timestap.now);
      }
    },
    onPlayerCanplay() {
      // console.log(w);
    },
    onPlayerCanplaythrough() {
      // console.log(e);
    },
    playerStateChanged() {
      // console.log(e);
    },
    playerReadied() {
      // console.log(e);
    },
    onPlayerEnded () {

    },
    playPause() {
      if (this.videoState.active === this.videoState.play) {
        this.videoState.active = this.videoState.pause;
        this.video.play();
      } else {
        this.videoState.active = this.videoState.play;
        this.video.pause();
      }
    },
    processChange(e) {
      let max = this.timestap.max;
      let one = window.innerWidth / 10;
      let result = ((e.x - one) / (one * 5.5)) * max;
      if (result > max) {
        return false;
      }
      this.video.currentTime(result);
      this.timestap.now = Math.floor(result);
      this.timestap.nowFormat = secondsFormat(this.timestap.now);
    },
    slide(e) {
      this.sliding = true
      let max = this.timestap.max;
      let one = window.innerWidth / 10;
      if (e.touches[0].pageX < one) {
        return false
      }
      let result = ((e.touches[0].pageX - one) / (one * 5.5)) * max;
      if (result > max) {
        return false;
      }
      this.video.currentTime(result);
      this.timestap.now = Math.floor(result);
      this.timestap.nowFormat = secondsFormat(this.timestap.now);
    },
    finishSlide() {
      this.sliding = false
    },
    closePop() {
      this.lock = false
      this.popupVisible = false;
    },
    touchMove(e) {
      let time = Date.now();
      if (e.touches[0].pageY < this.videoDetail.offsetHeight) {
        this.lock = true;
      } else {
        this.lock = false;
      }
      if (this.lastTap !== 0 && this.lastTap >= time - 300 && this.lock) {
        this.lastTap = 0;
        this.videoBarDisappear = true;
        this.playPause();
      } else {
        this.lastTap = time;
      }
    },
    videoInlineShow() {
      if (this.lock) {
        this.videoBarDisappear = !this.videoBarDisappear;
        this.disappearFunc();
      }
    },
    fullScreen() {
      this.video.requestFullscreen(this.playerOptions);

      this.Self.setStyle({
        videoFullscreen: "landscape"
      });
    },
    videoVarDisappear() {
      this.videoBarDisappear = true;
    },
    changeVolumeAndLight(e) {
      if (this.sliding) {
        return false
      }
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let dev = 1 / 20
        if (this.volumeAndlight.lastY !== 0) {
          if (x >= window.innerWidth / 2) {
          this.volumeAndlight.light = false
          this.volumeAndlight.volume = true
          if (this.volumeAndlight.lastY - y > 0) {
            if (this.volumeAndlight.active !== require('assets/img/video/open_sound_white.svg')) {
              this.volumeAndlight.active = require('assets/img/video/open_sound_white.svg')
            }
            if (this.video.volume() >= 1) {
              this.video.volume(1)
            } else {
              let volume = this.video.volume()
              this.video.volume(volume + dev);
            }
            
          } else if (this.volumeAndlight.lastY - y < 0) {
            if (this.volumeAndlight.active !== require('assets/img/video/open_sound_white.svg')) {
              this.volumeAndlight.active = require('assets/img/video/open_sound_white.svg')
            }
            if (this.video.volume() <= 0) {
              this.video.volume(0)
              if (this.volumeAndlight.active !== require('assets/img/video/close_sound_white.svg')) {
                this.volumeAndlight.active = require('assets/img/video/close_sound_white.svg')
              }
            } else {
              let volume = this.video.volume()
              this.video.volume(volume - dev);
            }
          }

          this.volumeAndlight.volumeNum = this.video.volume()
        } else {
          
          this.volumeAndlight.volume = false
          this.volumeAndlight.light = true
          if (this.volumeAndlight.active !== require('assets/img/video/light_white.svg')) {
              this.volumeAndlight.active = require('assets/img/video/light_white.svg')
          }
          if (this.volumeAndlight.lastY - y > 0) {
            if (this.volumeAndlight.lightNum >= 1) {
              this.volumeAndlight.lightNum = 1
            } else {
              this.volumeAndlight.lightNum += dev
            }
            
          } else if (this.volumeAndlight.lastY - y < 0) {
            if (this.volumeAndlight.lightNum <= 0) {
              this.volumeAndlight.lightNum = 0
            } else {
            
              this.volumeAndlight.lightNum -= dev
            }
            
          }
        }
        }
      this.volumeAndlight.lastY = y
    },
    closeVolumeAndLight () {
      this.volumeAndlight.lastY = 0
      this.volumeAndlight.volume = false
      this.volumeAndlight.light = false
    },
    makingDanmaku() {
      this.isMakingDanmaku = this.isMakingDanmaku === '点我发弹幕' ? '弹幕输入中' : '点我发弹幕'
      this.showBottomInput = !this.showBottomInput
    },
    bottomFocus() {
      this.sheetVisible = true
    },
    bottomBlur() {
      this.sheetVisible = false
    },
    bus() {},
    sendDanmaku() {
      if (Object.keys(this.$store.state.userInfo).length <= 0) {
        Toast({
          message: '请先登录！',
          duration: 3000,
          positoon: 'middle'
        })
        return false
      }
      if (this.danmaku === '') {
        Toast({
          message: '弹幕为空~~',
          duration: 3000,
          positoon: 'middle'
        })
        return false
      } else {
        this.showDanmakuList.push({
          "date": new Date().getDay(),
          "time": new Date().getTime() / 1000,
          "text": this.danmaku,
          "mode": "滚动",
          "fonsize": 25,
          "color": 16777215,
          "userID": this.$store.state.userInfo.identy.uuid,
        })
        this.danmaku = ''
        this.showBottomInput = false
        this.sheetVisible = false
        Toast({
          message: '发送成功！',
          duration: 3000,
          positoon: 'middle'
        })
      }
    }
  },
  computed: {
    notMoreThanTwo() {
      return item => {
        return item.replies.filter((n, i) => {
          return i <= 2;
        });
      };
    },
    posterheight() {
      let height = '5.65rem';
      if (this.videoDetail) {
        height = this.videoDetail.offsetHeight
      }
      return { 'height': height }
    },
    danmakuheight() {
      let height = '4.65rem';
      if (this.videoDetail) {
        height = this.videoDetail.offsetHeight - (window.innerWidth / 10)
      }
      return { 'height': height }
    
    },
    light() {
      let num = this.volumeAndlight.lightNum
      // if (num <= 0) {
      //   return { 'filter': 'brightness(${50%)' }
      // } else if (num >= 1) {
      //   return { 'filter': 'brightness($115%)' }
      // } else {
      //   return { 'filter': `brightness(${50 + 50 * num}%)` }
      // }
      return { 'filter': `brightness(${50 + 65 * num}%)` }
    },
    speed() {
      let speed = 0
      return (l) => {
      if (l < 5) {
        speed = 20 / l
      } else if (l < 10 && l >= 5) {
        speed = 40 / l
      } else if (l >= 20) {
        speed = 60 / l
      }
        return speed + 's'
      }

      
    }
  },
  watch: {
    videoDetail(newVal) {
      if (newVal) {
        this.popHeight = `calc(100vh - ${newVal.offsetHeight}px)`;
        this.posterHeight = newVal.offsetHeight
        this.danmakuItemHeight = newVal.offsetHeight - (window.innerWidth / 10)
      }
    },
    closeTheDanmaku (newVal) {
      if (newVal) {
        this.showBottomInput = false
        this.isMakingDanmaku = ''
        this.navbarImg = require('assets/img/video/close_danmaku.svg')
      } else {
        
        this.navbarImg = require('assets/img/video/open_danmaku.svg')
        let timer = setTimeout(() => {
        this.isMakingDanmaku = '点我发弹幕'
        clearTimeout(timer)
        timer = null
      }, 300)
      }
    },
    currentTime (newVal) {
      this.lastTime = newVal
      for (let i = 0; i < this.danmakuData.length; i++) {
        
        let front = newVal - 2

        if (front <= this.danmakuData[i].time && this.danmakuData[i].time <= newVal) {
          let item = this.danmakuData.splice(i, 1)[0]
          item['position'] = Math.random() * (this.danmakuItemHeight / 1.5) + 'px'
          this.showDanmakuList.push(item);
        } else if (this.danmakuData[i].time > newVal) {
          break;
        }
      }
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#video-detail {
  width: 10rem;
  height: 100vh;
  overflow: hidden;
  background-color: var(--base-set-bg-color) !important;
  font-size: 0.4rem;
  overflow-y: scroll;
  position: relative;
  input::-webkit-input-placeholder {
    color: rgb(153, 153, 153);
    font-size: .35rem;
  }
  .head {
    position: sticky;
    top: 0;
    z-index: 999;
    .bg {
      position: relative;
      .video-outer {
        position: relative;
        .danmaku-outer {
          position: absolute;
          width: 10rem;
          height: 4.65rem;
          
          overflow: hidden;
          background-color: transparent;
          top: 0.5rem;
          left: 0;
          z-index: 1005;
          .danmaku-item {
            position: absolute;
            left: 0rem;
            width: 10rem;
            text-align: center;
                      .sub-line {
            border: none;
            border-bottom: .02rem solid  rgb(71, 233, 22);
            
            
          }   
          }

          .mode-scroll-right {
            transform: translateX(10rem);
            animation: slideright linear forwards;
          }
          .mode-scroll-left {
            transform: translateX(-10rem);
            animation: slideleft linear forwards;
          }
          .mode-fixed-top, .mode-fixed-bottom {
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            display: block;
            position: relative;
            animation: danmakudisappear 3s linear forwards !important;
          }
          .mode-fixed-top {
            top: 0 !important;
          }
          .mode-fixed-bottom {
            bottom: 0 !important;
            
          }
          @keyframes slideright {
            0% {
              transform: translateX(10rem);
            }
            100% {
              transform: translateX(-10rem);
              position: absolute;
              display: none;
              z-index: -999;
              visibility: hidden;
            }
          }
          @keyframes slideleft {
            0% {
              transform: translateX(-10rem);
            }
            100% {
              transform: translateX(10rem);
              z-index: -999;
              display: none;
              position: absolute;
              visibility: hidden;
            }
          }
          @keyframes danmakudisappear {
            0% {
            }
            100% {
              z-index: -999;
              position: absolute;
              display: none;
              visibility: hidden;
            }
            
          }
        }
        .oy {
          transition: .3s;
          opacity: 0;
        }
        .poster {
          width: 10rem;
          height: 5.65rem;
          top: 0;
          z-index: 1000;
          position: absolute;
          background-image: url("~assets/img/video/2233.gif");
          background-repeat: no-repeat;
          background-size: 5.5rem;
          background-position: center center;
          background-color: rgb(20, 20, 20);
        }
        /deep/ .video-player-box {
          div {
            .vjs-loading-spinner {
              display: none;
            }
            .vjs-big-play-button {
              display: none !important;
            }

            .vjs-poster {
              display: none;
            }
            .vjs-control-bar {
              background-color: #000;
              .vjs-button {
                outline: none;
              }
              .vjs-playback-rate {
                display: none;
              }
              .vjs-fullscreen-control {
              }
              .vjs-volume-panel {
                display: none;
              }
            }
            .vjs-modal-dialog-content {
              display: none;
            }
            .vjs-big-play-button {
              display: none;
            }
            .vjs-error-display {
              &::before {
                position: absolute;
                font-size: 0.4rem;
                top: 2.7rem;
                left: -1rem;
                content: "貌似出了什么问题o(╥﹏╥)o";
                // display: none;
                color: var(--color-text);
              }
              background-image: url("~assets/img/video/err-1.png");
              background-size: 4rem;
              background-repeat: no-repeat;
              background-position: right bottom;
            }
          }
        }

        .video-bar {
          position: absolute;
          transition: 0.5s;
          width: 10rem;
          z-index: 1006;
          display: flex;
          align-self: center;
          justify-content: space-between;
          bottom: 0rem;
                  background-image: linear-gradient(360deg, rgba(0, 0, 0, .3) 0%, transparent 100%);
          .play-pause,
          .process,
          .timestap,
          .full-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1rem;
            height: 1rem;
            img {
              width: 0.6rem;
              height: 0.6rem;
            }
          }
          .process {
            flex: auto;
            position: relative;
            img {
              position: absolute;
              left: 0rem;
              z-index: 1001;
            }
            span {
              position: absolute;
            }

            .max,
            .now {
              height: 0.05rem;
              border-radius: 0.2rem;
              background-color: #fff;
            }
            .max {
              opacity: 0.6;
              width: 5.5rem;
            }
            .now {
              z-index: 1000;
              opacity: 0.9;
              left: 0;
              background-color: var(--color-tint);
            }
          }
          .timestap {
            color: #fff;
            font-size: 0.3rem;
            width: 2rem;
            text-align: center;
          }
          .full-screen {
            img {
              width: 0.4rem;
              height: 0.4rem;
            }
          }
        }
        .video-bar-disappear {
          transition: 0.5s;
          opacity: 0;
        }
        .sound-light {
          transition: .3s;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 1rem;
          width: 4rem;
          height: 1.1rem;
          background-color: rgba(0, 0, 0, 0.35);
          border-radius: .1rem;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 .4rem;
          img {
            width: .6rem;
            height: .6rem;
          }
          .smaller {
            width: .55rem;
            height: .55rem;
          }
          .line {
            position: relative;
            width: 2rem;
            span {
            height: .05rem;
            position: absolute;
            &:first-child {
              z-index: 1001;
              background-color: var(--color-tint);
            }
            &:last-child {
              width: 2rem;
              z-index: 1000;
              background-color: rgba(255, 255, 255, .3);
            }
          }
          }

        }
        .cushion {
          position: absolute;
          z-index: 1001;
          top: 1.5rem;
          left: 0;
          right: 0;
          margin: auto;
        }
        .bottom-now {
          position: absolute;
                      z-index: 1000;
                      transition: .3s;
              opacity: 0.9;
              left: 0;
              bottom: 0rem;
              height: .05rem;
              border-radius: .2rem;
              background-color: var(--color-tint);
        }
                .video-bar-disappear {
          transition: 0.5s;
          opacity: 0;
        }
      }

      .bg-head {
        transition: 0.5s;
        position: absolute;
        top: 0rem;
        z-index: 1006;
        width: 10rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-image: linear-gradient(rgba(0, 0, 0, .3) 0%, transparent 100%);
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
            transition: 0.3s;
            img {
              width: 0.5rem;
              height: 0.5rem;
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
          justify-content: flex-end;
          span {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            transition: 0.3s;
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
            &:first-child {
              img {
                width: 0.6rem;
                height: 0.6rem;
              }
            }

            &:last-child {
              img {
                width: 0.7rem;
                height: 0.7rem;
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
      .bg-head-disappear {
        transition: 0.5s;
        opacity: 0;
      }
      .bg-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
        background-color: rgb(40, 40, 40);
        box-shadow: 0rem 0.01rem 0.5rem rgb(20, 20, 20);
        height: 1rem;
        z-index: 3003;
        .navbar {
          font-size: 0.35rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .navbar-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 5rem;
            .type {
              text-align: center;
              width: 2.5rem;
              height: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                
                position: relative;
                text-align: center;
                display: flex;
                align-items: center;
                height: 1rem;
              }
            }
            .active {
              display: flex;
              align-items: center;
              color: var(--color-tint);
            }
          }
          .navbar-active-footer {
            transition: 0.3s;
            position: relative;
            top: -0.05rem;
            width: 1rem;
            height: 0.05rem;
            background-color: var(--color-tint);
            border-radius: 0.2rem;
          }
        }
        .close-danmaku {
          position: relative;
          transition: .4s;
          height: 0.8rem;
          background-color: rgb(20, 20, 20);
          display: flex;
          align-items: center;
          border-radius: .4rem;
          border: .01rem solid rgba(100, 100, 100, 0.2);
          .here-danmaku {
            transition: .4s;
            width: 2.4rem;
            font-size: .32rem;
            text-align: center;
          }
          .enter-bar-disappear {
            transition: .4s;
            width: 0;
          }
          // input {
          //   padding-left: 0.2rem;
          //   width: 2.4rem;
          //   background-color: transparent;
          //   border: none;
          //   outline: none;
          //   font-size: 0.4rem;
          // }
          span {
            width: 1rem;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .6s;
            // background-image: url('~assets/img/video/close_danmaku.svg');
            background-size: 0.7rem 0.7rem;
            background-position: center center;
            background-repeat: no-repeat;
            border-radius: 0 3rem 3rem 0;
            background-color: rgba(48, 47, 47, 0.5);
            img {
              width: 0.7rem;
              height: 0.7rem;
            }
          }
          .change-bg-color {
            transition: .4s;
            background-color: transparent;
          }
        }
        // .close-danmaku-active {

        // }
      }
    }
  }
  .desc {
    padding: 0.5rem 0.3rem 0 0.3rem;
    .desc-up {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.4rem;
      .desc-left {
        display: flex;
        align-items: center;
        .desc-up-left {
          width: 1rem;
          height: 1rem;
          border-radius: 100%;
          background-size: 1rem 1rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
          margin-right: 0.3rem;
          img {
            border-radius: 100%;
            width: 1rem;
            height: 1rem;
          }
        }
        .desc-up-right {
          display: flex;
          flex-direction: column;
          display: flex;
          span {
            &:last-child {
              font-size: 0.25rem;
              opacity: 0.6;
              margin-top: 0.15rem;
            }
          }
        }
      }
      .desc-right {
        width: 1.8rem;
        height: 0.7rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.4rem;
        color: #fff;
        border-radius: 0.1rem;
        background-color: var(--color-tint);
        span {
            &::before {
              content: '+';
            font-size: 0.5rem;
            margin-right: 0.2rem;
            }
          
        }
      }
    }
    .desc-video {
      display: flex;
      flex-direction: column;
      .desc-title {
        display: flex;
        justify-content: space-between;
        .desc-video-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 9rem;
          opacity: 0.9;
          transition: 0.3s;
        }
        .show-all {
          transition: 0.3s;
          white-space: initial;
          overflow: initial;
          text-overflow: initial;
          height: 1.2rem;
        }
        img {
          transition: 0.3s;
          width: 0.4rem;
          height: 0.4rem;
          opacity: 0.6;
        }
        .rotate {
          transition: 0.3s;
          transform: rotateZ(180deg);
        }
      }
      .desc-video-sub {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        margin-top: 0.3rem;
        span {
          display: flex;
          align-items: center;
          margin-right: 0.3rem;
          opacity: 0.6;
          img {
            width: 0.4rem;
            height: 0.4rem;
            padding-bottom: 0.05rem;
          }
        }
      }
    }
  }
  .like-pay-collect {
    padding: 0.1rem 0;
    border-bottom: 0.02rem solid rgba(50, 50, 50, 0.6);
  }
  .desc-state {
    padding: 0 0.3rem;
    color: var(--color-tint);
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      height: 0.7rem;
      width: 1.6rem;
      font-size: .35rem;
      background-color: rgb(20, 20, 20);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      &::before {
        content: "";
        position: relative;
        background-image: url("~assets/img/video/hot.svg");
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        background-position: center center;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
  .recommend-list {
    padding-top: 0;
    transition: 0.3s;
    ul {
      display: flex;
      flex-direction: column;
      li {
              display: flex;
      flex-direction: column;
        .inner {
                          padding: 0.3rem;
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
            bottom: 0.05rem;
            right: 0.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(50, 50, 50, 0.6);
          }
        }
        .item-right {
          position: relative;
          height: 2rem;
          flex: auto;
          display: flex;
          padding-left: 0.3rem;
          flex-direction: column;
          justify-content: space-between;
          .item-right-title {
            width: 6rem;
            height: 1.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .publish-time {
            font-size: 0.3rem;
            display: flex;
            align-items: center;
            opacity: 0.7;
            img {
              opacity: 0.6;
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.03rem;
              padding-bottom: 0.05rem;
            }
          }
          .message {
            display: flex;
            align-items: center;
            span {
              position: relative;
              font-size: 0.28rem;
              width: 2rem;
              opacity: 0.7;
              display: flex;
              align-items: center;
              // margin-top: 0.1rem;
              justify-content: flex-start;
              img {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.1rem;
                padding-bottom: 0.05rem;
              }
              &:last-child {
                justify-content: flex-end;
                img {
                  width: 0.6rem;
                  height: 0.6rem;
                  margin-right: 0;
                  padding-bottom: 0;
                }
              }
            }
          }
        }
        }
      }
    }
  }
  .in-assess {
    border-top: 0.3rem;
    position: relative;
    .assess {
      display: flex;
      flex-direction: column;
      .assess-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.3rem 0 0.3rem;
        span {
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          &:last-child {
            opacity: 0.6;
          }
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.1rem;
          }
        }
      }
      .assess-content {
        ul {
          li {
            padding: 0.3rem;
            list-style: none;
            border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
            .assess-detail-head {
              display: flex;
              justify-content: space-between;
              margin-bottom: 0.3rem;
              .assess-detail-head-left {
                display: flex;
                align-items: center;
                justify-content: space-around;
                .assess-detail-head-left-1 {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 1rem;
                  height: 1rem;
                  background-size: 1rem 1rem;
                  background-position: center center;
                  background-repeat: no-repeat;
                  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                  margin-right: 0.4rem;
                  img {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 100%;
                  }
                }
                .assess-detail-head-left-2 {
                  display: flex;
                  flex-direction: column;
                  .name-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .name {
                      opacity: 0.9;
                      margin-right: 0.2rem;
                    }
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
                  }
                  .publish-time {
                    opacity: 0.6;
                    font-size: 0.25rem;
                    margin-top: 0.3rem;
                  }
                }
              }
              .assess-detail-head-right {
                color: var(--color-tint);
                text-align: center;
                width: 1.4rem;
              }
            }
            .assess-detail-content {
              display: flex;
              flex-direction: column;
              margin-left: 1.4rem;
              font-size: 0.35rem;

              .assess-detail-content-1 {
                margin-bottom: 0.3rem;
                padding-right: 0.02rem;
                line-height: 0.6rem;
                img {
                  width: 1rem;
                }
              }
              .assess-detail-content-2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.4rem;
                .assess-detail-content-2-left {
                  display: flex;
                  align-items: center;
                  span {
                    margin-right: 0.4rem;
                    display: flex;
                    align-items: center;
                    img {
                      opacity: 0.6;
                      width: 0.5rem;
                      height: 0.5rem;
                    }
                    span {
                      margin-right: 0;
                      margin-left: 0.05rem;
                    }
                    .is-active {
                      color: var(--color-tint);
                    }
                    &:first-child {
                      img {
                        opacity: 0.5;
                      }
                    }
                    &:nth-child(2) {
                      img {
                        width: 0.4rem;
                        height: 0.4rem;
                        opacity: 0.5;
                      }
                    }
                  }
                }
                .assess-detail-content-2-right {
                  span {
                    img {
                      width: 0.5rem;
                      height: 0.5rem;
                    }
                  }
                }
              }
              .good {
                width: 2.4rem;
                display: flex;
                height: 0.6rem;
                border-radius: 0.1rem;
                opacity: 0.9;
                margin-bottom: 0.2rem;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                background-color: rgb(20, 20, 20);
              }
              .assess-detail-content-3 {
                background-color: rgb(28, 28, 28);
                ul {
                  li {
                    border: none;
                    // margin-bottom: -0.2rem;
                    line-height: 0.6rem;

                    span {
                      // display: flex;
                      display: inline;
                      &:first-child {
                        color: rgb(48, 126, 155);
                        white-space: nowrap;
                        span {
                          &:nth-child(2) {
                            margin: 0 0.1rem;
                          }
                        }
                      }
                      &:last-child {
                        margin-left: 0.1rem;
                        span {
                          &:first-child {
                            color: rgb(48, 126, 155);
                          }
                        }
                      }
                    }
                  }
                }
                .short {
                  color: rgb(48, 126, 155);
                  padding: 0 0.3rem 0.3rem 0.3rem;
                  // margin-top: -0.2rem;
                  font-size: 0.35rem;
                  display: flex;
                  align-items: center;
                  &::after {
                    content: "ㄑ";
                    display: inline-block;
                    transform: rotateZ(180deg);
                  }
                }
              }
            }
          }
        }
      }
      .assess-footer {
        position: sticky;
        bottom: 0;
        display: flex;
        z-index: 9999;
        justify-content: space-around;
        flex-direction: column;
        .footer {
          display: flex;
          height: 1.3rem;
          width: 10rem;
          justify-content: space-around;
          flex-direction: column;
          background-color: var(--base-set-item-color);
          img {
            width: 0.7rem;
            height: 0.7rem;
          }
          .footer-1 {

            width: 10rem;
            padding: 0 0.1rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            input {
              height: 0.9rem;
              width: 8.5rem;
              padding: 0 0.3rem;
              background-color: rgb(20, 20, 20);
              outline: none;
              border: none;
              border-radius: 1rem;
              color: var(--color-tint);
            }
          }
          .footer-2 {
            display: flex;
            align-items: center;
            padding: 0 0.3rem;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 0.4rem;
              &:first-child {
                font-size: 0.3rem;

                input[type="checkbox"] {
                  margin-right: 0.2rem;
                  background-color: transparent;
                }
              }
              img {
                width: 0.7rem;
                height: 0.7rem;
              }
              &:nth-child(3) {
                font-size: 0.7rem;
              }
            }
          }
        }
        .emoji {
          position: relative;
          background-color: rgb(20, 20, 20);
          .emoji-main {
            overflow-y: scroll;
            height: 5rem;
            display: flex;
            align-self: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            td {
              display: flex;
              align-items: center;
              justify-content: center;
              width: calc(10rem / 7);
              height: calc(10rem / 7);
              img {
                width: 0.9rem;
                height: 0.9rem;
              }
            }
          }
          .bigger {
            width: 10rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            td {
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 3rem;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
              }
            }
          }
          .emoji-main::-webkit-scrollbar {
            display: none;
          }
          .emoji-tabbar {
            position: relative;
            background-color: var(--base-set-bg-color);
            height: 1.2rem;
            width: 10rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tabbar-left,
            .tabbar-right {
              display: flex;
              align-items: center;

              span {
                width: 1.2rem;
                height: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                &:first-child {
                  img {
                    opacity: 0.6;
                  }
                }
                img {
                  width: 0.7rem;
                  height: 0.7rem;
                }

                &:last-child {
                  font-size: 0.25rem;
                }
              }
              .emoji-active {
                transition: 0.3s;
                background-color: rgb(20, 20, 20);
              }
            }
            .tabbar-right {
              span {
                img {
                  opacity: 1;
                  width: 0.6rem;
                  height: 0.6rem;
                }
              }
            }
          }
        }
        .on-active {
          height: 2.2rem;
        }
      }
    }
  }
  .popup {
    position: sticky;
    bottom: 0;
    width: 10rem;
    z-index: 3004;
    /deep/ .pop {
    position: absolute;
      background-color: rgb(20, 20, 20) !important;

      display: flex;
      flex-direction: column;
      .pop-title {
        position: relative;
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(40, 40, 40);
        height: 1.2rem;
        flex-direction: row;
        box-shadow: 0 0.01rem 0.1rem rgb(20, 20, 20);
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            opacity: 0.6;
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
      .discuss {
        position: relative;
        overflow-y: scroll;
        margin-bottom: 1rem;
        .discuss-theme,
        .discuss-sub {
          ul {
            background-color: var(--base-set-bg-color);
            margin-bottom: 0.3rem;
            li {
              padding: 0.3rem;
              padding-bottom: 0;
              list-style: none;

              border-bottom: 0.02rem solid rgba(100, 100, 100, 0.2);
              .assess-detail-head {
                
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.3rem;
                .assess-detail-head-left {
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  .assess-detail-head-left-1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 1rem;
                    height: 1rem;
                    background-size: 1rem 1rem;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                    margin-right: 0.4rem;
                    img {
                      width: 1rem;
                      height: 1rem;
                      border-radius: 100%;
                    }
                  }
                  .assess-detail-head-left-2 {
                    display: flex;
                    flex-direction: column;
                    .name-title {
                      display: flex;
                      align-items: center;
                      justify-content: space-around;
                      .name {
                        opacity: 0.9;
                        margin-right: 0.2rem;
                      }
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
                    }
                    .publish-time {
                      opacity: 0.6;
                      font-size: 0.25rem;
                      margin-top: 0.3rem;
                    }
                  }
                }
                .assess-detail-head-right {
                  color: var(--color-tint);
                  text-align: center;
                  width: 1.4rem;
                }
              }
              .assess-detail-content {
                display: flex;
                flex-direction: column;
                margin-left: 1.4rem;
                font-size: 0.35rem;
                line-height: 0.6rem;

                .spec-detail-content {
                  margin-bottom: 0.3rem;
                  padding-right: 0.02rem;
                  line-height: 0.6rem;
                  img {
                    width: 1rem;
                  }
                  display: flex;
                  align-items: center;
                  span {
                    display: flex;
                    align-items: center;
                    &:first-child {
                      display: flex;
                      align-items: center;
                      span {
                        &:last-child {
                          color: rgb(48, 126, 155);
                        }
                      }
                    }
                  }
                }
                .sepc-2 {
                  display: inline-block;
                  span {
                    display: inline;
                    align-items: center;
                    &:first-child {
                      display: inline;
                      align-items: center;
                      span {
                        &:last-child {
                          margin: 0 0.1rem;
                          color: rgb(48, 126, 155);
                        }
                      }
                    }
                  }
                }
                .assess-detail-content-1 {
                  margin-bottom: 0.3rem;
                  padding-right: 0.02rem;
                  line-height: 0.6rem;
                  img {
                    width: 1rem;
                  }
                }
                .assess-detail-content-2 {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 0.4rem;
                  .assess-detail-content-2-left {
                    display: flex;
                    align-items: center;
                    span {
                      margin-right: 0.4rem;
                      display: flex;
                      align-items: center;
                      img {
                        opacity: 0.6;
                        width: 0.5rem;
                        height: 0.5rem;
                      }
                      span {
                        margin-right: 0;
                        margin-left: 0.05rem;
                      }
                      .is-active {
                        color: var(--color-tint);
                      }
                      &:first-child {
                        img {
                          opacity: 0.5;
                        }
                      }
                      &:nth-child(2) {
                        img {
                          width: 0.4rem;
                          height: 0.4rem;
                          opacity: 0.5;
                        }
                      }
                    }
                  }
                  .assess-detail-content-2-right {
                    span {
                      img {
                        width: 0.5rem;
                        height: 0.5rem;
                      }
                    }
                  }
                }
                .good {
                  width: 2.4rem;
                  display: flex;
                  height: 0.6rem;
                  border-radius: 0.1rem;
                  opacity: 0.9;
                  margin-bottom: 0.2rem;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.3rem;
                  background-color: rgb(20, 20, 20);
                }
                .assess-detail-content-3 {
                  background-color: rgb(28, 28, 28);
                  ul {
                    li {
                      border: none;
                      margin-bottom: -0.2rem;
                      line-height: 0.6rem;

                      span {
                        // display: flex;
                        display: inline;
                        &:first-child {
                          color: rgb(48, 126, 155);
                          white-space: nowrap;
                          span {
                            &:nth-child(2) {
                              margin: 0 0.1rem;
                            }
                          }
                        }
                        &:last-child {
                          margin-left: 0.1rem;
                          span {
                            &:first-child {
                              color: rgb(48, 126, 155);
                            }
                          }
                        }
                      }
                    }
                  }
                  .short {
                    color: rgb(48, 126, 155);
                    padding: 0 0.3rem 0.3rem 0.3rem;
                    margin-top: -0.2rem;
                    font-size: 0.35rem;
                    display: flex;
                    align-items: center;
                    &::after {
                      content: "ㄑ";
                      display: inline-block;
                      transform: rotateZ(180deg);
                    }
                  }
                }
              }
            }
          }
        }
      }
      .discuss::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .making-danmaku {
    position: sticky;
    bottom: 0;
    height: 1rem;
    display: flex;
    z-index: 999;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    background-color: rgb(44, 44, 44);
    padding: 0 .3rem;
    input {
      height: .8rem;
      width: 8.4rem;
      border-radius: 1rem;
      background-color: rgb(20, 20, 20);
      border: none;
      outline: none;
      padding-left: .3rem;
      color: var(--color-tint);
    }
    img {
      width: .6rem;
      height: .6rem;
    }
  }
  .modal {
    position: sticky;
    bottom: 0;
    width: 10rem;
    height: 100vh;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.cancel-scroll {
  overflow: hidden !important;
}
#video-detail::-webkit-scrollbar {
  display: none;
}

</style>
