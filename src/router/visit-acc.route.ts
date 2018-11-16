const VisitCase = () => import('~/pages/visit-acc/visit-case.vue')
const VisitWaitCollection = () => import('~/pages/visit-acc/visit-wait-collection.vue')
const VisitHandledCase = () => import('~/pages/visit-acc/visit-handled-case.vue')
const VisitMonitor = () => import('~/pages/visit-acc/visit-monitor.vue')
const VisitRepaymentReview = () => import('~/pages/visit-acc/visit-repayment-review.vue')
const VisitInTheCollecTion = () => import('~/pages/visit-acc/visit-in-the-collection.vue')
// const VisitCollecTionRemind = () => import('~/pages/visit-acc/visit-collection-remind.vue')
export default [
  {
    path: '/visit-acc/visit-case',
    name: 'visit-case',
    component: VisitCase
  }, {
    path: '/visit-acc/visit-wait-collection',
    name: 'visit-wait-collection',
    component: VisitWaitCollection
  }, {
    path: '/visit-acc/visit-handled-case',
    name: 'visit-handled-case',
    component: VisitHandledCase
  }, {
    path: '/visit-acc/visit-monitor',
    name: 'visit-monitor',
    component: VisitMonitor
  }, {
    path: '/visit-acc/visit-repayment-review',
    name: 'visit-repayment-review',
    component: VisitRepaymentReview
  }, {
    path: '/visit-acc/visit-in-the-collection',
    name: 'visit-in-the-collection',
    component: VisitInTheCollecTion
  }
  // , {
  //   path: '/visit-acc/visit-collection-remind',
  //   name: 'visit-collection-remind',
  //   component: VisitCollecTionRemind
  // }
]
