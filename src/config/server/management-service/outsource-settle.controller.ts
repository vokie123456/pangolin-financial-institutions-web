import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'settlementStrategyController'

export default {
  /**
   * 新增委外結算策略
   */
  addSettlementStrategy: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addSettlementStrategy',
    type: requestType.Post
  },

  /**
   * 委外結算策略查看
   */
  getSettlementStrategyById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSettlementStrategyById',
    type: requestType.Get
  },
  /**
   * 委外結算策略列表
   */
  getSettlementStrategyPageList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSettlementStrategyPageList',
    type: requestType.Get
  },
  /**
   * 修改委外結算策略
   */
  updateSettlementStrategy: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateSettlementStrategy',
    type: requestType.Post
  },

}
