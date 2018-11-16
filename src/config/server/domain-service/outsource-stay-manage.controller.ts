import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'outsourcingController'
export default {
  /**
   * 分案确认
   */
  confirmDistributeCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'confirmDistributeCase',
    type: requestType.Post
  },
  /**
   * 委外方列表
   */
  searchOutsourcePreview: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'searchOutsourcePreview',
    type: requestType.Get
  },
  /**
   * 待分配列表
   */
  searchPendingList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'searchPendingList',
    type: requestType.Get
  },
  /**
   * 分案预览列表
   */
  searchSplitPreview: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'searchSplitPreview',
    type: requestType.Get
  },
  }
