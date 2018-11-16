import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'freeMoneyResultController'

export default {
  /**
   * 电催审批小流转案件
   */
  getFreeMonryResult: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getFreeMonryResult',
    type: requestType.Get
  },
}
