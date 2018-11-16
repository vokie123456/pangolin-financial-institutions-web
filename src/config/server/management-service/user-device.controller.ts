import { requestType } from '~/config/enum.config'

const SERVICE = 'management-service'
const CONTROLLER = 'userDeviceController'

export default {

  /**
   * 获取所有设备
   */
  getAllDevices: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllDevices',
    type: requestType.Get
  },
  /**
   * 开启关闭设备
   */
  disableDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'disableDevice',
    type: requestType.Post
  },
  /**
   * 开启关闭设备锁
   */
  enableDeviceKey: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'enableDeviceKey',
    type: requestType.Post
  },
  /**
   * 重置设备
   */
  resetDevice: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'resetDevice',
    type: requestType.Post
  }
}
