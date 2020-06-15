const personalSpace = () => import('views/user/personal/PersonalSpace')
const widget = () => import('components/content/user/widget/Widget')

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

export {
  PersonalSpace,
  Widget
}