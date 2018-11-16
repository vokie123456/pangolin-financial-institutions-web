import { requestType } from '~/config/enum.config'
const SERVICE = 'domain-service'
const CONTROLLER = 'caseOutContrastController'
export default {
    /**
     * 委外对账列表
     */
    caseOutContrastList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'caseOutContrastList',
      type: requestType.Get
    },
  /**
   * 调账
   */
  accountAdjustment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'accountAdjustment',
    type: requestType.Post
  },
  /**
   * 案件统计
   */
  caseStatistics: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseStatistics',
    type: requestType.Post
  },
  /**
   * 对账单核对
   */
  checkBill: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'checkBill',
    type: requestType.Get
  },
  /**
   * 根据受托方查询批次号下拉列表
   */
  selectBatchNumberList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'selectBatchNumberList',
    type: requestType.Get
  },
  /**
   * 委外管理-委外对账-生成账单
   */
  generatingBill: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'generatingBill',
    type: requestType.Post
  },  
  /**
   * 委外管理-委外对账-对账单导出
   */
  exportBills: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'exportBills',
    type: requestType.Post
  },

  /**
   * 委外管理-委外对账-导入还款记录
   */
  importRepaymentRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'importRepaymentRecord',
    type: requestType.Get
  },

}
