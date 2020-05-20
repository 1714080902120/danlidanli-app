const Wallet = () => import('views/user/wallet/Wallet')

// wallet子组件
const BCoin = () => import('components/content/user/wallet/BCoin')
const BCard = () => import('components/content/user/wallet/BCard')
const BConsumer = () => import('components/content/user/wallet/BConsumer')
const BDiscount = () => import('components/content/user/wallet/BDiscount')
const BPackage = () => import('components/content/user/wallet/BPackage')
const BScore = () => import('components/content/user/wallet/BScore')
const RedPacket = () => import('components/content/user/wallet/RedPacket')
const SimKey = () => import('components/content/user/wallet/SimKey')
const BBell = () => import('components/content/user/wallet/BBell')
const WalletMain = () => import('components/content/user/wallet/WalletMain')
const ConsumerDetail = () => import('components/content/user/wallet/consumer/ConsumerDetail')

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
    }
  ]
}