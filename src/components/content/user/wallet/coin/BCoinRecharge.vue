<template>
  <div id="B-coin-recharge">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">B币充值</span>
        <span class="detail" @click="instruction(1)">使用说明</span>
      </div>
      <div class="content">
        <div class="content-head">
          <span>可用余额</span>
          <span>
            <span>0.3</span>B币
          </span>
        </div>
        <div class="content-main">
          <div
            class="item"
            v-for="(item, index) in list"
            :key="item.B"
            :class="{ 'is-selected': isSelect === index }"
            @click="select(index)"
            v-waves
          >
            <div class="B">
              <span>{{ item.B }}</span> B币
            </div>
            <div class="RMB">{{ item.RMB }}</div>
          </div>
        </div>
        <div class="content-footer">
          <input type="text" id="customize" v-model="charge" placeholder="自定义B币数量（1-5000）" />
        </div>
      </div>
      <div class="footer">
        <div class="footer-agreement">
          支付即同意
          <span @click="instruction(0)">B币用户协议</span>
        </div>
        <div class="footer-btn" @click="instruction(2)">{{payType + charge}}</div>
      </div>
    </div>
    <div class="popup" v-if="popState !== 2">
      <mt-popup class="pop" v-model="popupVisible" position="right">
        <div class="pop-head">
          <span @click="goToLastRouter()"></span>
          <span>使用说明</span>
        </div>
        <div class="pop-content" v-if="popState === 1">
          <div class="pop-content-item" v-for="item in instructionList" :key="item.title">
            <h4 class="title">{{ item.title }}</h4>
            <p class="desc">{{item.desc}}</p>
            <p v-for="sentence in item.sentences" :key="sentence">{{ sentence }}</p>
          </div>
        </div>
        <div class="pop-content-2" v-if="popState === 0">
          <h4>更新时间：2019年6月</h4>
          <h5>特别提示</h5>
          <p>
            《B币用户协议》（以下简称“本协议”）适用于所有使用B币的用户（以下或称“您”）。本协议一经同意并接受，即形成您与哔哩哔哩间具有法律约束力之文件。您确认，您已详细阅读了本协议所有内容，您充分理解并同意接受本协议的全部内容。哔哩哔哩还需要提醒您的是，如本协议内容发生修改或更新，哔哩哔哩将会在B币充值面板提示修改内容并公布。您在使用哔哩哔哩提供的各项服务之前，应仔细阅读本协议，如您不同意变更后的协议内容，应立即停用B币服务。
            您的使用行为（包括但不限于点击充值、支付行为等）将视为您同意接受本协议及《哔哩哔哩弹幕网用户使用协议》、《哔哩哔哩弹幕网账号中心规范》以及哔哩哔哩相关协议规范，包括哔哩哔哩不时发布的相关条款和规则（简称为“bilibili服务条款”）全部内容的约束。您充值和/或使用B币时，可能会因为您使用的软件版本、设备、操作系统等不同以及第三方原因造成差别，由此可能给您带来的不便，您表示理解，并不会因此向哔哩哔哩提出任何主张或追究哔哩哔哩任何责任。
          </p>
          <p>如果您为未成年人，请在法定监护人的陪同下阅读和判断是否同意本协议。</p>
          <h5>B币使用规则</h5>
          <p>1. B币是哔哩哔哩为您提供的用于在哔哩哔哩平台上进行消费的虚拟币，只可用于购买哔哩哔哩平台上的各种虚拟产品和增值服务。 B币和人民币的兑换比例是 1:1。 B币在任何情况下都不能兑换成法定货币，请您根据自己的实际需求购买相应数量的B币。</p>
          <p>2. B币充值就是用人民币购买 B币。您仅可为自己充值，充值成功后可用 B币在哔哩哔哩平台消费。您必须采用哔哩哔哩指定的充值方式进行充值，以增加您账户所拥有的 B币数量，可供充值方式包括但不限于：支付宝、微信、QQ钱包、苹果内购、网银、Google Pay（仅适用中国大陆地区以外的用户）等（具体充值方式仍以哔哩哔哩实际展示为准）。您知晓并确认，若使用非哔哩哔哩所指定的方式或渠道进行 B币充值，或以非法的方式进行 B币充值而造成用户权益受损时，不得因此要求哔哩哔哩作任何补偿或赔偿。</p>
          <p>3. 用户必须为绑定的支付渠道账户开户人/持有人，可合法、有效使用该账户且未侵犯任何第三方权益，否则因此造成支付账户实际所有人损失的，应由用户单独负责解决由此产生的纠纷并承担全部法律责任。</p>
          <p>
            4. 您知晓并承诺，在使用B币时不进行如下行为：
            <span>（1）以营利、经营等非个人使用目的充值B币；</span>
            <span>（2）以非哔哩哔哩指定的方式或渠道充值B币；</span>
            <span>（3）通过任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件等任何程序、软件方式充值B币；</span>
            <span>（4）通过侵犯bilibili或他人合法权益的方式充值B币；</span>
            <span>（5）利用哔哩哔哩现有或潜在的软件或规则漏洞或与哔哩哔哩合作的或关联的第三方产品（如支付渠道等）漏洞充值B币；</span>
            <span>（6）通过任何不正当手段或以违反诚实信用原则的方式充值B币；</span>
            <span>（7）通过任何其他违反相关法律、行政法规、国家政策的方式充值B币；</span>
          </p>
          <p>5. 您知晓并确认，用户一旦充值成功，B币充值即确定完成。哔哩哔哩不提供退还或逆向兑换服务。</p>
          <p>6. 您知晓并确认，iOS平台仅支持iOS内购充值，且iOS充值的B币仅可在iOS平台使用。</p>
          <p>7. 您知晓并确认，未使用的 B币会进入您的B币账户，哔哩哔哩终止运营或者运营权发生转移的，应提前 60日予以公告。用户尚未使用的 B币及尚未失效的服务，应当按用户购买时的比例，以法定货币退还用户或者以用户接受的其他方式进行退还。</p>
          <p>8. 您知晓并确认，在使用 B币充值系统时，您必须仔细确认充值账号，若因为您自身未登录账号、输入账号错误、操作不当或不了解充值计费方式等个人因素造成当前游客账号登出、充错账号、错选充值金额等情形而损害自身权益，由此带来的损失由用户自行承担。若因充值系统原因造成您充值失实，在您提供合法有效凭证的情况下，造成 B币充值额小于您实际充值额的，哔哩哔哩予以补其差额，若大于您实际充值额的，哔哩哔哩有权追回差额。</p>
          <p>9. 您可随时在网页端或手机APP上查看您的账户B币余额。如您对该记录有异议，应立即向哔哩哔哩提出，哔哩哔哩核对后确有错误的，将予以改正；否则您同意哔哩哔哩平台上的交易记录作为B币充值和消费的唯一有效依据。</p>
          <p>
            10. 您知晓并确认，如您违反本协议任何条款，哔哩哔哩均有权不经您事先同意而对您或您的账号进行如下处理：
            <span>（1）对您账号的B币充值和消费功能进行临时冻结，冻结期限由哔哩哔哩视情况决定；</span>
            <span>（2）对您的账号进行永久封禁；</span>
            <span>（3）对您账号（或有证据证明与您关联或由您控制的其他账号）中的B币余额或其他虚拟产品进行全部或部分扣除；</span>
            <span>（4）中止或终止向您的账号（或有证据证明与您关联或由您控制的其他账号）提供增值服务；</span>
            <span>（5）要求您以法定货币等价返还已经消费的、以非正常方式充值的B币（包括以充电、打赏、赠予等方式已经消费掉的B币）；</span>
            <span>（6）要求您进一步赔偿给哔哩哔哩造成的损失；</span>
            <span>（7）若您的行为已涉及违法犯罪，则哔哩哔哩有权移交司法机关处理。</span>
            <span>哔哩哔哩有权依据您行为的性质和严重程度决定对您或您的账号采取上述一种或多种处理方式。在您的行为给哔哩哔哩造成的影响或损失未消除或未得到弥补前，哔哩哔哩有权决定对您或您的账号持续采取上述处理方式。如您对上述处理方式不服或有疑问，您可以联系客服进行申诉，但您需要提供客观、真实、有效的证据，包括但不限于充值记录、消费记录等。</span>
          </p>
          <p>11. 您知晓并确认， B币支付使用哔哩哔哩平台的统一密码，请妥善保管好您的密码。当您的账户遇到争议时（例如挂失或重置密码），我们有权根据您的注册和绑定信息对您的身份进行识别。但在目前的技术水平下，我们所能采取的方法有限，且在网络上进行用户身份识别存在一定的困难，因此，我们对鉴定用户身份的准确性和绝对真实性不做任何保证。</p>
          <p>12. 您可以凭注册信息及注册联系方式联系客服挂失冻结账户，但如因您本人的挂失时间延迟，而导致此期间内发生消费或充值损失，由此带来的损失由用户自行承担。•苹果设备（仅限iPhone及iPad）上，您也可在游客状态下进行B币充值，但仅限于在该设备使用B币。如您更换设备等造成登录状态丢失，无法找回B币， 由此带来的损失由用户自行承担。</p>
          <h5>免责事由</h5>
          <p>
            13. 您知悉并同意，哔哩哔哩不因下述任一情况而可能导致的任何损害赔偿承担责任，包括但不限于财产、收益、数据资料等方面的损失或其它无形损失：
            <span>（1）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素导致充值系统或服务不能正常运作；</span>
            <span>（2）由于黑客攻击、电信部门技术调整或故障、系统维护等原因而造成的系统服务中断或者延迟；</span>
            <span>（3）由于政府命令、法律法规的变更、司法机关及行政机关的命令、裁定等原因而导致的系统服务中断、终止或延迟；</span>
            <span>（4）由于您将账户密码告知他人或未保管好自己的密码或与他人共享账户或任何其他非哔哩哔哩的过错，导致您的个人资料泄露；</span>
            <span>（5）由于与哔哩哔哩链接或合作的其它网站（如网上银行等）所造成的银行账户信息、身份信息泄露及由此而导致的任何法律争议和后果；</span>
            <span>（6）您（包括未成年人用户）向本公司提供错误、不完整、不实信息等，造成不能使用 B账户或遭受任何其他损失；</span>
            <span>（7）如因系统维护或升级的需要而需暂停充值服务时，我们将尽可能事先进行通知。对于充值服务的中断或终止而给您造成的任何损失，我们无须对您或任何第三方承担任何责任。</span>
          </p>

          <p>
            14. 因您自身的原因导致哔哩哔哩无法提供B币购买服务或提供B币购买服务时发生任何错误而产生的任何损失或责任，由您自行负责，哔哩哔哩不承担责任，包括但不限于：
            <span>（1）您未按照本协议或哔哩哔哩不时公布的任何规则进行操作；</span>
            <span>（2）因您的哔哩哔哩账号失效、丢失、被封停；</span>
            <span>（3）因您绑定的第三方支付机构账户的原因导致的损失或责任，包括您使用未经认证的第三方支付账户或使用非您本人的第三方支付账户，您的第三方支付账户被冻结、查封等；</span>
            <span>（4）因您个人的故意或重大过失所造成的财产损失。</span>
          </p>

          <h5>违约责任</h5>
          <p>
            如您违反本协议项下的任何规则、声明、承诺及保证，我们保留根据实际损失向您追究责任的权利。
            法律适用与争议解决
          </p>
          <p>
            本协议的订立、效力、解释、履行、修改和终止以及争议的解决适用中华人民共和国法律。因解释和履行本协议而发生的任何争议，本协议双方应首先通过友好协商的方式加以解决。如果在一方向其他方发出要求协商解决的书面通知后 30天之内争议仍然得不到解决，则应将争议提交广州仲裁委员会按照其仲裁规则进行仲裁。仲裁裁决为一裁终局，对双方均有法律约束力。
            其他
            <span>1. 本协议项下所有的通知均可通过重要页面公告、平台站内信、电子邮件等方式进行，该等通知于发送之日视为已送达收件人。</span>
            <span>2. 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的，未赋予本协议各方其他权利。</span>
            <span>3. 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</span>
            <span>4. 本协议中的标题仅为方便而设，不具法律或契约效果。</span>
          </p>
        </div>
      </mt-popup>
    </div>
    <div class="popup-2" v-if="popState === 2">
      <mt-popup class="pop-2" :closeOnClickModal="false" v-model="popupVisible" position="bottom">
        <div class="pop-title">
          请在10分钟内完成支付
          <span @click="cancelPay()">
            <img src="~assets/img/wallet/B_coin/close_dark.svg" alt />
          </span>
        </div>
        <ul>
          <li v-for="(item, index) in popList" :key="item.type" @click="selectType(index)">
            <img :src="item.select" alt />
            <img :src="item.type" alt />
            {{ item.name }}
          </li>
        </ul>
        <div class="pop-footer" @click="pay()" v-waves>{{payType + charge}}</div>
      </mt-popup>
    </div>
    <div class="popup-3">
      <mt-popup class="pop-3" pop-transition="popup-fade" v-model="popup3Visible" position="middle">
        <img src="~assets/img/wallet/B_bell/B_bell_cash_out.png" alt />
        <div class="pop-3-title">确认放弃支付吗？</div>
        <div class="pop-3-sub">超过订单支付时效后，订单将被取消</div>
        <div class="btn">
          <span @click="cancel()">放弃</span>
          <span @click="goOn()">继续支付</span>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "BCoinRecharge",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      popup3Visible: false,
      isSelect: 0,
      popState: 0,
      charge: "￥6.00",
      payType: "确认支付",
      popSelectID: 0,
      list: [
        { B: "6", RMB: "￥6.00" },
        { B: "18", RMB: "￥18.00" },
        { B: "68", RMB: "￥68.00" },
        { B: "233", RMB: "￥233.00" },
        { B: "648", RMB: "￥648.00" },
        { B: "998", RMB: "￥998.00" }
      ],
      instructionList: [
        {
          title: "B币使用说明",
          desc:
            "B币是购买哔哩哔哩平台上虚拟商品的预付费凭证，只可用于购买哔哩哔哩平台上的虚拟商品/服务",
          sentences: [
            "1、B币和人民币的兑换比例为：1B币=1.00元人民币；",
            "2、充值B币采用哔哩哔哩指定的充值方式进行；",
            "3、IOS设备与安卓设别充值的B币不能互通。"
          ]
        },
        {
          title: "B币券使用说明",
          desc:
            "B币券是哔哩哔哩平台上用于营销活动发放的虚拟抵扣券，只可用于购买哔哩哔哩平台上指定的虚拟商品/服务",
          sentences: [
            "1、购买部分虚拟商品/服务时不可使用B币券，如大会员等；",
            "2、允许使用B币券购买的虚拟商品/服务，消费时优先扣除B币券；",
            "3、B币券消费，遵循先到期先消费原则；",
            "4、B币券不可充值，可以通过哔哩哔哩特定活动获取，如年费大会员每月赠送5个B币券；",
            "5、B币券具有有效期限，过期后不可使用。"
          ]
        }
      ],
      popList: [
        {
          select: require("assets/img/wallet/B_coin/circle_pink.svg"),
          type: require("assets/img/wallet/Alipay.svg"),
          name: "支付宝"
        },
        {
          select: require("assets/img/wallet/B_coin/circle_dark.svg"),
          type: require("assets/img/wallet/Wepay.svg"),
          name: "微信"
        },
        {
          select: require("assets/img/wallet/B_coin/circle_dark.svg"),
          type: require("assets/img/wallet/Qpay.svg"),
          name: "QQ支付"
        },
        {
          select: require("assets/img/wallet/B_coin/circle_dark.svg"),
          type: require("assets/img/wallet/Antpay.svg"),
          name: "花呗"
        }
      ],
      channel: null
    };
  },
  created() {},
  mounted() {},
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.go(-1);
    },
    close() {
      this.popupVisible = false;
    },
    instruction(i) {
      this.popState = i;
      this.popupVisible = true;
    },
    select(i) {
      this.isSelect = i;
      this.charge = this.list[i].RMB;
    },
    goToLastRouter() {
      this.popupVisible = false;
    },
    selectType(i) {
      if (this.popSelectID === i) {
        return false;
      }
      this.popList[
        this.popSelectID
      ].select = require("assets/img/wallet/B_coin/circle_dark.svg");
      this.popSelectID = i;
      this.popList[
        this.popSelectID
      ].select = require("assets/img/wallet/B_coin/circle_pink.svg");
      this.payType = this.popList[i].name;
    },
    cancelPay() {
      this.popup3Visible = true;
    },
    cancel() {
      this.popup3Visible = false;
      this.popupVisible = false;
    },
    goOn() {
      this.popup3Visible = false;
    },
    pay() {
      function goPay(channel, id, count) {
        plus.nativeUI.showWaiting("正在支付", {
          style: "black",
          background: "rgba(0,0,0,0)"
        });
        let ALIPAYSERVER = `http://demo.dcloud.net.cn/payment/?payid=alipay&appid=${plus.runtime.appid}&total=${count}`;
        let WXPAYSERVER = `http://demo.dcloud.net.cn/payment/?payid=wxpay&appid=${plus.runtime.appid}&total=${count}`;
        let PAYSERVER = "";
        if (id == "alipay") {
          PAYSERVER = ALIPAYSERVER;
        } else if (id == "wxpay") {
          PAYSERVER = WXPAYSERVER;
        } else {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("不支持此支付通道！", null, "捐赠");
          return;
        }
        let xhr = new plus.net.XMLHttpRequest(); //uni-app中请使用uni的request api联网
        xhr.onreadystatechange = function() {
          plus.nativeUI.closeWaiting();
          switch (xhr.readyState) {
            case 4:
              if (xhr.status == 200) {
                plus.payment.request(
                  channel,
                  xhr.responseText,
                  result => {
                    plus.nativeUI.alert("支付成功！", () => {
                      alert(result);
                    });
                  },
                  error => {
                    plus.nativeUI.alert("支付失败：" + error.code);
                  }
                );
              } else {
                alert("获取订单信息失败！");
              }
              break;
            default:
              break;
          }
        };
        xhr.open("GET", PAYSERVER);
        xhr.send();
      }
      try {
        let ids = `${parseInt(this.charge.split("￥")[1])}B币`;
        let id = "alipay";
        if (this.popSelectID === 1) {
          id = "wxpay";
        } else if (this.popSelectID >= 2) {
          alert("目前只支持支付宝和微信支付");
          return false;
        }
        // 2. 发起支付请求
        // 从服务器请求支付订单
        plus.nativeUI.showWaiting("检测支付环境...");
        plus.payment.getChannels(
          channels => {
            plus.nativeUI.closeWaiting();
            plus.nativeUI.confirm(
              `确认要购买${ids}?`,
              e => {
                if (e.index == 0) {
                  for (let i = 0; i < channels.length; i++) {
                    if (id === channels[i].id) {
                      let count = parseInt(this.charge.split("￥")[1]);
                      goPay(channels[i], id, count);
                    }
                  }
                }
              },
              "请求支付",
              ["确定", "取消"]
            );
          },
          e => {
            let timer = setTimeout(() => {
              plus.nativeUI.closeWaiting();
              alert("获取支付通道失败：" + e.message);
              clearTimeout(timer);
              timer = null;
            }, 3000);
          }
        );
      } catch {
        alert("该用能只支持真机");
      }
    }
  }
};
</script>

