import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class BatchManageService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 查询批量处理
   */
  @Debounce()
  public queryBatchManage(data, page) {
    return this.netService.send({
      server: domainService.batchManageController.queryBatchManage,
      data,
      page
    })
  }
  /**
   * 批量处理
   */
  public manualBatchManage(data) {
    return this.netService.send({
      server: domainService.batchManageController.manualBatchManage,
      data
    })
  }
  /**
   * 暂停触发器
   */
  public pauseTriggerForJob(data) {
    return this.netService.send({
      server: domainService.batchManageController.pauseTriggerForJob,
      data
    })
  }
  /**
   * 启用触发器
   */
  public resumeTriggerForJob(data) {
    return this.netService.send({
      server: domainService.batchManageController.resumeTriggerForJob,
      data
    })
  }
}
