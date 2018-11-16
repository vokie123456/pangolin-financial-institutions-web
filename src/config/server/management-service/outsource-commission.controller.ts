import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'commissionStrategyController'

export default {
  /**
   * 委外佣金策略列表
   */
  getCommissionStrategyList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCommissionStrategyList',
    type: requestType.Get
  },

  /**
   * 委外佣金策略删除
   */
  delCommissionStrategy: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'delCommissionStrategy',
    type: requestType.Get
  },
  /**
   * 委外佣金策略详情
   */
  getCommissionStrategyDetail: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getCommissionStrategyDetail',
    type: requestType.Post
  },
  /**
   * 委外佣金策略新增
   */
  insertCommissionStrategy: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'insertCommissionStrategy',
    type: requestType.Post
  },
  /**
   * 委外产品下拉列表
   */
  selectProductList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'selectProductList',
    type: requestType.Post
  },
  // 委外佣金策略下拉列表
  selectCommissionStrategyList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'selectCommissionStrategyList',
    type: requestType.Get
  },
  /**
   * 委外列表编辑
   */
  editCommissionStrategy: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'editCommissionStrategy',
    type: requestType.Post
  },

}
