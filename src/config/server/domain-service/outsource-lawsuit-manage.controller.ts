import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'litigationController'
export default {
    /**
     * 委外管理-诉讼待分配-列表
     */
    searchPendingList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'searchPendingList',
      type: requestType.Get
    },

    /**
     * 委外管理-诉讼待分配-分案确认
     */
    confirmDistributeCase: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'confirmDistributeCase',
      type: requestType.Post
    },

    /**
     * 委外管理-诉讼待分配-待分配手动分案预览
     */
    searchSplitPreview: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'searchSplitPreview',
      type: requestType.Post
    },

  }
