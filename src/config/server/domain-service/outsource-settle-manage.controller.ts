import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'

const CONTROLLER = 'caseSettlePoolController'
export default {
    /**
     * 结清案件池
     */
    getCaseSettlePoolPageList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCasePoolPageList',
      type: requestType.Get
    },
    /**
     * 受托方下拉列表 (所有的受托方都可以调用)
     */    
    getOutSourceList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getOutSourceList',
      type: requestType.Get
    },

  }
  