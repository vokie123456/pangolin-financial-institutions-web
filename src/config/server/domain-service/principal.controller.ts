import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'principalController'

export default {
  /**
   * 获取所有委托方信息
   */
  getPrincipalList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPrincipalList',
    type: requestType.Get
  },
  /**
   * 新增委托方信息
   */
  addPrincipal: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addPrincipal',
    type: requestType.Post
  },
  /**
   * 修改委托方信息
   */
  updatePrincipal: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updatePrincipal',
    type: requestType.Put
  }
}
