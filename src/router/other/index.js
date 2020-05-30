const RegisterOrLogin = () => import('views/RegisterOrLogin')
const FansFollows = () => import('views/user/FansFollows')
const BigMember = () => import('components/content/user/big-member/BigMember')
const UserSet = () => import('components/content/user/set-theme-skip/Set')
const Theme = () => import('components/content/user/set-theme-skip/Theme')
const Skip = () => import('components/content/user/set-theme-skip/Skip')


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

export {
  RorL,
  ForF,
  bigMember,
  set,
  theme,
  skip
}