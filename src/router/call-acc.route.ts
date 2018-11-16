
const CallCase = () => import('~/pages/call-acc/call-case.vue')
const CallHandledCase = () => import('~/pages/call-acc/call-handled-case.vue')
const WaitCollection = () => import('~/pages/call-acc/wait-collection.vue')
const InTheCollection = () => import('~/pages/call-acc/in-the-collection.vue')
const RepaymentReview = () => import('~/pages/call-acc/repayment-review.vue')
// const CollectionRemind = () => import('~/pages/call-acc/collection-remind.vue')

export default [
  // {
  //   path: '/call-acc/collection-remind',
  //   name: 'collection-remind',
  //   component: CollectionRemind
  // },
  {
    path: '/call-acc/call-case',
    name: 'call-case',
    component: CallCase
  }, {
    path: '/call-acc/wait-collection',
    name: 'wait-collection',
    component: WaitCollection
  }, {
    path: '/call-acc/in-the-collection',
    name: 'in-the-collection',
    component: InTheCollection
  }, {
    path: '/call-acc/repayment-review',
    name: 'repayment-review',
    component: RepaymentReview
  }, {
    path: '/call-acc/call-handled-case',
    name: 'call-handled-case',
    component: CallHandledCase
  }
]
