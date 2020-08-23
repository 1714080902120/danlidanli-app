import axios from './axios'

// 获取会员购轮播
export async function memberShopSwipe(district_id = 440300, position = 2, sub_position = 0) {
  return await axios({
    url: '/user/get-member-shop-swipe',
    method: 'get',
    params: {
      district_id,
      position,
      sub_position
    }
  })
}

// 获取首页数据
export async function memberShopHome(pageNum = 0, pageSize = 20, version = 1.0, cityId = 0, cateType = 1) {
  return await axios({
    url: '/user/get-member-shop-home',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      version,
      cityId,
      cateType
    }
  })
}

// 获取全部数据
export async function memberShopAll(cookie, pageNum = 0, network = '', openEvent = 'cold', build = '', pageSize = 20, mVersion = 60, mobi_app = 'iphone', platform = 'h5') {
  return await axios({
    url: '/user/get-member-shop-all',
    method: 'get',
    params: {
      network,
      pageNum,
      openEvent,
      build,
      pageSize,
      mVersion,
      mobi_app,
      platform,
      cookie
    }
  })
}

// 获取类型
export async function memberShopFeedType(cookie, pageNum = 0, feedType = 1) {
  return await axios({
    url: '/user/get-member-shop-feedtype',
    method: 'get',
    params: {
      feedType,
      pageNum,
      cookie
    }
  })
}

// 获取分类数据
export async function memberShopCategory(shopId = 0) {
  return await axios({
    url: '/user/get-member-shop-category',
    method: 'get',
    params: {
      shopId
    }
  })
}

// 获取分类排行榜数据
export async function memberShopCategoryRanking(category = 1, cityId = 0, v = '') {
  return await axios({
    url: '/user/get-member-shop-category-ranking',
    method: 'get',
    params: {
      category,
      cityId,
      v
    }
  })
}

// 获取手办列表数据
export async function memberShopGarageKit(keyword = '',
  filters = "",
  priceFlow = "",
  priceCeil = "",
  sortType = "totalrank",
  sortOrder = "",
  pageIndex = 1,
  pageSize = 20,
  userId = 81583053,
  state = "",
  scene = "",
  termQueries = { "field": "category", "values": ["1_107"] },
  rangeQueries = []
) {
  return await axios({
    url: '/user/get-member-shop-garage-kit',
    method: 'post',
    params: {
      keyword,
      filters,
      priceFlow,
      priceCeil,
      sortType,
      sortOrder,
      pageIndex,
      userId,
      state,
      scene,
      pageSize,
      termQueries,
      rangeQueries
    }
  })
}


// 获取个人喜欢数据
export async function memberShopYouMayLike(
  pageSize = 20, scene = "coupon_list", pageNum = 1, buvid = 'BACCF2FC-61F7-45FD-BACA-CFA4AFF36EBF155838infoc;'
) {
  return await axios({
    url: '/user/get-member-shop-you-may-like',
    method: 'post',
    params: {
      pageSize,
      scene,
      pageNum,
      buvid
    }
  })
}