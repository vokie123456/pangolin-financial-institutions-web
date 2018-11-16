import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BindPhoneService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 查询特定公司的日志
   */
  @Debounce()
  public bindTaskDataByCallerId() {
    return this.netService.send({
      server: domainService.bindPhoneController.bindTaskDataByCallerId,
    })
  }
}
