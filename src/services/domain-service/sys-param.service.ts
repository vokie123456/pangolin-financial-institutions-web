import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class SysParamService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 系统参数带条件的分页查询
   */
  @Debounce()
  public query( data, page) {
    return this.netService.send({
      server: domainService.sysParamController.query,
      data,
      page
    })
  }
  /**
   * 新增/修改系统参数
   */
  public createSysParam(data) {
    return this.netService.send({
      server: domainService.sysParamController.createSysParam,
      data
    })
  }
  /**
   * 修改模板地址
   */
  public modifyTemplateUrl(data) {
    return this.netService.send({
      server: domainService.sysParamController.modifyTemplateUrl,
      data
    })
  }
}
