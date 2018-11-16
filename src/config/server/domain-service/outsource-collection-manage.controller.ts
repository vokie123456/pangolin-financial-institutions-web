import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'

const CONTROLLER = 'caseOutRecordController'
export default {
    /**
     * 委外催收列表
     */
    searchCaseOutList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'searchCaseOutList',
      type: requestType.Get
    },
    /**
     * 委外管理-委外催收案件-回收案件
     */
    caseRecovery: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'caseRecovery',
      type: requestType.Post
    },


    /**
     * 委外管理-委外催收案件-留案
     */
    caseStay: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'caseStay',
      type: requestType.Post
    },

    /**
     * 委外管理-委外催收案件-导入电催跟进
     */
    importMobileUrge: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'importMobileUrge',
      type: requestType.Get
    },

    /**
     * 委外管理-委外催收案件-导入外访跟进
     */
    importOutVisit: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'importOutVisit',
      type: requestType.Get
    },

    /**
     * 委外管理-委外催收案件-导入外访跟进
     */
    importOutVisitEnclosure: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'importOutVisitEnclosure',
      type: requestType.Get
    },

    /**
     * 委外管理-委外催收案件-取消留案
     */
    unCaseStay: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'unCaseStay',
      type: requestType.Post
    },

  }
  