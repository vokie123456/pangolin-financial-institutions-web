const BackCIndex = () => import('~/pages/outsource-manage/backc-manage.vue')
const CollectionIndex = () => import('~/pages/outsource-manage/collection-manage.vue')
const CommissionedIndex = () => import('~/pages/outsource-manage/commissioned-manage.vue')
const LawsuitIndex = () => import('~/pages/outsource-manage/lawsuit-manage.vue')
const OutsourceLawsuitBackIndex = () => import('~/pages/outsource-manage/outsource-lawsuit-back-manage.vue')
const OutsourceLawsuitIndex = () => import('~/pages/outsource-manage/outsource-lawsuit-manage.vue')
const OutsourcePerformanceIndex = () => import('~/pages/outsource-manage/outsource-performance-manage.vue')
const OutsourceReconciliationIndex = () => import('~/pages/outsource-manage/outsource-reconciliation-manage.vue')
const OutsourceSettleIndex = () => import('~/pages/outsource-manage/outsource-settle-manage.vue')
const RecycleIndex = () => import('~/pages/outsource-manage/recycle-manage.vue')
const SettleIndex = () => import('~/pages/outsource-manage/settle-manage.vue')
const StayIndex = () => import('~/pages/outsource-manage/stay-manage.vue')
const Detial = () => import('~/pages/outsource-manage/outsource-detail.vue')

export default [
  {
    path: '/outsource-manage/commissioned-manage',
    name: 'commissioned-manage',
    title: '受托方管理',
    component: CommissionedIndex
  }, {
    path: '/outsource-manage/stay-manage',
    name: 'stay-manage',
    title: '待分配案件',
    component: StayIndex
  }, {
    path: '/outsource-manage/collection-manage',
    name: 'collection-manage',
    title: '委外催收案件',
    component: CollectionIndex
  }, {
    path: '/outsource-manage/backc-manage',
    name: 'backC-manage',
    title: '归C案件池',
    component: BackCIndex
  }, {
    path: '/outsource-manage/settle-manage',
    name: 'settle-manage',
    title: '结清案件池',
    component: SettleIndex
  }, {
    path: '/outsource-manage/recycle-manage',
    name: 'recycle-manage',
    title: '回收案件池',
    component: RecycleIndex
  }, {
    path: '/outsource-manage/outsource-reconciliation-manage',
    name: 'outsource-reconciliation-manage',
    title: '委外对账',
    component: OutsourceReconciliationIndex
  }, {
    path: '/outsource-manage/outsource-settle-manage',
    name: 'outsource-settle-manage',
    title: '委外结算单',
    component: OutsourceSettleIndex
  },
  {
    path: '/outsource-manage/outsource-performance-manage',
    name: 'outsource-performance-manage',
    title: '委外业绩查询',
    component: OutsourcePerformanceIndex
  },
  {
    path: '/outsource-manage/lawsuit-manage',
    name: 'lawsuit-manage',
    title: '诉讼待分配',
    component: LawsuitIndex
  },
  {
    path: '/outsource-manage/outsource-lawsuit-manage',
    name: 'outsource-lawsuit-manage',
    title: '委外诉讼案件',
    component: OutsourceLawsuitIndex
  },
  {
    path: '/outsource-manage/outsource-lawsuit-back-manage',
    name: 'outsource-lawsuit-back-manage',
    title: '委外诉讼回收案件',
    component: OutsourceLawsuitBackIndex
  },
  {
    path: '/outsource-manage/outsource-detial/:mode?/:caseId',
    name: 'outsource-detial',
    title: '案件详情',
    component: Detial
  }
]
