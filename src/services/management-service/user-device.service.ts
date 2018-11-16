import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class UserDeviceService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 启用禁用设备
   */
  @Debounce()
  public getAllDevices(data) {
    return this.netService.send({
      server: managementService.userDeviceController.getAllDevices,
      data
    })
  }

  /**
   * 启用禁用设备
   */
  @Debounce()
  public disableDevice(data) {
    return this.netService.send({
      server: managementService.userDeviceController.disableDevice,
      data
    })
  }

  /**
   * 启用禁用设备锁
   */
  @Debounce()
  public enableDeviceKey(data) {
    return this.netService.send({
      server: managementService.userDeviceController.enableDeviceKey,
      data
    })
  }

  /**
   * 重置设备
   */
  @Debounce()
  public resetDevice(data) {
    return this.netService.send({
      server: managementService.userDeviceController.resetDevice,
      data
    })
  }
}

