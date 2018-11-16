import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'caseApplyRecordController';

export default {
  /**
   * 获取所有审核记录
   */
  getAllCaseApplyRecords: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCaseApplyRecords',
    type: requestType.Get,
  },
  /**
   * 协催申请
   */
  applyCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyCaseAssist',
    type: requestType.Post,
  },
  /**
   * 留案申请
   */
  applyLeaveCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyLeaveCase',
    type: requestType.Post,
  },
  /**
   * 留案申请
   */
  applyDerate: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyDerate',
    type: requestType.Post,
  },
  /**
   * 留案申请
   */
  dealApply: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'dealApply',
    type: requestType.Post,
  },
  /**
   * 协催留案申请
   */
  applyAssistLeaveCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyAssistLeaveCase',
    type: requestType.Post,
  },

  /**
   * 审批记录
   */
  recordHistory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'recordHistory',
    type: requestType.Get,
  },

  /**
   * 停催申请
   */
  applyPauseCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyPauseCase',
    type: requestType.Post,
  },
  /**
   * 委外回收-申请流转申请
   */
  applyCirculationCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyCirculationCase',
    type: requestType.Post,
  },

  /**
   * 提前流转申请
   */
  applyTurnCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyTurnCase',
    type: requestType.Post,
  },

  /**
   * 人工划扣
   */
  applyRepay: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyRepay',
    type: requestType.Post,
  },

  /**
   * 停催激活
   */
  applyPauseCaseActive: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyPauseCaseActive',
    type: requestType.Post,
  },
  /**
   * 检查审批流
   */
  checkApplyCategory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkApplyCategory',
    type: requestType.Post
  },
};