<style lang="less" scoped>
#B-coin-recharge {
  position: relative;
  .inner {
    color: rgb(155, 153, 153);
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .head {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-bg-color-thr);
      z-index: 99;
      border-bottom: 0.01rem solid rgb(36, 35, 35);
      .back {
        width: 1rem;
        height: 1rem;
        opacity: 0.6;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("~assets/img/video/back_white.svg");
      }
      .title {
        color: rgb(187, 186, 186);
        margin-left: 0.5rem;
        font-size: 0.45rem;
      }
      .detail {
        font-size: 0.4rem;
        color: rgb(128, 126, 126);
        padding-right: 0.2rem;
      }
    }
    .content {
      .content-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.4rem;
        height: 3rem;
        width: 10rem;
        background-color: rgba(68, 68, 68, 0.1);
        background-image: url("~assets/img/wallet/B_coin/B_coin_recharge.png");
        background-repeat: no-repeat;
        background-size: 4rem 3rem;
        background-position-x: 6rem;
        border-bottom: 0.01rem solid rgba(0, 0, 0, 0.1);
        span {
          margin-top: 0.7rem;
          &:last-child {
            color: var(--color-tint);
            margin-top: 0.2rem;
            span {
              font-size: 1rem;
            }
          }
        }
      }
      .content-main {
        margin: 0.3rem 0.2rem 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          position: relative;
          text-align: center;
          transition: 0.4s ease-in-out;
          width: 3.05rem;
          height: 2rem;
          margin-top: 0.175rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          background-color: rgba(56, 56, 56, 0.7);
          border-radius: 0.2rem;
          font-size: 0.35rem;
          .B,
          .RMB {
            margin: auto;
            width: 3rem;
          }
          .B {
            span {
              font-size: 0.6rem;
            }
          }
          .RMB {
            margin-top: -0.3rem;
          }
        }
        .is-selected {
          color: #fff;
          background-color: var(--color-tint);
        }
      }
      .content-footer {
        margin: 0.3rem;
        margin-top: 0.7rem;
        border-bottom: 0.03rem solid rgba(250, 25, 149, 0.4);
        input {
          color: var(--color-tint);
          font-size: 0.4rem;
          outline: none;
          border: 0;
          margin-bottom: 0.2rem;
          background-color: transparent;
        }
      }
    }
    .footer {
      position: relative;
      bottom: -3.6rem;
      z-index: 999;
      margin-left: 0.5rem;
      .footer-agreement {
        text-align: center;
        font-size: 0.38rem;
        margin-bottom: 0.3rem;
        span {
          color: var(--color-tint);
        }
      }
      .footer-btn {
        font-size: 0.5rem;
        border-radius: 0.2rem;
        width: 9rem;
        height: 1.2rem;
        line-height: 1.2rem;
        background-color: var(--color-tint);
        text-align: center;
        color: rgb(223, 219, 219);
      }
    }
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
  .popup {
    .pop {
      overflow-x: hidden;
      overflow-y: scroll;
      width: 10rem;
      height: 100vh;
      background-color: var(--base-item-color-white) !important;
      .pop-head {
        position: sticky;
        top: 0;
        height: 1.6rem;
        line-height: 1.6rem;
        background-color: var(--base-bg-color-thr);
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: flex;
          align-items: center;
          &:first-child {
            width: 1rem;
            height: 1rem;
            opacity: 0.6;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url("~assets/img/video/back_white.svg");
          }
          &:last-child {
            font-size: 0.5rem;
            margin-right: 4rem;
          }
        }
      }
      .pop-content {
        position: relative;
        color: #000;
        font-size: 0.4rem;
        font-family: "Black";
        margin: 0.4rem;
        .pop-content-item {
          margin-bottom: 0.8rem;
          .title {
            font-size: 0.42rem;
            margin: 0.4rem auto;
          }
          p {
            margin: 0.2rem auto;
          }
        }
      }
      .pop-content-2 {
        color: #000;
        margin: 1rem 0.5rem;
        font-size: 0.5rem;
        display: flex;
        flex-direction: column;
        h4 {
          margin: 0.3rem 0;
        }
        h5 {
          margin: 0.2rem 0;
        }
        p {
          font-size: 0.4rem;
          margin: 0.1rem;
          display: flex;
          flex-direction: column;
          span {
            font-size: 0.35rem;
          }
        }
      }
    }
    .pop::-webkit-scrollbar {
      display: none;
    }
  }
  .popup-2 {
    .pop-2 {
      display: flex;
      flex-direction: column;
      width: 9.5rem;
      border-radius: 0.3rem;
      background-color: var(--base-bg-color);
      .pop-title {
        position: relative;
        height: 1.5rem;
        font-size: 0.45rem;
        display: flex;
        align-items: center;
        text-align: center;
        margin: auto;
        span {
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          top: -0.6rem;
          right: -2.3rem;
          border-radius: 100%;
          border-color: #000;
          background-color: rgb(61, 61, 61);
          img {
            position: relative;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }
      ul {
        li {
          font-size: 0.45rem;
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0.3rem;
          height: 1.4rem;
          line-height: 1.4rem;
          padding-bottom: 0.3rem;
          border-bottom: 0.01rem solid rgba(138, 138, 138, 0.6);
          img {
            margin: 0 0.3rem;
            width: 1rem;
            height: 1rem;
            &:first-child {
              width: 0.6rem;
              height: 0.6rem;
              margin-left: 0;
            }
          }
        }
      }
      .pop-footer {
        margin: auto;
        font-size: 0.5rem;
        border-radius: 0.2rem;
        width: 9rem;
        height: 1.2rem;
        line-height: 1.2rem;
        background-color: var(--color-tint);
        text-align: center;
        color: rgb(223, 219, 219);
        margin-bottom: 0.3rem;
      }
    }
  }
  .popup-3 {
    .pop-3 {
      width: 9rem;
      height: 6rem;
      background-color: var(--base-bg-color-sec);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.3rem;
      img {
        position: relative;
        width: 5rem;
        top: -1.5rem;
        margin: 0 auto;
      }
      .pop-3-title {
        margin-top: -1rem;
        margin-bottom: 0.2rem;
        font-size: 0.5rem;
      }
      .pop-3-sub {
        font-size: 0.45rem;
        margin-bottom: 0.2rem;
      }
      .btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          color: rgb(128, 126, 126);
          font-size: 0.45rem;
          text-align: center;
          width: 3rem;
          height: 1rem;
          line-height: 1rem;
          border-radius: 0.2rem;
          border: 0.03rem solid rgba(128, 126, 126, 0.8);
          &:last-child {
            margin-left: 0.5rem;
            color: var(--color-tint);
            border-color: var(--color-tint);
          }
        }
      }
    }
  }
}
</style>