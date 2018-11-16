import { requestType } from '~/config/enum.config'
const SERVICE = 'domain-service'
const CONTROLLER = 'caseApplyRecordController'
export default {
  /**
   * 调账
   */
  accountAdjustment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'accountAdjustment',
    type: requestType.Post
  },

}
