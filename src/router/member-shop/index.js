const MemberShop = () => import('views/member-shop/MemberShop')
const MemberShopListAll = () => import('components/content/member-shop/member-shop-list/MemberShopListAll')
const MemberShopListMagic = () => import('components/content/member-shop/member-shop-list/MemberShopListMagic')
const MemberShopListBeauty = () => import('components/content/member-shop/member-shop-list/MemberShopListBeauty')
const MemberShopListNew = () => import('components/content/member-shop/member-shop-list/MemberShopListNew')

export default {
  path: '/member-shop',
  component: MemberShop,
  children: [
    {
      path: '',
      name: 'MemberShopListAll',
      component: MemberShopListAll
    },
    { path: "magic", name: 'MemberShopListMagic', component: MemberShopListMagic },
    { path: "beauty", name: 'MemberShopListBeauty', component: MemberShopListBeauty },
    { path: "new", name: 'MemberShopListNew', component: MemberShopListNew },

  ]
}