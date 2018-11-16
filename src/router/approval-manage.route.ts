const OwnApproval = () => import('~/pages/approval-manage/own-approval.vue');
const ApprovalTask = () => import('~/pages/approval-manage/approval-task.vue');
const ApprovalCategory = () => import('~/pages/approval-manage/approval-category.vue');

export default [
  {
    // 我的审核
    path: '/approval-manage/own-approval',
    name: 'own-approval',
    component: OwnApproval,
  },
  {
    // 审批类型设置
    path: '/approval-manage/approval-category',
    name: 'approval-category',
    component: ApprovalCategory,
  },
  {
    // 审批流程设置
    path: '/approval-manage/approval-task',
    name: 'approval-task',
    component: ApprovalTask,
  }
];
