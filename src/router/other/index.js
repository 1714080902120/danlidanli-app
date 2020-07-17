const RegisterOrLogin = () => import('views/RegisterOrLogin')
const FansFollows = () => import('views/user/FansFollows')
const BigMember = () => import('components/content/user/big-member/BigMember')
const UserSet = () => import('components/content/user/set-theme-skip/set/Set')
const Theme = () => import('components/content/user/set-theme-skip/theme/Theme')
const Skip = () => import('components/content/user/set-theme-skip/skip/Skip')
const scan = () => import('components/common/scan/Scan')
const game = () => import('components/content/home/Game')


const RorL = {
  path: '/registerOrLogin',
  name: 'RegisterOrLogin',
  component: RegisterOrLogin
}

const ForF = {
  path: '/fans-follows',
  name: 'FansFollows',
  component: FansFollows
}

const bigMember = {
  path: '/big-member',
  name: 'BigMember',
  component: BigMember
}

const skip = {
  path: '/skip',
  name: 'Skip',
  component: Skip
}

const set = {
  path: '/set',
  name: 'Set',
  component: UserSet
}

const theme = {
  path: '/theme',
  name: 'Theme',
  component: Theme
}

const Scan = {
  path: '/scan',
  name: 'Scan',
  component: scan
}

const Game = {
  path: '/game',
  name: 'Game',
  component: game
}

export {
  RorL,
  ForF,
  bigMember,
  set,
  theme,
  skip,
  Scan,
  Game
}