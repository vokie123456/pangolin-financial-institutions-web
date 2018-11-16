import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from '~/core/service'

export class OutsourceService extends Service {
  @Inject(NetService)
  private netService: NetService

  /**
   * 查询所有委外方
   */
  public getAllOutsource(companyCode) {
    return this.netService.send({
      server: domainService.outsourceController.getAllOutsource,
      data: {
        companyCode
      }
    })
  }
  /**
   * 新增/修改委外方管理
   */
  public createOutsource(data) {
    return this.netService.send({
      server: domainService.outsourceController.createOutsource,
      data
    })
  }
  /**
   * 删除委外方
   */
  public deleteOutsource(id) {
    return this.netService.send({
      server: domainService.outsourceController.deleteOutsource,
      data: {
        id
      }
    })
  }
  /**
   * 统计委托方信息的 案件信息
   */
  public getAllOutSourceInfoByCase(data, page) {
    return this.netService.send({
      server: domainService.outsourceController.getAllOutSourceInfoByCase,
      data,
      page
    })
  }
  /**
   * 查询委外方
   */
  public query(data, page) {
    return this.netService.send({
      server: domainService.outsourceController.query,
      data,
      page
    })
  }
}
