import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'caseAssistController';

export default {
  /**
   * 获取协催管理-外访待分配-数据显示
   */
  getAllWaitVisitCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllWaitVisitCaseAssist',
    type: requestType.Get,
  },

  /**
   * 协催管理-外访催收-数据显示
   */
  getAllVisitCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllVisitCaseAssist',
    type: requestType.Get,
  },

  /**
   * 协催管理-外访待分配-分案
   */
  distributeCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'distributeCaseAssist',
    type: requestType.Post,
  },

  /**
   * 协催管理-诉讼待分配-列表数据
   */
  searchPendingList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'searchPendingList',
    type: requestType.Get,
  },

  /**
   * 协催管理-诉讼待分配-手动分案确认
   */
  confirmDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'confirmDistributeCase',
    type: requestType.Post,
  },

  /**
   * 协催管理-诉讼待分配-待分配手动分案预览
   */
  synergisticDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'synergisticDistribution',
    type: requestType.Post,
  },

  /**
   * 协催管理-案件标色
   */
  markCaseAssistColor: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'markCaseAssistColor',
    type: requestType.Post,
  },
};
