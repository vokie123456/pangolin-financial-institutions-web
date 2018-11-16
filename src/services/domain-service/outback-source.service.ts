import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class OutbackSourceService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 委外案件回款/回退/修复
   */
  public createOutBackAmt(data) {
    return this.netService.send({
      server: domainService.outbackSourceController.createOutBackAmt,
      data      
    })
  }
  /**
   * 委外页面多条件查询回款跟进记录
   */
  public getOutbackFollowupRecord(data, page?, sort?) {
    return this.netService.send({
      server: domainService.outbackSourceController.getOutbackFollowupRecord,
      data,
      page,
      sort
    })
  }
}
