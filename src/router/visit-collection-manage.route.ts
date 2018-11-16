// 外访催收管理-路由
const VisitWaitingCollectCaseManage = () => import('~/pages/visit-collection-manage/visit-waiting-collect-case-manage.vue'); //外访待分配
const VisitTeamCaseManage = () => import('~/pages/visit-collection-manage/visit-team-case-manage.vue'); //团队案件池
const VisitPersonCaseManage = () => import('~/pages/visit-collection-manage/visit-person-case-manage.vue'); //个人案件池
const VisitRecoverCaseManage = () => import('~/pages/visit-collection-manage/visit-recover-case-manage.vue'); //回收案件池
const VisitReturnCCaseManage = () => import('~/pages/visit-collection-manage/visit-returnc-case-manage.vue'); //归C案件池
const VisitSettleCaseManage = () => import('~/pages/visit-collection-manage/visit-settle-case-manage.vue'); //结清案件池
const VisitStopCaseManage = () => import('~/pages/visit-collection-manage/visit-stop-case-manage.vue'); //停催案件池
const VisitMonitor = () => import('~/pages/visit-collection-manage/visit-monitor.vue'); //外访监控

export default [
  {
    path: '/visit-collection-manage/visit-waiting-collect-case-manage',
    name: 'visit-waiting-collect-case-manage',
    component: VisitWaitingCollectCaseManage,
    title: "外访待分配"
  },
  {
    path: '/visit-collection-manage/visit-team-case-manage',
    name: 'visit-team-case-manage',
    component: VisitTeamCaseManage,
    title: "团队案件池"
  },
  {
    path: '/visit-collection-manage/visit-person-case-manage',
    name: 'visit-person-case-manage',
    component: VisitPersonCaseManage,
    title: "个人案件池"
  },
  {
    path: '/visit-collection-manage/visit-recover-case-manage',
    name: 'visit-recover-case-manage',
    component: VisitRecoverCaseManage,
    title: "回收案件池"
  },
  {
    path: '/visit-collection-manage/visit-returnc-case-manage',
    name: 'visit-returnc-case-manage',
    component: VisitReturnCCaseManage,
    title: "归C案件池"
  },
  {
    path: '/visit-collection-manage/visit-settle-case-manage',
    name: 'visit-settle-case-manage',
    component: VisitSettleCaseManage,
    title: "结清案件池"
  },
  {
    path: '/visit-collection-manage/visit-stop-case-manage',
    name: 'visit-stop-case-manage',
    component: VisitStopCaseManage,
    title: "停催案件池"
  },
  {
    path: '/visit-collection-manage/visit-monitor',
    name: 'visit-monitor',
    component: VisitMonitor,
    title: "外访监控"
  },
];
