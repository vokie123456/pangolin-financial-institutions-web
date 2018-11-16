// 外访待分配
const StayManage = () => import('~/pages/co-urging-management/stay-manage.vue')
// 外访催收
const CollectingCases = () => import('~/pages/co-urging-management/collecting-cases.vue')
// 诉讼待分配
const LitigationStayManage = () => import('~/pages/co-urging-management/litigation-stay-manage.vue')
// 诉讼案件
const LawsuitCase = () => import('~/pages/co-urging-management/lawsuit-case.vue')
// 反欺诈待分配
const InvestigationStayManage = () => import('~/pages/co-urging-management/investigation-stay-manage.vue')
// 反欺诈调查案件
const InvestigationCase = () => import('~/pages/co-urging-management/investigation-case.vue')

export default [
  {
    path: '/co-urging-management/stay-manage',
    name: 'StayManage',
    component: StayManage
  },
  {
    path: '/co-urging-management/collecting-cases',
    name: 'CollectingCases',
    component: CollectingCases
  },
  {
    path: '/co-urging-management/litigation-stay-manage',
    name: 'LitigationStayManage',
    component: LitigationStayManage
  },
  {
    path: '/co-urging-management/lawsuit-case',
    name: 'LawsuitCase',
    component: LawsuitCase
  },
  {
    path: '/co-urging-management/investigation-case',
    name: 'InvestigationCase',
    component: InvestigationCase
  },
  {
    path: '/co-urging-management/investigation-stay-manage.vue',
    name: 'InvestigationStayManage',
    component: InvestigationStayManage
  }
]
