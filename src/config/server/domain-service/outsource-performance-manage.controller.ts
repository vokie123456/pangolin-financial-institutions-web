import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'caseOutBussiness'
export default {
    /**
     * 委外管理-委外业绩查询-委外批次业绩
     */
    queryCaseOutBathList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'queryCaseOutBathList',
      type: requestType.Get
    },
    /**
     * 委外管理-委外业绩查询-委外金额业绩
     */
    queryCaseOutMoneyList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'queryCaseOutMoneyList',
      type: requestType.Get
    },

    /**
     * 委外管理-委外业绩查询-委外产品业绩
     */
    queryCaseOutProductList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'queryCaseOutProductList',
      type: requestType.Get
    },
    /**
     * 委外管理-委外业绩查询-批次号
     */
    queryOutBatchList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'queryOutBatchList',
      type: requestType.Get
    },
  }

  