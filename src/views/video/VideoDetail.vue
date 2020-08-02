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
        <div class="bg-head" ref="bgHead" :class="{ 'bg-head-disappear': videoBarDisappear }">
          <div class="bg-head-left">
            <span @click="goBack()" :class="{ disappear: disappear }">
              <img src="~assets/img/video/back_white.svg" alt />
            </span>
          </div>
          <div class="bg-head-middle" :class="{ disappear: !disappear }"></div>
          <div class="bg-head-right">
            <span :class="{ disappear: disappear }" @click="P_In_P()">
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
        <div
          class="video-outer"
          :style="light"
          ref="videoOuter"
          @touchmove="changeVolumeAndLight($event)"
          @touchend="closeVolumeAndLight()"
        >
          <div
            class="danmaku-outer"
            v-show="!whenVideoEnd"
            :class="{ 'oy': closeTheDanmaku }"
            :style="danmakuheight"
          >
            <span
              class="danmaku-item"
              v-for="(item, index) in showDanmakuList"
              :style="{ 'font-size': `${item.fonsize - 5}px`, 'color': `#${item.color.toString(16)}`, top: `${item.position}`, 'animation-duration': speed(item.text.length) }"
              :class="{ 'mode-scroll-right': item.mode === '滚动', 'mode-scroll-left': item.mode === '逆向', 'mode-fixed-top': item.mode === '顶部', 'mode-fixed-bottom': item.mode === '底部' }"
              :key="index"
            >
              <span
                :class="{'sub-line': item.userID !== null && item.userID === $store.state.userInfo.identy.uuid}"
              >{{ item.text }}</span>
            </span>
          </div>
          <!-- <canvas  
            class="danmaku-outer"
            v-show="!whenVideoEnd"
            :class="{ 'oy': closeTheDanmaku }"
            :style="danmakuheight"
            width="20rem" height="422"
            ref="danmakuCanvas"
          >哥，你浏览器不支持canvas</canvas>-->
          <div v-if="!isOk" class="poster" :style="posterheight"></div>
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            crossorigin="anonymous"
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
          <div
            class="sound-light"
            v-if="(volumeAndlight.volume || volumeAndlight.light) && isOk && !whenVideoEnd"
          >
            <img
              :src="volumeAndlight.active"
              alt
              :class="{ 'smaller': volumeAndlight.active === require('assets/img/video/close_sound_white.svg') }"
            />
            <div class="line">
              <span
                v-if="volumeAndlight.volume && !isInFullScreen"
                :style="{ 'width': `${volumeAndlight.volumeNum * 2}rem` }"
              ></span>
              <span
                v-if="volumeAndlight.light && !isInFullScreen"
                :style="{ 'width': `${volumeAndlight.lightNum * 2}rem` }"
              ></span>
              <span
                v-if="volumeAndlight.volume && isInFullScreen"
                :style="{ 'width': `${volumeAndlight.volumeNum * 1}rem` }"
              ></span>
              <span
                v-if="volumeAndlight.light && isInFullScreen"
                :style="{ 'width': `${volumeAndlight.lightNum * 1}rem` }"
              ></span>
              <span></span>
            </div>
          </div>
          <div class="cushion" v-if="isCushioning">
            <Cushion />
          </div>
          <div class="video-end" v-if="whenVideoEnd">
            <div class="video-end-head">推荐视频</div>
            <div class="video-end-center">
              <div class="item-left" @click="changeVideo(0)">
                <img
                  :src="videoList[0].img.src + videoList[0].img.name"
                  :alt="videoList[0].img.alt"
                />
                <img class="replay" src="~assets/img/video/play.svg" alt />
                <span class="time">{{ videoList[0].video.long }}</span>
              </div>
              <div class="item-right">
                <div class="item-right-title">{{ videoList[0].title }}</div>
                <div class="time-play">
                  <div class="time-play-left">
                    <div class="publish-time">
                      <img src="~assets/img/video/UP_dark.svg" alt />
                      {{ videoList[0].video.info.up }}
                    </div>
                    <div class="message">
                      <span>
                        <img src="~assets/img/recommend_list/play_dark.svg" alt />
                        {{ videoList[0].plays }}
                      </span>
                      <span>
                        <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
                        {{ videoList[0].danmaku }}
                      </span>
                    </div>
                  </div>
                  <div class="immediate" @click="changeVideo(0)" v-waves>立即播放</div>
                </div>
              </div>
            </div>
            <div class="video-end-footer">
              <div class="video-end-1" @click="replay()">
                <img src="~assets/img/video/replay.svg" alt />重播
              </div>
              <div class="video-end-2" @click="share()">
                <img src="~assets/img/user/set/share_white.svg" alt /> 分享
              </div>
            </div>
          </div>
          <div
            class="video-bar"
            :class="{ 'bg-head-disappear': videoBarDisappear }"
            v-if="isOk && !whenVideoEnd"
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
          <span
            v-if="isOk && !whenVideoEnd"
            class="bottom-now"
            :class="{ 'video-bar-disappear': !videoBarDisappear }"
            :style="{ 'width': (timestap.now / timestap.max) * 10 + 'rem' }"
          ></span>
          <div
            class="is-in-full-screen"
            v-if="!showBottomInput && !showShot"
            :class="{ 'bg-head-disappear': videoBarDisappear && !popupVisible2 && !whenVideoEnd }"
          >
            <div class="full-screen-head" v-if="!popupVisible2 && !fullScreenLock">
              <div class="full-screen-head-left">
                <span @click="exitFullScreen()" :class="{ disappear: disappear }">
                  <img src="~assets/img/video/back_white.svg" alt />
                </span>
                <span>{{ connectionType }}</span>
                <span>{{ videoData.title }}</span>
              </div>
              <div class="full-screen-head-right">
                <span>
                  {{ date }}
                  <Battery class="battery" />
                </span>
                <span>
                  <img src="~assets/img/video/coin_white.svg" alt />
                </span>
                <span @click="share()">
                  <img src="~assets/img/user/set/share_white.svg" alt />
                </span>
                <span>
                  <img src="~assets/img/video/three_points_white.svg" alt />
                </span>
              </div>
            </div>
            <div
              class="full-screen-right"
              v-if="!popupVisible2 && !fullScreenLock"
              v-show="isOk && !whenVideoEnd"
            >
              <span @click="shot()">
                <img src="~assets/img/video/take_photo.svg" alt />
              </span>
              <span @click="startLock()">
                <img src="~assets/img/video/lock.svg" alt />
              </span>
            </div>
            <div class="full-screen-left" v-if="!popupVisible2 && fullScreenLock">
              <img @click="cancelLock()" src="~assets/img/video/lock_pink.svg" alt />
            </div>
            <div class="full-screen-pop" v-if="!fullScreenLock">
              <mt-popup class="pop" v-model="popupVisible2" :modal="false" position="right">
                <ul>
                  <li
                    v-for="item in rateList.list"
                    @click="changeRate(item)"
                    :class="{ 'is-in-active-rate': item === rateList.active }"
                    :key="item"
                  >{{ item }}X</li>
                </ul>
              </mt-popup>
            </div>
            <div
              class="full-screen-footer"
              v-if="!popupVisible2 && !fullScreenLock"
              v-show="isOk && !whenVideoEnd"
            >
              <div class="process" @click="processChange($event)">
                <img
                  @touchmove="slide($event)"
                  @touchend="finishSlide()"
                  src="~assets/img/video/process.svg"
                  :style="{ 'left': `${timestap.now / timestap.max * 92 - 1}vw` }"
                  alt
                />
                <span class="now" :style="{ 'width': (timestap.now / timestap.max) * 92 + 'vw' }"></span>
                <span class="max"></span>
              </div>
              <div class="full-screen-footer-2">
                <div class="play-pause" @click="playPause()">
                  <img :src="videoState.active" alt />
                </div>
                <div>
                  <img src="~assets/img/video/pass.svg" alt />
                </div>
                <div class="timestap">
                  <span>{{ timestap.nowFormat }}</span>/
                  <span>{{ timestap.formattedTime_ }}</span>
                </div>
                <div :class="{ 'change-bg-color': closeTheDanmaku }" @click="closeDanmaku()">
                  <img :src="fullScreenDanmakuImg" alt />
                </div>
                <div :class="{ 'cant-see': closeTheDanmaku }" @click="makingDanmaku()">发个友善的弹幕见证当下</div>
                <div @click="changeSpeed()">倍速</div>
                <div @click="saySorry()">720P</div>
              </div>
            </div>
            <div class="full-screen-video-end" v-if="!popupVisible2" v-show="isOk && whenVideoEnd">
              <div class="full-screen-video-end-1">
                <div class="up-follows">
                  <div @click="watchUp(videoData.up.mid)">
                    <img v-lazy="upData.baseInfo.logo.src + upData.baseInfo.logo.name" alt />
                  </div>
                  <div>
                    <span @click="watchUp(videoData.up.mid)">{{ upData.baseInfo.name }}</span>
                    <span v-waves>{{ type }}</span>
                  </div>
                </div>
                <div class="actions">
                  <div
                    class="actions-item"
                    v-for="(item, index) in videoEndActionsList"
                    :key="index"
                  >
                    <span @click="actions(index)">
                      <img :src="item.src" alt />
                    </span>
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </div>
              <div class="full-screen-video-end-2">
                <div class="full-screen-video-end-2-title">推荐视频</div>
                <div class="scroll-list">
                  <div
                    class="scroll-item"
                    v-for="(item, index) in videoList"
                    :key="'item-' + index"
                    @click="changeVideo(index)"
                  >
                    <div class="scroll-inner" v-if="item.bvid !== videoData.bvid">
                      <div class="scroll-inner-cover">
                        <img v-lazy="item.img.src + item.img.name" alt />
                        <div class="info">
                          <span>
                            <img src="~assets/img/recommend_list/play_dark.svg" alt />
                            {{ item.plays }}
                          </span>
                          <span>
                            <img src="~assets/img/recommend_list/danmaku_dark.svg" alt />
                            {{ item.danmaku }}
                          </span>
                          <span>{{ item.video.long }}</span>
                        </div>
                      </div>
                      <div class="scroll-inner-title">{{item.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shot-img" v-if="showShot && dataURL" @click="shareTheShot()">
            <img :src="dataURL" alt />
          </div>
          <div
            class="full-screen-input"
            v-if="isOk && !whenVideoEnd &&  !popupVisible2 && !fullScreenLock && isInFullScreen && showBottomInput"
          >
            <div class="full-screen-input-danmaku">
              <input
                @focus="bottomFocus()"
                @blur="bottomBlur()"
                type="text"
                v-model="danmaku"
                placeholder="发个友善的弹幕见证当下"
              />
              <img @click="sendDanmaku()" src="~assets/img/video/send_pink.svg" alt />
            </div>
            <div class="select-style" :class="{ 'when-select-color': selectModeType }">
              <div class="front-btn" @click="selectColor()"></div>
              <div class="danmaku-style-list">
                <div class="font-size-mode">
                  <span
                    class="font-size-item"
                    @click="selectedStyle(0, index)"
                    v-for="(item, index) in fullScreenDanmakuStyleList.fontSize"
                    :key="index"
                  >
                    <img :src="item.selected" alt />
                  </span>
                  <span
                    class="mode-item"
                    @click="selectedStyle(1, index)"
                    v-for="(item, index) in fullScreenDanmakuStyleList.mode"
                    :key="index"
                  >
                    <img :src="item.selected" alt />
                  </span>
                </div>
                <div class="color">
                  <span
                    class="color-item"
                    :class="{ 'selected-color': fullScreenDanmakuColorList.selected === item }"
                    @click="selectedStyle(2, index)"
                    v-for="(item, index) in fullScreenDanmakuColorList.list"
                    :key="index"
                    :style="{ 'background-color': `#${item.toString(16)}` }"
                  ></span>
                </div>
              </div>
              <div class="back-btn" @click="selectColor()"></div>
            </div>
          </div>
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
                <span>{{ item.name }} {{item.num}}</span>
              </div>
            </div>
            <span class="navbar-active-footer" :style="{ 'left': `${.75 + 2.5 * isActive}rem` }"></span>
          </div>
          <div class="close-danmaku">
            <div
              class="here-danmaku"
              :class="{ 'enter-bar-disappear': closeTheDanmaku }"
              @click="makingDanmaku()"
            >{{ isMakingDanmaku }}</div>
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
            <div class="desc-up-right" @click="watchUp(videoData.up.mid)">
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
          <li v-for="(item, index) in videoList" :key="index" @click="changeVideo(index)" v-waves>
            <div class="inner" v-if="item && item.bvid !== videoData.bvid">
              <div class="item-left">
                <img v-if="item.img" :src="item.img.src + item.img.name" :alt="item.img.alt" />
                <span class="time">{{ item.video.long }}</span>
              </div>
              <div class="item-right">
                <div class="item-right-title">{{ item.title }}</div>
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
                        @click.stop="reply2(indey, index, i.member.uname)"
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
              <div
                class="is-focus"
                style="color: var(--color-tint);"
                v-if="ifFocus"
                @click="publish()"
              >发布</div>
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
              <li class="copy" v-waves>
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
              <li v-for="(item, index) in assessDetail.replies" :key="index" class="copy" v-waves>
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
      <input
        @focus="bottomFocus()"
        @blur="bottomBlur()"
        type="text"
        v-model="danmaku"
        placeholder="发个友善的弹幕见证当下"
      />
      <img @click="sendDanmaku()" src="~assets/img/video/send_pink.svg" alt />
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
import emoji from "common/emoji/emoji.json";
import { secondsFormat } from "common/number_time/numberTime.js";
import Cushion from "components/common/cushion/Cushion";
import Battery from "components/content/video/Battery.vue";
import { BASE_URL } from "common/const.js";

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
            src: `http://${BASE_URL}/bilibili_data/home/recommend_2/BV17z411b7AL/BV17z411b7AL.mp4` //url地址
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
      popupVisible2: false,
      isActive: 0,
      disappear: false,
      videoData: {},
      upData: {},
      navbarImg: require("assets/img/video/open_danmaku.svg"),
      fullScreenDanmakuImg: require("assets/img/video/open_danmaku_white.svg"),
      typeList: [{ name: "简介" }, { name: "评论", num: 0 }],
      type: "关注",
      isRotate: false,
      videoList: [],
      isMakingDanmaku: "点我发弹幕",
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
        active: require("assets/img/video/light_white.svg"),
        lightNum: 0.9,
        volumeNum: 0.5,
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
      danmakuItemHeight: 0,
      whenVideoEnd: false,
      isInFullScreen: false,
      connectionType: "",
      date: `${new Date().getHours()}:${new Date().getMinutes()}`,
      videoEndActionsList: [
        {
          name: "重播",
          src: require("assets/img/video/replay.svg")
        },
        {
          name: "点赞",
          src: require("assets/img/video/likes_empty_white.svg")
        },
        {
          name: "不喜欢",
          src: require("assets/img/video/dislike_empty_white.svg")
        },
        {
          name: "硬币",
          src: require("assets/img/video/coin_white.svg")
        },
        {
          name: "收藏",
          src: require("assets/img/video/collect_white.svg")
        },
        {
          name: "分享",
          src: require("assets/img/video/wx.svg")
        }
      ],
      fullScreenDanmakuColorList: {
        list: [
          16777215,
          15270420,
          16642304,
          1169539,
          40939,
          14877568,
          9355550,
          1214611,
          15837484,
          6830459,
          8634571,
          9664828
        ],
        selected: 16777215
      },
      fullScreenDanmakuStyleList: {
        fontSize: [
          {
            default: require("assets/img/video/danmaku_font_size_sm_default.svg"),
            active: require("assets/img/video/danmaku_font_size_sm_active.svg"),
            selected: require("assets/img/video/danmaku_font_size_sm_active.svg"),
            fontSize: 15
          },
          {
            default: require("assets/img/video/danmaku_font_size_l_default.svg"),
            active: require("assets/img/video/danmaku_font_size_l_active.svg"),
            selected: require("assets/img/video/danmaku_font_size_l_default.svg"),
            fontSize: 25
          }
        ],
        mode: [
          {
            default: require("assets/img/video/danmaku_mode_top_default.svg"),
            active: require("assets/img/video/danmaku_mode_top_active.svg"),
            selected: require("assets/img/video/danmaku_mode_top_default.svg"),
            mode: "顶部"
          },
          {
            default: require("assets/img/video/danmaku_mode_scroll_default.svg"),
            active: require("assets/img/video/danmaku_mode_scroll_active.svg"),
            selected: require("assets/img/video/danmaku_mode_scroll_active.svg"),
            mode: "滚动"
          },
          {
            default: require("assets/img/video/danmaku_mode_bottom_default.svg"),
            active: require("assets/img/video/danmaku_mode_bottom_active.svg"),
            selected: require("assets/img/video/danmaku_mode_bottom_default.svg"),
            mode: "底部"
          }
        ],
        isSelectFontSize: 15,
        isSelectMode: "滚动"
      },
      selectModeType: false,
      rateList: {
        list: ["2.0", "1.5", "1.25", "1.0", "0.75", "0.5"],
        active: "1.0"
      },
      fullScreenLock: false,
      dataURL: "",
      showShot: false,
      shotTimer: null
    };
  },
  async created() {
    this.bus();
    this.$store.commit("pushInRouteList", this.$route.params.bvid);
    this.func2 = this.$debounce(this.getRecommendLst, 1000, true);
    this.func = this.$debounce(this.requireAssessData, 1000, true);
    this.disappearFunc = this.$debounce(this.videoVarDisappear, 5000);

    await this.getAllData();

    await getHomeData({ skip: this.videoListPage })
      .then(res => {
        this.videoList.push(...res);
      })
      .catch(err => {
        console.log(err);
      });
    for (let i = 0; i <= 4; i++) {
      let level = Math.round(Math.random() * 6);
      let color = this.colorList[level];
      let obj = {
        level,
        color
      };
      this.levelList.push(obj);
    }
  },
  mounted() {},
  activated() {
    // this.playPause()
  },
  deactivated() {
    this.playPause();
  },
  components: {
    LikePayCollect,
    Cushion,
    Battery
  },
  methods: {
    async getAllData() {
      this.isActive = 0;
      this.disappear = false;
      this.danmaku = "";
      this.assessType = "按时间";
      this.levelList = [];
      this.position = {
        nowY: 0,
        lastY: 0
      };
      this.assessSelectType = "replies";
      this.ifFocus = false;
      this.sheetVisible = false;
      this.isShowEmoji = false;
      this.popupVisible = false;
      this.videoState = {
        play: require("assets/img/video/play.svg"),
        pause: require("assets/img/video/pause.svg"),
        active: require("assets/img/video/play.svg")
      };
      this.videoBarDisappear = false;
      this.sliding = false;
      this.showBottomInput = false;
      this.danmakuData = [];
      this.currentTime = 0;
      this.lastTime = 0;
      this.allDanmaku = [];
      this.showDanmakuList = [];
      this.whenVideoEnd = false;

      this.timestap = {
        max: 0,
        formattedTime_: "",
        now: 0,
        nowFormat: "00:00"
      };
      this.assessList = [];
      this.assessPage = 1;
      this.videoData = await this.$route.query.data;
      this.typeList[1].num = await this.videoData.assess.detail.length;
      await getUpDetail(this.videoData.up.mid).then(res => {
        this.upData = res;
      });
      // await this.requireAssessData(this.assessPage);
      this.playerOptions.sources[0].src =
        this.videoData.video.src + this.videoData.video.name;

      await assess(this.videoData.bvid, this.assessPage)
        .then(res => {
          if (res && res.page && Object.keys(res.page).length > 0) {
            this.assessList.push(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
      if (this.assessList.length > 0) {
        if (this.assessList[0].page.acount > 10000) {
          this.typeList[1].num =
            (this.assessList[0].page.acount / 10000).toFixed(1) + "万";
        } else {
          this.typeList[1].num = this.assessList[0].page.acount;
        }
      }
      await allDanmakuData(this.videoData.bvid).then(res => {
        // console.log(res[0]);
        this.danmakuData = res.sort((a, b) => {
          return a.time - b.time;
        });
      });
    },
    goBack() {
      this.$router.replace({ path: "/" });
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
    async getRecommendLst() {
      this.videoListPage += 1;
      await getHomeData({ skip: this.videoListPage })
        .then(res => {
          this.videoList.push(...res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async requireAssessData() {
      this.assessPage += 1;
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
          this.func2();
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
      this.lock = true;
      this.ifFocus = true;
      this.sheetVisible = true;
      this.isShowEmoji = false;
    },
    watchUp(mid) {
      this.$router.push("/user-space/" + mid);
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
      this.lock = true;
      this.assessDetailPosition = {
        y,
        x
      };
      this.assessDetail = this.assessList[y][this.assessSelectType][x];
      this.popupVisible = true;
    },
    closeDanmaku() {
      this.closeTheDanmaku = !this.closeTheDanmaku;
    },
    test(e) {
      this.timestap = {
        max: 0,
        formattedTime_: "",
        now: 0,
        nowFormat: "00:00"
      };
      this.video = e;
      this.timestap.max = e.controlBar.durationDisplay.duration_;
      this.timestap.formattedTime_ =
        e.controlBar.durationDisplay.formattedTime_;
      this.videoDetail = e.el_;
      this.isOk = true;
      this.video.playbackRate(1);
    },
    replay() {
      this.whenVideoEnd = false;
      this.timestap.now = Math.floor(this.video.currentTime());
      this.timestap.nowFormat = secondsFormat(this.timestap.now);
      this.danmakuData = [...this.showDanmakuList];
      this.showDanmakuList = [];
      this.playPause();
    },
    share() {
      try {
        let msg = {
          type: "video",
          title: `${this.$store.state.userInfo.baseInfo.name}向你推荐了一个视频`,
          content: `快来看B站UP主${this.upData.baseInfo.name}的新视频${this.videoData.title}啦~`,
          thumbs: [`${this.videoData.img.src + this.videoData.img.name}`],
          media: `${this.videoData.video.src + this.videoData.video.name}`,
          extra: { scene: "WXSceneSession" }
        };
        plus.share.getServices(
          s => {
            s[2].send(
              msg,
              () => {},
              e => {
                plus.nativeUI.toast("分享失败：" + JSON.stringify(e));
              }
            );
          },
          e => {
            plus.nativeUI.toast("获取分享列表失败：" + JSON.stringify(e));
          }
        );
      } catch {
        alert("不好意思，该功能只支持真机");
      }
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
        this.currentTime = this.video.currentTime();
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
    onPlayerEnded() {
      this.videoBarDisappear = false;
      this.whenVideoEnd = true;
      this.playPause();
    },
    changeVideo(i) {
      this.whenVideoEnd = false;
      this.videoBarDisappear = true;
      this.$router.replace({
        path: "/video-detail/" + this.videoList[i].bvid,
        query: {
          data: this.videoList[i]
        }
      });
    },
    actions(i) {
      switch (i) {
        case 0:
          this.replay();
          this.whenVideoEnd = false;
          this.videoBarDisappear = true;
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          Toast({
            message: "哥，这里我真的不想做了，让我偷下懒谢谢，嘤嘤嘤~",
            duration: 3000,
            positoon: "middle"
          });
          break;
        case 5:
          this.share();
          break;
      }
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
      // let one = window.innerWidth / 10;
      // let result = ((e.x - one) / (one * 5.5)) * max;
      let result = "";
      if (window.matchMedia("(orientation: portrait)").matches) {
        let one = window.innerWidth / 10;

        if (e.x < one) {
          return false;
        }
        result = ((e.x - one) / (one * 5.5)) * max;
      } else if (window.matchMedia("(orientation: landscape)").matches) {
        let smallOne = window.innerWidth / 100;
        result = (e.x / (smallOne * 92)) * max;
      }
      if (result > max) {
        return false;
      }
      this.video.currentTime(result);
      this.timestap.now = Math.floor(result);
      this.timestap.nowFormat = secondsFormat(this.timestap.now);
    },
    slide(e) {
      this.sliding = true;
      let max = this.timestap.max;

      let result = "";
      if (window.matchMedia("(orientation: portrait)").matches) {
        let one = window.innerWidth / 10;

        if (e.touches[0].pageX < one) {
          return false;
        }
        result = ((e.touches[0].pageX - one) / (one * 5.5)) * max;
      } else if (window.matchMedia("(orientation: landscape)").matches) {
        let smallOne = window.innerWidth / 100;
        result = (e.touches[0].pageX / (smallOne * 92)) * max;
      }
      if (result > max) {
        return false;
      }
      this.video.currentTime(result);
      this.timestap.now = Math.floor(result);
      this.timestap.nowFormat = secondsFormat(this.timestap.now);
    },
    finishSlide() {
      this.sliding = false;
    },
    closePop() {
      this.lock = false;
      this.popupVisible = false;
    },
    touchMove(e) {
      if (this.fullScreenLock) {
        return false;
      }
      if (this.isInFullScreen && this.showBottomInput) {
        let height = window.innerHeight / 3;
        if (e.touches[0].pageY > height) {
          this.showBottomInput = false;
        }
        return false;
      }
      if (this.popupVisible2) {
        let width = window.innerWidth / 10;
        if (e.touches[0].pageX < width * 8) {
          this.popupVisible2 = false;
        }
        return false;
      }
      if (this.isInFullScreen) {
        let height = window.innerHeight / 10;
        if (e.touches[0].pageY >= height * 7.5) {
          return false;
        }
      }
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
    changeSpeed() {
      this.popupVisible2 = true;
    },
    changeRate(item) {
      this.rateList.active = item;
      this.video.playbackRate(parseInt(item));
      this.popupVisible2 = false;
    },
    videoInlineShow() {
      if (this.lock) {
        this.videoBarDisappear = !this.videoBarDisappear;
        this.disappearFunc();
      }
    },
    fullScreen() {
      this.$nextTick(() => {
        this.isInFullScreen = true;
        this.connectionType = navigator.onLine
          ? navigator.connection.effectiveType
          : "断网";
        this.$refs.videoOuter.requestFullscreen();
        try {
          // let Self = plus.webview.currentWebview();
          // Self.setStyle({
          //   videoFullscreen: "landscape"
          // });
          plus.storage.setItem("isInFullScreen", "true");
          plus.screen.lockOrientation("landscape");
        } catch {
          screen.orientation.lock("landscape");
        }
      });
    },
    exitFullScreen() {
      this.isInFullScreen = false;
      document.exitFullscreen();
      try {
        // let Self = plus.webview.currentWebview();
        // Self.setStyle({
        //   videoFullscreen: "portrait-primary"
        // });
        plus.screen.lockOrientation("portrait-primary");
        plus.storage.setItem("isInFullScreen", "false");
      } catch {
        screen.orientation.lock("portrait-primary");
      }
    },
    videoVarDisappear() {
      this.videoBarDisappear = true;
    },
    changeVolumeAndLight(e) {
      if (this.sliding) {
        return false;
      }
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      let dev = 1 / 20;
      if (this.volumeAndlight.lastY !== 0) {
        if (x >= window.innerWidth / 2) {
          this.volumeAndlight.light = false;
          this.volumeAndlight.volume = true;
          if (this.volumeAndlight.lastY - y > 0) {
            if (
              this.volumeAndlight.active !==
              require("assets/img/video/open_sound_white.svg")
            ) {
              this.volumeAndlight.active = require("assets/img/video/open_sound_white.svg");
            }
            if (this.video.volume() >= 1) {
              this.video.volume(1);
            } else {
              let volume = this.video.volume();
              this.video.volume(volume + dev);
            }
          } else if (this.volumeAndlight.lastY - y < 0) {
            if (
              this.volumeAndlight.active !==
              require("assets/img/video/open_sound_white.svg")
            ) {
              this.volumeAndlight.active = require("assets/img/video/open_sound_white.svg");
            }
            if (this.video.volume() <= 0) {
              this.video.volume(0);
              if (
                this.volumeAndlight.active !==
                require("assets/img/video/close_sound_white.svg")
              ) {
                this.volumeAndlight.active = require("assets/img/video/close_sound_white.svg");
              }
            } else {
              let volume = this.video.volume();
              this.video.volume(volume - dev);
            }
          }

          this.volumeAndlight.volumeNum = this.video.volume();
        } else {
          this.volumeAndlight.volume = false;
          this.volumeAndlight.light = true;
          if (
            this.volumeAndlight.active !==
            require("assets/img/video/light_white.svg")
          ) {
            this.volumeAndlight.active = require("assets/img/video/light_white.svg");
          }
          if (this.volumeAndlight.lastY - y > 0) {
            if (this.volumeAndlight.lightNum >= 1) {
              this.volumeAndlight.lightNum = 1;
            } else {
              this.volumeAndlight.lightNum += dev;
            }
          } else if (this.volumeAndlight.lastY - y < 0) {
            if (this.volumeAndlight.lightNum <= 0) {
              this.volumeAndlight.lightNum = 0;
            } else {
              this.volumeAndlight.lightNum -= dev;
            }
          }
        }
      }
      this.volumeAndlight.lastY = y;
    },
    closeVolumeAndLight() {
      this.volumeAndlight.lastY = 0;
      this.volumeAndlight.volume = false;
      this.volumeAndlight.light = false;
    },
    makingDanmaku() {
      this.isMakingDanmaku =
        this.isMakingDanmaku === "点我发弹幕" ? "弹幕输入中" : "点我发弹幕";
      this.showBottomInput = !this.showBottomInput;
    },
    bottomFocus() {
      this.sheetVisible = true;
    },
    bottomBlur() {
      this.sheetVisible = false;
    },
    bus() {
      this.$Bus.$on("goToShare", () => {
        this.share();
      });
    },
    sendDanmaku() {
      let fonsize = 25,
        color = 16777215,
        mode = "滚动";
      if (Object.keys(this.$store.state.userInfo).length <= 0) {
        Toast({
          message: "请先登录！",
          duration: 3000,
          positoon: "middle"
        });
        return false;
      }
      if (this.danmaku === "") {
        Toast({
          message: "弹幕为空~~",
          duration: 3000,
          positoon: "middle"
        });
        return false;
      } else {
        fonsize = this.fullScreenDanmakuStyleList.isSelectFontSize;
        mode = this.fullScreenDanmakuStyleList.isSelectMode;
        color = this.fullScreenDanmakuColorList.selected;
        this.showDanmakuList.push({
          date: new Date().getDay(),
          time: new Date().getTime() / 1000,
          text: this.danmaku,
          mode,
          fonsize,
          color,
          userID: this.$store.state.userInfo.identy.uuid
        });
        this.danmaku = "";
        this.showBottomInput = false;
        this.sheetVisible = false;
        Toast({
          message: "发送成功！",
          duration: 3000,
          positoon: "middle"
        });
      }
    },
    selectedStyle(type, i) {
      switch (type) {
        case 0:
          this.fullScreenDanmakuStyleList.isSelectFontSize = this.fullScreenDanmakuStyleList.fontSize[
            i
          ].fontSize;
          switch (i) {
            case 0:
              this.fullScreenDanmakuStyleList.fontSize[0].selected = this.fullScreenDanmakuStyleList.fontSize[0].active;
              this.fullScreenDanmakuStyleList.fontSize[1].selected = this.fullScreenDanmakuStyleList.fontSize[1].default;
              break;
            case 1:
              this.fullScreenDanmakuStyleList.fontSize[1].selected = this.fullScreenDanmakuStyleList.fontSize[1].active;
              this.fullScreenDanmakuStyleList.fontSize[0].selected = this.fullScreenDanmakuStyleList.fontSize[0].default;
              break;
          }
          break;
        case 1:
          this.fullScreenDanmakuStyleList.isSelectMode = this.fullScreenDanmakuStyleList.mode[
            i
          ].mode;
          switch (i) {
            case 0:
              this.fullScreenDanmakuStyleList.mode[0].selected = this.fullScreenDanmakuStyleList.mode[0].active;
              this.fullScreenDanmakuStyleList.mode[1].selected = this.fullScreenDanmakuStyleList.mode[1].default;
              this.fullScreenDanmakuStyleList.mode[2].selected = this.fullScreenDanmakuStyleList.mode[2].default;
              break;
            case 1:
              this.fullScreenDanmakuStyleList.mode[1].selected = this.fullScreenDanmakuStyleList.mode[1].active;
              this.fullScreenDanmakuStyleList.mode[0].selected = this.fullScreenDanmakuStyleList.mode[0].default;
              this.fullScreenDanmakuStyleList.mode[2].selected = this.fullScreenDanmakuStyleList.mode[2].default;
              break;
            case 2:
              this.fullScreenDanmakuStyleList.mode[2].selected = this.fullScreenDanmakuStyleList.mode[2].active;
              this.fullScreenDanmakuStyleList.mode[0].selected = this.fullScreenDanmakuStyleList.mode[0].default;
              this.fullScreenDanmakuStyleList.mode[1].selected = this.fullScreenDanmakuStyleList.mode[1].default;
              break;
          }
          break;
        case 2:
          this.fullScreenDanmakuColorList.selected = this.fullScreenDanmakuColorList.list[
            i
          ];
          break;
      }
    },
    selectColor() {
      this.selectModeType = !this.selectModeType;
    },
    saySorry() {
      Toast({
        message: "这里实现不了，太难了",
        position: "top",
        duration: 3000
      });
    },
    startLock() {
      this.fullScreenLock = true;
      this.videoBarDisappear = false;
    },
    cancelLock() {
      this.fullScreenLock = false;
      this.videoBarDisappear = false;
    },
    shot() {
      this.videoBarDisappear = true;
      this.$nextTick(() => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 120;
        ctx.drawImage(
          this.$refs.videoOuter.children[1].children[0].children[0],
          0,
          0,
          200,
          120
        );
        this.dataURL = canvas.toDataURL("image/png");
        this.showShot = true;
        this.videoBarDisappear = false;
        this.shotTimer = setTimeout(() => {
          this.showShot = false;
          this.dataURL = "";
          clearTimeout(this.shotTimer);
          this.shotTimer = null;
          this.videoBarDisappear = false;
        }, 5000);
      });
    },
    shareTheShot() {
      clearTimeout(this.shotTimer);
      this.shotTimer = null;
      try {
        plus.share.getServices(
          s => {
            let bitmap = new plus.nativeObj.Bitmap();
            bitmap.loadBase64Data(
              this.dataURL.split(",")[1].toString(),
              () => {
                bitmap.save(
                  "_downloads/video_shot.png",
                  {
                    overwrite: true,
                    format: "png",
                    quality: 100
                  },
                  () => {
                    plus.gallery.save(
                      "_downloads/video_shot.png",
                      () => {
                        plus.nativeUI.toast("保存成功！");

                        // 可取值：
                        // "WXSceneSession"分享到微信的“我的好友”；
                        // "WXSceneTimeline"分享到微信的“朋友圈”中；
                        // "WXSceneFavorite"分享到微信的“我的收藏”中。
                        // 默认值为"WXSceneSession"`
                        s[2].send(
                          {
                            type: "image",
                            pictures: ["_downloads/video_shot.png"],
                            title: "蛋哩蛋哩截图"
                          },
                          () => {
                            this.showShot = false;
                            this.dataURL = "";
                            this.videoBarDisappear = false;
                            bitmap.recycle();
                          },
                          e => {
                            bitmap.recycle();
                            console.log("发送失败" + JSON.stringify(e));
                          }
                        );
                      },
                      e => {
                        console.log("放入Gallay失败" + JSON.stringify(e));
                      }
                    );
                  },
                  () => {
                    this.showShot = false;
                    this.dataURL = "";
                    this.videoBarDisappear = false;
                    bitmap.recycle();
                    console.log("保存失败");
                  }
                );
              },
              () => {
                this.showShot = false;
                this.dataURL = "";
                this.videoBarDisappear = false;
                bitmap.recycle();
                console.log("失败");
              }
            );
          },
          e => {
            this.showShot = false;
            this.dataURL = "";
            this.videoBarDisappear = false;
            bitmap.recycle();
            console.log("获取分享服务列表失败：" + JSON.stringify(e));
          }
        );
      } catch {
        this.showShot = false;
        this.dataURL = "";
        this.videoBarDisappear = false;
        alert("该功能仅提供真机");
      }
    },
    // 实现画中画功能
    P_In_P() {
      // 第一步，获取DOM
      this.$nextTick(() => {
        try {
          // up用了插件，所以不能直接获取视频元素
          let video = this.$refs.videoOuter.children[1].children[0].children[0];
          // 第二步， 给DOM添加开启、关闭画中画的监听事件
          // 开启
          video.addEventListener("enterpictureinpicture", () => {});
          // 关闭
          video.addEventListener("leavepictureinpicture", () => {});

          // 第三步， 开启、关闭事件
          if (!document.pictureInPictureElement) {
            // 开启
            video.requestPictureInPicture().catch(() => {});
          } else {
            // 关闭
            document.exitPictureInPicture().catch(() => {});
          }
        } catch {
          alert("哥，移动端好像不支持");
        }
      });
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
      let height = "5.65rem";
      if (this.videoDetail) {
        height = this.videoDetail.offsetHeight;
      }
      return { height: height };
    },
    danmakuheight() {
      let height = "4.65rem";
      if (this.videoDetail) {
        if (this.isInFullScreen) {
          height = this.videoDetail.offsetHeight - window.innerWidth / 30;
        } else {
          height = this.videoDetail.offsetHeight - window.innerWidth / 10;
        }
      }
      return { height: height };
    },
    light() {
      let num = this.volumeAndlight.lightNum;
      return { filter: `brightness(${50 + 65 * num}%)` };
    },
    speed() {
      let speed = 0;
      return l => {
        if (l < 5) {
          speed = 15 - l;
        } else if (l < 20 && l >= 5) {
          speed = 25 - l;
        } else if (l >= 20) {
          speed = 35 - l;
        }
        return speed + "s";
      };
    }
  },
  watch: {
    videoDetail(newVal) {
      if (newVal) {
        this.popHeight = `calc(100vh - ${newVal.offsetHeight}px)`;
        this.posterHeight = newVal.offsetHeight;
        this.danmakuItemHeight = newVal.offsetHeight - window.innerWidth / 10;
      }
    },
    closeTheDanmaku(newVal) {
      if (newVal) {
        this.showBottomInput = false;
        this.isMakingDanmaku = "";
        this.fullScreenDanmakuImg = require("assets/img/video/close_danmaku_white.svg");
        this.navbarImg = require("assets/img/video/close_danmaku.svg");
      } else {
        this.fullScreenDanmakuImg = require("assets/img/video/open_danmaku_white.svg");
        this.navbarImg = require("assets/img/video/open_danmaku.svg");
        let timer = setTimeout(() => {
          this.isMakingDanmaku = "点我发弹幕";
          clearTimeout(timer);
          timer = null;
        }, 300);
      }
    },
    currentTime(newVal) {
      this.lastTime = newVal;

      for (let i = 0; i < this.danmakuData.length; i++) {
        let front = newVal - 2;

        if (
          front <= this.danmakuData[i].time &&
          this.danmakuData[i].time <= newVal
        ) {
          let item = this.danmakuData.splice(i, 1)[0];
          item["position"] =
            Math.random() * (this.danmakuItemHeight / 1.5) + "px";
          this.showDanmakuList.push(item);
        } else if (this.danmakuData[i].time > newVal) {
          break;
        }
      }
    },
    async $route() {
      if (this.$route.path.indexOf("video-detail") !== -1) {
        let list = this.$store.state.routeList;
        let bvid = this.$route.params.bvid;
        if (list.indexOf(bvid) === -1) {
          this.isOk = false;
          await this.getAllData();
          this.$store.commit("pushInRouteList", bvid);
        } else {
          if (list[list.length - 1] !== bvid) {
            this.isOk = false;
            await this.getAllData();
            this.$store.commit("pushInRouteList", bvid);
          }
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
    font-size: 0.35rem;
  }
  .head {
    position: sticky;
    top: 0;
    z-index: 999;
    .bg {
      position: relative;
      .video-outer {
        position: relative;
        @media screen and (orientation: portrait) {
        }
        @media screen and (orientation: landscape) {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .danmaku-outer {
          position: absolute;
          width: 10rem;
          height: 4.65rem;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
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
              border-bottom: 0.02rem solid rgb(71, 233, 22);
            }
          }

          .mode-scroll-right {
            display: inline-block;
            transform: translate3d(10rem, 0, 0);
            animation: slideright linear forwards;
          }
          .mode-scroll-left {
            display: inline-block;
            transform: translate3d(-10rem, 0, 0);
            animation: slideleft linear forwards;
          }
          .mode-fixed-top,
          .mode-fixed-bottom {
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
              transform: translate3d(10rem, 0, 0);
            }
            100% {
              transform: translate3d(-10rem, 0, 0);
              position: absolute;
              display: none;
              z-index: -999;
              visibility: hidden;
            }
          }
          @keyframes slideleft {
            0% {
              transform: translate3d(-10rem, 0, 0);
            }
            100% {
              transform: translate3d(10rem, 0, 0);
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
          transition: 0.3s;
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
          @media screen and (orientation: landscape) {
            // position: absolute;
            top: 0;
            // bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 90vw;
          }
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
        .is-in-full-screen {
          z-index: 1008;
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          color: #fff;
          font-size: 0.25rem;
          @media screen and (orientation: portrait) {
            display: none;
          }
          .full-screen-head {
            height: 0.7rem;
            width: 100vw;
            padding: 0 0.3rem;
            display: flex;
            z-index: 1009;
            align-items: center;
            justify-content: space-between;
            background-image: linear-gradient(
              rgba(0, 0, 0, 0.3) 0%,
              transparent 100%
            );
            .full-screen-head-left {
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 0.5rem;
                height: 0.5rem;
                img {
                  width: 0.25rem;
                  height: 0.25rem;
                }
                &:nth-child(2) {
                  width: 0.6rem;
                  height: 0.3rem;
                  background-color: rgba(255, 255, 255, 0.2);
                  border-radius: 0.05rem;
                  font-size: 0.2rem;
                }
                &:nth-child(3) {
                  width: 4rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  justify-content: flex-start;
                  margin-left: 0.1rem;
                }
              }
            }
            .full-screen-head-right {
              display: flex;
              justify-content: space-around;
              align-items: center;
              span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.8rem;
                font-size: 0.25rem;
                img {
                  width: 0.4rem;
                  height: 0.4rem;
                }
                &:first-child {
                  width: 2rem;
                  .battery {
                    margin-left: 0.1rem;
                  }
                }
                &:last-child {
                  img {
                    width: 0.6rem;
                    height: 0.6rem;
                  }
                }
              }
            }
          }
          .full-screen-right {
            position: absolute;
            right: 0rem;
            height: 3.5rem;
            width: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 0.3rem 0 0;
            span {
              display: flex;
              align-items: center;

              img {
                width: 0.5rem;
                height: 0.5rem;
              }
              &:first-child {
                margin-bottom: 0.5rem;
              }
            }
          }
          .full-screen-footer {
            padding: 0 0.4rem;
            width: 100vw;
            position: absolute;
            bottom: 0rem;
            display: flex;
            flex-direction: column;
            width: 100vw;
            background-image: linear-gradient(
              360deg,
              rgba(0, 0, 0, 0.3) 0%,
              transparent 100%
            );
            .process {
              flex: auto;
              position: relative;
              // height: .5rem;
              display: flex;
              align-items: center;
              img {
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
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
                opacity: 0.4;
                width: 92vw;
              }
              .now {
                z-index: 1000;
                opacity: 0.9;
                left: 0;
                background-color: var(--color-tint);
              }
            }
            .full-screen-footer-2 {
              height: 0.6rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 0.2rem;
              div {
                &:first-child,
                &:nth-child(2),
                &:nth-child(5),
                &:nth-child(6),
                &:last-child {
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 0.5rem;
                  height: 0.5rem;
                  font-size: 0.2rem;
                  img {
                    width: 0.35rem;
                    height: 0.35rem;
                  }
                }
                &:nth-child(2) {
                  margin-left: -0.2rem;
                }
                &:nth-child(3) {
                  width: 1.6rem;
                  display: flex;
                  margin-left: -0.4rem;
                  align-items: center;
                  font-size: 0.2rem;
                  justify-content: center;
                }
                &:nth-child(4) {
                  width: 0.5rem;
                  height: 0.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: 0.6s;
                  margin-left: -0.5rem;
                  img {
                    width: 0.3rem;
                    height: 0.3rem;
                  }
                }

                .change-bg-color {
                  transition: 0.4s;
                  background-color: transparent;
                }
                &:nth-child(5) {
                  width: 5rem;
                  font-size: 0.2rem;
                  padding: 0.2rem;
                  height: 0.4rem;
                  background-color: rgba(100, 100, 100, 0.5);
                  border-radius: 0.1rem;
                  transition: 0.3s;
                }

                &:nth-child(6) {
                  justify-content: center;
                }
                &:last-child {
                  justify-content: center;
                }
              }
              .cant-see {
                transition: 0.3s;
                opacity: 0;
              }
            }
          }
          .full-screen-left {
            position: absolute;
            top: 0;
            height: 90vh;
            display: flex;
            align-items: center;

            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
          .full-screen-pop {
            color: #fff;
            height: 100vh;
            // background-color: rgba(0, 0, 0, 0.3);
            .pop {
              width: 20vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(0, 0, 0, 0.7);
              ul {
                li {
                  list-style: none;
                  height: 10vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .is-in-active-rate {
                  color: var(--color-tint);
                }
              }
            }
          }
          .full-screen-video-end {
            position: absolute;
            overflow: hidden;
            top: 0;
            left: 0;
            width: 100vw;
            padding: 0 0.5rem;
            height: 100vh;
            z-index: 1008;
            background-color: rgba(37, 37, 37, 0.88);
            .full-screen-video-end-1 {
              height: 1.4rem;
              display: flex;
              align-items: center;
              margin-top: 0.85rem;
              border-bottom: 0.02rem solid rgba(253, 253, 253, 0.1);
              justify-content: space-between;
              .up-follows {
                display: flex;
                align-items: center;
                justify-content: space-between;
                div {
                  margin-right: 0.2rem;
                  &:first-child {
                    background-color: #fff;
                    width: 1rem;
                    height: 1rem;
                    display: flex;
                    border-radius: 100%;
                    align-items: center;
                    justify-content: center;
                    background-size: 0.5rem 0.5rem;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                    img {
                      border-radius: 100%;
                      position: relative;
                      width: 0.95rem;
                      height: 0.95rem;
                    }
                  }
                  &:last-child {
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    span {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #fff;
                      &:last-child {
                        width: 1rem;
                        height: 0.34rem;
                        position: relative;
                        margin-top: 0.2rem;
                        font-size: 0.2rem;
                        border-radius: 0.05rem;
                        background-color: var(--color-tint);
                        &::before {
                          content: "+";
                          font-size: 0.4rem;
                          margin-right: 0.1rem;
                        }
                      }
                    }
                  }
                }
              }
              .actions {
                // height: 1.4rem;
                flex: auto;
                display: flex;
                align-items: center;
                font-size: 0.2rem;
                justify-content: space-around;
                .actions-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  // height: .7rem;
                  span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // margin-bottom: .2rem;
                    img {
                      width: 0.35rem;
                      height: 0.35rem;
                    }
                    &:first-child {
                      margin-bottom: 0.2rem;
                    }
                  }
                  &:nth-child(2) {
                    img {
                      width: 0.4rem;
                      height: 0.4rem;
                    }
                  }
                }
              }
            }
            .full-screen-video-end-2 {
              display: flex;
              margin-top: 0.2rem;
              width: 100vw;
              flex-direction: column;
              color: #fff;
              overflow: hidden;
              font-size: 0.2rem;
              .full-screen-video-end-2-title {
                height: 0.3rem;
              }
              .scroll-list {
                display: flex;
                align-items: center;
                width: 100vw;
                overflow-x: scroll;
                .scroll-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .scroll-inner {
                    margin-right: 0.2rem;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    width: 2.5rem;
                    height: 2rem;

                    .scroll-inner-cover {
                      position: relative;
                      width: 2.5rem;
                      height: 1.5rem;
                      border-radius: 0.05rem;
                      background-size: 0.5rem 0.5rem;
                      background-color: rgba(0, 0, 0, 0.5);
                      background-position: center center;
                      background-repeat: no-repeat;
                      background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
                      img {
                        border-radius: 0.05rem;
                        width: 2.5rem;
                        height: 1.5rem;
                      }
                      .info {
                        position: absolute;
                        bottom: 0.01rem;
                        display: flex;

                        justify-content: space-between;
                        font-size: 0.15rem;
                        align-items: center;
                        width: 2.5rem;
                        height: 0.3rem;
                        padding: 0 0.03rem;
                        color: rgb(238, 235, 235);
                        span {
                          display: flex;
                          align-items: center;
                          flex: auto;
                          justify-content: flex-start;
                          &:nth-child(2) {
                            margin: 0 0 0 -0.15rem;
                          }
                          &:nth-child(3) {
                            justify-content: flex-end;
                          }
                          img {
                            width: 0.2rem;
                            height: 0.2rem;
                          }
                        }
                      }
                    }
                    .scroll-inner-title {
                      position: relative;
                      width: 2.5rem;
                      height: 0.5rem;
                      line-height: 0.5rem;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                  }
                  .not-show {
                    width: 0;
                    height: 0;
                    display: none;
                  }
                }
              }
              .scroll-list::-webkit-scrollbar {
                display: none;
              }
            }
            .full-screen-video-end-2::-webkit-scrollbar {
              display: none;
            }
          }
        }
        .shot-img {
          @media screen and (orientation: portrait) {
            display: none;
          }

          height: 12.5vw;
          position: absolute;
          background-color: #fff;
          border-radius: 0.05rem;
          z-index: 2000;
          top: 1.5rem;
          right: 10vw;
          display: flex;
          align-items: center;
          justify-content: center;

          animation: shake 2.5s linear infinite alternate-reverse;
          &::after {
            width: 21vw;
            text-align: center;
            content: "点击分享";
            position: absolute;
            color: #fff;
            font-weight: bold;
            bottom: 0rem;
            font-size: 0.25rem;
            right: 0rem;
          }
          img {
            border-radius: 0.05rem;
            width: 20vw;
            height: 12vw;
          }
        }
        @keyframes shake {
          0% {
            transform: translateY(0rem);
          }
          25% {
            transform: translateY(-0.1rem);
          }
          50% {
            transform: translateY(0rem);
          }
          75% {
            transform: translateY(0.1rem);
          }
          100% {
            transform: translateY(0rem);
          }
        }
        .full-screen-input {
          @media screen and (orientation: portrait) {
            display: none;
          }
          z-index: 2000;
          font-size: 0.2rem;
          position: absolute;
          top: 0rem;
          width: 100vw;
          padding: 0 0.5rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            transparent 100%
          );
          .full-screen-input-danmaku {
            width: 90vw;
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            input {
              width: 80vw;
              height: 0.4rem;
              display: flex;
              background-color: #fff;
              outline: none;
              border: none;
              align-items: center;
              border-radius: 0.05rem;
              padding-left: 0.05rem;
            }
            input::-webkit-input-placeholder {
              color: rgb(153, 153, 153);
              font-size: 0.2rem;
            }
            img {
              width: 0.4rem;
              height: 0.4rem;
            }
          }
          .select-style {
            margin-top: 0.2rem;
            transition: 0.3s;
            width: 50vw;
            height: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .front-btn,
            .back-btn {
              width: 0.3rem;
              height: 0.3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              background-position: center center;
              background-image: url("~assets/img/video/back_white.svg");
            }
            .front-btn {
              opacity: 0;
            }
            .back-btn {
              transform: rotateZ(180deg);
            }
            .danmaku-style-list {
              width: 50vw;
              display: flex;
              align-items: center;
              justify-content: space-between;
              overflow: hidden;
              .font-size-mode,
              .color {
                transform: translateX(0vw);
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 50vw;
                .font-size-item,
                .mode-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: 0.3s;
                  width: 8vw;
                  height: 6vw;
                  img {
                    transition: 0.3s;
                    width: 6vw;
                    height: 4vw;
                  }
                }
                .font-size-item {
                  img {
                    width: 6vw;
                    height: 5vw;
                  }
                }
              }
              .color {
                transform: translateX(80vw);
                .color-item {
                  width: 5vw;
                  height: 3.5vw;
                  border-radius: 0.05rem;
                  margin-right: 0.05rem;
                }
                .selected-color {
                  border: 0.03rem solid var(--color-tint);
                }
              }
            }
          }
          .when-select-color {
            transition: 0.3s;
            width: 80vw;
            .front-btn {
              opacity: 1;
            }
            .back-btn {
              opacity: 0;
            }
            .danmaku-style-list {
              width: 80vw;
              .font-size-mode,
              .color {
                width: 80vw;
              }
              .font-size-mode {
                transform: translateX(-40vw);
              }
              .color {
                transform: translateX(-35vw);
              }
            }
          }
        }
        .bg-head-disappear {
          transition: 0.5s;
          opacity: 0;
        }
        .video-bar {
          @media screen and (orientation: landscape) {
            display: none;
          }
          position: absolute;
          transition: 0.5s;
          width: 10rem;
          z-index: 1006;
          display: flex;
          align-self: center;
          justify-content: space-between;
          bottom: 0rem;
          background-image: linear-gradient(
            360deg,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 100%
          );
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
          transition: 0.3s;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 1rem;
          width: 4rem;
          height: 1.1rem;
          background-color: rgba(0, 0, 0, 0.35);
          border-radius: 0.1rem;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.4rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
          .smaller {
            width: 0.55rem;
            height: 0.55rem;
          }
          .line {
            position: relative;
            width: 2rem;
            span {
              height: 0.05rem;
              position: absolute;
              &:first-child {
                z-index: 1001;
                background-color: var(--color-tint);
              }
              &:last-child {
                width: 2rem;
                z-index: 1000;
                background-color: rgba(255, 255, 255, 0.3);
              }
            }
          }
          @media screen and (orientation: landscape) {
            width: 2rem;
            height: 0.6rem;
            border-radius: 0.05rem;
            display: flex;
            img {
              margin-left: -0.15rem;
              width: 0.3rem;
              height: 0.3rem;
            }
            .smaller {
              width: 0.275rem;
              height: 0.275rem;
            }
            .line {
              position: relative;
              width: 1rem;
              margin-left: 0.1rem;
              span {
                height: 0.025rem;
                position: absolute;
                &:first-child {
                  z-index: 1001;
                  background-color: var(--color-tint);
                }
                &:last-child {
                  width: 1rem;
                  z-index: 1000;
                  background-color: rgba(255, 255, 255, 0.3);
                }
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
          @media screen and (orientation: landscape) {
            width: 1rem;
          }
        }
        .bottom-now {
          @media screen and (orientation: landscape) {
            display: none;
          }
          position: absolute;
          z-index: 1000;
          transition: 0.3s;
          opacity: 0.9;
          left: 0;
          bottom: 0rem;
          height: 0.05rem;
          border-radius: 0.2rem;
          background-color: var(--color-tint);
        }
        .video-bar-disappear {
          transition: 0.5s;
          opacity: 0;
        }
        .video-end {
          @media screen and (orientation: landscape) {
            display: none;
          }
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: flex-end;
          position: absolute;
          top: 0;
          width: 10rem;
          height: 5.65rem;
          z-index: 1008;
          background-color: rgba(37, 37, 37, 0.88);
          padding: 0 0.3rem;
          .video-end-head {
            height: 0.6rem;
            line-height: 0.6rem;
          }
          .video-end-center {
            display: flex;
            align-items: center;
            justify-content: space-between;
            list-style: none;
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
                position: absolute;
                width: 3rem;
                height: 2rem;
                border-radius: 0.1rem;
              }
              .replay {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 0.6rem;
                height: 0.6rem;
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
                color: #fff;
                font-size: 0.42rem;
                width: 6rem;
                height: 1.2rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .time-play {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .time-play-left {
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
                    }
                  }
                }
                .immediate {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 0.8rem;
                  width: 2rem;
                  border-radius: 0.1rem;
                  color: #fff;
                  background-color: rgb(79, 79, 79);
                }
              }
            }
          }
          .video-end-footer {
            height: 1.4rem;
            display: flex;
            align-items: center;
            .video-end-1,
            .video-end-2 {
              display: flex;
              align-items: center;
              font-size: 0.4rem;
              color: #fff;
              margin-right: 0.3rem;
              img {
                width: 0.6rem;
                height: 0.6rem;
                margin-right: 0.2rem;
              }
            }
            .video-end-2 {
              img {
                width: 0.8rem;
                height: 0.8rem;
                margin-bottom: 0.1rem;
              }
            }
          }
        }
      }
      .bg-head {
        @media screen and (orientation: landscape) {
          display: none;
        }
        transition: 0.5s;
        position: absolute;
        top: 0rem;
        z-index: 1009;
        width: 10rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.3) 0%,
          transparent 100%
        );
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
          transition: 0.4s;
          height: 0.8rem;
          background-color: rgb(20, 20, 20);
          display: flex;
          align-items: center;
          border-radius: 0.4rem;
          border: 0.01rem solid rgba(100, 100, 100, 0.2);
          .here-danmaku {
            transition: 0.4s;
            width: 2.4rem;
            font-size: 0.32rem;
            text-align: center;
          }
          .enter-bar-disappear {
            transition: 0.4s;
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
            transition: 0.6s;
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
            transition: 0.4s;
            background-color: transparent;
          }
        }
        // .close-danmaku-active {

        // }
      }
    }
  }
  .in-desc {
    z-index: -1;
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
              content: "+";
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
        font-size: 0.35rem;
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
                  padding: 0.3rem;
                  li {
                    border: none;
                    // margin-bottom: -0.2rem;
                    line-height: 0.6rem;
                    padding: 0;
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
        border-bottom: 0.01rem solid rgb(20, 20, 20);
        // box-shadow: 0 0.1rem 0.1rem rgb(20, 20, 20);
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
    padding: 0 0.3rem;
    input {
      height: 0.8rem;
      width: 8.4rem;
      border-radius: 1rem;
      background-color: rgb(20, 20, 20);
      border: none;
      outline: none;
      padding-left: 0.3rem;
      color: var(--color-tint);
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
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
