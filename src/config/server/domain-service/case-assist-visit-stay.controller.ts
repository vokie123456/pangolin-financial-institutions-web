import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'synergisticDistributionController';
export default {
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
   * 协催管理-诉讼待分配-手动分案确认
   */
  confirmDistributeCaseOut: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'confirmDistributeCaseOut',
    type: requestType.Post,
  },

  /**
   * 协催管理-诉讼待分配-手动分案确认委外机构分案
   */
  outsourcingCases: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'outsourcingCases',
    type: requestType.Post,
  },

};
