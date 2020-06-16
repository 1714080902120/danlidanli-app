const personalSpace = () => import('views/user/personal/PersonalSpace')
const widget = () => import('components/content/user/widget/Widget')
const userspace = () => import('views/user/personal/UserSpace')


const PersonalSpace = {
  path: '/personal-space',
  name: 'PersonalSpace',
  component: personalSpace
}

const Widget = {
  path: '/widget',
  name: 'Widget',
  component: widget
}

const UserSpace = {
  path: '/user-space',
  name: 'UserSpace',
  component: userspace
}

export {
  PersonalSpace,
  Widget,
  UserSpace
}