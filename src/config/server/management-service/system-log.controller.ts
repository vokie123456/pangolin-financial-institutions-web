import { requestType } from '~/config/enum.config'

const SERVICE = 'management-service'
const CONTROLLER = 'systemLogController'

export default {
  /**
   * 查询日志
   */
  getAllSystemLogs: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllSystemLogs',
    type: requestType.Get
  }
}
