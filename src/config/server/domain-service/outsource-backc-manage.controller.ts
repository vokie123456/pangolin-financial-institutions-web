import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'

const CONTROLLER = 'caseSettlePoolController'
export default {
    /**
     * 归C案件池列表
     */
    getCaseSettlePoolPageList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCasePoolPageList',
      type: requestType.Get
    },
    
  }