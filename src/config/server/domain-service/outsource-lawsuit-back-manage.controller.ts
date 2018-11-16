import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'

const CONTROLLER = 'lawsuitRecoveryController'
export default {
    /**
     * 委外管理-委外诉讼回收案件-列表
     */
    searchLawsuitRecoveryList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'searchLawsuitRecoveryList',
      type: requestType.Get
    },
    /**
     * 委外管理-委外诉讼回收案件-移入诉讼待分配
     */
    moveLawsuitWait: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'moveLawsuitWait',
      type: requestType.Post
    },

}
  