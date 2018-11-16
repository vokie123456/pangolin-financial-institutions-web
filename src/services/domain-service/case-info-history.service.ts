import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';


export class CaseInfoHistoryService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 回收案件删除
   */
  @Debounce()
  public deleteReturnCase(data) {
    return this.netService.send({
      server: domainService.caseInfoHistoryController.deleteReturnCase,
      data
    })
  }
  /**
   * 委外已结案案件删除
   */
  @Debounce()
  public deleteOuterCase(ids) {
    return this.netService.send({
      server: domainService.caseInfoHistoryController.deleteOuterCase,
      data: {
        ids
      }
    })
  }
  /**
   * 内催已结案删除
   */
  public deleteInnerCase(data) {
    return this.netService.send({
      server: domainService.caseInfoHistoryController.deleteInnerCase,
      data: {
        ids: data
      }
    })
  }
}
