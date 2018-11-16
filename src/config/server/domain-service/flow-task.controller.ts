import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'flowTaskController';

export default {
  /**
   * 查看审批流
   */
  getFlowTask: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'flowTask',
    type: requestType.Get,
  },

  /**
   * 增加审批流
   */
  addFlowTask: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'flowTask',
    type: requestType.Post,
  },

  /**
   * 修改/更新审批流
   */
  putFlowTask: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'flowTask',
    type: requestType.Put,
  },

  /**
   * 审批流列表
   */
  queryFlowTask: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryFlowTask',
    type: requestType.Get,
  },

  /**
   * 审批类型设置列表
   */
  queryApplyCategory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryApplyCategory',
    type: requestType.Get,
  },

  /**
   * 修改审批类型设置状态
   */
  applyCategory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyCategory',
    type: requestType.Put,
  },

  /**
   * 检查审批流
   */
  checkApplyCategory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkApplyCategory',
    type: requestType.Get
  },
};
