import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'outsourceController'
export default {
    /**
     * 受托方列表
     */
    searchCutsourceList: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'searchCutsourceList',
      type: requestType.Get
    },
    
    /**
     *  修改受托方 
     */
    modifyCutsource: {
      service: SERVICE,
      controller: CONTROLLER,
      action: 'modifyCutsource',
      type: requestType.Post
    },
}
  