const Home = () => import('views/home/Home')
// home子组件
const HomeRecommend = () => import('components/content/home/HomeRecommend')
const HomeLive = () => import('components/content/home/HomeLive')
const HomeHot = () => import('components/content/home/HomeHot')
const HomeAnimate = () => import('components/content/home/HomeAnimate')
const HomeMovie = () => import('components/content/home/HomeMovie')
const HomeNewDate = () => import('components/content/home/HomeNewDate')
const HomeStudy = () => import('components/content/home/HomeStudy')

export default   {
  path: '/home',
  component: Home,
  children: [
    {
      path: '',
      name: 'Home',
      component: HomeRecommend
    },
    { path: "live", name: 'Live', component: HomeLive },
    { path: "hot", name: 'Hot', component: HomeHot },
    { path: "animate", name: 'Animate', component: HomeAnimate },
    { path: "movie", name: 'Movie', component: HomeMovie },
    { path: "new-date", name: 'NewDate', component: HomeNewDate },
    { path: "study", name: 'Study', component: HomeStudy }
  ]
}