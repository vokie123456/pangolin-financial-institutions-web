import { requestType } from '~/config/enum.config'

const SERVICE = 'common-service'
const CONTROLLER = 'uploadFileController'

export default {
  /**
   * 上传文件
   */
  upload: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'upload',
    type: requestType.Post
  },
  /**
   * 上传文件
   */
  getUploadFile: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUploadFile',
    type: requestType.Get
  }
}
