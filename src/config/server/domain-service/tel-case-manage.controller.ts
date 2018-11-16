import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'telCaseManageController';

export default {
  /**
   * 电催待分配查询列表
   */
  waitDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'waitDistribution',
    type: requestType.Get,
  },
  /**
   * 电催个人案件池查询列表
   */
  personalCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'personalCasePool',
    type: requestType.Get,
  },
  /**
   * 电催团队案件池查询列表
   */
  teamCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'teamCasePool',
    type: requestType.Get,
  },
  /**
   * 电催案件待分配手动分案预览
   */
  telCaseManualDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'telCaseManualDistribution',
    type: requestType.Post,
  },
  /**
   * 电催案件待分配手动分案确定分案
   */
  confirmDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'confirmDistributeCase',
    type: requestType.Post,
  },
  /**
   * 停催案件池查询列表
   */
  pauseCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'pauseCasePool',
    type: requestType.Get,
  },

  /**
   * 回收案件池查询列表
   */
  recoverCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'recoverCasePool',
    type: requestType.Get,
  },

  /**
   * 归C案件池查询列表
   */
  returnCCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'returnCCasePool',
    type: requestType.Get,
  },

  /**
   * 结清案件池查询列表
   */
  settleCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'settleCasePool',
    type: requestType.Get,
  },

  /**
   * 电催案件手动分案预览
   */
  reviewDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'reviewDistributeCase',
    type: requestType.Post,
  },

  /**
   * 案件回收
   */
  returnCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'returnCase',
    type: requestType.Post,
  },

  /**
   * 移入电催待分配
   */
  moveToWaitDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'moveToWaitDistribution',
    type: requestType.Post,
  },
  /**
   * 个人案件池查询列表逾期总金额
   */
  personalCasePoolAmount: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'personalCasePoolAmount',
    type: requestType.Get
  },
  /**
   * 团队案件池查询列表逾期总金额
   */
  teamCasePoolAmount: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'teamCasePoolAmount',
    type: requestType.Get
  }
};
