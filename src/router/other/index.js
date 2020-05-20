const RegisterOrLogin = () => import('views/RegisterOrLogin')
const FansFollows = () => import('views/user/FansFollows')
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

export {
  RorL,
  ForF
}