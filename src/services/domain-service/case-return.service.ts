import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class CaseReturnService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 重新分配回收案件
   */
  @Debounce()
  public reDisRecoverCase(data) {
    return this.netService.send({
      server: domainService.caseReturnController.reDisRecoverCase,
      data: {
        ids: data.ids,
        type: data.type,
        closeDate: FilterService.dateFormat(data.closeDate)
      }
    })
  }
  /**
   * 回收案件移入核销案件池
   */
  @Debounce()
  public moveToVerification(data) {
    return this.netService.send({
      server: domainService.caseReturnController.moveToVerification,
      data
    })
  }
  /**
   * 回收案件移入司法案件池
   */
  @Debounce()
  public moveToJudicial(data) {
    return this.netService.send({
      server: domainService.caseReturnController.moveToJudicial,
      data
    })
  }
  /**
   * 内催回收案件
   */
  @Debounce()
  public recoverCase(data) {
    return this.netService.send({
      server: domainService.caseReturnController.recoverCase,
      data
    })
  }
}

