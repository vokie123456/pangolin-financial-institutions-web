
const SearchCase = () => import('~/pages/case-search/search-case.vue')
const CustomerExport = () => import('~/pages/case-search/customer-export.vue')
// const FollowupExport = () => import('~/pages/case-search/followup-export.vue')

export default [
  {
    path: '/case-search/search-case',
    name: 'search-case',
    component: SearchCase
  }, {
    path: '/case-search/customer-export',
    name: 'customer-export',
    component: CustomerExport
  }
  // , {
  //   path: '/case-search/followup-export',
  //   name: 'followup-export',
  //   component: FollowupExport
  // }
]
