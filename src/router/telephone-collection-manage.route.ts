// 电话催收管理-路由
const TelWaitingCollectCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-waiting-collect-case-manage.vue'); //电催待分配
const TelTeamCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-team-case-manage.vue'); //团队案件池
const TelPersonCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-person-case-manage.vue'); //个人案件池
const TelRecoverCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-recover-case-manage.vue'); //回收案件池
const TelReturnCCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-returnc-case-manage.vue'); //归C案件池
const TelSettleCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-settle-case-manage.vue'); //结清案件池
const TelStopCaseManage = () =>
  import('~/pages/telephone-collection-manage/tel-stop-case-manage.vue'); //停催案件池

export default [
  {
    path: '/telephone-collection-manage/tel-waiting-collect-case-manage',
    name: 'tel-waiting-collect-case-manage',
    component: TelWaitingCollectCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-team-case-manage',
    name: 'tel-team-case-manage',
    component: TelTeamCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-person-case-manage',
    name: 'tel-person-case-manage',
    component: TelPersonCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-recover-case-manage',
    name: 'tel-recover-case-manage',
    component: TelRecoverCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-returnc-case-manage',
    name: 'tel-returnc-case-manage',
    component: TelReturnCCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-settle-case-manage',
    name: 'tel-settle-case-manage',
    component: TelSettleCaseManage,
  },
  {
    path: '/telephone-collection-manage/tel-stop-case-manage',
    name: 'tel-stop-case-manage',
    component: TelStopCaseManage,
  },
];
