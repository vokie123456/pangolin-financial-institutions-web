import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'visitCaseManageController';

export default {
  /**
   * 外访个人案件池查询列表
   */
  visitPersonalCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitPersonalCasePool',
    type: requestType.Get,
  },
  /**
   * 外访停催案件池查询列表
   */
  visitPauseCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitPauseCasePool',
    type: requestType.Get,
  },
  /**
   * 外访回收案件池查询列表
   */
  visitRecoverCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitRecoverCasePool',
    type: requestType.Get,
  },
  /**
   * 外访结清案件池查询列表
   */
  visitSettleCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitSettleCasePool',
    type: requestType.Get,
  },
  /**
   * 外访团队案件池查询列表
   */
  visitTeamCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitTeamCasePool',
    type: requestType.Get,
  },
  /**
   * 外访待分配案件池查询列表
   */
  visitWaitDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitWaitDistribution',
    type: requestType.Get,
  },
  /**
   * 外访归c案件池查询列表
   */
  visitReturnCCasePool: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitReturnCCasePool',
    type: requestType.Get,
  },
  /**
   * 外访个人案件池申请流转
   */
  visitPersonalTurn: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitPersonalTurn',
    type: requestType.Post,
  },
  /**
   * 外访留案申请
   */
  visitCaseStay: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitCaseStay',
    type: requestType.Post,
  },
  /**
   * 外访停催申请
   */
  visitPauseCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitPauseCase',
    type: requestType.Post,
  },
  /**
   * 外访案件手动分案预览
   */
  reviewDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'reviewDistributeCase',
    type: requestType.Post,
  },
  /**
   * 外访案件手动分案确认
   */
  confirmDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'confirmDistributeCase',
    type: requestType.Post,
  },
  /**
   * 内催案件回收案件
   */
  returnCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'returnCase',
    type: requestType.Post,
  },
  /**
   * 回收案件移入待分配
   */
  moveToWaitDistribution: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'moveToWaitDistribution',
    type: requestType.Post,
  },
  /**
   * 外访个人案件池查询列表逾期总金额
   */
  visitPersonalCasePoolAmount: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitPersonalCasePoolAmount',
    type: requestType.Get,
  },
  /**
   * 外访团队案件池查询列表逾期总金额
   */
  visitTeamCasePoolAmount: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'visitTeamCasePoolAmount',
    type: requestType.Get,
  }
};
