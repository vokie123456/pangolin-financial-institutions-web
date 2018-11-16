const CaseTatics = () => import('~/pages/tatics-manage/case-tatics.vue')
const OutCommissionCalculateLat = () => import('~/pages/tatics-manage/out-commission-calculate-lat.vue')

export default [
  {
    path: '/tatics-manage/case-tatics',
    name: 'case-tatics',
    component: CaseTatics
  }, {
    path: '/tatics-manage/out-commission-calculate-lat',
    name: 'out-commission-calculate-lat',
    component: OutCommissionCalculateLat
  }
]
