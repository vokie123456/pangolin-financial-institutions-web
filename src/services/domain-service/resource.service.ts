import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ResourceService {

  @Inject()
  private netService: NetService

  /**
   * 查询所有资源
   */
  public getAllResource() {
    return this.netService.send({
      server: domainService.resourceController.getAllResource
    })
  }
  /**
   * 按ID查询资源
   */
  public getResource(id) {
    return this.netService.send({
      server: domainService.resourceController.getResource,
      append: id
    })
  }
  /**
   * 资源添加角色
   */
  public resourceAddRole(data) {
    return this.netService.send({
      server: domainService.resourceController.resourceAddRole,
      data
    })
  }
  /**
   * 修改资源
   */
  public updateResource(data) {
    return this.netService.send({
      server: domainService.resourceController.updateResource,
      data
    })
  }
}

