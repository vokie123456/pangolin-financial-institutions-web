import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'recoveryCasePoolController'
export default {
    /**
     * 委外回收案件查询
     */
    caseOutRecoveryList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'caseOutRecoveryList',
      type: requestType.Get
    },
  /**
   * 申请流转
   */
  applyCirculation: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'applyCirculation',
    type: requestType.Post
  },
  /**
   * 移入委外待分配
   */
  caseMoveAllocation: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseMoveAllocation',
    type: requestType.Post
  },

  }
