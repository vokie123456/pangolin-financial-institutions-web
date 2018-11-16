import { requestType } from '~/config/enum.config'
const SERVICE = 'domain-service'

const CONTROLLER = 'caseSettlementSheetController'
export default {
    /**
     * 委外结算单列表
     */
    getCaseSettlementSheetPageList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCaseSettlementSheetPageList',
      type: requestType.Get
    },
    /**
     * 委外结算单明细列表
     */
    getSettlementSheetDetailPageList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getSettlementSheetDetailPageList',
      type: requestType.Get
    },
    /**
     * 导出对账单
     */
    exportSettlementSheet: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'exportSettlementSheet',
      type: requestType.Post
    },

    /**
     * 导出对账单明细
     */
    exportSettlementSheetDetail: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'exportSettlementSheetDetail',
      type: requestType.Post
    },

  }
  