const Wallet = () => import('views/user/wallet/Wallet')

// wallet子组件
const BCoin = () => import('components/content/user/wallet/coin/BCoin')
const BCard = () => import('components/content/user/wallet/card/BCard')
const BConsumer = () => import('components/content/user/wallet/consumer/BConsumer')
const BDiscount = () => import('components/content/user/wallet/discount/BDiscount')
const BPackage = () => import('components/content/user/wallet/package/BPackage')
const BScore = () => import('components/content/user/wallet/score/BScore')
const RedPacket = () => import('components/content/user/wallet/red-packet/RedPacket')
const SimKey = () => import('components/content/user/wallet/sim-key/SimKey')
const BBell = () => import('components/content/user/wallet/bell/BBell')
const WalletMain = () => import('components/content/user/wallet/WalletMain')
const ConsumerDetail = () => import('components/content/user/wallet/consumer/ConsumerDetail')
const BBellDetail = () => import('components/content/user/wallet/bell/BBellDetail')
const BBellCashOut = () => import('components/content/user/wallet/bell/BBellCashOut')
const BBellVerify = () => import('components/content/user/wallet/bell/BBellVerify')
const BCoinDetail = () => import('components/content/user/wallet/coin/BCoinDetail')
const BCoinRecharge = () => import('components/content/user/wallet/coin/BCoinRecharge')


export default {
  path: '/wallet',
  component: Wallet,
  children: [
    {
      path: '',
      name: 'Wallet',
      component: WalletMain
    },
    {
      path: 'b-coin',
      name: 'BCoin',
      component: BCoin
    },
    {
      path: 'b-bell',
      name: 'BBell',
      component: BBell
    },
    {
      path: 'b-card',
      name: 'BCard',
      component: BCard
    },
    {
      path: 'b-consumer',
      name: 'BConsumer',
      component: BConsumer
    },
    {
      path: 'b-discount',
      name: 'BDiscount',
      component: BDiscount
    },
    {
      path: 'b-package',
      name: 'BPackage',
      component: BPackage
    },
    {
      path: 'b-score',
      name: 'BScore',
      component: BScore
    },
    {
      path: 'red-packet',
      name: 'RedPacket',
      component: RedPacket
    },
    {
      path: 'sim-key',
      name: 'SimKey',
      component: SimKey
    },
    {
      path: 'consumer-detail',
      name: 'ConsumerDetail',
      component: ConsumerDetail
    },
    {
      path: 'b-bell-detail',
      name: 'BBellDetail',
      component: BBellDetail
    },
    {
      path: 'b-bell-cash-out',
      name: 'BBellCashOut',
      component: BBellCashOut
    },
    {
      path: 'b-bell-verify',
      name: 'BBellVerify',
      component: BBellVerify
    },
    {
      path: 'b-coin-detail',
      name: 'BCoinDetail',
      component: BCoinDetail
    },
    {
      path: 'b-coin-recharge',
      name: 'BCoinRecharge',
      component: BCoinRecharge
    }
  ]
}