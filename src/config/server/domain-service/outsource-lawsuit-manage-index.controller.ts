import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'

const CONTROLLER = 'caseOutLitigationController'
export default {
    /**
     * 委外诉讼案件查询
     */
    getCaseOutLawsuitList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCaseOutLawsuitList',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-撤诉
     */
    caseRecover: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'caseRecover',
      type: requestType.Post
    },
    /**
     * 委外诉讼案-回收案件
     */
    closingCase: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'closingCase',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-费用维护-删除
     */
    deleteCostRecord: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'deleteCostRecord',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-费用维护-查询
     */
    getCostRecord: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCostRecord',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-诉讼跟进-返回上一步
     */
    getFollowInfo: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getFollowInfo',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-诉讼跟进-返回上一步
     */
    getCourtInfoStep: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'getCourtInfoStep',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-诉讼跟进-保存跟进信息
     */
    saveCourtInfo: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'saveCourtInfo',
      type: requestType.Post
    },
    /**
     * 委外诉讼案-撤诉
     */
    withdraw: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'withdraw',
      type: requestType.Get
    },
    /**
     * 委外诉讼案-费用维护-新增or修改
     */
    saveOrUpdateCostRecord: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'saveOrUpdateCostRecord',
      type: requestType.Post
    },
    /**
     * 委外诉讼案-诉讼跟进-修改诉讼状态
     */
    updateLawsuitState: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'updateLawsuitState',
      type: requestType.Get
    },

  }
