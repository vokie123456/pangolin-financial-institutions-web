import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from '~/core/service'

export class PrincipalService extends Service {

  @Inject()
  private netService: NetService

  /**
   * 获取委托方列表
   */
  public getPrincipalList(data,page?) {
    return this.netService.send({
      server: domainService.principalController.getPrincipalList,
      data,
      page
    })
  }
  /**
   * 新增委托方信息
   */
  public addPrincipal(data) {
    return this.netService.send({
      server: domainService.principalController.addPrincipal,
      data
    })
  }
  /**
   * 修改委托方信息
   */
  public updatePrincipal(data) {
    return this.netService.send({
      server: domainService.principalController.updatePrincipal,
      data
    })
  }
}

