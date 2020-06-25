const video = () => import('views/video/VideoDetail')

const VideoDetail = {
  name: 'VideoDetail',
  path: '/video-detail/:bvid',
  component: video
}

export {
  VideoDetail
}